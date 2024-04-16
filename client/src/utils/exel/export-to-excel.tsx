import XLSX from "xlsx/dist/xlsx.full.min.js";

export const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Создаем бинарные данные Excel-файла
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Конвертируем бинарные данные в Blob
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Создаем URL для Blob
  const blobUrl = URL.createObjectURL(blob);

  // Создаем ссылку для скачивания
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "Грядка (объекты).xlsx";

  // Эмулируем клик по ссылке для начала загрузки
  a.click();

  // Очищаем ссылку
  URL.revokeObjectURL(blobUrl);
};
