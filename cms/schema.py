REQUIRED_FIELDS=["id","title","slug","date","seriesTitle","categoryTitle","characters","tags","readingTime","summary"]
def validate_story(meta, source=""):
    return [f"{source}: missing {f}" for f in REQUIRED_FIELDS if not meta.get(f)]
