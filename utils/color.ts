export function parseHex(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  return hex;
}

export function getContrastColor(
  hexcolor: string,
  threshold: number = 200
): string {
  const formattedHex = parseHex(hexcolor).replace("#", "");
  const r = parseInt(formattedHex.substr(0, 2), 16);
  const g = parseInt(formattedHex.substr(2, 2), 16);
  const b = parseInt(formattedHex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= threshold ? "#333333" : "#f2f1f6";
}
