import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from '@/lib/utils'
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font--sans'
});

// export const metadata: Metadata = {
//   title: "CarePulse",
//   description: "A healthcare management system",
// };

export const metadata = (async () => {
  const t = await getTranslations("common");
  return {
    title: t('app_name'),
    description: t('app_description')
  }
})

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {

  // unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    
      <html lang={locale}>
        <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
              >
                {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
 
  );
}
