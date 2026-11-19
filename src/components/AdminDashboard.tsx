import { useState } from 'react';
import { Meal, Order, Coupon, ReviewItem, OrderStatus } from '../types';
import { VegBadge } from './VegBadge';
import { BUSINESS_MODEL, DGU_HOSTELS } from '../data/mockData';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  CalendarCheck, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Tag, 
  Layers, 
  Calculator, 
  ArrowLeft,
  X,
  Sliders,
  Check
} from 'lucide-react';

interface AdminDashboardProps {
  meals: Meal[];
  orders: Order[];
  coupons: Coupon[];
  reviews: ReviewItem[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
  onUpdateMeal: (mealId: string, updates: Partial<Meal>) => void;
  onDeleteMeal: (mealId: string) => void;
  onToggleCoupon: (code: string) => void;
  onAddCoupon: (coupon: Coupon) => void;
  onExitAdmin: () => void;
}

export function AdminDashboard({
  meals,
  orders,
  coupons,
  reviews,
  onUpdateOrderStatus,
  onAddMeal,
  onUpdateMeal,
  onDeleteMeal,
  onToggleCoupon,
  onAddCoupon,
  onExitAdmin
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'economics' | 'orders' | 'meals' | 'coupons' | 'feedback'>('economics');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Entrepreneurship Panel Target Simulator
  const [simulatedStudents, setSimulatedStudents] = useState<number>(100);

  // Add/Edit Meal Modal
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [mealName, setMealName] = useState('');
  const [mealCategory, setMealCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('lunch');
  const [mealPrice, setMealPrice] = useState(60);
  const [mealDesc, setMealDesc] = useState('');
  const [mealIsVeg, setMealIsVeg] = useState(true);
  const [mealCalories, setMealCalories] = useState(500);

  // New Coupon Modal
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'flat' | 'percent'>('flat');
  const [couponVal, setCouponVal] = useState(25);
  const [couponMin, setCouponMin] = useState(80);
  const [couponDesc, setCouponDesc] = useState('');

  // Business Economics Calculations based on prompt assumptions
  const sellingPrice = BUSINESS_MODEL.sellingPricePerMeal;
  const variableCost = BUSINESS_MODEL.variableCostPerMeal;
  const marginPerMeal = sellingPrice - variableCost; // ₹20
  const fixedCost = BUSINESS_MODEL.monthlyFixedCost; // ₹15,000

  const totalMealsPerMonthSimulated = simulatedStudents * 30; // 30 meals/mo per student
  const projectedMonthlyRevenue = totalMealsPerMonthSimulated * sellingPrice;
  const projectedVariableCosts = totalMealsPerMonthSimulated * variableCost;
  const projectedNetProfit = projectedMonthlyRevenue - projectedVariableCosts - fixedCost;
  const breakEvenStudents = Math.ceil(fixedCost / (marginPerMeal * 30)); // 25 students

  // Real order stats
  const totalOrdersCount = orders.length;
  const todayOrders = orders.filter(o => o.createdAt.toLowerCase().includes('today') || o.createdAt.toLowerCase().includes('just'));
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === orderFilter);

  const handleOpenAddMeal = () => {
    setEditingMeal(null);
    setMealName('');
    setMealCategory('lunch');
    setMealPrice(60);
    setMealDesc('');
    setMealIsVeg(true);
    setMealCalories(500);
    setIsMealModalOpen(true);
  };

  const handleOpenEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setMealName(meal.name);
    setMealCategory(meal.category);
    setMealPrice(meal.price);
    setMealDesc(meal.description);
    setMealIsVeg(meal.isVeg);
    setMealCalories(meal.calories);
    setIsMealModalOpen(true);
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMeal) {
      onUpdateMeal(editingMeal.id, {
        name: mealName,
        category: mealCategory,
        price: Number(mealPrice),
        description: mealDesc,
        isVeg: mealIsVeg,
        calories: Number(mealCalories)
      });
    } else {
      onAddMeal({
        name: mealName,
        category: mealCategory,
        price: Number(mealPrice),
        description: mealDesc,
        isVeg: mealIsVeg,
        calories: Number(mealCalories),
        prepTime: '15-20 min',
        isAvailable: true,
        rating: 5.0,
        reviewsCount: 1,
        image: meals[0]?.image || ''
      });
    }
    setIsMealModalOpen(false);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    onAddCoupon({
      code: couponCode.trim().toUpperCase(),
      discountType: couponType,
      value: Number(couponVal),
      minOrder: Number(couponMin),
      description: couponDesc || `${couponType === 'flat' ? `₹${couponVal}` : `${couponVal}%`} off on orders above ₹${couponMin}`,
      isActive: true
    });
    setCouponCode('');
    setIsCouponModalOpen(false);
  };

