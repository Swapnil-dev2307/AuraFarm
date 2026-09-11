export const mspRates = {
  soybean: { pricePerQuintal: 4892, name: "Soybean (Kharif 2026)", maxMoistureAllowed: 12, imgUrl: "/crop_soybean.jpg" },
  cotton: { pricePerQuintal: 7121, name: "Cotton / Kapas (Long Staple)", maxMoistureAllowed: 8, imgUrl: "/crop_cotton.jpg" },
  tur: { pricePerQuintal: 7550, name: "Tur Dal / Arhar", maxMoistureAllowed: 10, imgUrl: "/crop_tur.jpg" },
  onion: { pricePerQuintal: 2400, name: "Onion (Nashik Red)", maxMoistureAllowed: 14, imgUrl: "/crop_onion.jpg" },
  wheat: { pricePerQuintal: 2275, name: "Wheat (Lokwan / Sharbati)", maxMoistureAllowed: 14, imgUrl: "/crop_wheat.jpg" },
  sugarcane: { pricePerQuintal: 3150, name: "Sugarcane (FRP Rate)", maxMoistureAllowed: 15, imgUrl: "/crop_sugarcane.jpg" },
  gram: { pricePerQuintal: 5440, name: "Gram / Chana", maxMoistureAllowed: 10, imgUrl: "/crop_gram.jpg" }
};

export const initialMandis = [
  {
    id: "mandi-nashik",
    name: "Nashik APMC Main Mandi",
    district: "Nashik, Maharashtra",
    dailyCapacityQuintals: 12000,
    bookedQuintals: 11040,
    dailyMaxFarmers: 450,
    bookedFarmers: 414,
    status: "congested", // 'available' | 'moderate' | 'congested'
    avgWaitMins: 210,
    distanceKm: 4.2
  },
  {
    id: "mandi-pimpalgaon",
    name: "Pimpalgaon Baswant APMC Hub",
    district: "Niphad, Nashik, Maharashtra",
    dailyCapacityQuintals: 9500,
    bookedQuintals: 3610,
    dailyMaxFarmers: 380,
    bookedFarmers: 144,
    status: "available",
    avgWaitMins: 22,
    distanceKm: 14.8,
    perks: ["Free tractor parking & shed", "Instant electronic moisture test", "Express 7/12 verification counter"]
  },
  {
    id: "mandi-latur",
    name: "Latur Grain & Pulse APMC",
    district: "Latur, Maharashtra",
    dailyCapacityQuintals: 15000,
    bookedQuintals: 13800,
    dailyMaxFarmers: 550,
    bookedFarmers: 506,
    status: "congested",
    avgWaitMins: 195,
    distanceKm: 6.0
  },
  {
    id: "mandi-nagpur",
    name: "Nagpur Kalamna APMC",
    district: "Nagpur, Maharashtra",
    dailyCapacityQuintals: 11000,
    bookedQuintals: 4950,
    dailyMaxFarmers: 400,
    bookedFarmers: 180,
    status: "available",
    avgWaitMins: 25,
    distanceKm: 18.2,
    perks: ["Direct DBT MahaDBT counter", "Shaded farmer resting lounge"]
  },
  {
    id: "mandi-pune",
    name: "Pune Gultekdi Market Yard APMC",
    district: "Pune, Maharashtra",
    dailyCapacityQuintals: 14000,
    bookedQuintals: 10500,
    dailyMaxFarmers: 500,
    bookedFarmers: 375,
    status: "moderate",
    avgWaitMins: 65,
    distanceKm: 8.5
  },
  {
    id: "mandi-solapur",
    name: "Solapur APMC Procurement Centre",
    district: "Solapur, Maharashtra",
    dailyCapacityQuintals: 8500,
    bookedQuintals: 4250,
    dailyMaxFarmers: 300,
    bookedFarmers: 150,
    status: "available",
    avgWaitMins: 18,
    distanceKm: 12.4
  }
];

export const sampleFarmerProfile = {
  farmerName: "Rameshwar Tukaram Patil",
  farmerId: "MH-FARM-99421",
  aadhaarMasked: "XXXX-XXXX-8821",
  mobile: "+91 98765 43210",
  village: "Pimpalgaon Baswant, Niphad, Nashik",
  landRecordNo: "7/12 Extract Gut No. 402/12 (5.2 Acres)",
  bankAccountMasked: "Bank of Maharashtra ending in 4821",
  dbtStatus: "MahaDBT Verified & Linked"
};

export const initialActiveBooking = {
  tokenId: "SOY-2026-MH45",
  farmerName: "Rameshwar Tukaram Patil",
  mandiId: "mandi-nashik",
  mandiName: "Nashik APMC Main Mandi",
  cropType: "soybean",
  cropLabel: "Soybean (Kharif 2026)",
  expectedQuintals: 120,
  bookingDate: "2026-09-06",
  timeSlot: "10:00 AM - 11:30 AM",
  currentServingToken: "SOY-2026-MH33",
  queuePosition: 12,
  estimatedWaitMins: 36,
  gateArrived: false,
  stepIndex: 2,
  qualityData: {
    moisturePercent: 11.2,
    foreignMatterPercent: 0.6,
    grade: "Grade A (Prime)",
    approved: true
  },
  weighmentData: {
    grossKg: 16200,
    tareKg: 4200,
    netKg: 12000,
    netQuintals: 120
  },
  mspDetails: {
    ratePerQuintal: 4892,
    totalPaymentRs: 587040,
    paymentRef: "DBT-2026-MH-9941029",
    disbursedAt: null
  }
};

export const initialSmsLogs = [
  {
    id: "sms-1",
    timestamp: "10:15 AM",
    recipient: "+91 98765 43210",
    message: "KrishiSetu Alert: Your slot at Nashik APMC Main Mandi is confirmed for tomorrow 10:00 AM. Token # SOY-2026-MH45. Bring Aadhaar & 7/12 extract copy."
  }
];

export const districtHeatmapData = [
  { district: "Nashik", activeMandis: 18, avgCapacity: "88%", status: "High Demand", waitTime: "2.4 hrs", totalProcured: "52,500 Q" },
  { district: "Latur", activeMandis: 15, avgCapacity: "92%", status: "Overbooked", waitTime: "3.2 hrs", totalProcured: "68,000 Q" },
  { district: "Nagpur", activeMandis: 12, avgCapacity: "45%", status: "Optimal", waitTime: "20 mins", totalProcured: "34,200 Q" },
  { district: "Ahmednagar", activeMandis: 16, avgCapacity: "78%", status: "Moderate", waitTime: "1.1 hrs", totalProcured: "49,100 Q" },
  { district: "Solapur", activeMandis: 14, avgCapacity: "82%", status: "Moderate", waitTime: "1.5 hrs", totalProcured: "41,800 Q" },
  { district: "Amravati", activeMandis: 11, avgCapacity: "38%", status: "Optimal", waitTime: "15 mins", totalProcured: "28,900 Q" },
  { district: "Kolhapur", activeMandis: 10, avgCapacity: "55%", status: "Optimal", waitTime: "25 mins", totalProcured: "31,400 Q" }
];
