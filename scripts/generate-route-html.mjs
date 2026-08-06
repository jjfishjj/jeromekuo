import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://jeromekuo.vercel.app";
const metadata = JSON.parse(await readFile(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"));
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

for (const [route, page] of Object.entries(metadata)) {
  if (route === "/" || route === "/resume" || page.index === false) continue;
  const url = `${siteUrl}${route}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${description}$2`);
  await writeFile(new URL(`../dist/${route.slice(1)}.html`, import.meta.url), html);
}
