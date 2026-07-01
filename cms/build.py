from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from engine.engine import ContentEngine

def main():
    engine = ContentEngine(ROOT)
    result = engine.build()

    print("Chicken Dad Journal Content Engine v4.1")
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

    print("\nGenerated:")
    for item in result["generated"]:
        print(" -", item)

if __name__ == "__main__":
    main()
