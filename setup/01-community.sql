-- 雞爸爸官網共用按讚與留言。只新增 cdj_ 前綴的資料表與函式。
-- 在 Supabase SQL Editor 貼上完整內容，按 Run。可以重跑，不會清除既有留言。
begin;
create table if not exists public.cdj_articles (
  path text primary key check (path ~ '^/articles/[a-zA-Z0-9_-]+[.]html$')
);
create table if not exists public.cdj_likes (
  article text not null references public.cdj_articles(path),
  reader uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(article, reader)
);
create table if not exists public.cdj_messages (
  id uuid primary key default gen_random_uuid(),
  article text not null references public.cdj_articles(path),
  reader uuid not null references auth.users(id) on delete cascade,
  nickname text not null check (char_length(btrim(nickname)) between 1 and 30),
  body text not null check (char_length(btrim(body)) between 1 and 1000),
  state text not null default 'published' check (state in ('published','hidden')),
  created_at timestamptz not null default now()
);
create index if not exists cdj_messages_article_order on public.cdj_messages(article, created_at desc, id) where state='published';
create index if not exists cdj_messages_reader_order on public.cdj_messages(reader, created_at desc);
alter table public.cdj_articles enable row level security;
alter table public.cdj_likes enable row level security;
alter table public.cdj_messages enable row level security;
-- 客戶端無法直接列出讀者識別碼，也無法修改別人的留言。所有互動經由下列受限函式。
revoke all on public.cdj_articles, public.cdj_likes, public.cdj_messages from public, anon, authenticated;

create or replace function public.cdj_stats(p_articles text[])
returns table(article text, likes bigint, comments bigint, liked boolean)
language sql stable security definer set search_path = '' as $$
 select a.path,
   (select count(*) from public.cdj_likes l where l.article=a.path),
   (select count(*) from public.cdj_messages m where m.article=a.path and m.state='published'),
   exists(select 1 from public.cdj_likes l where l.article=a.path and l.reader=auth.uid())
 from public.cdj_articles a where a.path=any(p_articles) order by a.path limit 100
$$;

