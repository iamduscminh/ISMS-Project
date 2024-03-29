import * as XLSX from "xlsx/xlsx.mjs";

class AdminReportPreview {
  static exportExcel(data, nameSheet, nameFile, format) {
    return new Promise((resolve, reject) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, nameSheet);
      XLSX.writeFile(wb, `${nameFile}.${format}`);
      resolve("oke");
    });
  }
}

export default AdminReportPreview;
