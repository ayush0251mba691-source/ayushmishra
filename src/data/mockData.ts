import { Meal, SubscriptionPlan, Coupon, StudentProfile, Order, ReviewItem } from '../types';

import heroThaliImg from '../assets/images/hero_thali_spread_1791196145443.jpg';
import paneerBowlImg from '../assets/images/meal_paneer_bowl_1791196158916.jpg';
import chickenBowlImg from '../assets/images/meal_chicken_rice_bowl_1791196171295.jpg';
import alooParathaImg from '../assets/images/meal_aloo_paratha_1791196182451.jpg';
import clubSandwichImg from '../assets/images/meal_club_sandwich_1791196193226.jpg';

export const INITIAL_MEALS: Meal[] = [
  {
    id: 'm-1',
    name: 'Dal, Rice, Roti & Sabzi Thali',
    description: 'Fresh yellow dal tadka, 4 warm whole-wheat phulkas, steamed basmati rice, seasonal aloo gobi sabzi, and fresh onion salad.',
    price: 60,
    category: 'lunch',
    image: heroThaliImg,
    isVeg: true,
    calories: 520,
    prepTime: '15-20 min',
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 142,
    isTodaySpecial: true,
    tags: ['Best Seller', 'Balanced Diet']
  },
  {
    id: 'm-2',
    name: 'Paneer Rice Bowl',
    description: 'Soft cottage cheese cubes in spiced buttery tomato makhani gravy over steaming jeera basmati rice with cucumber salad.',
    price: 65,
    category: 'lunch',
    image: paneerBowlImg,
    isVeg: true,
    calories: 580,
    prepTime: '15-20 min',
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 98,
    isTodaySpecial: true,
    tags: ['High Protein', 'Student Favorite']
  },
  {
    id: 'm-3',
    name: 'Homestyle Chicken Rice Bowl',
    description: 'Tender slow-cooked chicken in aromatic dhaba-style curry served with fragrant basmati rice and lemon onion slices.',
    price: 75,
    category: 'dinner',
    image: chickenBowlImg,
    isVeg: false,
    calories: 620,
    prepTime: '20-25 min',
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 164,
    isTodaySpecial: true,
    tags: ['Protein Rich', 'Hostel Special']
  },
  {
    id: 'm-4',
    name: 'Aloo Paratha with Curd & Pickle',
    description: 'Two crispy golden stuffed spiced potato parathas served with thick fresh curd, homemade mango pickle, and melting butter.',
    price: 45,
    category: 'breakfast',
    image: alooParathaImg,
    isVeg: true,
    calories: 440,
    prepTime: '12-15 min',
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 88,
    isTodaySpecial: false,
    tags: ['Breakfast Hit', 'Comfort Food']
  },
  {
    id: 'm-5',
    name: 'Grilled Veg Club Sandwich',
    description: 'Triple-decker toasted bread loaded with cucumber, tomatoes, spiced paneer slice, crunchy lettuce, and house mint chutney.',
    price: 50,
    category: 'snacks',
    image: clubSandwichImg,
    isVeg: true,
    calories: 380,
    prepTime: '10-12 min',
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 74,
    isTodaySpecial: false,
    tags: ['Quick Bite', 'Exam Study Snack']
  },
  {
    id: 'm-6',
    name: 'Classic Veg Student Thali',
    description: 'Homely meal with rajma masala, jeera rice, 3 soft rotis, mix veg sabzi, roasted papad, and fresh mint raita.',
    price: 65,
    category: 'dinner',
    image: heroThaliImg,
    isVeg: true,
    calories: 540,
    prepTime: '15-20 min',
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 112,
    isTodaySpecial: false,
    tags: ['Healthy Choice']
  },
  {
    id: 'm-7',
    name: 'Indori Masala Poha with Peanuts',
    description: 'Light flaked rice cooked with mustard seeds, turmeric, crunchy roasted peanuts, sev garnish, and fresh lemon juice.',
    price: 35,
    category: 'breakfast',
    image: alooParathaImg,
    isVeg: true,
    calories: 290,
    prepTime: '10 min',
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 65,
    isTodaySpecial: false,
    tags: ['Light & Fresh']
  },
  {
    id: 'm-8',
    name: 'Egg Bhurji with 3 Rotis',
    description: 'Double egg scrambled with chopped onions, tomatoes, green chillies, and cilantro, served hot with 3 fresh rotis.',
    price: 55,
    category: 'dinner',
    image: chickenBowlImg,
    isVeg: false,
    calories: 460,
    prepTime: '15 min',
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 92,
    isTodaySpecial: false,
    tags: ['High Protein']
  },
  {
    id: 'm-9',
    name: 'Samosa & Masala Chai Combo',
    description: 'Two crispy spiced potato peas samosas served with sweet tamarind chutney and a piping hot kulhad of cardamom ginger tea.',
    price: 35,
    category: 'snacks',
    image: clubSandwichImg,
    isVeg: true,
    calories: 320,
    prepTime: '8 min',
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 130,
    isTodaySpecial: false,
    tags: ['Evening Tea Time']
  }
];

