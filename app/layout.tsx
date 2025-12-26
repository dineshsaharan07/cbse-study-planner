import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-brand-50 dark:from-ink-900 dark:to-ink-700">
        <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
