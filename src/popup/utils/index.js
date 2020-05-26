// 颜色转换代码

const splitRgb = (rgb) => {
  const reg = /\(.*\)/g;
  return reg.exec(rgb)[0].replace(/\(|\)/g, "").split(",");
};

const convertRgbToHex = (rgb) => {
  const colors = splitRgb(rgb);

  return colors
    .reduce((last, curr) => {
      const string16 = Number(curr).toString(16);
      const hex = string16.length === 1 ? `0${string16}` : string16;
      return last + hex;
    }, "#")
    .toUpperCase();
};

const convertRgbToHsl = (rgb) => {
  let [r, g, b] = splitRgb(rgb);
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h},${s},${l})`;
};

export { convertRgbToHex, convertRgbToHsl };