create or replace function public.cdj_comments(p_article text, p_offset integer default 0)
returns table(id uuid, nickname text, body text, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
 select m.id, m.nickname, m.body, m.created_at from public.cdj_messages m
 where m.article=p_article and m.state='published'
 order by m.created_at desc, m.id desc limit 20 offset greatest(0,least(p_offset,100000))
$$;

create or replace function public.cdj_like(p_article text, p_liked boolean)
returns table(article text, likes bigint, comments bigint, liked boolean)
language plpgsql security definer set search_path = '' as $$
declare v_reader uuid := auth.uid();
begin
 if v_reader is null then raise exception 'CDJ_LOGIN_REQUIRED'; end if;
 if not exists(select 1 from public.cdj_articles a where a.path=p_article) then raise exception 'CDJ_UNKNOWN_ARTICLE'; end if;
 -- 同一讀者並行點擊會依序處理；相同請求重送不會多加一個讚。
 perform pg_advisory_xact_lock(hashtextextended(v_reader::text, 0));
 if p_liked is true then
   insert into public.cdj_likes(article,reader) values(p_article,v_reader) on conflict do nothing;
 else
   delete from public.cdj_likes l where l.article=p_article and l.reader=v_reader;
 end if;
 return query select * from public.cdj_stats(array[p_article]);
end
$$;

create or replace function public.cdj_comment(p_article text, p_nickname text, p_body text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_reader uuid := auth.uid(); v_id uuid;
begin
 if v_reader is null then raise exception 'CDJ_LOGIN_REQUIRED'; end if;
 if not exists(select 1 from public.cdj_articles a where a.path=p_article) then raise exception 'CDJ_UNKNOWN_ARTICLE'; end if;
 if p_nickname is null or char_length(btrim(p_nickname)) not between 1 and 30
    or p_body is null or char_length(btrim(p_body)) not between 1 and 1000 then raise exception 'CDJ_INVALID_MESSAGE'; end if;
 perform pg_advisory_xact_lock(hashtextextended(v_reader::text, 0));
 if exists(select 1 from public.cdj_messages m where m.reader=v_reader and m.created_at > now()-interval '30 seconds') then raise exception 'CDJ_WAIT'; end if;
 if (select count(*) from public.cdj_messages m where m.reader=v_reader and m.created_at > now()-interval '24 hours') >= 20 then raise exception 'CDJ_LIMIT'; end if;
 insert into public.cdj_messages(article,reader,nickname,body)
 values(p_article,v_reader,btrim(p_nickname),btrim(p_body)) returning id into v_id;
 return v_id;
end
$$;
revoke all on function public.cdj_stats(text[]), public.cdj_comments(text,integer), public.cdj_like(text,boolean), public.cdj_comment(text,text,text) from public, anon, authenticated;
grant execute on function public.cdj_stats(text[]), public.cdj_comments(text,integer) to anon, authenticated;
grant execute on function public.cdj_like(text,boolean), public.cdj_comment(text,text,text) to authenticated;

insert into public.cdj_articles(path) values
('/articles/ai-fake-artsy-meme.html'),
('/articles/ai-makeover-rollover.html'),
('/articles/ai-website-scary-lover-concubine.html'),
('/articles/another-graduation-ceremony.html'),
('/articles/atopic-skin-family-care.html'),
('/articles/belly-tap-smile-video.html'),
('/articles/biaoren-desert-echo.html'),
('/articles/biaoren-diting-asang.html'),
('/articles/chen-tzu-hao-slump-analysis.html'),
('/articles/chubby-yoyo-sister.html'),
('/articles/cortisol-sagging-face-truth.html'),
('/articles/cortisol.html'),
('/articles/dragons-90s-memory.html'),
('/articles/dragons-champion.html'),
('/articles/dragons-speed-game.html'),
('/articles/dragons-tto-1996-2023.html'),
('/articles/family-creatine-first-experiment.html'),
('/articles/family-data-noise-hsp.html'),
('/articles/family.html'),
('/articles/five-year-old-not-sleeping-alone.html'),
('/articles/girls-let-us-watch-clouds.html'),
('/articles/graduation-day.html'),
('/articles/half-hour-of-summer.html'),
('/articles/hsp-energy-pitch-count.html'),
('/articles/hsp-not-overthinking.html'),
('/articles/hsu-jo-hsi-six-scoreless.html'),
('/articles/kids-first-baseball.html'),
('/articles/lean-muscle-happiness-strength.html'),
('/articles/midnight-asthma-wheezing-lesson.html'),
('/articles/mischievous-yahoo-kitten.html'),
('/articles/old-partner-nas.html'),
('/articles/picture-book-hand-courage.html'),
('/articles/pull-up-bar-swing-specialist.html'),
('/articles/rabbit-ama-yogurt-youtube.html'),
('/articles/rap-peak-2026-dragon-brother.html'),
('/articles/swimming.html'),
('/articles/temperature-of-now.html'),
('/articles/vision-care-journey.html'),
('/articles/vision-care.html'),
('/articles/vocus-20260518-01f9d924.html'),
('/articles/vocus-20260520-016d1a17.html'),
('/articles/vocus-20260524-0108460c.html'),
('/articles/vocus-20260524-01328b1b.html'),
('/articles/vocus-20260525-0189d299.html'),
('/articles/vocus-20260525-018a488a.html'),
('/articles/vocus-20260526-01da88b4.html'),
('/articles/vocus-20260526-01dd88f5.html'),
('/articles/vocus-20260526-01ee70a3.html'),
('/articles/vocus-20260526-01f66cd1.html'),
('/articles/vocus-20260527-01bd1501.html'),
('/articles/vocus-20260527-01dbeac4.html'),
('/articles/vocus-20260528-014bac7a.html'),
('/articles/vocus-20260528-01f27848.html'),
('/articles/vocus-20260530-01ed957d.html'),
('/articles/vocus-20260530-01ef727b.html'),
('/articles/vocus-20260602-0156381b.html'),
('/articles/vocus-20260603-0145ba13.html'),
('/articles/vocus-20260608-01c0b739.html'),
('/articles/vocus-20260613-01f74185.html'),
('/articles/vocus-20260615-01bd248c.html'),
('/articles/vocus-20260621-01865891.html'),
('/articles/vocus-20260708-01e42400.html'),
('/articles/vocus-20260711-01975ae2.html'),
('/articles/vocus-20260713-014990e4.html'),
('/articles/vocus-20260714-0156f6a3.html'),
('/articles/vocus-20260714-01fd0251.html'),
('/articles/vocus-20260715-011768d0.html'),
('/articles/vocus-20260715-01396ed9.html'),
('/articles/vocus-20260716-01b9a159.html'),
('/articles/vocus-20260717-01e08bfc.html'),
('/articles/vocus-20260717-01f4a3be.html'),
('/articles/vocus-20260718-01b3c510.html'),
('/articles/vocus-20260718-01e0c76d.html'),
('/articles/vocus-20260720-01404f6c.html'),
('/articles/vocus-20260720-019b648a.html'),
('/articles/vocus-20260721-013c4458.html'),
('/articles/vocus-20260721-0151d145.html'),
('/articles/vocus-20260722-018e56cf.html'),
('/articles/vocus-20260723-0102189e.html'),
('/articles/vocus-20260723-01e0aa17.html'),
('/articles/vocus-20260726-01086c84.html'),
('/articles/vocus-20260726-018033da.html'),
('/articles/vocus-20260727-016797df.html'),
('/articles/vocus-20260729-012d4763.html'),
('/articles/vocus-20260730-018e0198.html'),
('/articles/vocus-20260730-0194d8c5.html'),
('/articles/vocus-20260730-01c92b26.html'),
('/articles/vocus-20260731-01ed962e.html'),
('/articles/vocus-20260802-017ab88c.html'),
('/articles/vocus-20260803-01d22105.html'),
('/articles/vocus-20260803-01efffd3.html'),
('/articles/vocus-20260805-015e28db.html'),
('/articles/vocus-20260805-0168ecf0.html'),
('/articles/vocus-20260806-0199ec35.html'),
('/articles/vocus-20260807-010412d9.html'),
('/articles/vocus-20260810-01d66108.html'),
('/articles/vocus-20260810-01e19098.html'),
('/articles/vocus-20260811-013dee4b.html'),
('/articles/vocus-20260812-0129315b.html'),
('/articles/vocus-20260814-01c6611b.html'),
('/articles/vocus-20260814-01d619e8.html'),
('/articles/vocus-20260815-0119a0bb.html'),
('/articles/vocus-20260815-012f03c0.html'),
('/articles/vocus-20260816-0166ab30.html'),
('/articles/vocus-20260817-01b7acf2.html'),
('/articles/vocus-20260817-01bcfd9f.html'),
('/articles/vocus-20260817-01c4c38c.html'),
('/articles/vocus-20260818-010513a4.html'),
('/articles/vocus-20260819-014b709b.html'),
('/articles/vocus-20260819-015f0400.html'),
('/articles/vocus-20260819-01690f3a.html'),
('/articles/vocus-20260820-0198f9ec.html'),
('/articles/vocus-20260820-01ab503a.html'),
('/articles/vocus-20260821-01e52e6f.html'),
('/articles/vocus-20260821-01e9c0fc.html'),
('/articles/vocus-20260821-01f59ece.html'),
('/articles/vocus-20260825-010129c1.html'),
('/articles/vocus-20260825-01170bcc.html'),
('/articles/vocus-20260825-011d3dd7.html'),
('/articles/vocus-20260827-016ead43.html'),
('/articles/vocus-20260827-01753700.html'),
('/articles/vocus-20260828-01b4c027.html'),
('/articles/vocus-20260829-01e0ae3f.html'),
('/articles/vocus-20260829-01e7d771.html'),
('/articles/vocus-20260831-01756392.html'),
('/articles/vocus-20260901-01c32441.html'),
('/articles/vocus-20260902-0189853b.html'),
('/articles/vocus-20260904-01574c0b.html'),
('/articles/vocus-20260907-0141d98c.html'),
('/articles/vocus-20260907-015c94b3.html'),
('/articles/vocus-20260908-019f8af6.html'),
('/articles/vocus-20260909-01f2a4b1.html'),
('/articles/vocus-20260910-01ff2026.html'),
('/articles/vocus-20260911-01b3eb74.html'),
('/articles/vocus-20260914-01405379.html'),
('/articles/vocus-20260915-013f4896.html'),
('/articles/vocus-20260916-01b0b65a.html'),
('/articles/vocus-20260916-01b5a802.html'),
('/articles/vocus-20260917-01ede58c.html'),
('/articles/vocus-20260918-0102e2dc.html'),
('/articles/vocus-20260921-01013923.html'),
('/articles/vocus-20260921-01fb1884.html'),
('/articles/vocus-20260922-0160556c.html'),
('/articles/vocus-20260923-01efc149.html'),
('/articles/vocus-20260924-01603443.html'),
('/articles/vocus-20260924-0161491c.html'),
('/articles/vocus-20260924-016225db.html'),
('/articles/vocus-20260927-01409bcb.html'),
('/articles/vocus-20260928-01824712.html'),
('/articles/vocus-20260928-018416b8.html'),
('/articles/vocus-20260928-01899236.html'),
('/articles/vocus-20260928-01a215c2.html'),
('/articles/vocus-20260929-01149cbe.html'),
('/articles/vocus-20260930-019dac25.html'),
('/articles/vocus-20261001-0176e025.html'),
('/articles/vocus-20261003-01e74c76.html'),
('/articles/vocus-20261003-01ede4c1.html'),
('/articles/vocus-20261005-0193aff4.html'),
('/articles/vocus-20261006-01785257.html'),
('/articles/vocus-20261006-0181471c.html'),
('/articles/vocus-20261006-01932a79.html'),
('/articles/vocus-20261007-017a816f.html'),
('/articles/vocus-20261008-01fb5214.html'),
('/articles/vocus-20261013-0105deb6.html'),
('/articles/vocus-20261013-017b7eb4.html'),
('/articles/vocus-20261013-017ed7a7.html'),
('/articles/vocus-20261014-012f7621.html'),
('/articles/vocus-20261014-01332aa4.html'),
('/articles/vocus-20261014-013939b4.html'),
('/articles/vocus-20261014-018d54be.html'),
('/articles/vocus-20261014-018ef5c2.html'),
('/articles/vocus-20261014-019005e9.html'),
('/articles/vocus-20261015-01e40dab.html'),
('/articles/vocus-20261015-01e64f84.html'),
('/articles/vocus-20261019-012cd8dd.html'),
('/articles/vocus-20261019-012dc8a7.html'),
('/articles/vocus-20261019-012f4dbe.html'),
('/articles/vocus-20261019-01375941.html'),
('/articles/vocus-20261019-01389b9d.html'),
('/articles/vocus-20261019-013a13bd.html'),
('/articles/vocus-20261020-01a581e4.html'),
('/articles/vocus-20261020-01a72004.html'),
('/articles/vocus-20261020-01ac1776.html'),
('/articles/vocus-20261021-01cf4e92.html'),
('/articles/vocus-20261021-01d45002.html'),
('/articles/vocus-20261021-01d57717.html'),
('/articles/vocus-20261022-01084f77.html'),
('/articles/vocus-20261022-011480ba.html'),
('/articles/vocus-20261022-011a3a50.html'),
('/articles/vocus-20261026-01123537.html'),
('/articles/vocus-20261026-01ff647a.html'),
('/articles/vocus-20261027-018e4a1d.html'),
('/articles/vocus-20261029-01507525.html'),
('/articles/vocus-20261029-01c5ddb0.html'),
('/articles/vocus-20261029-01c7e957.html'),
('/articles/vocus-20261102-01b7d847.html'),
('/articles/vocus-20261102-01f61df1.html'),
('/articles/vocus-20261102-01fdfc06.html'),
('/articles/vocus-20261103-0115e145.html'),
('/articles/vocus-20261103-011a2773.html'),
('/articles/vocus-20261103-0120c0e8.html'),
('/articles/vocus-20261104-01520dc8.html'),
('/articles/vocus-20261105-016a6213.html'),
('/articles/vocus-20261105-016c57e5.html'),
('/articles/vocus-20261105-0175e775.html'),
('/articles/why-i-like-linghu-chong.html')
on conflict do nothing;

notify pgrst, 'reload schema';
commit;
