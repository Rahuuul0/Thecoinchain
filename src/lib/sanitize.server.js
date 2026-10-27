import sanitizeHtml from "sanitize-html";
import { IMAGE_URL } from "./content";

// CMS media paths are root-relative to the API host.
const absolutize = (src) => {
  const value = src?.trim();
  if (!value || !IMAGE_URL || !value.startsWith("/") || value.startsWith("//")) return src;
  return `${IMAGE_URL}${value}`;
};

const withAbsoluteSrc = (tagName, attribs) => ({
  tagName,
  attribs: attribs.src ? { ...attribs, src: absolutize(attribs.src) } : attribs,
});

const OPTIONS = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "iframe", "video", "source", "span", "h1", "h2", "figure", "figcaption", "u", "s"],
  allowedAttributes: {
    "*": ["style", "class", "dir", "title", "id", "width", "height", "align"],
    a: ["href", "name", "target", "rel"],
    img: ["src", "srcset", "sizes", "alt", "loading"],
    iframe: ["src", "allow", "allowfullscreen", "frameborder", "scrolling"],
    video: ["src", "controls", "poster", "autoplay", "muted", "loop", "playsinline"],
    source: ["src", "type"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel", "data"],
  allowedSchemesByTag: { img: ["http", "https", "data"] },
  transformTags: { img: withAbsoluteSrc, video: withAbsoluteSrc, source: withAbsoluteSrc },
};

/** Sanitizes CMS article HTML and makes media URLs absolute. */
export function sanitizeArticleHtml(html = "") {
  return sanitizeHtml(html, OPTIONS);
}
