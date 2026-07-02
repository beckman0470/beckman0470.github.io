(() => {
  const STORAGE_KEY = "chickendad.homepage.editable.v1";
  const enabledByUrl = new URLSearchParams(location.search).get("edit") === "1";

  function getEditableNodes() {
    return Array.from(document.querySelectorAll("[data-editable]"));
  }

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveState() {
    const data = {};
    getEditableNodes().forEach((node) => data[node.dataset.editable] = node.innerHTML);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function applyState() {
    const data = loadState();
    getEditableNodes().forEach((node) => {
      const key = node.dataset.editable;
      if (data[key]) node.innerHTML = data[key];
    });
  }

  function setEditing(enabled) {
    document.body.classList.toggle("editor-enabled", enabled);
    getEditableNodes().forEach((node) => {
      node.contentEditable = enabled ? "true" : "false";
      node.spellcheck = false;
    });
  }

  function cleanForExport() {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll("[contenteditable]").forEach((node) => {
      node.removeAttribute("contenteditable");
      node.removeAttribute("spellcheck");
    });
    clone.querySelectorAll(".editor-toolbar, .editor-hint, .editor-launcher").forEach((node) => node.remove());
    return "<!DOCTYPE html>\n" + clone.outerHTML;
  }

  function downloadIndexHtml() {
    saveState();
    const blob = new Blob([cleanForExport()], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function createEditor() {
    if (!getEditableNodes().length) return;

    const launcher = document.createElement("button");
    launcher.className = "editor-launcher";
    launcher.type = "button";
    launcher.textContent = "編輯首頁";
    document.body.appendChild(launcher);

    const hint = document.createElement("div");
    hint.className = "editor-hint";
    hint.innerHTML = "點選首頁標題與副標即可修改。完成後按「下載 index.html」，再上傳覆蓋 GitHub。";
    document.body.appendChild(hint);

    const bar = document.createElement("div");
    bar.className = "editor-toolbar";
    bar.innerHTML = `
      <button type="button" class="primary" data-action="download">下載 index.html</button>
      <button type="button" data-action="save">暫存</button>
      <button type="button" data-action="reset">還原</button>
      <button type="button" data-action="close">關閉</button>
    `;
    document.body.appendChild(bar);

    launcher.addEventListener("click", () => setEditing(true));

    bar.addEventListener("click", (event) => {
      const action = event.target?.dataset?.action;
      if (!action) return;
      if (action === "download") downloadIndexHtml();
      if (action === "save") {
        saveState();
        event.target.textContent = "已暫存";
        setTimeout(() => event.target.textContent = "暫存", 1200);
      }
      if (action === "reset") resetState();
      if (action === "close") setEditing(false);
    });

    getEditableNodes().forEach((node) => {
      node.addEventListener("input", saveState);
    });

    if (enabledByUrl) setEditing(true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyState();
    createEditor();
  });
})();
