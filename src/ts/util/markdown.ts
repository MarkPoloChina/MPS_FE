import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import markedKatex, { type MarkedKatexOptions } from "marked-katex-extension";
import { baseUrl } from "marked-base-url";
import {
  getHeadingList,
  gfmHeadingId,
  resetHeadings,
} from "marked-gfm-heading-id";
import "highlight.js/styles/vs2015.min.css";
import "katex/dist/katex.min.css";

import "github-markdown-css/github-markdown-light.css";
import "@/scss/marked.scss";

const katexOptions: MarkedKatexOptions = {
  throwOnError: false,
  displayMode: true,
  output: "html",
  nonStandard: true,
};

marked.use(
  {
    async: true,
    pedantic: false,
    gfm: true,
    breaks: true,
  },
  markedKatex(katexOptions),
);
marked.use(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      try {
        const preCode = hljs.highlight(code, { language }).value;
        const lines = preCode.split(/\n/);
        const htmlList = [];
        if (lines.length && lang) {
          htmlList.push(`<b class="lang-name">${lang}</b>`);
        }
        htmlList.push("<ol>");
        htmlList.push(
          ...lines.map((item, index) => {
            return `<li><span class="line-num" data-line="${index + 1}"></span>${item}</li>`;
          }),
        );
        htmlList.push("</ol>");
        return htmlList.join("");
      } catch {
        return "";
      }
    },
  }),
);
marked.use(
  gfmHeadingId({
    prefix: "mps-",
  }),
);

const getTOCHtml = () => {
  const headingList = getHeadingList();
  resetHeadings();
  if (!headingList || headingList.length === 0) {
    return `<ul id="table-of-contents"></ul>`;
  }

  const startLevel = headingList[0].level;
  let html = `<ul id="table-of-contents">`;
  let currentLevel = startLevel;
  let first = true;

  for (const { id, raw, level } of headingList) {
    const lvl = Math.max(1, level || startLevel);

    if (lvl > currentLevel) {
      for (let i = currentLevel; i < lvl; i++) html += "<ul>";
      html += `<li><span class="h${lvl}" data-id="${id}">${raw}</span>`;
      currentLevel = lvl;
    } else if (lvl === currentLevel) {
      if (!first) html += "</li>";
      html += `<li><span class="h${lvl}" data-id="${id}">${raw}</span>`;
    } else {
      for (let i = currentLevel; i > lvl; i--) html += "</li></ul>";
      html += "</li>";
      html += `<li><span class="h${lvl}" data-id="${id}">${raw}</span>`;
      currentLevel = lvl;
    }

    first = false;
  }

  while (currentLevel > startLevel) {
    html += "</li></ul>";
    currentLevel--;
  }
  html += "</li></ul>";

  return html;
};

const render = async (mdRaw: string, target: string) => {
  const baseDir = target.split("/").slice(0, -1).join("/");

  marked.use(baseUrl(import.meta.env.VITE_BASE_BLOGS_URL + baseDir + "/"));
  return await marked.parse(mdRaw.replace(/^---\n[\s\S]*?\n---\n?/, ""));
};

export { render, getTOCHtml };
