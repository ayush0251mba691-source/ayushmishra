import { useState } from 'react';
import { SubscriptionPlan, StudentProfile } from '../types';
import { Check, Sparkles, CalendarCheck, ShieldCheck, ArrowRight, X, Clock, HelpCircle } from 'lucide-react';
import { DGU_HOSTELS } from '../data/mockData';

interface SubscriptionScreenProps {
  plans: SubscriptionPlan[];
  user: StudentProfile;
  onSubscribe: (plan: SubscriptionPlan, details: { startDate: string; deliverySlot: string; hostel: string; roomNo: string }) => void;
  onNavigateToHome: () => void;
}

export function SubscriptionScreen({
  plans,
  user,
  onSubscribe,
  onNavigateToHome
}: SubscriptionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [startDate, setStartDate] = useState('2026-10-06');
  const [deliverySlot, setDeliverySlot] = useState('');
  const [hostel, setHostel] = useState(user.hostel || DGU_HOSTELS[0]);
  const [roomNo, setRoomNo] = useState(user.roomNo || 'Room 204');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successPlanName, setSuccessPlanName] = useState<string | null>(null);

  const handleOpenSubscribeModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setDeliverySlot(plan.deliveryTimeWindow);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsProcessing(true);
    setTimeout(() => {
      onSubscribe(selectedPlan, {
        startDate,
        deliverySlot,
        hostel,
        roomNo
      });
      setIsProcessing(false);
      setSuccessPlanName(selectedPlan.name);
      setSelectedPlan(null);
    }, 600);
  };

  return (
    <div className="pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Save up to ₹1,400 every month on Campus Meals</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          DGU Student Meal Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Zero delivery charges, guaranteed punctual hostel delivery, and free pause/rollover days whenever you travel home or take weekend leaves.
        </p>
      </div>

      {/* Success alert if just subscribed */}
      {successPlanName && (
        <div className="max-w-2xl mx-auto bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between text-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Subscription Active!</p>
              <p className="text-sm font-semibold">{successPlanName} has been attached to your DGU student account.</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessPlanName(null)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const isCurrentActive = user.activeSubscription?.planId === plan.id;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl border flex flex-col justify-between transition-all relative ${
                plan.isPopular
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-neutral-200 shadow-xs hover:border-neutral-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Most Popular on Campus
                </div>
              )}

              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg">{plan.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price block */}
                <div className="pt-2 border-t border-neutral-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-neutral-900">
                      ₹{plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-neutral-400 line-through font-mono">
                      ₹{plan.originalPrice}
                    </span>
                    <span className="text-xs text-neutral-500">/ month</span>
                  </div>

                  {/* Savings pill-less unboxed text */}
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-1">
                    <span>Save ₹{plan.savings}/mo</span>
                    <span>·</span>
                    <span>₹{plan.perMealPrice.toFixed(0)} per meal</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-1.5">
                    <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{plan.deliveryTimeWindow}</span>
                  </div>
                </div>

                {/* Feature checklist */}
                <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    What's Included:
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action button */}
              <div className="p-5 sm:p-6 pt-0">
                {isCurrentActive ? (
                  <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center border border-emerald-200">
                    Current Active Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenSubscribeModal(plan)}
                    className={`w-full h-11 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      plan.isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                    }`}
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Subscribe Now</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription FAQ & Guarantee */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-neutral-900">How Fresh Box Subscriptions Work for Students</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">1. Pause Anytime</h4>
            <p>
              Heading home for Diwali, Holi, or semester break? Just tap Pause in your Profile and unused meal days automatically extend your expiry date.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">2. Doorstep Delivery</h4>
            <p>
              Your Fresh Box arrives in eco-friendly thermo-insulated boxes right at your hostel entrance or common room at the exact scheduled slot.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">3. Rotating Daily Menu</h4>
            <p>
              Never get bored of hostel food. Our menu changes daily with North Indian thalis, seasonal vegetables, paneer specials, and Sunday treats.
            </p>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-100 animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide">
                  Confirm Student Meal Plan
                </span>
                <h3 className="text-lg font-bold">{selectedPlan.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmSubscription} className="p-6 space-y-4">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{selectedPlan.mealsCount} Fresh Campus Meals</p>
                  <p className="text-neutral-500">Savings: ₹{selectedPlan.savings} vs individual orders</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold font-mono text-emerald-700">₹{selectedPlan.monthlyPrice}</span>
                  <p className="text-[10px] text-neutral-400">for 30 days</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Subscription Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Delivery Slot Preference
                </label>
                <input
                  type="text"
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Hostel</label>
                  <select
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
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
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Activating Subscription...</span>
                  ) : (
                    <>
                      <span>Activate Student Plan (₹{selectedPlan.monthlyPrice})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
