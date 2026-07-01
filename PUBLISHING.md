from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

def run(cmd):
    print("$", " ".join(cmd))
    result = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    if result.returncode != 0:
        raise SystemExit(result.returncode)

def build():
    run([sys.executable, "cms/build.py"])

def qa():
    qa_script = ROOT / "tools" / "qa_check.py"
    if qa_script.exists():
        run([sys.executable, "tools/qa_check.py"])
    else:
        print("QA skipped: tools/qa_check.py not found")

def git_status():
    run(["git", "status", "--short"])

def commit(message="Publish Chicken Dad Journal"):
    run(["git", "add", "."])
    run(["git", "commit", "-m", message])

def push():
    run(["git", "push"])

def publish(message="Publish Chicken Dad Journal", push_to_remote=False):
    build()
    qa()
    git_status()
    commit(message)
    if push_to_remote:
        push()

if __name__ == "__main__":
    msg = "Publish Chicken Dad Journal"
    if len(sys.argv) > 1:
        msg = " ".join(sys.argv[1:])
    publish(msg, push_to_remote=False)
