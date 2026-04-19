import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Synapse — Equipo Inteligente con IA",
  description: "Powered by Proarte AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-50 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          {/* pt-14 = mobile top bar height; pb-16 = mobile bottom tab bar; lg resets both */}
          <main className="flex-1 overflow-auto pt-14 pb-16 lg:pt-0 lg:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
