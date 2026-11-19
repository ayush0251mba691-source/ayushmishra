import { Home, UtensilsCrossed, CalendarCheck, Clock, User, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  isAdmin: boolean;
}

export function BottomNav({ currentView, onNavigate, cartCount, isAdmin }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'subscription', label: 'Plans', icon: CalendarCheck },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: isAdmin ? 'admin' : 'profile', label: isAdmin ? 'Admin' : 'Profile', icon: isAdmin ? ShieldCheck : User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentView === tab.id ||
            (tab.id === 'orders' && currentView === 'tracking');

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[44px] cursor-pointer transition-colors relative ${
                isActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                {tab.id === 'orders' && cartCount > 0 && currentView !== 'cart' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
