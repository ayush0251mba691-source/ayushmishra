import { useState, useMemo } from 'react';
import { Meal, CartItem } from '../types';
import { VegBadge } from './VegBadge';
import { Search, Plus, Minus, Star, Clock, Flame } from 'lucide-react';

interface MenuScreenProps {
  meals: Meal[];
  cart: CartItem[];
  onAddToCart: (meal: Meal) => void;
  onUpdateQuantity: (mealId: string, delta: number) => void;
  initialCategory?: string;
}

export function MenuScreen({
  meals,
  cart,
  onAddToCart,
  onUpdateQuantity,
  initialCategory = 'all'
}: MenuScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snacks', label: 'Snacks' }
  ];

  // Helper to get quantity in cart
  const getItemQuantity = (mealId: string) => {
    const item = cart.find(c => c.meal.id === mealId);
    return item ? item.quantity : 0;
  };

  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      // Category match
      if (selectedCategory !== 'all' && meal.category !== selectedCategory) {
        return false;
      }
      // Diet match
      if (dietFilter === 'veg' && !meal.isVeg) return false;
      if (dietFilter === 'nonveg' && meal.isVeg) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = meal.name.toLowerCase().includes(query);
        const matchesDesc = meal.description.toLowerCase().includes(query);
        const matchesTag = meal.tags?.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesTag;
      }

      return true;
    });
  }, [meals, selectedCategory, dietFilter, searchQuery]);

  return (
    <div className="pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Title & Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Fresh & Budget-Friendly
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            DGU Hostel Menu
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Prepared fresh twice daily · Average meal price ₹60 · 100% Student Approved
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search thali, paratha, bowls..."
            className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-neutral-900 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Bars */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-y border-neutral-200 py-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Veg / Non-Veg Diet Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setDietFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              dietFilter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietFilter('veg')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              dietFilter === 'veg' ? 'bg-white text-emerald-800 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <VegBadge isVeg={true} size="sm" />
            <span>Veg Only</span>
          </button>
          <button
            onClick={() => setDietFilter('nonveg')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              dietFilter === 'nonveg' ? 'bg-white text-red-800 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <VegBadge isVeg={false} size="sm" />
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      {/* Meals Grid */}
      {filteredMeals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8">
          <p className="text-base font-semibold text-neutral-800">No meals found</p>
          <p className="text-xs text-neutral-500 mt-1">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setDietFilter('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMeals.map((meal) => {
            const quantity = getItemQuantity(meal.id);

            return (
              <div
                key={meal.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                    <VegBadge isVeg={meal.isVeg} size="sm" />
                    <span className="text-[11px] font-bold text-neutral-800 capitalize">
                      {meal.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{meal.rating}</span>
                    <span className="text-neutral-400 text-[10px]">({meal.reviewsCount})</span>
                  </div>

                  {meal.isTodaySpecial && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-neutral-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                      Chef Special
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base leading-snug">
                      {meal.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                      {meal.description}
                    </p>

                    {/* Metadata clean text */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-2.5">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{meal.calories} kcal</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{meal.prepTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold">Student Price</span>
                      <div className="text-xl font-bold font-mono text-neutral-900">
                        ₹{meal.price}
                      </div>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => onAddToCart(meal)}
                        disabled={!meal.isAvailable}
                        className={`h-9 px-4 text-xs font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                          meal.isAvailable
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{meal.isAvailable ? 'Add to Cart' : 'Sold Out'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-emerald-50 border border-emerald-300 rounded-lg h-9 px-1">
                        <button
                          onClick={() => onUpdateQuantity(meal.id, -1)}
                          className="w-7 h-7 rounded-md bg-white text-emerald-800 flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-emerald-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(meal.id, 1)}
                          className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
