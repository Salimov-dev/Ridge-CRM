export const removeSpacesAndConvertToNumber = (str: string) => {
  if (str === null || typeof str !== "string") {
    return null;
  }

  const numberWithoutSpaces = Number(str.replace(/\s/g, ""));

  return isNaN(numberWithoutSpaces) || numberWithoutSpaces === 0
    ? null
    : numberWithoutSpaces;
};
