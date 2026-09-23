import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatNumber, formatDate } from './formatters';

/**
 * Export vehicle inventory to Excel spreadsheet (.xlsx)
 */
export const exportVehiclesToExcel = (vehicles) => {
  const data = vehicles.map((v, index) => ({
    'Sr No': index + 1,
    'Brand': v.brand,
    'Model': v.model,
    'Variant': v.variant || '-',
    'Model Year': v.modelYear,
    'Reg. Year': v.registrationYear,
    'Price (₹)': v.price,
    'Price Negotiable': v.isNegotiable ? 'Yes' : 'No',
    'KM Driven': v.kmDriven,
    'Fuel Type': v.fuelType,
    'Transmission': v.transmission,
    'Owner': v.ownerNumber,
    'Body Type': v.bodyType,
    'Status': v.status,
    'Date Added': formatDate(v.createdAt)
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicle Stock');

  XLSX.writeFile(workbook, `Shital_Motors_Vehicle_Stock_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

/**
 * Export vehicle inventory to PDF report
 */
export const exportVehiclesToPDF = (vehicles) => {
  const doc = new jsPDF('landscape');

  // Title Header
  doc.setFontSize(18);
  doc.setTextColor(234, 179, 8); // Gold color
  doc.text('SHITAL MOTORS', 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Used Cars Buying & Selling | Vehicle Stock Inventory Report', 14, 25);
  doc.text(`Generated on: ${formatDate(new Date())}`, 220, 25);

  const tableColumn = ['Sr', 'Vehicle Name', 'Year', 'Price', 'KM', 'Fuel', 'Trans.', 'Owner', 'Status'];
  const tableRows = vehicles.map((v, i) => [
    i + 1,
    `${v.brand} ${v.model} ${v.variant}`,
    v.modelYear,
    formatCurrency(v.price),
    `${formatNumber(v.kmDriven)} km`,
    v.fuelType,
    v.transmission,
    v.ownerNumber,
    v.status
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 32,
    theme: 'grid',
    headStyles: { fillColor: [30, 30, 38], textColor: [234, 179, 8], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    styles: { fontSize: 9 }
  });

  doc.save(`Shital_Motors_Stock_${new Date().toISOString().slice(0, 10)}.pdf`);
};

/**
 * Export customer enquiries to Excel
 */
export const exportEnquiriesToExcel = (enquiries) => {
  const data = enquiries.map((e, index) => ({
    'Sr No': index + 1,
    'Customer Name': e.customerName,
    'Phone': e.phone,
    'Email': e.email || '-',
    'Vehicle Interested': e.vehicleTitle || 'General Enquiry',
    'Preferred Contact': e.preferredContactMethod || 'WhatsApp',
    'Status': e.status,
    'Message': e.message,
    'Date Received': formatDate(e.createdAt)
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries');

  XLSX.writeFile(workbook, `Shital_Motors_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
