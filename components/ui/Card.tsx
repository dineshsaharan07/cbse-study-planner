'use client';

export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 shadow-md p-4 ${className}`}
    >
      {children}
    </div>
  );
}
