import { useState, useEffect } from 'react';
import { 
  Meal, 
  CartItem, 
  Order, 
  Coupon, 
  StudentProfile, 
  SubscriptionPlan, 
  ReviewItem, 
  OrderStatus 
} from './types';
import { 
  INITIAL_MEALS, 
  INITIAL_ORDERS, 
  INITIAL_COUPONS, 
  INITIAL_SUBSCRIPTION_PLANS, 
  INITIAL_USER, 
  INITIAL_REVIEWS 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { SubscriptionScreen } from './components/SubscriptionScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { MyOrdersScreen } from './components/MyOrdersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { HygieneModal } from './components/HygieneModal';
import { Toast } from './components/Toast';

export default function App() {
  // Persistent State
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('freshbox_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('freshbox_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('freshbox_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [user, setUser] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('freshbox_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('freshbox_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('freshbox_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // UI state
  const [currentView, setCurrentView] = useState<string>('home');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [cartNotes, setCartNotes] = useState<string>('');
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(orders[0] || null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHygieneModalOpen, setIsHygieneModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('freshbox_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('freshbox_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('freshbox_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('freshbox_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('freshbox_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('freshbox_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (meal: Meal) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { meal, quantity: 1 }];
    });
    showToast(`Added ${meal.name} to cart`);
  };

  const handleUpdateQuantity = (mealId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.meal.id === mealId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast('Cart cleared');
  };

  // Order operations
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setCartNotes('');
    setTrackingOrder(newOrder);
    setCurrentView('tracking');
    showToast(`Order #${newOrder.id} placed! Kitchen received.`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder((prev) => (prev ? { ...prev, status } : null));
    }
    showToast(`Order status updated to: ${status.replace(/_/g, ' ')}`);
  };

  const handleReorder = (order: Order) => {
    // Add all items from order to cart
    setCart((prev) => {
      const updated = [...prev];
      for (const item of order.items) {
        const found = updated.find((u) => u.meal.id === item.meal.id);
        if (found) {
          found.quantity += item.quantity;
        } else {
          updated.push({ ...item });
        }
      }
      return updated;
    });
    setCurrentView('cart');
    showToast('Items added back to your cart');
  };

  // Subscription operations
  const handleSubscribe = (
    plan: SubscriptionPlan,
    details: { startDate: string; deliverySlot: string; hostel: string; roomNo: string }
  ) => {
    const updatedUser: StudentProfile = {
      ...user,
      hostel: details.hostel,
      roomNo: details.roomNo,
      activeSubscription: {
        planId: plan.id,
        planName: plan.name,
        startDate: details.startDate,
        endDate: '2026-11-05',
        mealsRemaining: plan.mealsCount,
        status: 'active',
        deliverySlot: details.deliverySlot
      }
    };
    setUser(updatedUser);
    showToast(`Subscribed to ${plan.name}!`);
  };

  const handleToggleSubscriptionPause = () => {
    if (!user.activeSubscription) return;
    const currentStatus = user.activeSubscription.status;
    const nextStatus = currentStatus === 'active' ? 'paused' : 'active';
    setUser((prev) => ({
      ...prev,
      activeSubscription: prev.activeSubscription
        ? { ...prev.activeSubscription, status: nextStatus }
        : undefined
    }));
    showToast(
      nextStatus === 'paused'
        ? 'Meal plan paused for college leave'
        : 'Meal plan resumed! Deliveries active.'
    );
  };

  // Review operations
  const handleAddReview = (orderId: string, rating: number, comment: string) => {
    const order = orders.find((o) => o.id === orderId);
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      studentName: user.studentName || 'DGU Student',
      hostel: user.hostel || 'Hostel 1',
      rating,
      comment,
      mealName: order ? order.items.map((i) => i.meal.name).join(', ') : 'Hostel Meal',
      date: 'Today'
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for rating your campus meal!');
  };

  // Admin operations
  const handleAddMeal = (newMealData: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...newMealData,
      id: `m-${Date.now()}`
    };
    setMeals((prev) => [newMeal, ...prev]);
    showToast(`Added ${newMeal.name} to menu`);
  };

  const handleUpdateMeal = (mealId: string, updates: Partial<Meal>) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, ...updates } : m))
    );
    showToast('Meal updated');
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== mealId));
    showToast('Meal removed from catalog');
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated');
  };

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon ${newCoupon.code} created`);
  };

  // Navigation helper
  const handleNavigate = (view: string) => {
    if (view === 'home-why') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('why-freshbox');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (view === 'admin') {
      setIsAdmin(true);
      return;
    }
    if (view === 'tracking') {
      if (!trackingOrder && orders.length > 0) {
        setTrackingOrder(orders[0]);
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active order for banner
  const activeOrder = orders.find(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <Navbar
        currentView={isAdmin ? 'admin' : currentView}
        onNavigate={(view) => {
          if (isAdmin) setIsAdmin(false);
          handleNavigate(view);
        }}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        userName={user.studentName}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin((prev) => !prev)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isLoggedIn={user.isLoggedIn}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminDashboard
            meals={meals}
            orders={orders}
            coupons={coupons}
            reviews={reviews}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddMeal={handleAddMeal}
            onUpdateMeal={handleUpdateMeal}
            onDeleteMeal={handleDeleteMeal}
            onToggleCoupon={handleToggleCoupon}
            onAddCoupon={handleAddCoupon}
            onExitAdmin={() => setIsAdmin(false)}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <HomeScreen
                userName={user.studentName}
                hostel={user.hostel}
                meals={meals}
                activeOrder={activeOrder}
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
                onOpenHygieneModal={() => setIsHygieneModalOpen(true)}
              />
            )}

            {currentView === 'menu' && (
              <MenuScreen
                meals={meals}
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}

            {currentView === 'cart' && (
              <CartScreen
                cart={cart}
                coupons={coupons}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={setAppliedCoupon}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onProceedToCheckout={() => setCurrentView('checkout')}
                onNavigateToMenu={() => setCurrentView('menu')}
                notes={cartNotes}
                onNotesChange={setCartNotes}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutScreen
                cart={cart}
                user={user}
                appliedCoupon={appliedCoupon}
                notes={cartNotes}
                onBackToCart={() => setCurrentView('cart')}
                onOrderPlaced={handleOrderPlaced}
              />
            )}

            {currentView === 'subscription' && (
              <SubscriptionScreen
                plans={INITIAL_SUBSCRIPTION_PLANS}
                user={user}
                onSubscribe={handleSubscribe}
                onNavigateToHome={() => setCurrentView('home')}
              />
            )}

            {currentView === 'tracking' && trackingOrder && (
              <OrderTrackingScreen
                order={trackingOrder}
                onUpdateStatus={handleUpdateOrderStatus}
                onNavigateToOrders={() => setCurrentView('orders')}
                onNavigateToHome={() => setCurrentView('home')}
              />
            )}

            {currentView === 'orders' && (
              <MyOrdersScreen
                orders={orders}
                onTrackOrder={(order) => {
                  setTrackingOrder(order);
                  setCurrentView('tracking');
                }}
                onReorder={handleReorder}
                onNavigateToMenu={() => setCurrentView('menu')}
                onAddReview={handleAddReview}
              />
            )}

            {currentView === 'profile' && (
              <ProfileScreen
                user={user}
                onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
                onToggleSubscriptionPause={handleToggleSubscriptionPause}
                onLogout={() => {
                  setUser((prev) => ({ ...prev, isLoggedIn: false }));
                  showToast('Logged out of student account');
                }}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenHygieneModal={() => setIsHygieneModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Thumb Navigation */}
      <BottomNav
        currentView={isAdmin ? 'admin' : currentView}
        onNavigate={(view) => {
          if (view === 'admin') {
            setIsAdmin(true);
            return;
          }
          if (isAdmin) setIsAdmin(false);
          handleNavigate(view);
        }}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        isAdmin={isAdmin}
      />

      {/* Global Modals & Notifications */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(newProfile) => {
          setUser(newProfile);
          showToast(`Welcome, ${newProfile.studentName}!`);
        }}
      />

      <HygieneModal
        isOpen={isHygieneModalOpen}
        onClose={() => setIsHygieneModalOpen(false)}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
