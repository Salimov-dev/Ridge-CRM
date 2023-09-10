export function replaceNullsWithEmptyString(obj) {
  // Проверяем, является ли переданный объект объектом
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Перебираем все свойства объекта
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Если значение свойства равно null, заменяем его на пустую строку
      if (obj[key] === null) {
        obj[key] = "";
      } else if (typeof obj[key] === "object") {
        // Если значение свойства является объектом, вызываем функцию рекурсивно
        replaceNullsWithEmptyString(obj[key]);
      }
    }
  }

  return obj;
}
