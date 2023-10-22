import Num2Persian from 'num2persian';

export const toEnDigit = (number: string) =>
  number && number.replace(/[٠-٩۰-۹]/g, (a) => String(a.charCodeAt(0) & 15));

export const removeCommas = (stringText: string) => stringText.split(',')?.join('');

export function splitAmount(stringText: string | number) {
  return removeCommas(stringText.toString()).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

export function currencyFormatter(value: string | number) {
  const numbered = Number(value);
  const stringed = String(value);

  if (numbered === 0) return '0 ريال';

  if (numbered < 3) return `${Num2Persian(stringed)} ریال`;

  return `${Num2Persian(stringed.replace(/.$/, ''))} تومان`;
}

export const calculateRatioPercent = (aspectRatio: string) => {
  const [ratioX, ratioY] = aspectRatio.split('/');
  return (+ratioY * 100) / +ratioX;
};
