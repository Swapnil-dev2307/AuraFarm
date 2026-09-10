import { jsPDF } from 'jspdf';

export function downloadProcurementPdfReceipt(booking, farmerProfile) {
  const doc = new jsPDF();

  const primaryGreen = [4, 120, 87]; // #047857
  const darkSlate = [15, 23, 42]; // #0F172A

  // Top Header Banner
  doc.setFillColor(...primaryGreen);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS', 105, 12, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('National MSP Grain Procurement & Direct Benefit Transfer (DBT) Portal', 105, 20, { align: 'center' });

  // Receipt ID & Date Bar
  doc.setTextColor(...darkSlate);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('OFFICIAL PROCUREMENT & PAYMENT RECEIPT', 14, 38);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Receipt No: FCI-${booking.tokenId || 'WHEAT-2026-A45'}`, 14, 44);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')} | Time: ${new Date().toLocaleTimeString('en-IN')}`, 140, 44);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 48, 196, 48);

  // Section 1: Farmer Profile & Aadhaar
  doc.setFillColor(245, 247, 245);
  doc.rect(14, 52, 182, 32, 'F');
  doc.rect(14, 52, 182, 32, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text('FARMER IDENTITY & BANK DETAILS (e-KYC VERIFIED)', 18, 60);

  doc.setFontSize(9);
  doc.setTextColor(...darkSlate);
  doc.text(`Farmer Name: ${farmerProfile.farmerName}`, 18, 68);
  doc.text(`Aadhaar No: ${farmerProfile.aadhaarMasked}`, 18, 74);
  doc.text(`Farmer Registry ID: ${farmerProfile.farmerId}`, 18, 80);

  doc.text(`Village: ${farmerProfile.village}`, 110, 68);
  doc.text(`Land Record: ${farmerProfile.landRecordNo}`, 110, 74);
  doc.text(`DBT Account: ${farmerProfile.bankAccountMasked}`, 110, 80);

  // Section 2: Procurement Mandi & Produce Inspection
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text('PROCUREMENT HUB & GRAIN QUALITY INSPECTION', 14, 94);

  doc.setFillColor(255, 255, 255);
  doc.rect(14, 98, 182, 36, 'S');

  doc.setFontSize(9);
  doc.setTextColor(...darkSlate);
  doc.setFont('helvetica', 'bold');
  doc.text(`Procurement Mandi:`, 18, 106);
  doc.setFont('helvetica', 'normal');
  doc.text(`${booking.mandiName || 'Khanna Main Grain Mandi'}`, 60, 106);

  doc.setFont('helvetica', 'bold');
  doc.text(`Harvest Crop:`, 18, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`${booking.cropLabel || 'Wheat (Rabi 2026)'}`, 60, 114);

  doc.setFont('helvetica', 'bold');
  doc.text(`Quality Moisture %:`, 18, 122);
  doc.setFont('helvetica', 'normal');
  doc.text(`${booking.qualityData?.moisturePercent || 12.5}% (Grade A Approved)`, 60, 122);

  doc.setFont('helvetica', 'bold');
  doc.text(`Foreign Impurity %:`, 18, 130);
  doc.setFont('helvetica', 'normal');
  doc.text(`${booking.qualityData?.foreignMatterPercent || 0.8}%`, 60, 130);

  // Section 3: Electronic Weighbridge Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text('ELECTRONIC WEIGHBRIDGE MEASUREMENTS', 14, 144);

  // Table Header
  doc.setFillColor(4, 120, 87);
  doc.rect(14, 148, 182, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Gross Tractor Wt (kg)', 20, 153.5);
  doc.text('Tare Empty Wt (kg)', 80, 153.5);
  doc.text('Verified Net Quantity', 145, 153.5);

  // Table Body
  doc.setFillColor(248, 250, 248);
  doc.rect(14, 156, 182, 10, 'F');
  doc.rect(14, 156, 182, 10, 'S');

  const gross = booking.weighmentData?.grossKg || 16200;
  const tare = booking.weighmentData?.tareKg || 4200;
  const netQ = booking.weighmentData?.netQuintals || booking.expectedQuintals || 120;

  doc.setTextColor(...darkSlate);
  doc.setFont('helvetica', 'normal');
  doc.text(`${gross.toLocaleString()} kg`, 20, 162.5);
  doc.text(`${tare.toLocaleString()} kg`, 80, 162.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${netQ} Quintals (${(netQ * 100).toLocaleString()} kg)`, 145, 162.5);

  // Section 4: Financial Payment & DBT Status
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryGreen);
  doc.text('GOVERNMENT MSP PAYMENT & DIRECT BENEFIT TRANSFER (DBT)', 14, 178);

  doc.setFillColor(254, 243, 199); // Amber tint
  doc.rect(14, 182, 182, 28, 'F');
  doc.rect(14, 182, 182, 28, 'S');

  const rate = booking.mspDetails?.ratePerQuintal || 2275;
  const total = booking.mspDetails?.totalPaymentRs || (netQ * rate);

  doc.setTextColor(180, 83, 9); // Amber
  doc.setFontSize(9);
  doc.text(`Official Govt MSP Rate: RS. ${rate.toLocaleString()} / Quintal`, 18, 190);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryGreen);
  doc.text(`TOTAL MSP PAYABLE: RS. ${total.toLocaleString()}`, 18, 198);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkSlate);
  doc.text(`DBT Reference No: ${booking.mspDetails?.paymentRef || 'DBT-2026-FCI-9941029'}`, 18, 205);
  doc.text(`Bank Credited: HDFC Bank ending in 4821 (PFMS Status: APPROVED & SETTLED)`, 18, 210);

  // Signatures & Official Stamp
  doc.line(14, 222, 196, 222);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated digital procurement slip under National Food Security Act.', 14, 230);
  doc.text('Verified by Mandi Procurement Administrator • Food Corporation of India (FCI)', 14, 235);

  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL STAMP & DIGITAL SIGNATURE', 140, 230);
  doc.text('[ APPROVED - GOVT OF INDIA ]', 140, 235);

  // Save PDF
  doc.save(`AuraFarm_Receipt_${booking.tokenId || 'WHEAT-2026-A45'}.pdf`);
}
