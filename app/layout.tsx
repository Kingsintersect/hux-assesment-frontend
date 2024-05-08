// RootLayout.tsx

import React, { ReactNode } from 'react';
import Navigation from './ui/Navigation';
import { AccessTokenProvider } from './actions/accessTokenContext';
import { inter } from './ui/fonts';
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from './actions/AuthContext';

export const metadata: Metadata = {
  title: {
    template: '%s | HUX Contact Registry',
    default: 'HUX Contact Registry',
  },
  description: "Create and manage contact informations",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <AuthProvider>
            <AccessTokenProvider>
              <Navigation />
              {children}
            </AccessTokenProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;














// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navigation from "./ui/Navigation";

// const inter = Inter({ subsets: ["latin"] });


// export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex min-h-screen flex-col items-center justify-between pb-10">
//           <Navigation />
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }
