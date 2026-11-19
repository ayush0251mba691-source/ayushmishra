import { X, ShieldCheck, Check, Droplets, Thermometer, Box, Sparkles } from 'lucide-react';
import { BUSINESS_MODEL } from '../data/mockData';

interface HygieneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HygieneModal({ isOpen, onClose }: HygieneModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-100 relative animate-in fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 space-y-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Campus Health Verification
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Fresh Box Hygiene & Quality Pledge</h2>
          <p className="text-xs text-emerald-100/80">
            Why DGU students trust our kitchen over outside street vendors and uninspected dhabas.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="space-y-3">
            {BUSINESS_MODEL.hygieneCheckpoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Safety Standard {idx + 1}</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-neutral-700 space-y-1.5">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Student Council Kitchen Audit</span>
            </h4>
            <p className="leading-relaxed text-[11px] text-neutral-600">
              Fresh Box operations are open for surprise visits by DGU Hostel Wardens and Student Welfare Committee members on any weekday morning between 10:00 AM and 11:30 AM.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            I Understand & Trust Fresh Box
          </button>
        </div>
      </div>
    </div>
  );
}
