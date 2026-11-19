import { useState } from 'react';
import { Meal, Order } from '../types';
import { VegBadge } from './VegBadge';
import { 
  ArrowRight, 
  Sparkles, 
  CalendarCheck, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Star, 
  Check, 
  ChevronRight,
  TrendingUp,
  MapPin,
  HeartHandshake
} from 'lucide-react';

interface HomeScreenProps {
  userName: string;
  hostel: string;
  meals: Meal[];
  activeOrder?: Order;
  onNavigate: (view: string, filterCategory?: string) => void;
  onAddToCart: (meal: Meal) => void;
  onOpenHygieneModal: () => void;
}

export function HomeScreen({
  userName,
  hostel,
  meals,
  activeOrder,
  onNavigate,
  onAddToCart,
  onOpenHygieneModal
}: HomeScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('lunch');

  // Filter meals for the meal schedule slots
  const filteredSlotMeals = selectedSlot === 'all' 
    ? meals.slice(0, 4) 
    : meals.filter(m => m.category === selectedSlot);

  // Today's special hero meal
  const todaySpecial = meals.find(m => m.id === 'm-1') || meals[0];

  return (
    <div className="pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-8">
      {/* 1. Header Greeting & Hostel Location */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Serving DGU Campus Hostels</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
            Hello, {userName || 'DGU Student'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate max-w-md">{hostel || 'Hostel Campus Delivery'}</span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('orders')}
            className="flex-1 sm:flex-initial h-9 px-3.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => onNavigate('subscription')}
            className="flex-1 sm:flex-initial h-9 px-3.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Meal Plans</span>
          </button>
        </div>
      </div>

      {/* Live Order Card banner (if active order exists) */}
      {activeOrder && activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled' && (
        <div 
          onClick={() => onNavigate('tracking')}
          className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Live Order #{activeOrder.id}
                </span>
                <span className="text-xs text-amber-700 font-medium">· On the way</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900">
                {activeOrder.deliveryPartner?.currentLocation || 'Preparing your hot meal'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-900">
            <span>Track Live</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* 2. Promotional Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white shadow-md">
        <div className="grid md:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 md:p-10 md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-600/50 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-emerald-100 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Approved Student Nutrition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Healthy Meals. Student Prices. <br className="hidden sm:inline" />
              Delivered to Your Hostel.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl">
              Freshly cooked homestyle thalis and bowls starting at just ₹45. Skip messy hostel canteens and late night Maggi.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="h-11 px-5 bg-white text-emerald-900 hover:bg-neutral-100 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Order Today's Meal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('subscription')}
                className="h-11 px-5 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-300/40 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-amber-300" />
                <span>Monthly Meal Plans (Save 25%)</span>
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="md:col-span-5 h-64 md:h-full relative min-h-[220px]">
            <img
              src={todaySpecial.image}
              alt="Fresh Box Student Thali"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-emerald-800/80 md:from-transparent via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md rounded-xl p-2.5 text-white flex items-center gap-2.5 border border-white/10">
              <VegBadge isVeg={true} size="sm" />
              <div className="text-left">
                <p className="text-xs font-semibold leading-none">Dal, Rice & Phulka</p>
                <p className="text-[11px] text-emerald-300 font-bold mt-1">Only ₹60 / meal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Meal Schedule Slot Selector (Breakfast, Lunch, Dinner) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Campus Daily Schedule
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Today's Fresh Meals
            </h2>
          </div>

          {/* Segmented Slot Buttons */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl max-w-fit">
            {(['all', 'breakfast', 'lunch', 'dinner'] as const).map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {slot === 'all' ? 'All Meals' : slot}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSlotMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-neutral-100">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                  <VegBadge isVeg={meal.isVeg} size="sm" />
                  <span className="text-[11px] font-bold text-neutral-700 capitalize">
                    {meal.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{meal.rating}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base leading-snug line-clamp-1">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {meal.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold">Student Price</span>
                    <div className="text-lg font-bold font-mono text-neutral-900">
                      ₹{meal.price}
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(meal)}
                    className="h-9 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <span>Explore Full Campus Menu ({meals.length} items)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. Why Fresh Box? Section */}
      <section id="why-freshbox" className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Student-First Value Proposition
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">
            Why Fresh Box?
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Designed specifically for DGU hostelites who deserve home-cooked comfort without exorbitant food delivery surcharges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Affordable Student Pricing</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Wholesome thalis at ₹60 with no hidden convenience fees or surge pricing during exams.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Hygienic & Fresh Food</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Cooked daily in an audited commercial kitchen with RO water and zero artificial preservatives.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Reliable Hostel Delivery</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dedicated campus delivery partners who know every hostel block, gate, and floor.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Flexible Meal Plans</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pause your subscription with 1 tap whenever you travel home or take weekend leaves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Easy Online Ordering</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Order in 30 seconds with UPI or Cash on Delivery right to your hostel reception.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 space-y-2 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mt-2">Verified Kitchen Standards</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Inspected by student council volunteers. Read our 5-point safety checklist.
              </p>
            </div>
            <button
              onClick={onOpenHygieneModal}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>View Hygiene Protocol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Subscription Highlight Card */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="max-w-xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Over 100+ DGU Students Subscribed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Subscribe to Monthly Meal Plans
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Lock in guaranteed warm meals starting at just <span className="font-bold text-amber-400">₹44.4 per meal</span>. Zero delivery charges and free holiday pause days.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('subscription')}
              className="h-11 px-5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Subscribe to Monthly Plan</span>
            </button>
          </div>
        </div>

        {/* Decorative badge */}
        <div className="hidden md:block absolute -right-6 -bottom-6 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 6. Real Student Reviews */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Hostel Community
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Loved by DGU Students
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-neutral-700">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>4.8 / 5.0 (380+ orders)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              “The dal and rotis genuinely taste like home! Finally a clean, affordable option for us hostel students without oily canteen food.”
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Priya Mehra</span>
              <span className="text-neutral-500 text-[11px]">Sarojini Hall</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              “The monthly lunch plan saved my semester. Never have to worry about missing lunch between back-to-back engineering labs.”
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Rohan Verma</span>
              <span className="text-neutral-500 text-[11px]">Boys Hostel 2</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              “Very punctual delivery and the eco-friendly box keeps the food steaming hot. Pricing at ₹60 is totally reasonable.”
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">Sneha Kulkarni</span>
              <span className="text-neutral-500 text-[11px]">Tagore PG</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
