import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Metadata } from "next";

import { Providers } from "@/app/components/providers";
import SideNav from "@/app/components/sidenav";
import theme from "@/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | TanStack Query",
    default: "TanStack query demo project",
  },
  description: "Showcase of the TanStack useQuery in Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
              <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                  <SideNav />
                </div>
                <div className="flex-grow px-3 md:overflow-y-auto md:px-10 mt-4">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
