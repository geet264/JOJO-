import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JOJO - Unified Job Finding & Sync Hub',
  description: 'Manage your profile in one place, sync with LinkedIn and Naukri, find 70%+ matched jobs, and track application stages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
