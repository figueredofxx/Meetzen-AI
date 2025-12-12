import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: () => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const icons = {
    success: <CheckCircle2 size={18} className="text-green-600" />,
    error: <AlertCircle size={18} className="text-red-600" />,
    info: <Info size={18} className="text-blue-600" />,
    warning: <AlertTriangle size={18} className="text-amber-600" />
  };

  const borderColors = {
    success: 'border-green-200 bg-white',
    error: 'border-red-200 bg-white',
    info: 'border-blue-200 bg-white',
    warning: 'border-amber-200 bg-white'
  };

  return (
    <div className={`pointer-events-auto min-w-[300px] max-w-sm flex items-start gap-3 p-4 rounded-xl border shadow-lg shadow-zinc-200/50 transform transition-all animate-in slide-in-from-right-full duration-300 ${borderColors[toast.type]}`}>
      <div className="mt-0.5 flex-shrink-0">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-zinc-900 leading-tight">{toast.title}</h4>
        {toast.message && <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{toast.message}</p>}
      </div>
      <button onClick={onRemove} className="text-zinc-400 hover:text-zinc-600 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;