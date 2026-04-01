import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'success' | 'danger' | 'ghost' | 'outline';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  danger:  'bg-rose-600 hover:bg-rose-500 text-white',
  ghost:   'bg-white/10 hover:bg-white/20 text-white',
  outline: 'border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10',
};

const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-base', lg: 'px-7 py-3.5 text-lg' };

export default function Button({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading…
        </span>
      ) : children}
    </button>
  );
}

