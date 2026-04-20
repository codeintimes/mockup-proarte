"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, BarChart3, Zap, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const nav = [
  { href: "/panel-empleado", label: "Mi Panel", icon: LayoutDashboard, desc: "Empleado" },
  { href: "/motor-ia", label: "Motor IA", icon: Bot, desc: "Análisis", live: true },
  { href: "/direccion", label: "Dirección", icon: BarChart3, desc: "Insights" },
];

function NavLinks({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <>
      {nav.map(({ href, label, icon: Icon, desc, live }) => {
        const active = pathname === href || pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              active
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Icon size={16} className={active ? "text-indigo-600" : "text-slate-400"} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span>{label}</span>
                {live && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
                )}
              </div>
              <div className={clsx("text-[10px]", active ? "text-indigo-400" : "text-slate-400")}>{desc}</div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ── Desktop / Tablet sidebar ── */}
      <aside className="hidden lg:flex w-60 min-h-screen bg-white border-r border-slate-200 flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-none">Synapse</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Tu equipo, optimizado</div>
            </div>
          </div>
        </div>

        {/* Empresa */}
        <div className="px-5 py-3 border-b border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Empresa</div>
          <div className="text-xs font-semibold text-slate-700">Velora</div>
          <div className="text-[10px] text-slate-400">200 empleados · 8 equipos</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-2">Módulos</div>
          <NavLinks pathname={pathname} />
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
              SM
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">Sara Martínez</div>
              <div className="text-[10px] text-slate-400">Product Manager</div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="text-[9px] text-slate-300 text-center">
            Synapse · Powered by Proarte AI · v1.2.4
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-slate-900">Synapse</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          {/* drawer */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">Synapse</div>
                  <div className="text-[10px] text-slate-400">Tu equipo, optimizado</div>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Empresa</div>
              <div className="text-xs font-semibold text-slate-700">Velora</div>
              <div className="text-[10px] text-slate-400">200 empleados · 8 equipos</div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-2">Módulos</div>
              <NavLinks pathname={pathname} onClose={() => setDrawerOpen(false)} />
            </nav>

            <div className="px-4 py-4 border-t border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                  SM
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">Sara Martínez</div>
                  <div className="text-[10px] text-slate-400">Product Manager</div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-5">
              <div className="text-[9px] text-slate-300 text-center">
                Synapse · Powered by Proarte AI · v1.2.4
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile bottom tab bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex">
        {nav.map(({ href, label, icon: Icon, live }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors",
                active ? "text-indigo-600" : "text-slate-400"
              )}
            >
              <div className="relative">
                <Icon size={20} />
                {live && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
