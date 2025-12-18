"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="protected-layout">
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer className="px-4 md:px-30 border-t border-t-neutral-300">
        <Footer />
      </footer>
    </div>
  );
}
