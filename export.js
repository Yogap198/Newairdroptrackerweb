function exportToExcel() {
  const data = getData();
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Airdrops");
  XLSX.writeFile(wb, "airdrop_data.xlsx");
}

async function exportToPDF() {
  const element = document.body;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("airdrop_report.pdf");
}