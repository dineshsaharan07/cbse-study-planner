'use client';

export default function Text({
  children,
  size = 'base',
  weight = 'normal',
  className = '',
}: {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size];

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[weight];

  return (
    <p
      className={`${sizeClasses} ${weightClasses} text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </p>
  );
}
