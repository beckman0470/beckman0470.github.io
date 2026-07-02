(() => {
  const STORAGE_KEY = "chickendad.homepage.design.v1";
  const IMAGE_KEY = "chickendad.homepage.hero.image.v1";

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

  function loadImage() {
    return localStorage.getItem(IMAGE_KEY);
  }

  function saveImage(dataUrl) {
    localStorage.setItem(IMAGE_KEY, dataUrl);
  }

  function clearImage() {
    localStorage.removeItem(IMAGE_KEY);
  }

  function applyImage() {
    const img = $(".brand-family-hero img");
    const stored = loadImage();
    if (img && stored) {
      img.src = stored;
      img.alt = "自訂首頁 Hero 圖片";
    }
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

    applyImage();
  }

  function createField(label, inputHtml) {
    return `<div class="design-field"><label>${label}</label>${inputHtml}</div>`;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file"));
      if (!/^image\/(png|jpeg|webp|svg\+xml)$/i.test(file.type)) {
        return reject(new Error("請選擇 JPG、PNG、WebP 或 SVG 圖片。"));
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("圖片讀取失敗。"));
      reader.readAsDataURL(file);
    });
  }

  async function handleFile(file, panel) {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      saveImage(dataUrl);
      applyImage();
      flash(panel, "圖片已套用。按「下載 index.html」匯出。");
    } catch (error) {
      flash(panel, error.message || "圖片上傳失敗。");
    }
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
        <h3>Hero 圖片</h3>
        <label class="image-drop-zone" data-drop-zone>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-image-upload>
          <strong>選擇圖片或拖曳到這裡</strong>
          JPG / PNG / WebP / SVG
        </label>
        <div class="design-mini-note">圖片會直接寫入匯出的 index.html，不需要另外上傳圖片檔。</div>
        ${createField("縮放", '<input data-design="imageScale" type="range" min="80" max="140" step="1">')}
        ${createField("左右", '<input data-design="imageX" type="range" min="0" max="100" step="1">')}
        ${createField("上下", '<input data-design="imageY" type="range" min="0" max="100" step="1">')}
        ${createField("圓角", '<input data-design="imageRadius" type="range" min="0" max="60" step="1">')}
        ${createField("陰影", '<select data-design="imageShadow"><option value="1">開</option><option value="0">關</option></select>')}
      </section>

      <div class="design-panel-actions">
        <button type="button" class="primary" data-action="download">下載 index.html</button>
        <button type="button" data-action="save">暫存</button>
        <button type="button" data-action="reset-design">還原樣式</button>
        <button type="button" data-action="reset-image">恢復預設圖</button>
        <button type="button" class="dark" data-action="close">關閉</button>
      </div>

      <div class="design-panel-output">已更新。</div>
    `;

    document.body.appendChild(panel);

    let data = loadDesign();
    bindInputs(panel, data);
    applyDesign(data);

    const fileInput = panel.querySelector("[data-image-upload]");
    const dropZone = panel.querySelector("[data-drop-zone]");

    fileInput.addEventListener("change", (event) => {
      handleFile(event.target.files?.[0], panel);
      event.target.value = "";
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add("dragging");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.remove("dragging");
      });
    });

    dropZone.addEventListener("drop", (event) => {
      handleFile(event.dataTransfer.files?.[0], panel);
    });

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

      if (action === "reset-design") {
        localStorage.removeItem(STORAGE_KEY);
        data = { ...DEFAULTS };
        bindInputs(panel, data);
        applyDesign(data);
        flash(panel, "樣式已還原。");
      }

      if (action === "reset-image") {
        clearImage();
        const img = $(".brand-family-hero img");
        if (img) {
          img.src = "./images/hero-family.svg";
          img.alt = "雞爸爸一家品牌插畫";
        }
        flash(panel, "已恢復預設圖。");
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
    setTimeout(() => (box.style.display = "none"), 1800);
  }

  function cleanForExport() {
    applyImage();
    const clone = document.documentElement.cloneNode(true);

    clone.querySelectorAll(".design-panel, .design-panel-toggle, .editor-toolbar, .editor-hint, .editor-launcher").forEach((node) => node.remove());
    clone.querySelectorAll("[contenteditable]").forEach((node) => {
      node.removeAttribute("contenteditable");
      node.removeAttribute("spellcheck");
    });
    clone.querySelectorAll("[data-editable]").forEach((node) => {
      node.removeAttribute("data-editable");
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
