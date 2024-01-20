export const removeSpacesAndConvertToNumber = (str) => {
  // Проверяем, что str не является null и является строкой
  if (str === null || typeof str !== "string") {
    console.error("Input is not a valid string");
    return null; // или возвращайте, что нужно в вашем случае
  }

  // Убираем все пробелы из строки и преобразуем в число
  const numberWithoutSpaces = Number(str.replace(/\s/g, ""));

  return isNaN(numberWithoutSpaces) ? null : numberWithoutSpaces; // Проверяем, что результат - это число, иначе возвращаем null
};
