import { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { VegBadge } from './VegBadge';
import { 
  Clock, 
  RotateCcw, 
  ChevronRight, 
  Star, 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';

interface MyOrdersScreenProps {
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
  onNavigateToMenu: () => void;
  onAddReview: (orderId: string, rating: number, comment: string) => void;
}

export function MyOrdersScreen({
  orders,
  onTrackOrder,
  onReorder,
  onNavigateToMenu,
  onAddReview
}: MyOrdersScreenProps) {
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Confirmed</span>;
      case 'preparing':
        return <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">Preparing in Kitchen</span>;
      case 'out_for_delivery':
        return <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-pulse">Out for Delivery</span>;
      case 'delivered':
        return <span className="text-[11px] font-bold text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">Delivered</span>;
      case 'cancelled':
        return <span className="text-[11px] font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">Cancelled</span>;
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewOrder) return;
    onAddReview(reviewOrder.id, reviewRating, reviewComment);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewOrder(null);
      setReviewSuccess(false);
      setReviewComment('');
    }, 1000);
  };

  if (orders.length === 0) {
    return (
      <div className="pb-24 md:pb-16 max-w-xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-4">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">No Orders Yet</h2>
        <p className="text-xs sm:text-sm text-neutral-500">
          You haven't placed any food orders on Fresh Box yet. Hungry? Check out today's hostel menu.
        </p>
        <button
          onClick={onNavigateToMenu}
          className="mt-2 h-10 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Order Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          My Food Orders
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Track active campus meal deliveries and reorder your past favorites
        </p>
      </div>

      {/* Active Orders Section */}
      {activeOrders.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Active Orders ({activeOrders.length})
          </h2>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-neutral-900">#{order.id}</span>
                    <span className="text-xs text-neutral-400">· {order.createdAt}</span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      {order.items.map(i => `${i.quantity}x ${i.meal.name}`).join(', ')}
                    </h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{order.hostel} · {order.roomNo}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <button
                    onClick={() => onTrackOrder(order)}
                    className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Track Live</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Previous Orders Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Previous Orders ({pastOrders.length})
        </h2>

        <div className="space-y-3">
          {pastOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4 hover:border-neutral-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-neutral-900">#{order.id}</span>
                  <span className="text-xs text-neutral-400">· {order.createdAt}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-sm font-bold font-mono text-neutral-900">
                  ₹{order.totalAmount} <span className="text-xs font-normal text-neutral-500">({order.paymentMethod.toUpperCase()})</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.meal.id} className="flex items-center justify-between text-xs text-neutral-700">
                    <div className="flex items-center gap-2">
                      <VegBadge isVeg={item.meal.isVeg} size="sm" />
                      <span>
                        <strong className="font-mono">{item.quantity}x</strong> {item.meal.name}
                      </span>
                    </div>
                    <span className="font-mono text-neutral-500">₹{item.meal.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
                <p className="text-neutral-500 text-[11px] truncate max-w-xs">
                  Delivered to {order.hostel}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReviewOrder(order)}
                    className="h-8 px-3 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Star className="w-3 h-3 text-amber-500" />
                    <span>Rate Meal</span>
                  </button>

                  <button
                    onClick={() => onReorder(order)}
                    className="h-8 px-3.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-in fade-in">
            <button
              onClick={() => setReviewOrder(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-neutral-900">Rate Your Fresh Box Meal</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Order #{reviewOrder.id} · {reviewOrder.items.map(i => i.meal.name).join(', ')}
            </p>

            {reviewSuccess ? (
              <div className="my-6 text-center py-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-bold">Thank you for your feedback!</p>
                <p className="text-xs text-emerald-700 mt-0.5">Your review helps us keep campus meals delicious.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    How was the taste, hygiene & punctuality?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= reviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-neutral-600 ml-2">
                      {reviewRating === 5 ? 'Excellent!' : reviewRating === 4 ? 'Good' : 'Average'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Student Comments & Suggestions
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="e.g. Dal was hot and tasty, delivered right on time before exam prep..."
                    className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-emerald-600 text-neutral-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
