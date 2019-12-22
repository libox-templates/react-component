type ClassnamesParam =
  | string
  | (string | undefined | null)[]
  | { [key: string]: boolean };

export const classnames = (data: ClassnamesParam) => {
  if (typeof data === "string") return data.trim();

  if (Array.isArray(data)) {
    return data.filter((item) => Boolean(item)).join(" ");
  }

  return Object.keys(data).reduce((acc, key, index) => {
    if (key && data[key]) {
      acc += index ? ` ${key}` : key;
    }

    return acc;
  }, "");
};
