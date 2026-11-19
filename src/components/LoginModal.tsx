import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { StudentProfile } from '../types';
import { DGU_HOSTELS } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: StudentProfile) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [identifier, setIdentifier] = useState('ayush.0251mba691@dgu.ac.in');
  const [studentName, setStudentName] = useState('Ayush Sharma');
  const [studentId, setStudentId] = useState('DGU-2024-MBA-691');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [hostel, setHostel] = useState(DGU_HOSTELS[0]);
  const [roomNo, setRoomNo] = useState('Room 204, 2nd Floor');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your DGU email or mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter a 4-digit OTP');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const profile: StudentProfile = {
        studentName: studentName || 'DGU Student',
        email: identifier.includes('@') ? identifier : `${studentName.toLowerCase().replace(/\s+/g, '.')}@dgu.ac.in`,
        phone: identifier.includes('@') ? phone : identifier,
        studentId: studentId || 'DGU-2025-GEN-101',
        hostel: hostel || DGU_HOSTELS[0],
        roomNo: roomNo || 'Room 101',
        isLoggedIn: true,
        activeSubscription: {
          planId: 'sub-lunch',
          planName: 'Lunch Plan',
          startDate: '2026-10-01',
          endDate: '2026-10-31',
          mealsRemaining: 24,
          status: 'active',
          deliverySlot: '1:00 PM - 1:30 PM'
        }
      };
      onLoginSuccess(profile);
      onClose();
    }, 500);
  };

  const fillQuickDemo = (type: 'ayush' | 'priya') => {
    if (type === 'ayush') {
      setIdentifier('ayush.0251mba691@dgu.ac.in');
      setStudentName('Ayush Sharma');
      setStudentId('DGU-2024-MBA-691');
      setPhone('+91 98765 43210');
      setHostel(DGU_HOSTELS[0]);
      setRoomNo('Room 204, 2nd Floor');
    } else {
      setIdentifier('priya.mehra@dgu.ac.in');
      setStudentName('Priya Mehra');
      setStudentId('DGU-2024-BTECH-302');
      setPhone('+91 98111 87654');
      setHostel(DGU_HOSTELS[2]);
      setRoomNo('Sarojini Hall, Room 112');
    }
    setStep('otp');
    setOtp(['1', '2', '3', '4']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Banner */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-neutral-900 text-white p-6 pb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-brand text-2xl font-bold tracking-tight">
              <span className="text-white">Fresh</span>
              <span className="text-amber-400">Box</span>
            </span>
            <span className="text-[11px] font-semibold bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/20">
              DGU Campus Partner
            </span>
          </div>
          <p className="text-emerald-100 text-sm font-medium">
            “Fresh Meals. Easy Life.”
          </p>
          <p className="text-xs text-emerald-200/80 mt-1">
            Hygienic, student-priced breakfast, lunch & dinner delivered straight to your hostel porch.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Mode Switcher */}
          <div className="flex bg-neutral-100 p-1 rounded-lg mb-5">
            <button
              onClick={() => { setMode('login'); setStep('credentials'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'login' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => { setMode('signup'); setStep('credentials'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'signup' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              New Student Signup
            </button>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  DGU Email or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. ayush.0251mba691@dgu.ac.in or 9876543210"
                    className="w-full h-11 px-3.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-neutral-900"
                    required
                  />
                  <div className="absolute right-3 top-3 text-neutral-400">
                    {identifier.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:border-emerald-600 text-neutral-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Student ID</label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. DGU-2024-MBA-691"
                        className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:border-emerald-600 text-neutral-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">DGU Hostel</label>
                    <select
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:border-emerald-600 text-neutral-900"
                    >
                      {DGU_HOSTELS.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Room / Wing Number</label>
                    <input
                      type="text"
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      placeholder="e.g. Room 204, Block A"
                      className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:border-emerald-600 text-neutral-900"
                      required
                    />
                  </div>
                </>
              )}

              {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <span>Sending OTP...</span>
                ) : (
                  <>
                    <span>Continue with OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-neutral-900">Enter Verification Code</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  We sent a 4-digit code to <span className="font-medium text-neutral-800">{identifier}</span>
                </p>
              </div>

              {/* 4-digit OTP Inputs */}
              <div className="flex justify-center gap-3 my-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...otp];
                      next[idx] = val;
                      setOtp(next);
                      if (val && idx < 3) {
                        const nextEl = document.getElementById(`otp-input-${idx + 1}`);
                        nextEl?.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-bold font-mono bg-neutral-50 border border-neutral-300 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                ))}
              </div>

              {errorMsg && <p className="text-xs text-red-600 text-center">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Enter Fresh Box</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center text-xs text-neutral-500 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="hover:text-neutral-800 underline cursor-pointer"
                >
                  Change email/number
                </button>
                <button
                  type="button"
                  onClick={() => setOtp(['1', '2', '3', '4'])}
                  className="text-emerald-700 font-medium hover:underline cursor-pointer"
                >
                  Auto-fill Demo OTP (1234)
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Student Accounts */}
          <div className="mt-5 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Demo 1-Tap Logins
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo('ayush')}
                className="p-2 text-left bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                <p className="text-xs font-semibold text-neutral-900">Ayush Sharma</p>
                <p className="text-[10px] text-neutral-500">Boys Hostel 1 · MBA</p>
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('priya')}
                className="p-2 text-left bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                <p className="text-xs font-semibold text-neutral-900">Priya Mehra</p>
                <p className="text-[10px] text-neutral-500">Sarojini Hall · B.Tech</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
