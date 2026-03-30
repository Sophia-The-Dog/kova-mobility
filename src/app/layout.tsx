import type { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kovamobility.com'),
  title: {
    default: 'Kova Mobility | Reliable Transportation | Panama City Beach, FL',
    template: '%s | Kova Mobility',
  },
  description:
    'Pre-scheduled, fixed-price transportation in Panama City Beach. Your dedicated driver. The same stop, the same time — every day you need to be somewhere.',
  openGraph: {
    siteName: 'Kova Mobility',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/hero-index.webp', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.kovamobility.com' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer=window.dataLayer||[];
                function gtag(){dataLayer.push(arguments);}
                gtag('js',new Date());
                gtag('config','${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${clarityId}");
            `}
          </Script>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 relative z-[1]">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}