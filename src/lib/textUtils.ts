/**
 * Utility functions for HTML text processing and entity decoding.
 */

const NAMED_ENTITIES: Record<string, string> = {
  // Common XML / HTML essentials
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",

  // Typography & punctuation
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  hellip: "…",
  bull: "•",
  middot: "·",
  lsaquo: "‹",
  rsaquo: "›",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",

  // Symbols & Currency
  copy: "©",
  reg: "®",
  trade: "™",
  deg: "°",
  plusmn: "±",
  times: "×",
  divide: "÷",
  micro: "µ",
  para: "¶",
  sect: "§",
  laquo: "«",
  raquo: "»",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  euro: "€",
  iexcl: "¡",
  iquest: "¿",
  brvbar: "¦",
  uml: "¨",
  ordf: "ª",
  ordm: "º",
  not: "¬",
  shy: "",
  macr: "¯",
  sup1: "¹",
  sup2: "²",
  sup3: "³",
  acute: "´",
  cedil: "¸",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",

  // Latin / Accented letters (Crucial for Vietnamese & multilingual rich text)
  Agrave: "À",
  agrave: "à",
  Aacute: "Á",
  aacute: "á",
  Acirc: "Â",
  acirc: "â",
  Atilde: "Ã",
  atilde: "ã",
  Auml: "Ä",
  auml: "ä",
  Aring: "Å",
  aring: "å",
  AElig: "Æ",
  aelig: "æ",
  Ccedil: "Ç",
  ccedil: "ç",
  Egrave: "È",
  egrave: "è",
  Eacute: "É",
  eacute: "é",
  Ecirc: "Ê",
  ecirc: "ê",
  Euml: "Ë",
  euml: "ë",
  Igrave: "Ì",
  igrave: "ì",
  Iacute: "Í",
  iacute: "í",
  Icirc: "Î",
  icirc: "î",
  Iuml: "Ï",
  iuml: "ï",
  ETH: "Ð",
  eth: "ð",
  Ntilde: "Ñ",
  ntilde: "ñ",
  Ograve: "Ò",
  ograve: "ò",
  Oacute: "Ó",
  oacute: "ó",
  Ocirc: "Ô",
  ocirc: "ô",
  Otilde: "Õ",
  otilde: "õ",
  Ouml: "Ö",
  ouml: "ö",
  Oslash: "Ø",
  oslash: "ø",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  szlig: "ß",
  Ugrave: "Ù",
  ugrave: "ù",
  Uacute: "Ú",
  uacute: "ú",
  Ucirc: "Û",
  ucirc: "û",
  Uuml: "Ü",
  uuml: "ü",
  Yacute: "Ý",
  yacute: "ý",
  Yuml: "Ÿ",
  yuml: "ÿ",
  THORN: "Þ",
  thorn: "þ",

  // Math & Logic
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",

  // Arrows
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",

  // Misc
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  loz: "◊",
};

/**
 * Decodes all HTML entities (named entities like &Yacute;, decimal &#7843;, hex &#x1EA3;)
 */
export function decodeHtmlEntities(str?: string | null): string {
  if (!str) return "";

  let result = str;

  // Run up to 2 passes to handle nested/double encoded entities (e.g. &amp;Yacute;)
  for (let pass = 0; pass < 2; pass++) {
    const next = result.replace(
      /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[xX][0-9a-fA-F]{1,6});/g,
      (match, entity) => {
        // Hexadecimal entity &#x...;
        if (entity.startsWith("#x") || entity.startsWith("#X")) {
          const code = parseInt(entity.slice(2), 16);
          return !isNaN(code) && code > 0 ? String.fromCodePoint(code) : match;
        }
        // Decimal entity &#...;
        if (entity.startsWith("#")) {
          const code = parseInt(entity.slice(1), 10);
          return !isNaN(code) && code > 0 ? String.fromCodePoint(code) : match;
        }
        // Named entity
        if (Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity)) {
          return NAMED_ENTITIES[entity];
        }
        return match;
      }
    );

    if (next === result) break;
    result = next;
  }

  return result;
}

/**
 * Strips HTML tags, cleans extra whitespace, and decodes HTML entities into clean readable text.
 */
export function stripHtml(html?: string | null): string {
  if (!html) return "";

  // 1. Remove style and script tags with their inner contents
  let cleaned = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ");

  // 2. Replace line-breaking elements with a space before stripping
  cleaned = cleaned.replace(/<(br|p|div|li|tr|h[1-6])[^>]*>/gi, " ");

  // 3. Remove all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, " ");

  // 4. Decode all HTML entities
  cleaned = decodeHtmlEntities(cleaned);

  // 5. Normalize multiple whitespace and trim
  return cleaned.replace(/\s+/g, " ").trim();
}
