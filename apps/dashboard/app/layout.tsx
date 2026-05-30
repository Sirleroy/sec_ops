import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SecOps Command Dashboard',
  description: 'Intelligence Transport Platform — Agency & Admin View',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0d0d1a', color: '#e0e0f0', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
