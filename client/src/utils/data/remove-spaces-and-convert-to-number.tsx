export const removeSpacesAndConvertToNumber = (str) => {
  // Проверяем, что str не является null и является строкой
  if (str === null || typeof str !== "string") {
    return null;
  }

  // Убираем все пробелы из строки и преобразуем в число
  const numberWithoutSpaces = Number(str.replace(/\s/g, ""));

  return isNaN(numberWithoutSpaces)
    ? null
    : numberWithoutSpaces === 0
    ? null
    : numberWithoutSpaces;
};
