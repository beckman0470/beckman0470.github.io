(() => {
  const STORAGE_KEY = "chickendad.homepage.design.v1";

  const DEFAULTS = {
    titleSize: 68,
    titleColor: "#263328",
    titleWeight: 950,
    titleLineHeight: 1.08,
    subtitleSize: 32,
    subtitleColor: "#A67C52",
    subtitleWeight: 950,
    subtitleLineHeight: 1.42,
    imageScale: 100,
    imageX: 50,
    imageY: 50,
    imageRadius: 42,
    imageShadow: 1
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function loadDesign() {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function saveDesign(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function applyDesign(data) {
    const title = $(".hero-title-editable");
    const subtitle = $(".hero-subtitle-editable");
    const hero = $(".brand-family-hero");
    const img = $(".brand-family-hero img");

    if (title) {
      title.style.fontSize = `${data.titleSize}px`;
      title.style.color = data.titleColor;
      title.style.fontWeight = data.titleWeight;
      title.style.lineHeight = data.titleLineHeight;
    }

    if (subtitle) {
      subtitle.style.fontSize = `${data.subtitleSize}px`;
      subtitle.style.color = data.subtitleColor;
      subtitle.style.fontWeight = data.subtitleWeight;
      subtitle.style.lineHeight = data.subtitleLineHeight;
    }

    if (hero) {
      hero.style.borderRadius = `${data.imageRadius}px`;
      hero.style.boxShadow = Number(data.imageShadow)
        ? "0 24px 60px rgba(70,55,35,.12)"
        : "none";
    }

    if (img) {
      img.style.objectPosition = `${data.imageX}% ${data.imageY}%`;
      img.style.transform = `scale(${data.imageScale / 100})`;
    }
  }

  function createField(label, inputHtml) {
    return `<div class="design-field"><label>${label}</label>${inputHtml}</div>`;
  }

  function createPanel() {
    if (!$(".cdj-home-hero")) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "design-panel-toggle";
    toggle.textContent = "設計";
    document.body.appendChild(toggle);

    const panel = document.createElement("aside");
    panel.className = "design-panel";
    panel.innerHTML = `
      <header>
        <h2>Hero 設計</h2>
        <p>即時預覽。完成後可下載 index.html 覆蓋 GitHub。</p>
      </header>

      <section class="design-panel-section">
        <h3>標題</h3>
        ${createField("大小", '<input data-design="titleSize" type="range" min="36" max="96" step="1">')}
        ${createField("顏色", '<input data-design="titleColor" type="color">')}
        ${createField("字重", '<input data-design="titleWeight" type="range" min="400" max="1000" step="50">')}
        ${createField("行高", '<input data-design="titleLineHeight" type="range" min="0.9" max="1.5" step="0.01">')}
      </section>

      <section class="design-panel-section">
        <h3>副標</h3>
        ${createField("大小", '<input data-design="subtitleSize" type="range" min="18" max="48" step="1">')}
        ${createField("顏色", '<input data-design="subtitleColor" type="color">')}
        ${createField("字重", '<input data-design="subtitleWeight" type="range" min="400" max="1000" step="50">')}
        ${createField("行高", '<input data-design="subtitleLineHeight" type="range" min="1" max="1.8" step="0.01">')}
      </section>

      <section class="design-panel-section">
        <h3>圖片</h3>
        ${createField("縮放", '<input data-design="imageScale" type="range" min="80" max="140" step="1">')}
        ${createField("左右", '<input data-design="imageX" type="range" min="0" max="100" step="1">')}
        ${createField("上下", '<input data-design="imageY" type="range" min="0" max="100" step="1">')}
        ${createField("圓角", '<input data-design="imageRadius" type="range" min="0" max="60" step="1">')}
        ${createField("陰影", '<select data-design="imageShadow"><option value="1">開</option><option value="0">關</option></select>')}
      </section>

      <div class="design-panel-actions">
        <button type="button" class="primary" data-action="download">下載 index.html</button>
        <button type="button" data-action="save">暫存</button>
        <button type="button" data-action="reset">還原</button>
        <button type="button" class="dark" data-action="close">關閉</button>
      </div>

      <div class="design-panel-output">已更新。</div>
    `;

    document.body.appendChild(panel);

    let data = loadDesign();
    bindInputs(panel, data);
    applyDesign(data);

    toggle.addEventListener("click", () => {
      document.body.classList.add("design-panel-open", "design-mode");
    });

    panel.addEventListener("click", (event) => {
      const action = event.target?.dataset?.action;
      if (!action) return;

      if (action === "close") {
        document.body.classList.remove("design-panel-open", "design-mode");
      }

      if (action === "save") {
        saveDesign(data);
        flash(panel, "已暫存。");
      }

      if (action === "reset") {
        localStorage.removeItem(STORAGE_KEY);
        data = { ...DEFAULTS };
        bindInputs(panel, data);
        applyDesign(data);
        flash(panel, "已還原。");
      }

      if (action === "download") {
        saveDesign(data);
        downloadIndex();
      }
    });
  }

  function bindInputs(panel, data) {
    panel.querySelectorAll("[data-design]").forEach((input) => {
      const key = input.dataset.design;
      input.value = data[key];

      input.oninput = () => {
        const value = input.type === "range" ? Number(input.value) : input.value;
        data[key] = value;
        applyDesign(data);
        saveDesign(data);
      };

      input.onchange = input.oninput;
    });
  }

  function flash(panel, message) {
    const box = panel.querySelector(".design-panel-output");
    box.textContent = message;
    box.style.display = "block";
    setTimeout(() => (box.style.display = "none"), 1600);
  }

  function cleanForExport() {
    const clone = document.documentElement.cloneNode(true);

    clone.querySelectorAll(".design-panel, .design-panel-toggle, .editor-toolbar, .editor-hint, .editor-launcher").forEach((node) => node.remove());
    clone.querySelectorAll("[contenteditable]").forEach((node) => {
      node.removeAttribute("contenteditable");
      node.removeAttribute("spellcheck");
    });

    clone.querySelectorAll(".hero-title-editable, .hero-subtitle-editable, .brand-family-hero, .brand-family-hero img").forEach((node) => {
      // Keep inline styles because they are the design output.
    });

    return "<!DOCTYPE html>\n" + clone.outerHTML;
  }

  function downloadIndex() {
    const blob = new Blob([cleanForExport()], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  document.addEventListener("DOMContentLoaded", createPanel);
})();
