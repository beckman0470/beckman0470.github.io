import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def add_edge(edges, source, target, relation, weight=1):
    key = (source, target, relation)
    if key not in edges:
        edges[key] = {"source": source, "target": target, "relation": relation, "weight": 0}
    edges[key]["weight"] += weight

def build_knowledge_graph(stories):
    nodes = {}
    edges = {}

    def node(node_id, label, node_type, extra=None):
        if not node_id:
            return
        if node_id not in nodes:
            nodes[node_id] = {"id": node_id, "label": label, "type": node_type, "count": 0}
        nodes[node_id]["count"] += 1
        if extra:
            nodes[node_id].update(extra)

    for story in stories:
        sid = "story:" + str(story.get("id") or story.get("slug"))
        node(sid, story.get("title"), "story", {
            "url": story.get("url"),
            "date": story.get("date"),
            "summary": story.get("summary"),
        })

        series = story.get("series")
        if series:
            nid = "series:" + series
            node(nid, series, "series")
            add_edge(edges, sid, nid, "belongs_to", 3)

        category = story.get("category")
        if category:
            nid = "category:" + category
            node(nid, category, "category")
            add_edge(edges, sid, nid, "categorized_as", 2)

        for tag in story.get("tags", []):
            nid = "tag:" + tag
            node(nid, tag, "tag")
            add_edge(edges, sid, nid, "tagged_with", 2)

        for character in story.get("characters", []):
            nid = "character:" + character
            node(nid, character, "character")
            add_edge(edges, sid, nid, "features", 4)

        for topic in story.get("research", []):
            nid = "research:" + topic
            node(nid, topic, "research")
            add_edge(edges, sid, nid, "researches", 2)

    return {
        "nodes": list(nodes.values()),
        "edges": list(edges.values())
    }

def build_graph_from_stories_json(root=ROOT):
    root = Path(root)
    stories_path = root / "data" / "stories.json"
    if not stories_path.exists():
        raise FileNotFoundError("data/stories.json not found")

    stories = json.loads(stories_path.read_text(encoding="utf-8"))
    graph = build_knowledge_graph(stories)

    data_dir = root / "data"
    data_dir.mkdir(exist_ok=True)
    (data_dir / "knowledge-graph.json").write_text(
        json.dumps(graph, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    return graph

if __name__ == "__main__":
    graph = build_graph_from_stories_json()
    print("Knowledge graph generated.")
    print("Nodes:", len(graph["nodes"]))
    print("Edges:", len(graph["edges"]))
