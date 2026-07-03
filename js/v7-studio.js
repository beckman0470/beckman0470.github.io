(() => {
  const DESIGN_KEY = "chickendad.v7.design";
  const IMAGE_KEY = "chickendad.v7.hero.image";

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

  const $ = (s) => document.querySelector(s);

  function loadDesign() {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(DESIGN_KEY) || "{}") }; }
    catch { return { ...DEFAULTS }; }
  }

  function saveDesign(data) {
    localStorage.setItem(DESIGN_KEY, JSON.stringify(data));
  }

  function saveImage(src) {
    localStorage.setItem(IMAGE_KEY, src);
  }

  function loadImage() {
    return localStorage.getItem(IMAGE_KEY);
  }

  function apply(data) {
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
      hero.style.boxShadow = Number(data.imageShadow) ? "0 24px 60px rgba(70,55,35,.12)" : "none";
    }

    if (img) {
      const custom = loadImage();
      if (custom) img.src = custom;
      img.style.objectPosition = `${data.imageX}% ${data.imageY}%`;
      img.style.transform = `scale(${data.imageScale / 100})`;
    }
  }

  function field(label, html) {
    return `<div class="studio-field"><label>${label}</label>${html}</div>`;
  }

  function readImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("沒有選擇圖片"));
      if (!/^image\/(png|jpeg|webp|svg\+xml)$/i.test(file.type)) {
        return reject(new Error("請選擇 JPG、PNG、WebP 或 SVG"));
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("圖片讀取失敗"));
      reader.readAsDataURL(file);
    });
  }

  function cleanExport() {
    apply(loadDesign());
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll(".studio-toggle,.studio-panel").forEach(n => n.remove());
    clone.querySelectorAll("[contenteditable]").forEach(n => {
      n.removeAttribute("contenteditable");
      n.removeAttribute("spellcheck");
    });
    return "<!DOCTYPE html>\n" + clone.outerHTML;
  }

  function downloadIndex() {
    const blob = new Blob([cleanExport()], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  function init() {
    if (!$(".cdj-home-hero")) return;

    let data = loadDesign();
    apply(data);

    const toggle = document.createElement("button");
    toggle.className = "studio-toggle";
    toggle.type = "button";
    toggle.textContent = "Studio";
    document.body.appendChild(toggle);

    const panel = document.createElement("aside");
    panel.className = "studio-panel";
    panel.innerHTML = `
      <header><h2>Chicken Dad Studio</h2></header>

      <section class="studio-section">
        <h3>文字</h3>
        ${field("標題大小", '<input data-design="titleSize" type="range" min="36" max="96">')}
        ${field("標題顏色", '<input data-design="titleColor" type="color">')}
        ${field("標題字重", '<input data-design="titleWeight" type="range" min="400" max="1000" step="50">')}
        ${field("副標大小", '<input data-design="subtitleSize" type="range" min="18" max="48">')}
        ${field("副標顏色", '<input data-design="subtitleColor" type="color">')}
      </section>

      <section class="studio-section">
        <h3>Hero 圖片</h3>
        <label class="image-drop-zone" data-drop-zone>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-image-upload>
          <strong>選擇圖片或拖曳到這裡</strong>
          JPG / PNG / WebP / SVG
        </label>
        ${field("縮放", '<input data-design="imageScale" type="range" min="80" max="150">')}
        ${field("左右", '<input data-design="imageX" type="range" min="0" max="100">')}
        ${field("上下", '<input data-design="imageY" type="range" min="0" max="100">')}
        ${field("圓角", '<input data-design="imageRadius" type="range" min="0" max="60">')}
        ${field("陰影", '<select data-design="imageShadow"><option value="1">開</option><option value="0">關</option></select>')}
      </section>

      <div class="studio-actions">
        <button class="primary" data-action="download">下載 index.html</button>
        <button data-action="edit">編輯文字</button>
        <button data-action="reset-image">恢復預設圖</button>
        <button class="dark" data-action="close">關閉</button>
      </div>
    `;
    document.body.appendChild(panel);

    panel.querySelectorAll("[data-design]").forEach(input => {
      const key = input.dataset.design;
      input.value = data[key];
      input.oninput = () => {
        data[key] = input.type === "range" ? Number(input.value) : input.value;
        saveDesign(data);
        apply(data);
      };
      input.onchange = input.oninput;
    });

    const drop = panel.querySelector("[data-drop-zone]");
    const file = panel.querySelector("[data-image-upload]");

    async function useFile(f) {
      const src = await readImage(f);
      saveImage(src);
      apply(data);
    }

    file.addEventListener("change", e => {
      useFile(e.target.files[0]).catch(alert);
      e.target.value = "";
    });

    ["dragenter","dragover"].forEach(type => drop.addEventListener(type, e => {
      e.preventDefault();
      drop.classList.add("dragging");
    }));

    ["dragleave","drop"].forEach(type => drop.addEventListener(type, e => {
      e.preventDefault();
      drop.classList.remove("dragging");
    }));

    drop.addEventListener("drop", e => useFile(e.dataTransfer.files[0]).catch(alert));

    toggle.onclick = () => {
      document.body.classList.add("studio-open", "studio-editing");
      document.querySelectorAll("[data-editable]").forEach(n => {
        n.contentEditable = "true";
        n.spellcheck = false;
      });
    };

    panel.onclick = e => {
      const action = e.target.dataset.action;
      if (!action) return;

      if (action === "close") {
        document.body.classList.remove("studio-open", "studio-editing");
      }

      if (action === "download") downloadIndex();

      if (action === "reset-image") {
        localStorage.removeItem(IMAGE_KEY);
        const img = $(".brand-family-hero img");
        if (img) img.src = "./images/hero-family.svg";
      }

      if (action === "edit") {
        document.querySelectorAll("[data-editable]").forEach(n => n.focus());
      }
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
