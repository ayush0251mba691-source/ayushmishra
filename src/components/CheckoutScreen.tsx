import React, { useState } from 'react';
import { CartItem, Coupon, Order, StudentProfile } from '../types';
import { DGU_HOSTELS } from '../data/mockData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  QrCode, 
  Banknote, 
  CreditCard, 
  ShieldCheck, 
  Phone,
  User,
  Sparkles
} from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  user: StudentProfile;
  appliedCoupon: Coupon | null;
  notes: string;
  onBackToCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export function CheckoutScreen({
  cart,
  user,
  appliedCoupon,
  notes,
  onBackToCart,
  onOrderPlaced
}: CheckoutScreenProps) {
  const [studentName, setStudentName] = useState(user.studentName || 'Ayush Sharma');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [hostel, setHostel] = useState(user.hostel || DGU_HOSTELS[0]);
  const [roomNo, setRoomNo] = useState(user.roomNo || 'Room 204');
  const [deliverySlot, setDeliverySlot] = useState('Immediate (20-25 mins)');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  const deliveryFee = subtotal >= 100 || subtotal === 0 ? 0 : 10;
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.value;
    } else {
      discount = Math.min(40, Math.round((subtotal * appliedCoupon.value) / 100));
    }
  }
  const totalAmount = Math.max(0, subtotal + deliveryFee - discount);

  const deliverySlots = [
    'Immediate (20-25 mins)',
    'Lunch Slot (1:00 PM - 1:30 PM)',
    'Evening Snack (5:00 PM - 5:30 PM)',
    'Dinner Slot (8:00 PM - 8:30 PM)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...cart],
        subtotal,
        deliveryFee,
        discount,
        couponCode: appliedCoupon?.code,
        totalAmount,
        status: 'confirmed',
        createdAt: 'Just now',
        deliverySlot,
        studentName,
        studentId: user.studentId || 'DGU-2024-STU',
        hostel,
        roomNo,
        phone,
        paymentMethod,
        estimatedDeliveryTime: '20-25 mins',
        notes: notes || undefined,
        deliveryPartner: {
          name: 'Ramesh Patel',
          phone: '+91 98234 56781',
          vehicle: 'Electric Green Hero Scooter (MP-09-FB-104)',
          currentLocation: 'Campus Main Kitchen dispatch point',
          avatarText: 'RP'
        }
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 700);
  };

  return (
    <div className="pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Back button */}
      <button
        onClick={onBackToCart}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Checkout & Hostel Delivery
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Verify your hostel wing and select payment method
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Form fields */}
        <div className="md:col-span-7 space-y-5">
          {/* 1. Student Details */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Student Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number (For Delivery Call)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                    required
                  />
                  <Phone className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Hostel Delivery Location */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Hostel Address</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">DGU Hostel / Residence</label>
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
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Room No. / Wing / Floor</label>
              <input
                type="text"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                placeholder="e.g. Room 204, 2nd Floor, Block A"
                className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                required
              />
            </div>
          </div>

          {/* 3. Delivery Timing */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Preferred Delivery Time</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {deliverySlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setDeliverySlot(slot)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    deliverySlot === slot
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-600" />
              <span>Payment Options</span>
            </h3>

            <div className="space-y-2">
              {/* UPI */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-emerald-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">UPI / QR Code (Fastest)</span>
                    <QrCode className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Google Pay, PhonePe, Paytm, BHIM or any UPI app
                  </p>
                  {paymentMethod === 'upi' && (
                    <div className="mt-2 p-2.5 bg-white rounded-lg border border-emerald-200 text-[11px] text-neutral-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Instant UPI intent / scan QR will prompt on next screen</span>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-emerald-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">Cash on Delivery (Hostel Gate)</span>
                    <Banknote className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Pay in cash or UPI directly to our campus delivery partner
                  </p>
                </div>
              </label>

              {/* Card */}
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-emerald-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">Credit / Debit Card</span>
                    <CreditCard className="w-4 h-4 text-neutral-500" />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Visa, Mastercard, RuPay, Maestro accepted
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right side summary */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
              Final Order Breakdown
            </h3>

            {/* Items mini list */}
            <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.meal.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="font-bold font-mono text-emerald-800">{item.quantity}x</span>
                    <span className="text-neutral-800 truncate">{item.meal.name}</span>
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-neutral-900 shrink-0">
                    ₹{item.meal.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-2 border-t border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery to DGU Hostel</span>
                <span className="font-mono tabular-nums font-semibold">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Student Discount</span>
                  <span className="font-mono tabular-nums">-₹{discount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Total Payable</span>
                <span className="text-2xl font-bold font-mono text-neutral-900">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order (₹{totalAmount})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Verified · Direct Kitchen Hand-off</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
