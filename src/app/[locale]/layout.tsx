import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import "../globals.css";
import { logo } from "@/public/assets/index.mjs";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Determine text direction based on locale
  const isRTL = ["ur"].includes(locale);
  const direction = isRTL ? "rtl" : "ltr";

  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction}>
      <head>
        <link rel="icon" href={logo} type="image/png" />
      </head>
      <body className={direction}>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className={direction}>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
