RULES={
"story":"第一人稱故事",
"warm":"溫暖陪伴",
"science":"適度引用科學或數據",
"reflection":"結尾反思"
}

def analyze(text):
    score=0
    report={}
    report["story"]="我" in text
    report["warm"]=any(x in text for x in ["孩子","陪伴","幸福","家人"])
    report["science"]=any(x in text for x in ["研究","數據","科學"])
    report["reflection"]=any(x in text for x in ["我想","因此","最後","也許"])
    score=sum(report.values())*25
    return {"score":score,"checks":report}
