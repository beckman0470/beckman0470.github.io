from pathlib import Path
import json, sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from cms.markdown import load_markdown_file
stories=[]
for md in sorted((ROOT/"content"/"stories").glob("*.md")):
    s=load_markdown_file(md); m=s["meta"]
    stories.append({"id":m.get("id"),"title":m.get("title"),"slug":m.get("slug"),"date":m.get("date"),"summary":m.get("summary"),"series":m.get("seriesTitle"),"category":m.get("categoryTitle"),"featured":m.get("featured",False),"hero":m.get("hero",False),"tags":m.get("tags",[]),"characters":m.get("characters",[]),"research":m.get("research",[]),"url":"articles/%s.html"%m.get("slug")})
stories.sort(key=lambda x:x["date"], reverse=True)
(ROOT/"data").mkdir(exist_ok=True)
(ROOT/"data"/"stories.json").write_text(json.dumps(stories,ensure_ascii=False,indent=2),encoding="utf-8")
print("Generated",len(stories),"stories")
