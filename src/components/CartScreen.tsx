import { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { VegBadge } from './VegBadge';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Check, 
  ArrowRight, 
  ShoppingBag, 
  Info,
  Sparkles
} from 'lucide-react';

interface CartScreenProps {
  cart: CartItem[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onUpdateQuantity: (mealId: string, delta: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onNavigateToMenu: () => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function CartScreen({
  cart,
  coupons,
  appliedCoupon,
  onApplyCoupon,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  onNavigateToMenu,
  notes,
  onNotesChange
}: CartScreenProps) {
  const [couponInput, setCouponInput] = useState(appliedCoupon ? appliedCoupon.code : '');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  // Free delivery for DGU students if subtotal >= 100, otherwise flat ₹10 campus dispatch fee
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

  const handleApplyCoupon = (codeToApply?: string) => {
    const targetCode = (codeToApply || couponInput).trim().toUpperCase();
    if (!targetCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const found = coupons.find(c => c.code.toUpperCase() === targetCode && c.isActive);
    if (!found) {
      setCouponError('Invalid or expired coupon code');
      setCouponSuccess('');
      return;
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Add ₹${found.minOrder - subtotal} more to apply this coupon (Min ₹${found.minOrder})`);
      setCouponSuccess('');
      return;
    }

    onApplyCoupon(found);
    setCouponError('');
    setCouponSuccess(`Coupon ${found.code} applied successfully!`);
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponInput('');
    setCouponSuccess('');
    setCouponError('');
  };

  if (cart.length === 0) {
    return (
      <div className="pb-24 md:pb-16 max-w-2xl mx-auto px-4 sm:px-6 pt-10 text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Your Cart is Empty</h2>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          You haven't added any meals yet. Browse today's student thalis and bowls starting at ₹45.
        </p>
        <div className="pt-2">
          <button
            onClick={onNavigateToMenu}
            className="h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Browse Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-16 max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Student Meal Cart
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {cart.reduce((s, i) => s + i.quantity, 0)} meals selected for DGU Hostel Delivery
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-neutral-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cart Items & Instructions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {cart.map((item) => (
              <div key={item.meal.id} className="p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4">
                <img
                  src={item.meal.image}
                  alt={item.meal.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <VegBadge isVeg={item.meal.isVeg} size="sm" />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                      {item.meal.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">
                    {item.meal.name}
                  </h3>
                  <div className="text-xs font-mono text-neutral-500 mt-0.5">
                    ₹{item.meal.price} each
                  </div>
                </div>

                {/* Stepper & Total */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-sm sm:text-base font-bold font-mono text-neutral-900">
                    ₹{item.meal.price * item.quantity}
                  </div>
                  <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
                    <button
                      onClick={() => onUpdateQuantity(item.meal.id, -1)}
                      className="w-6 h-6 rounded bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold font-mono text-neutral-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.meal.id, 1)}
                      className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Note */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-neutral-700">
              Hostel Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="e.g. Call when entering hostel gate, leave with guard, extra spoons..."
              className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 text-neutral-900"
            />
          </div>
        </div>

        {/* Right Column: Coupons & Bill Summary */}
        <div className="lg:col-span-5 space-y-4">
          {/* Coupon Module */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                Apply Student Coupon
              </span>
              {appliedCoupon && (
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                disabled={!!appliedCoupon}
                className="flex-1 h-10 px-3 text-xs font-mono font-bold uppercase bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900 disabled:bg-neutral-100"
              />
              <button
                type="button"
                onClick={() => handleApplyCoupon()}
                disabled={!!appliedCoupon}
                className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {couponError && <p className="text-xs text-red-600">{couponError}</p>}
            {couponSuccess && (
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{couponSuccess}</span>
              </p>
            )}

            {/* Quick Available Coupons */}
            {!appliedCoupon && (
              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <span className="text-[11px] font-semibold text-neutral-400 block">Available Student Offers:</span>
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => { setCouponInput(c.code); handleApplyCoupon(c.code); }}
                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-emerald-50 border border-neutral-100 hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-xs text-emerald-800 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                        {c.code}
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{c.description}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Apply</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold text-neutral-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span className="flex items-center gap-1">
                  <span>Hostel Delivery</span>
                  {deliveryFee === 0 && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 rounded">FREE</span>
                  )}
                </span>
                <span className="font-mono tabular-nums font-semibold text-neutral-900">
                  {deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums">-₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-neutral-900">Total Amount</span>
                  <p className="text-[11px] text-neutral-400">Includes packaging & taxes</p>
                </div>
                <span className="text-2xl font-bold font-mono text-neutral-900">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Threshold banner */}
            {subtotal < 100 && (
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-1.5 border border-emerald-200">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Add ₹{100 - subtotal} more for <strong>FREE Hostel Delivery</strong>!</span>
              </div>
            )}

            {/* Proceed CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
