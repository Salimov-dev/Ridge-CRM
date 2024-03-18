export const removeSpacesAndConvertToNumber = (str) => {
  // Проверяем, что str не является null и является строкой
  if (str === null || typeof str !== "string") {
    return null;
  }

  // Убираем все пробелы из строки и преобразуем в число
  const numberWithoutSpaces = Number(str.replace(/\s/g, ""));

  // Проверяем, является ли результат числом
  // Если не является числом или равен 0, возвращаем null
  return isNaN(numberWithoutSpaces) || numberWithoutSpaces === 0
    ? null
    : numberWithoutSpaces;
};
