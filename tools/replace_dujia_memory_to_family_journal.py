#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ChickenDad Journal rename patch:
Replace all visible/source text occurrences of 「家庭誌」 with 「家庭誌」.

Usage:
  1. Put this script in the root of beckman0470.github.io repo.
  2. Run:
       python tools/replace_dujia_memory_to_family_journal.py
  3. Review the generated report:
       rename_dujia_to_family_journal_report.txt
  4. Commit and push changed files.

This script intentionally avoids binary files and common dependency/build folders.
"""

from pathlib import Path

OLD = "家庭誌"
NEW = "家庭誌"

ROOT = Path(__file__).resolve().parents[1]

TEXT_SUFFIXES = {
    ".html", ".htm", ".css", ".js", ".json", ".md", ".txt",
    ".xml", ".svg", ".webmanifest", ".py", ".yml", ".yaml"
}

SKIP_DIRS = {
    ".git", ".github", "node_modules", ".next", "dist", "build",
    "__pycache__", ".venv", "venv", ".idea", ".vscode"
}

# Keep image / binary / archives untouched.
SKIP_SUFFIXES = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf",
    ".zip", ".rar", ".7z", ".woff", ".woff2", ".ttf", ".otf",
    ".mp4", ".mov", ".mp3", ".wav"
}

changed = []
total_hits = 0

for path in sorted(ROOT.rglob("*")):
    if not path.is_file():
        continue

    rel_parts = set(path.relative_to(ROOT).parts)
    if rel_parts & SKIP_DIRS:
        continue

    if path.suffix.lower() in SKIP_SUFFIXES:
        continue

    # Handle files like site.webmanifest which may not have a normal suffix match
    if path.suffix.lower() not in TEXT_SUFFIXES and path.name != "site.webmanifest":
        continue

    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue

    count = text.count(OLD)
    if count == 0:
        continue

    path.write_text(text.replace(OLD, NEW), encoding="utf-8")
    changed.append((str(path.relative_to(ROOT)), count))
    total_hits += count

report_lines = [
    "ChickenDad Journal rename report",
    f"OLD: {OLD}",
    f"NEW: {NEW}",
    f"Total replacements: {total_hits}",
    "",
    "Changed files:",
]

if changed:
    for file, count in changed:
        report_lines.append(f"- {file}: {count}")
else:
    report_lines.append("- No occurrences found.")

report = "\n".join(report_lines) + "\n"
(ROOT / "rename_dujia_to_family_journal_report.txt").write_text(report, encoding="utf-8")
print(report)