export const DGU_HOSTELS = [
  'DGU Boys Hostel 1 (Block A - Ground & 1st Floor)',
  'DGU Boys Hostel 2 (Block B - Tech Wing)',
  'DGU Girls Hostel 1 (Sarojini Hall)',
  'DGU Girls Hostel 2 (Kasturba Hall)',
  'Tagore Student PG (Near Campus Gate 3)',
  'Green Valley Student Residence (Near DGU Library)',
  'Scholars Enclave (Outer Ring Road DGU)'
];

export const INITIAL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub-daily',
    name: 'Daily Meal Plan',
    category: 'daily',
    tagline: 'Ideal for students needing 1 wholesome meal every day (Lunch OR Dinner)',
    mealsCount: 30,
    monthlyPrice: 1650,
    perMealPrice: 55,
    originalPrice: 1950,
    savings: 300,
    deliveryTimeWindow: 'Lunch (1:00 PM) or Dinner (8:00 PM)',
    features: [
      '30 Freshly Cooked Meals per month',
      'Choose Lunch OR Dinner every morning',
      'Free Hostel Doorstep Delivery',
      'Weekend Pause / Rollover support',
      'Customized non-spicy / low oil option'
    ],
    isPopular: false
  },
  {
    id: 'sub-lunch',
    name: 'Lunch Plan',
    category: 'lunch',
    tagline: 'Skip canteen lines. Warm nutritious lunch delivered right between lectures',
    mealsCount: 30,
    monthlyPrice: 1699,
    perMealPrice: 56.6,
    originalPrice: 2100,
    savings: 401,
    deliveryTimeWindow: 'Daily at 1:00 PM - 1:30 PM',
    features: [
      '30 Hot Balanced Lunches',
      'Rotating weekly menu (Dal, Sabzi, Rice, Rotis)',
      'Free delivery to Hostel common room or porch',
      'Pause up to 6 days per month for exam breaks',
      'Reusable thermo-insulated Fresh Box packaging'
    ],
    isPopular: true
  },
  {
    id: 'sub-dinner',
    name: 'Dinner Plan',
    category: 'dinner',
    tagline: 'Guaranteed comforting dinner delivered on time so you can study in peace',
    mealsCount: 30,
    monthlyPrice: 1699,
    perMealPrice: 56.6,
    originalPrice: 2100,
    savings: 401,
    deliveryTimeWindow: 'Daily at 8:00 PM - 8:30 PM',
    features: [
      '30 Homestyle Dinners with soft phulkas',
      'Special Sunday feast included',
      'Guaranteed hot delivery in peak study hours',
      'Instant WhatsApp concierge support',
      'Flexible 5-day pause notice'
    ],
    isPopular: false
  },
  {
    id: 'sub-fullday',
    name: 'Full-Day Campus Plan',
    category: 'full_day',
    tagline: 'Complete nutrition sorted: Breakfast + Wholesome Lunch + Warm Dinner',
    mealsCount: 90,
    monthlyPrice: 3999,
    perMealPrice: 44.4,
    originalPrice: 5400,
    savings: 1401,
    deliveryTimeWindow: '8:30 AM · 1:15 PM · 8:15 PM',
    features: [
      '90 Complete Meals (Breakfast, Lunch & Dinner)',
      'Maximum savings: Only ₹44.4 per full meal',
      'Free Sunday Sweet / Dessert included',
      'Priority delivery during rush hours',
      'Unlimited pause & resume for college holidays',
      'Free Fresh Box stainless steel bottle'
    ],
    isPopular: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'DGUFIRST',
    discountType: 'flat',
    value: 20,
    minOrder: 50,
    description: 'Flat ₹20 off on your first Fresh Box order',
    isActive: true
  },
  {
    code: 'EXAMFUEL',
    discountType: 'percent',
    value: 15,
    minOrder: 100,
    description: '15% off up to ₹40 on orders above ₹100 during exam season',
    isActive: true
  },
  {
    code: 'HOSTELMATE',
    discountType: 'flat',
    value: 30,
    minOrder: 150,
    description: 'Flat ₹30 off on group orders above ₹150',
    isActive: true
  }
];

