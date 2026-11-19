export type MealCategory = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  image: string;
  isVeg: boolean;
  calories: number;
  prepTime: string;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  isTodaySpecial?: boolean;
  tags?: string[];
}

export interface CartItem {
  meal: Meal;
  quantity: number;
}

export type OrderStatus = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  currentLocation: string;
  avatarText: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  deliverySlot: string;
  studentName: string;
  studentId: string;
  hostel: string;
  roomNo: string;
  phone: string;
  paymentMethod: 'upi' | 'cod' | 'card';
  deliveryPartner?: DeliveryPartner;
  estimatedDeliveryTime?: string;
  notes?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  category: 'daily' | 'lunch' | 'dinner' | 'full_day';
  tagline: string;
  mealsCount: number;
  monthlyPrice: number;
  perMealPrice: number;
  originalPrice: number;
  savings: number;
  deliveryTimeWindow: string;
  features: string[];
  isPopular?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'flat' | 'percent';
  value: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface StudentProfile {
  studentName: string;
  email: string;
  phone: string;
  studentId: string;
  hostel: string;
  roomNo: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  activeSubscription?: {
    planId: string;
    planName: string;
    startDate: string;
    endDate: string;
    mealsRemaining: number;
    status: 'active' | 'paused';
    deliverySlot: string;
  };
}

export interface ReviewItem {
  id: string;
  studentName: string;
  hostel: string;
  rating: number;
  comment: string;
  mealName: string;
  date: string;
}
