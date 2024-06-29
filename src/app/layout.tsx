
"use client"

import { Poppins } from "next/font/google";
// import { Metadata } from "next";
import "./main.scss";
import "./scss/form.scss";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

// export const metadata: Metadata = {
//   title: "Baymax",
//   description: "Scan products to instantly identify potential allergens and ensure safety for individuals with food allergies. Personalized alerts and safe alternatives help manage dietary restrictions easily.",
//   manifest: "/manifest.json"
// }

export default function RootLayout({ children }) {

  const pathname = usePathname();

  useEffect(() => {
    const updateBodyClass = () => {
      if (pathname) { // Ensure pathname is defined
        // Generate a class name from the pathname
        const pageClass = pathname === '/' ? 'home' : pathname.replace(/\//g, '-').replace(/^-|-$/g, '');
        // Apply the class to the body element
        document.body.className = poppins.className + ' body ' + pageClass;
      }
    };

    // Update body class on initial render and pathname change
    updateBodyClass();
  }, [pathname]);

  return (
    <html lang="en">
      <head>
       <title>{'Allergic Content Identification App'}</title>
        <meta name="description" content={'Scan products to instantly identify potential allergens and ensure safety for individuals with food allergies.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e85695" />
      </head>
      <body className={poppins.className + ' body '}>{children}</body>
    </html>
  );
}
