import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ productDetail, user, finalDataDetail }) => {
  const fileType = "xlsx";
  const exportToCSV = () => {
    finalDataDetail.map((item, index) => {
      item["json"] = XLSX.utils.json_to_sheet(item.data);
    });
    const obj = {
      Sheets: {},
      SheetNames: [],
    };
    finalDataDetail.map((item, key) => {
      return (
        (obj.Sheets[item.category] = item.json),
        obj.SheetNames.push(item.category)
      );
    });
    const object = { ...obj };
    const excelBuffer = XLSX.write(object, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "myfile" + ".xlsx");
  };

  return <button onClick={exportToCSV}>Download File</button>;
};
