from math import ceil

def reading_time(text):
    words=len(text.split())
    return max(1, ceil(words/220))

def word_count(text):
    return len(text.split())

def build_summary(text, limit=160):
    t=" ".join(text.split())
    return t[:limit] + ("…" if len(t)>limit else "")

def build_keywords(meta,text):
    kws=list(dict.fromkeys(meta.get("tags",[])))
    for token in ["親子","健康","棒球","AI","雞爸爸"]:
        if token in text and token not in kws:
            kws.append(token)
    return kws[:8]

def quality_score(meta,text):
    score=60
    if meta.get("summary"): score+=8
    if meta.get("cover"): score+=5
    if meta.get("tags"): score+=7
    if len(text.split())>600: score+=10
    if meta.get("quote"): score+=5
    return min(score,100)

def enrich(meta,text):
    meta=dict(meta)
    meta["wordCount"]=word_count(text)
    meta["readingTime"]=reading_time(text)
    meta["aiSummary"]=build_summary(text)
    meta["aiDescription"]=meta.get("summary") or meta["aiSummary"]
    meta["aiKeywords"]=build_keywords(meta,text)
    meta["qualityScore"]=quality_score(meta,text)
    return meta
