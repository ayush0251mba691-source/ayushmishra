import { Order, OrderStatus } from '../types';
import { 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowLeft, 
  HelpCircle,
  Sparkles,
  Play
} from 'lucide-react';
import { VegBadge } from './VegBadge';

interface OrderTrackingScreenProps {
  order: Order;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
  onNavigateToOrders: () => void;
  onNavigateToHome: () => void;
}

export function OrderTrackingScreen({
  order,
  onUpdateStatus,
  onNavigateToOrders,
  onNavigateToHome
}: OrderTrackingScreenProps) {
  const steps: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Received at DGU Campus Kitchen', icon: CheckCircle2 },
    { key: 'preparing', label: 'Food Preparing', desc: 'Cooking fresh with warm phulkas & dal', icon: ChefHat },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Partner en route to hostel', icon: Bike },
    { key: 'delivered', label: 'Delivered', desc: 'Handed over at hostel porch', icon: MapPin }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'preparing': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  // Fast forward simulator helper for demos
  const handleNextStep = () => {
    if (!onUpdateStatus) return;
    const nextStates: OrderStatus[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const nextIdx = Math.min(3, currentStepIdx + 1);
    onUpdateStatus(order.id, nextStates[nextIdx]);
  };

  return (
    <div className="pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Top Nav actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateToOrders}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Orders</span>
        </button>

        {/* Demo Fast-Forward Button for Entrepreneurship Presentation */}
        {currentStepIdx < 3 && onUpdateStatus && (
          <button
            onClick={handleNextStep}
            className="h-8 px-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Fast forward delivery state for demonstration"
          >
            <Play className="w-3 h-3 fill-amber-700 text-amber-700" />
            <span>Simulate Next Step ({steps[currentStepIdx + 1]?.label})</span>
          </button>
        )}
      </div>

      {/* Main Status Hero */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Order #{order.id}
              </span>
              <span className="text-xs text-neutral-400">· Placed {order.createdAt}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">
              {order.status === 'delivered' ? 'Meal Delivered! Enjoy!' : 'Your Meal is on the Way'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Delivering to <strong className="text-neutral-800">{order.hostel} ({order.roomNo})</strong>
            </p>
          </div>

          {order.status !== 'delivered' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center sm:text-right shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Estimated Delivery
              </span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-900">
                {order.estimatedDeliveryTime || '15-20 mins'}
              </span>
            </div>
          )}
        </div>

        {/* 4-Step Stepper Progress Bar */}
        <div className="py-2">
          {/* Desktop timeline */}
          <div className="grid grid-cols-4 relative">
            {/* Progress track line */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-neutral-200 -z-0">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(currentStepIdx / 3) * 100}%` }}
              />
            </div>

            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isPassed = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={st.key} className="flex flex-col items-center text-center z-10 px-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md scale-105'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className={`text-xs font-bold mt-2.5 ${isCurrent ? 'text-emerald-800' : isPassed ? 'text-neutral-800' : 'text-neutral-400'}`}>
                    {st.label}
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5 hidden sm:block max-w-[120px] leading-tight">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner Details Card (if active) */}
        {order.deliveryPartner && (
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold text-base flex items-center justify-center shadow-xs">
                {order.deliveryPartner.avatarText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-neutral-900">{order.deliveryPartner.name}</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    DGU Courier
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">{order.deliveryPartner.vehicle}</p>
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{order.deliveryPartner.currentLocation}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.deliveryPartner.phone}`}
                className="h-10 px-4 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 flex items-center gap-2 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Partner</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
          Order Items & Receipt
        </h3>

        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.meal.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <VegBadge isVeg={item.meal.isVeg} size="sm" />
                <div>
                  <p className="font-bold text-neutral-900">{item.meal.name}</p>
                  <p className="text-xs text-neutral-500 font-mono">
                    {item.quantity} x ₹{item.meal.price}
                  </p>
                </div>
              </div>
              <span className="font-bold font-mono tabular-nums text-neutral-900">
                ₹{item.meal.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Bill summary */}
        <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono font-semibold text-neutral-900">₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Hostel Delivery</span>
            <span className="font-mono font-semibold text-neutral-900">
              {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Student Discount ({order.couponCode})</span>
              <span className="font-mono">-₹{order.discount}</span>
            </div>
          )}
          <div className="pt-2 border-t border-neutral-100 flex justify-between font-bold text-sm text-neutral-900">
            <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
            <span className="text-lg font-mono">₹{order.totalAmount}</span>
          </div>
        </div>

        {order.notes && (
          <div className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-600">
            <strong className="text-neutral-800">Delivery Notes:</strong> {order.notes}
          </div>
        )}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onNavigateToHome}
          className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
        >
          Return to Home Screen
        </button>
      </div>
    </div>
  );
}
