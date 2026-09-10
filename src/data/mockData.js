export const mspRates = {
  wheat: { pricePerQuintal: 2275, name: "Wheat (Rabi 2026)", maxMoistureAllowed: 14, imgUrl: "/crop_wheat.jpg" },
  paddy: { pricePerQuintal: 2300, name: "Paddy Grade A", maxMoistureAllowed: 17, imgUrl: "/crop_paddy.jpg" },
  mustard: { pricePerQuintal: 5650, name: "Mustard Seed", maxMoistureAllowed: 8, imgUrl: "/crop_mustard.jpg" },
  gram: { pricePerQuintal: 5440, name: "Gram / Chickpea", maxMoistureAllowed: 10, imgUrl: "/crop_gram.jpg" },
  pulses: { pricePerQuintal: 6425, name: "Lentils / Arhar", maxMoistureAllowed: 10, imgUrl: "/crop_pulses.jpg" }
};

export const initialMandis = [
  {
    id: "mandi-khanna",
    name: "Khanna Main Grain Mandi",
    district: "Ludhiana, Punjab",
    dailyCapacityQuintals: 10000,
    bookedQuintals: 9200,
    dailyMaxFarmers: 400,
    bookedFarmers: 368,
    status: "congested", // 'available' | 'moderate' | 'congested'
    avgWaitMins: 210,
    distanceKm: 4.2
  },
  {
    id: "mandi-samrala",
    name: "Samrala Regional Procurement Hub",
    district: "Ludhiana, Punjab",
    dailyCapacityQuintals: 8000,
    bookedQuintals: 3040,
    dailyMaxFarmers: 320,
    bookedFarmers: 122,
    status: "available",
    avgWaitMins: 22,
    distanceKm: 14.8,
    perks: ["Free tractor shed", "Instant moisture testing", "No waiting queue"]
  },
  {
    id: "mandi-karnal",
    name: "Karnal Central FCI Mandi",
    district: "Karnal, Haryana",
    dailyCapacityQuintals: 12000,
    bookedQuintals: 10500,
    dailyMaxFarmers: 480,
    bookedFarmers: 420,
    status: "congested",
    avgWaitMins: 185,
    distanceKm: 6.0
  },
  {
    id: "mandi-panipat",
    name: "Panipat Model Agri Mandi",
    district: "Panipat, Haryana",
    dailyCapacityQuintals: 9000,
    bookedQuintals: 4100,
    dailyMaxFarmers: 360,
    bookedFarmers: 164,
    status: "available",
    avgWaitMins: 25,
    distanceKm: 18.2,
    perks: ["Direct DBT express counter", "Shaded waiting lounge"]
  },
  {
    id: "mandi-bathinda",
    name: "Bathinda Cotton & Grain APMC",
    district: "Bathinda, Punjab",
    dailyCapacityQuintals: 7500,
    bookedQuintals: 5800,
    dailyMaxFarmers: 300,
    bookedFarmers: 232,
    status: "moderate",
    avgWaitMins: 65,
    distanceKm: 8.5
  }
];

export const sampleFarmerProfile = {
  farmerName: "Gurpreet Singh",
  farmerId: "PB-FARM-99421",
  aadhaarMasked: "XXXX-XXXX-8821",
  mobile: "+91 98765 43210",
  village: "Rajgarh Village, Khanna",
  landRecordNo: "Khasra No. 402/12 (5.2 Acres)",
  bankAccountMasked: "HDFC Bank ending in 4821",
  dbtStatus: "Linked & Verified"
};

export const initialActiveBooking = {
  tokenId: "WHEAT-2026-A45",
  farmerName: "Gurpreet Singh",
  mandiId: "mandi-khanna",
  mandiName: "Khanna Main Grain Mandi",
  cropType: "wheat",
  cropLabel: "Wheat (Rabi 2026)",
  expectedQuintals: 120,
  bookingDate: "2026-09-06",
  timeSlot: "10:00 AM - 11:30 AM",
  currentServingToken: "WHEAT-2026-A33",
  queuePosition: 12,
  estimatedWaitMins: 36,
  gateArrived: false,
  stepIndex: 2,
  qualityData: {
    moisturePercent: 12.5,
    foreignMatterPercent: 0.8,
    grade: "Grade A",
    approved: true
  },
  weighmentData: {
    grossKg: 16200,
    tareKg: 4200,
    netKg: 12000,
    netQuintals: 120
  },
  mspDetails: {
    ratePerQuintal: 2275,
    totalPaymentRs: 273000,
    paymentRef: "DBT-2026-FCI-9941029",
    disbursedAt: null
  }
};

export const initialSmsLogs = [
  {
    id: "sms-1",
    timestamp: "10:15 AM",
    recipient: "+91 98765 43210",
    message: "AuraFarm Alert: Your slot at Khanna Main Mandi is confirmed for tomorrow 10:00 AM. Token # WHEAT-2026-A45. Bring Aadhaar copy."
  }
];

export const districtHeatmapData = [
  { district: "Ludhiana", activeMandis: 14, avgCapacity: "88%", status: "High Demand", waitTime: "2.4 hrs", totalProcured: "42,500 Q" },
  { district: "Karnal", activeMandis: 11, avgCapacity: "91%", status: "Congested", waitTime: "3.1 hrs", totalProcured: "51,200 Q" },
  { district: "Patiala", activeMandis: 9, avgCapacity: "64%", status: "Optimal", waitTime: "40 mins", totalProcured: "28,900 Q" },
  { district: "Ambala", activeMandis: 8, avgCapacity: "45%", status: "Low Queue", waitTime: "18 mins", totalProcured: "19,400 Q" },
  { district: "Bathinda", activeMandis: 12, avgCapacity: "76%", status: "Moderate", waitTime: "1.1 hrs", totalProcured: "36,800 Q" },
  { district: "Sangrur", activeMandis: 10, avgCapacity: "82%", status: "Moderate", waitTime: "1.5 hrs", totalProcured: "38,100 Q" }
];
