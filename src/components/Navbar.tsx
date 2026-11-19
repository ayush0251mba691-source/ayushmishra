import { ShoppingBag, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  userName?: string;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
}

export function Navbar({
  currentView,
  onNavigate,
  cartCount,
  userName,
  isAdmin,
  onToggleAdmin,
  onOpenLogin,
  isLoggedIn
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-brand text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5">
            <span className="text-emerald-600">Fresh</span>
            <span className="text-amber-500">Box</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mb-1" />
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links (hidden on mobile, visible on desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'home' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'menu' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => onNavigate('subscription')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'subscription' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            Meal Plans
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className={`transition-colors hover:text-emerald-700 cursor-pointer ${
              currentView === 'orders' || currentView === 'tracking' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5' : ''
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => onNavigate('home-why')}
            className="transition-colors hover:text-emerald-700 cursor-pointer text-neutral-600"
          >
            Why Fresh Box
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Admin Switcher for Entrepreneurship review & owner panel */}
          <button
            onClick={onToggleAdmin}
            title={isAdmin ? 'Return to Student View' : 'Open Fresh Box Owner & Entrepreneurship Admin Panel'}
            className={`h-9 px-2.5 sm:px-3 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
              isAdmin
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isAdmin ? 'Admin Active' : 'Owner Panel'}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative h-9 px-3 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span className="hidden xs:inline">Cart</span>
            {cartCount > 0 && (
              <span className="min-w-5 h-5 px-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile or Login */}
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('profile')}
              className={`h-9 px-2.5 sm:px-3 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border ${
                currentView === 'profile'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center">
                {userName ? userName.charAt(0) : 'S'}
              </div>
              <span className="hidden sm:inline max-w-[90px] truncate">{userName || 'Student'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="h-9 px-3.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
