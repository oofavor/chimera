export const parseCookie = (str: string): any =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce<any>((acc, v) => {
      if (decodeURIComponent(v[1]?.trim()) === 'undefined') return acc;
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1]?.trim());
      return acc;
    }, {});

export const encodeCookie = (obj: object) => {
  const str = Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('; ');
  return str;
};
