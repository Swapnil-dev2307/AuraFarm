import React, { useState } from 'react';
import Header from './components/Header';
import LoginPortal from './components/LoginPortal';
import FarmerPortal from './components/FarmerPortal';
import MandiStaffTerminal from './components/MandiStaffTerminal';
import MinistryAnalytics from './components/MinistryAnalytics';
import { SmsDrawer, UssdModal } from './components/SmsSimulator';
import { translations } from './data/i18n';
import { 
  sampleFarmerProfile, 
  initialMandis, 
  initialActiveBooking, 
  initialSmsLogs 
} from './data/mockData';

export default function App() {
  const [currentRole, setCurrentRole] = useState('farmer'); // 'farmer' | 'staff' | 'analytics'
  const [lang, setLang] = useState('en'); // 'en' | 'hi' | 'mr'
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const t = translations[lang] || translations.en;

  // Authentication State (null = show LoginPortal)
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  
  // Platform Shared State
  const [farmerProfile, setFarmerProfile] = useState(sampleFarmerProfile);
  const [mandis, setMandis] = useState(initialMandis);
  const [activeBooking, setActiveBooking] = useState(initialActiveBooking);
  const [smsLogs, setSmsLogs] = useState(initialSmsLogs);

  // UI Modals & Drawers
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  const [isUssdOpen, setIsUssdOpen] = useState(false);

  // Helper to add SMS log
  const pushSmsNotification = (message) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newSms = {
      id: `sms-${Date.now()}`,
      timestamp: timeStr,
      recipient: farmerProfile.mobile,
      message
    };
    setSmsLogs((prev) => [newSms, ...prev]);
  };

  // Farmer Login Handler
  const handleFarmerLogin = (data) => {
    const user = {
      userType: 'farmer',
      farmerName: data.farmerName,
      aadhaarMasked: data.aadhaarMasked,
      mobile: data.mobile
    };
    setFarmerProfile((prev) => ({
      ...prev,
      farmerName: data.farmerName,
      aadhaarMasked: data.aadhaarMasked,
      mobile: data.mobile
    }));
    setAuthenticatedUser(user);
    setCurrentRole('farmer');
    pushSmsNotification(
      `KrishiSetu Security Alert: Aadhaar e-KYC login successful for ${data.farmerName} (${data.aadhaarMasked}). Welcome to KrishiSetu Farmer Portal.`
    );
  };

  // Admin / Staff Login Handler
  const handleStaffLogin = (data) => {
    const user = {
      userType: 'staff',
      staffId: data.staffId,
      mandiBranch: data.mandiBranch
    };
    setAuthenticatedUser(user);
    setCurrentRole(data.targetRole || 'staff');
  };

  // Logout Handler
  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  // Farmer Action: Book New Slot
  const handleBookSlot = (bookingData) => {
    const newTokenId = `SOY-2026-MH${Math.floor(40 + Math.random() * 50)}`;
    const updatedBooking = {
      ...activeBooking,
      tokenId: newTokenId,
      mandiId: bookingData.mandiId,
      mandiName: bookingData.mandiName,
      cropType: bookingData.cropType,
      cropLabel: bookingData.cropLabel,
      expectedQuintals: bookingData.expectedQuintals,
      bookingDate: bookingData.bookingDate,
      timeSlot: bookingData.timeSlot,
      currentServingToken: "SOY-2026-MH33",
      queuePosition: 12,
      estimatedWaitMins: 36,
      gateArrived: false,
      stepIndex: 2
    };

    // Update mandi booked capacity
    setMandis((prev) =>
      prev.map((m) =>
        m.id === bookingData.mandiId
          ? { ...m, bookedQuintals: m.bookedQuintals + bookingData.expectedQuintals }
          : m
      )
    );

    setActiveBooking(updatedBooking);
    pushSmsNotification(
      `KrishiSetu Alert: Slot confirmed at ${bookingData.mandiName} for ${bookingData.bookingDate} (${bookingData.timeSlot}). Token #${newTokenId}. Bring Aadhaar & land record copy.`
    );
  };

  // Farmer Action: Mark Gate Arrival
  const handleMarkArrived = () => {
    setActiveBooking((prev) => ({
      ...prev,
      gateArrived: true,
      stepIndex: 3,
      queuePosition: 5,
      estimatedWaitMins: 15
    }));

    pushSmsNotification(
      `KrishiSetu Gate Pass: Arrival verified at ${activeBooking.mandiName} Main Gate. Proceed to Quality Inspection Bay 3 with Token #${activeBooking.tokenId}.`
    );
  };

  // Staff Action: Call Next Token
  const handleCallNextToken = () => {
    pushSmsNotification(
      `KrishiSetu Announcement: Token #${activeBooking.tokenId} is now called to Weighbridge Bay 1. Please move your tractor forward.`
    );
  };

  // Staff Action: Save Quality & Weighment
  const handleUpdateQualityAndWeighment = (data) => {
    const updated = {
      ...activeBooking,
      stepIndex: 6, // Procurement Confirmed & Slip Issued
      qualityData: {
        moisturePercent: data.moisturePercent,
        foreignMatterPercent: data.foreignMatterPercent,
        grade: data.grade,
        approved: true
      },
      weighmentData: {
        grossKg: data.grossKg,
        tareKg: data.tareKg,
        netKg: data.netKg,
        netQuintals: data.netQuintals
      },
      mspDetails: {
        ...activeBooking.mspDetails,
        totalPaymentRs: data.totalPaymentRs
      }
    };

    setActiveBooking(updated);
    pushSmsNotification(
      `KrishiSetu Procurement Receipt Generated! Net Weight: ${data.netQuintals} Quintals (${data.grade}, Moisture: ${data.moisturePercent}%). Official MSP Payment calculated: ₹${data.totalPaymentRs.toLocaleString()}.`
    );
  };

  // Staff Action: Approve DBT Payment
  const handleApproveDbtPayment = () => {
    const refNum = `DBT-2026-FCI-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setActiveBooking((prev) => ({
      ...prev,
      stepIndex: 7, // DBT Initiated
      mspDetails: {
        ...prev.mspDetails,
        paymentRef: refNum,
        disbursedAt: new Date().toLocaleTimeString()
      }
    }));

    pushSmsNotification(
      `KrishiSetu DBT Initiated: Payment of ₹${activeBooking.mspDetails?.totalPaymentRs.toLocaleString() || "2,73,000"} sent to Bank Account ending 4821 via PFMS (Ref: ${refNum}).`
    );

    // Auto complete to step 8 after 3 seconds
    setTimeout(() => {
      setActiveBooking((prev) => ({
        ...prev,
        stepIndex: 8 // Payment Credited
      }));
      pushSmsNotification(
        `KrishiSetu Bank Alert: ₹${activeBooking.mspDetails?.totalPaymentRs.toLocaleString() || "2,73,000"} has been successfully CREDITED to your account ending 4821. Thank you for utilizing KrishiSetu digital mandi!`
      );
    }, 3000);
  };

  // Farmer Grievance Handler
  const handleRaiseGrievance = (text) => {
    pushSmsNotification(
      `KrishiSetu Grievance Desk: Issue ticket #GRV-8821 registered. Assigned to District Agriculture Officer Nashik for rapid resolution.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Platform Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        lang={lang}
        setLang={setLang}
        smsCount={smsLogs.length}
        toggleSmsDrawer={() => setIsSmsOpen(!isSmsOpen)}
        toggleUssdModal={() => setIsUssdOpen(true)}
        isMobilePreview={isMobilePreview}
        setIsMobilePreview={setIsMobilePreview}
        authenticatedUser={authenticatedUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <div className={`w-full transition-all duration-300 ${
          isMobilePreview 
            ? 'max-w-sm sm:max-w-md bg-white border-[10px] border-slate-900 rounded-[44px] p-3 sm:p-4 shadow-2xl my-2 h-[820px] max-h-[85vh] overflow-y-auto overflow-x-hidden relative shadow-emerald-950/20' 
            : ''
        }`}>
          {isMobilePreview && (
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-1 pb-2 mb-2 flex flex-col items-center border-b border-slate-100">
              <div className="w-24 h-3.5 bg-slate-900 rounded-full mb-1 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <span>{t.smartphonePreviewMode}</span>
              </div>
            </div>
          )}

          {/* Show LoginPortal if user is not authenticated */}
          {!authenticatedUser ? (
            <LoginPortal
              onFarmerLogin={handleFarmerLogin}
              onStaffLogin={handleStaffLogin}
              lang={lang}
              isMobilePreview={isMobilePreview}
            />
          ) : (
            <>
              {currentRole === 'farmer' && (
                <FarmerPortal
                  farmerProfile={farmerProfile}
                  mandis={mandis}
                  activeBooking={activeBooking}
                  onBookSlot={handleBookSlot}
                  onMarkArrived={handleMarkArrived}
                  onRaiseGrievance={handleRaiseGrievance}
                  lang={lang}
                  toggleUssdModal={() => setIsUssdOpen(true)}
                  isMobilePreview={isMobilePreview}
                />
              )}

              {currentRole === 'staff' && (
                <MandiStaffTerminal
                  activeBooking={activeBooking}
                  onUpdateQualityAndWeighment={handleUpdateQualityAndWeighment}
                  onApproveDbtPayment={handleApproveDbtPayment}
                  onCallNextToken={handleCallNextToken}
                  lang={lang}
                  isMobilePreview={isMobilePreview}
                />
              )}

              {currentRole === 'analytics' && (
                <MinistryAnalytics 
                  lang={lang}
                  isMobilePreview={isMobilePreview} 
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-800">{t.portalTitle} MSP Platform</span>
            <span>• {t.portalSubtitle}</span>
          </div>
          <div>
            {t.lightThemeSub}
          </div>
        </div>
      </footer>

      {/* Side SMS Simulation Drawer */}
      <SmsDrawer
        isOpen={isSmsOpen}
        onClose={() => setIsSmsOpen(false)}
        smsLogs={smsLogs}
        lang={lang}
      />

      {/* USSD / IVR Offline Guide Modal */}
      <UssdModal
        isOpen={isUssdOpen}
        onClose={() => setIsUssdOpen(false)}
        lang={lang}
      />
    </div>
  );
}
