// V7.2.1 Content Engine
// Static GitHub Pages friendly loader.

export async function loadContentIndex(basePath = "") {
  const response = await fetch(`${basePath}/content/content-index.json`);
  if (!response.ok) throw new Error("Cannot load content-index.json");
  return response.json();
}

export async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.json();
}

export async function loadText(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.text();
}

export async function loadWorks(basePath = "") {
  const index = await loadContentIndex(basePath);
  const works = await Promise.all(
    index.works.map((path) => loadJson(`${basePath}/${path}`))
  );
  return works;
}
