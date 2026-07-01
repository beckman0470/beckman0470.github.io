from pathlib import Path
import json
from studio.inventory import write_inventory

ROOT = Path(__file__).resolve().parents[1]

def build_dashboard_data():
    inventory = write_inventory(ROOT)
    data_dir = ROOT / "data"
    data_dir.mkdir(exist_ok=True)

    status_counts = {}
    for item in inventory:
        status = item.get("status", "draft")
        status_counts[status] = status_counts.get(status, 0) + 1

    dashboard = {
        "inventoryCount": len(inventory),
        "statusCounts": status_counts,
        "items": inventory,
    }

    (data_dir / "dashboard.json").write_text(
        json.dumps(dashboard, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    return dashboard

if __name__ == "__main__":
    result = build_dashboard_data()
    print("Dashboard data generated.")
    print("Items:", result["inventoryCount"])