export const INITIAL_USER: StudentProfile = {
  studentName: 'Ayush Sharma',
  email: 'ayush.0251mba691@dgu.ac.in',
  phone: '+91 98765 43210',
  studentId: 'DGU-2024-MBA-691',
  hostel: 'DGU Boys Hostel 1 (Block A - Ground & 1st Floor)',
  roomNo: 'Room 204, 2nd Floor',
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

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FB-8942',
    items: [
      {
        meal: INITIAL_MEALS[0],
        quantity: 1
      },
      {
        meal: INITIAL_MEALS[4],
        quantity: 1
      }
    ],
    subtotal: 110,
    deliveryFee: 0,
    discount: 20,
    couponCode: 'DGUFIRST',
    totalAmount: 90,
    status: 'out_for_delivery',
    createdAt: 'Today, 1:12 PM',
    deliverySlot: 'Immediate (20-25 mins)',
    studentName: 'Ayush Sharma',
    studentId: 'DGU-2024-MBA-691',
    hostel: 'DGU Boys Hostel 1 (Block A - Ground & 1st Floor)',
    roomNo: 'Room 204',
    phone: '+91 98765 43210',
    paymentMethod: 'upi',
    estimatedDeliveryTime: '12 mins (Arriving ~1:35 PM)',
    deliveryPartner: {
      name: 'Ramesh Patel',
      phone: '+91 98234 56781',
      vehicle: 'Electric Green Hero Scooter (MP-09-FB-104)',
      currentLocation: 'Passing DGU Campus Main Gate 2',
      avatarText: 'RP'
    },
    notes: 'Please call once arrived at Hostel Gate 1'
  },
  {
    id: 'FB-8819',
    items: [
      {
        meal: INITIAL_MEALS[2],
        quantity: 1
      }
    ],
    subtotal: 75,
    deliveryFee: 10,
    discount: 0,
    totalAmount: 85,
    status: 'delivered',
    createdAt: 'Yesterday, 8:15 PM',
    deliverySlot: 'Dinner Slot (8:00 PM)',
    studentName: 'Ayush Sharma',
    studentId: 'DGU-2024-MBA-691',
    hostel: 'DGU Boys Hostel 1 (Block A - Ground & 1st Floor)',
    roomNo: 'Room 204',
    phone: '+91 98765 43210',
    paymentMethod: 'cod',
    deliveryPartner: {
      name: 'Suresh Kumar',
      phone: '+91 98111 22334',
      vehicle: 'Bajaj Pulsar (MP-09-AZ-4921)',
      currentLocation: 'Delivered',
      avatarText: 'SK'
    }
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    studentName: 'Priya Mehra',
    hostel: 'Sarojini Girls Hostel',
    rating: 5,
    comment: 'The dal and rotis genuinely taste like home! Finally a clean, affordable option for us hostel students without oily canteen food.',
    mealName: 'Dal, Rice, Roti & Sabzi Thali',
    date: 'Yesterday'
  },
  {
    id: 'rev-2',
    studentName: 'Rohan Verma',
    hostel: 'Boys Hostel 2 (Tech Wing)',
    rating: 5,
    comment: 'The monthly lunch plan saved my semester. Never have to worry about missing lunch between back-to-back engineering labs.',
    mealName: 'Lunch Plan Subscription',
    date: '2 days ago'
  },
  {
    id: 'rev-3',
    studentName: 'Sneha Kulkarni',
    hostel: 'Tagore Student PG',
    rating: 4,
    comment: 'Very punctual delivery and the eco-friendly box keeps the food steaming hot. Pricing at ₹60 is totally reasonable.',
    mealName: 'Paneer Rice Bowl',
    date: '3 days ago'
  }
];

// Startup Business Model & Economics (for university panel review and admin)
export const BUSINESS_MODEL = {
  sellingPricePerMeal: 60,
  variableCostPerMeal: 40,
  contributionMargin: 20, // 33.3% margin
  monthlyFixedCost: 15000,
  breakEvenMealsMonth: 750, // 15000 / 20 = 750 meals/mo (~25 daily subscribers)
  targetRegularCustomers: 100, // 100 * 30 = 3000 meals
  obtainableMarket: 300,
  projectedMonthlyRevenueAtTarget: 180000, // 100 * 30 * 60
  projectedMonthlyProfitAtTarget: 45000, // (3000 * 20) - 15000
  hygieneCheckpoints: [
    'Daily temperature checks of kitchen staff',
    'Triple-wash for all vegetables with purified RO water',
    'Food-grade recyclable heat-sealed meal trays',
    'Zero palm oil policy; only 100% refined mustard/sunflower oil',
    'Clean campus kitchen inspected by DGU student committee'
  ]
};
