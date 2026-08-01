/**
 * Load a Google font in a Satori-compatible format (ttf/otf/woff — NOT woff2).
 * We request with an old User-Agent so the CSS returns a legacy font URL.
 */
export async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}
