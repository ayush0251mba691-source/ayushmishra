import { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  CalendarCheck, 
  PauseCircle, 
  PlayCircle, 
  HelpCircle, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  ExternalLink,
  Edit2,
  Check
} from 'lucide-react';
import { DGU_HOSTELS } from '../data/mockData';

interface ProfileScreenProps {
  user: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onToggleSubscriptionPause: () => void;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenHygieneModal: () => void;
}

export function ProfileScreen({
  user,
  onUpdateProfile,
  onToggleSubscriptionPause,
  onLogout,
  onOpenLogin,
  onOpenHygieneModal
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.studentName);
  const [phone, setPhone] = useState(user.phone);
  const [hostel, setHostel] = useState(user.hostel);
  const [roomNo, setRoomNo] = useState(user.roomNo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      studentName: name,
      phone,
      hostel,
      roomNo
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  if (!user.isLoggedIn) {
    return (
      <div className="pb-24 md:pb-16 max-w-xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-4">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">Student Login Required</h2>
        <p className="text-xs sm:text-sm text-neutral-500">
          Log in with your DGU college email or phone number to access saved hostel addresses, active meal subscriptions, and live order tracking.
        </p>
        <button
          onClick={onOpenLogin}
          className="mt-2 h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          Student Login / Signup
        </button>
      </div>
    );
  }

  const sub = user.activeSubscription;

  return (
    <div className="pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Top Banner & Student Identity */}
      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 text-2xl font-black flex items-center justify-center shadow-md shrink-0">
              {user.studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {user.studentName}
                </h1>
                <span className="text-[11px] font-bold bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  DGU Verified
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-mono mt-0.5">
                ID: {user.studentId} · {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="h-9 px-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Info</span>
              </button>
            )}
            <button
              onClick={onLogout}
              className="h-9 px-3.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold rounded-xl border border-red-400/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Edit Form or Info summary */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-4 bg-neutral-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Hostel</label>
                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                >
                  {DGU_HOSTELS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Room / Floor</label>
                <input
                  type="text"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-9 px-4 bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-lg hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase">Default Delivery Spot</span>
                <p className="font-semibold text-neutral-900 mt-0.5">{user.hostel}</p>
                <p className="text-neutral-500">{user.roomNo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase">Phone (For Courier)</span>
                <p className="font-semibold text-neutral-900 mt-0.5">{user.phone}</p>
                <p className="text-neutral-500">SMS / WhatsApp dispatch alerts active</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase">Preferred Payment</span>
                <p className="font-semibold text-neutral-900 mt-0.5">UPI / Cash on Delivery</p>
                <p className="text-neutral-500">Quick 1-tap checkout enabled</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Status Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">Active Campus Meal Subscription</h2>
              <p className="text-xs text-neutral-500">Flexible monthly plan for hostelites</p>
            </div>
          </div>

          {sub ? (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                sub.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {sub.status === 'active' ? '● Active Plan' : '⏸ Paused for Leave'}
            </span>
          ) : (
            <span className="text-xs text-neutral-400">No active plan</span>
          )}
        </div>

        {sub ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Plan</span>
                <p className="font-bold text-neutral-900 text-sm">{sub.planName}</p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Meals Left</span>
                <p className="font-bold font-mono text-emerald-700 text-sm">{sub.mealsRemaining} / 30 meals</p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Scheduled Slot</span>
                <p className="font-bold text-neutral-900 text-xs truncate">{sub.deliverySlot}</p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400">Valid Till</span>
                <p className="font-bold text-neutral-900 text-xs">{sub.endDate}</p>
              </div>
            </div>

            {/* Pause / Resume Feature */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
              <div>
                <h4 className="text-xs font-bold text-neutral-900">
                  {sub.status === 'active' ? 'Traveling Home or Taking Exam Break?' : 'Ready to resume your meals?'}
                </h4>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  {sub.status === 'active'
                    ? 'Pause meal delivery with 1 tap. Unused days roll over automatically.'
                    : 'Resume daily deliveries to your hostel door.'}
                </p>
              </div>

              <button
                onClick={onToggleSubscriptionPause}
                className={`h-9 px-4 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs shrink-0 ${
                  sub.status === 'active'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {sub.status === 'active' ? (
                  <>
                    <PauseCircle className="w-4 h-4" />
                    <span>Pause Plan</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Resume Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500">
            Subscribe to our Daily, Lunch or Full-Day Plan to save up to ₹1,400 monthly.
          </p>
        )}
      </div>

      {/* Help & Support & Hygiene Protocol */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl border border-neutral-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">Campus Help & Support</h3>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Need to change hostel rooms, change delivery timings or have special dietary needs?
          </p>
          <div className="pt-1 flex flex-col gap-2">
            <a
              href="tel:+919876543210"
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Campus Hotline: +91 98765 43210</span>
            </a>
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Hostel WhatsApp: Available 8 AM - 10 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-neutral-900">Kitchen Hygiene Standards</h3>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Audited daily by student health volunteers with RO water purification and zero palm oil.
          </p>
          <button
            onClick={onOpenHygieneModal}
            className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Review Food Safety Audit Checklist</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
