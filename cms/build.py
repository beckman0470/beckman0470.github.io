"""
Chicken Dad Journal CMS Build
v2.1

使用方式：
在專案根目錄執行：

python cms/build.py

輸出：
- data/stories.json
- articles/{slug}.html
"""

from pathlib import Path
import sys

CURRENT = Path(__file__).resolve()
PROJECT_ROOT = CURRENT.parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from cms.generator import build_site

if __name__ == "__main__":
    result = build_site(PROJECT_ROOT)

    print("Chicken Dad CMS Build Complete")
    print(f"Stories generated: {result['stories']}")

    if result["errors"]:
        print("Errors:")
        for error in result["errors"]:
            print(" -", error)
        raise SystemExit(1)