  return (
    <div className="pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900 text-white p-5 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-brand text-2xl font-bold tracking-tight text-white">
              <span className="text-emerald-400">Fresh</span>Box
            </span>
            <span className="text-[11px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
              Founder & Owner Console
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            DGU Student Meal Venture · University Entrepreneurship Panel Model
          </p>
        </div>

        <button
          onClick={onExitAdmin}
          className="h-9 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Student App</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('economics')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'economics' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>Business Model & Unit Economics</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Package className="w-3.5 h-3.5 text-emerald-500" />
          <span>Live Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('meals')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'meals' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>Manage Meals ({meals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'coupons' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-purple-500" />
          <span>Coupons ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'feedback' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-500" />
          <span>Customer Reviews ({reviews.length})</span>
        </button>
      </div>

      {/* Tab 1: Entrepreneurship Panel Unit Economics & Financial Dashboard */}
      {activeTab === 'economics' && (
        <div className="space-y-6">
          {/* Real Startup KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Today's Orders
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">
                ₹{todayRevenue}
              </div>
              <p className="text-[11px] text-neutral-500">
                {todayOrders.length} meal orders dispatched
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Active Subscribers
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
                68 students
              </div>
              <p className="text-[11px] text-emerald-800">
                Target: 100 students (68% reached)
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Registered Hostellers
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900">
                184 students
              </div>
              <p className="text-[11px] text-neutral-500">
                Total obtainable market: 300
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Contribution Margin
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-600">
                33.3%
              </div>
              <p className="text-[11px] text-neutral-500">
                ₹20 net margin on every ₹60 meal
              </p>
            </div>
          </div>

          {/* Entrepreneurship Interactive Pitch Simulator */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Investor & Panel Financial Model
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
                  Unit Economics & Target Scale Calculator
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Adjust regular subscriber count to calculate monthly revenue, cost structure and profitability.
                </p>
              </div>

              {/* Break even badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center sm:text-right shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Break-Even Threshold
                </span>
                <span className="text-lg font-bold font-mono text-emerald-950">
                  {breakEvenStudents} Students (750 meals/mo)
                </span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                <span>Active Regular Customers: <span className="font-mono text-emerald-700 text-sm">{simulatedStudents} students</span></span>
                <span className="text-neutral-500 font-mono text-[11px]">Market Capacity: 300 students</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={simulatedStudents}
                onChange={(e) => setSimulatedStudents(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>10 students</span>
                <span className="font-bold text-emerald-700">Target: 100 students</span>
                <span>300 max obtainable</span>
              </div>
            </div>

            {/* Economics Output Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-xs font-bold text-neutral-500 uppercase">Gross Monthly Revenue</span>
                <div className="text-2xl font-extrabold font-mono text-neutral-900">
                  ₹{projectedMonthlyRevenue.toLocaleString()}
                </div>
                <p className="text-[11px] text-neutral-500">
                  {totalMealsPerMonthSimulated.toLocaleString()} meals × ₹{sellingPrice}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-xs font-bold text-neutral-500 uppercase">Total Costs (Var + Fixed)</span>
                <div className="text-2xl font-extrabold font-mono text-red-700">
                  ₹{(projectedVariableCosts + fixedCost).toLocaleString()}
                </div>
                <p className="text-[11px] text-neutral-500">
                  Var ₹{projectedVariableCosts.toLocaleString()} (₹{variableCost}/meal) + Fixed ₹{fixedCost.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase">Net Monthly Profit</span>
                <div className={`text-2xl font-extrabold font-mono ${projectedNetProfit >= 0 ? 'text-emerald-800' : 'text-red-700'}`}>
                  ₹{projectedNetProfit.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  {projectedNetProfit >= 0 ? 'Profitable student business!' : 'Below monthly break-even'}
                </p>
              </div>
            </div>

            {/* Startup Assumptions Table */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Underlying Business Assumptions (Fresh Box Pitch Deck)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-neutral-200 rounded-xl overflow-hidden">
                  <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Metric</th>
                      <th className="py-2.5 px-3">Assumption</th>
                      <th className="py-2.5 px-3">Breakdown Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 bg-white">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">Selling Price Per Meal</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">₹60.00</td>
                      <td className="py-2.5 px-3 text-neutral-600">Directly competitive with hostel canteen (avg ₹70-80) and apps (₹120+)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">Variable Cost Per Meal</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-red-700">₹40.00</td>
                      <td className="py-2.5 px-3 text-neutral-600">Raw ingredients ₹28, Food-grade thermo tray ₹5, Chef prep ₹7</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">Contribution Margin</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-700">₹20.00 (33.3%)</td>
                      <td className="py-2.5 px-3 text-neutral-600">Surplus generated by each meal to service fixed overhead</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">Monthly Fixed Costs</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-neutral-900">₹15,000</td>
                      <td className="py-2.5 px-3 text-neutral-600">Kitchen lease ₹8,000, utilities ₹3,000, delivery scooter fuel & app ₹4,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900">Target Regular Customers</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-neutral-900">100 Students</td>
                      <td className="py-2.5 px-3 text-neutral-600">Yields ₹45,000 net profit per month for student founders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Hostel Meal Orders</h2>
              <p className="text-xs text-neutral-500">Live order queue with status controls</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg overflow-x-auto">
              {(['all', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors capitalize whitespace-nowrap cursor-pointer ${
                    orderFilter === st ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {st === 'all' ? 'All' : st.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Student & Hostel</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                        #{order.id}
                        <span className="block text-[10px] text-neutral-400 font-normal">{order.createdAt}</span>
                      </td>

                      <td className="py-3 px-4">
                        <strong className="text-neutral-900 block">{order.studentName}</strong>
                        <span className="text-neutral-500">{order.hostel} · {order.roomNo}</span>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="truncate font-medium text-neutral-800">
                          {order.items.map(i => `${i.quantity}x ${i.meal.name}`).join(', ')}
                        </p>
                        {order.notes && (
                          <span className="text-[10px] text-amber-700 italic block">Note: {order.notes}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                        ₹{order.totalAmount}
                        <span className="block text-[10px] text-neutral-400 font-normal uppercase">{order.paymentMethod}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          order.status === 'confirmed' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'out_for_delivery' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'delivered' ? 'bg-neutral-100 text-neutral-700' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="h-8 px-2 text-xs font-semibold bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900 cursor-pointer"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Food Preparing</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Meals Management */}
      {activeTab === 'meals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Campus Meal Catalog</h2>
              <p className="text-xs text-neutral-500">Edit prices, toggle stock, or introduce new student meals</p>
            </div>

            <button
              onClick={handleOpenAddMeal}
              className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Meal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <VegBadge isVeg={meal.isVeg} size="sm" />
                      <span className="text-[10px] font-bold uppercase text-neutral-400">{meal.category}</span>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-sm truncate mt-0.5">{meal.name}</h3>
                    <p className="text-xs font-mono font-bold text-emerald-800 mt-1">₹{meal.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={meal.isAvailable}
                      onChange={(e) => onUpdateMeal(meal.id, { isAvailable: e.target.checked })}
                      className="accent-emerald-600"
                    />
                    <span className={meal.isAvailable ? 'text-emerald-700 font-semibold' : 'text-neutral-400'}>
                      {meal.isAvailable ? 'In Stock' : 'Sold Out'}
                    </span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditMeal(meal)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer"
                      title="Edit Meal"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete Meal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Coupons Management */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Student Promo Codes</h2>
              <p className="text-xs text-neutral-500">Configure discounts for campus promotion campaigns</p>
            </div>

            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                      {coupon.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-400'
                    }`}>
                      {coupon.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">{coupon.description}</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Min Order: ₹{coupon.minOrder}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {coupon.discountType === 'flat' ? `₹${coupon.value} OFF` : `${coupon.value}% OFF`}
                  </span>
                  <button
                    onClick={() => onToggleCoupon(coupon.code)}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
                  >
                    {coupon.isActive ? 'Disable Code' : 'Activate Code'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Customer Feedback */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Student Reviews & Feedback</h2>
            <p className="text-xs text-neutral-500">Live testimonials and quality monitoring</p>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{rev.studentName}</span>
                    <span className="text-neutral-400 text-xs">· {rev.hostel}</span>
                    <span className="text-neutral-400 text-[11px]">({rev.date})</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed italic">
                  “{rev.comment}”
                </p>

                <div className="pt-1 text-[11px] text-neutral-400 font-medium">
                  Meal: {rev.mealName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meal Modal (Add / Edit) */}
      {isMealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-in fade-in">
            <button
              onClick={() => setIsMealModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-neutral-900">
              {editingMeal ? 'Edit Campus Meal' : 'Add New Student Meal'}
            </h3>

            <form onSubmit={handleSaveMeal} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Meal Name</label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g. Rajma Rice Bowl"
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={mealPrice}
                    onChange={(e) => setMealPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
                  <select
                    value={mealCategory}
                    onChange={(e) => setMealCategory(e.target.value as any)}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={mealDesc}
                  onChange={(e) => setMealDesc(e.target.value)}
                  placeholder="Fresh ingredients, warm phulkas..."
                  className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Dietary Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMealIsVeg(true)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                        mealIsVeg ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-neutral-200'
                      }`}
                    >
                      Veg
                    </button>
                    <button
                      type="button"
                      onClick={() => setMealIsVeg(false)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                        !mealIsVeg ? 'border-red-600 bg-red-50 text-red-800' : 'border-neutral-200'
                      }`}
                    >
                      Non-Veg
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={mealCalories}
                    onChange={(e) => setMealCalories(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-neutral-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer mt-2"
              >
                {editingMeal ? 'Update Meal Details' : 'Add to Campus Menu'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-in fade-in">
            <button
              onClick={() => setIsCouponModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-neutral-900">Create Campus Promo Code</h3>

            <form onSubmit={handleSaveCoupon} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Promo Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. EXAMBOOST"
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900 font-mono font-bold uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Discount Type</label>
                  <select
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value as any)}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:border-emerald-600 text-neutral-900"
                  >
                    <option value="flat">Flat (₹ Off)</option>
                    <option value="percent">Percentage (% Off)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Value ({couponType === 'flat' ? '₹' : '%'})
                  </label>
                  <input
                    type="number"
                    value={couponVal}
                    onChange={(e) => setCouponVal(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-neutral-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  value={couponMin}
                  onChange={(e) => setCouponMin(Number(e.target.value))}
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-neutral-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
                <input
                  type="text"
                  value={couponDesc}
                  onChange={(e) => setCouponDesc(e.target.value)}
                  placeholder="e.g. Flat ₹25 off for hostel mates"
                  className="w-full h-10 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer mt-2"
              >
                Create Promo Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
