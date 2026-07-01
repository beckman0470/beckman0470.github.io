from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from engine.engine import ContentEngine

def optional_step(label, fn):
    try:
        print(label + "...")
        fn()
    except Exception as e:
        print(f"WARN: {label} skipped: {e}")

def main():
    print("Chicken Dad Journal Production Platform v5.0")
    print("Preparing...")

    engine = ContentEngine(ROOT)

    print("Building content engine...")
    result = engine.build()

    print(f"Stories: {result['stories']}")

    if result.get("warnings"):
        print("\nWarnings:")
        for warning in result["warnings"]:
            print(" -", warning)

    if not result["ok"]:
        print("\nErrors:")
        for error in result["errors"]:
            print(" -", error)
        raise SystemExit(1)

    def build_inventory():
        from studio.inventory import write_inventory
        write_inventory(ROOT)

    def build_dashboard():
        from studio.dashboard import build_dashboard_data
        build_dashboard_data()

    optional_step("Building content inventory", build_inventory)
    optional_step("Building dashboard data", build_dashboard)

    print("\nGenerated:")
    for item in result["generated"]:
        print(" -", item)
    print(" - data/content-inventory.json")
    print(" - data/dashboard.json")
    print("\nDone.")

if __name__ == "__main__":
    main()
