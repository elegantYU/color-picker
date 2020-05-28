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

const convertRgbToHsv = (rgb) => {
  let [r, g, b] = splitRgb(rgb);

  r = r / 255;
  g = g / 255;
  b = b / 255;
  let h, s, v;
  const min = Math.min(r, g, b);
  const max = (v = Math.max(r, g, b));
  const difference = max - min;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;
      case g:
        h = 2.0 + (b - r) / difference;
        break;
      case b:
        h = 4.0 + (r - g) / difference;
        break;
    }
    h = Math.round(h * 60);
  }
  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }
  s = Math.round(s * 100);
  v = Math.round(v * 100);

  return `hsv(${h},${s},${v})`;
};

export { convertRgbToHex, convertRgbToHsl, convertRgbToHsv };
