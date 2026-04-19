"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, BarChart3, Zap } from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/panel-empleado", label: "Mi Panel", icon: LayoutDashboard, desc: "Empleado" },
  { href: "/motor-ia", label: "Motor IA", icon: Bot, desc: "Análisis", live: true },
  { href: "/direccion", label: "Dirección", icon: BarChart3, desc: "Insights" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-slate-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
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
        <div className="text-xs font-semibold text-slate-700">Conectian</div>
        <div className="text-[10px] text-slate-400">200 empleados · 8 equipos</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider px-2 mb-2">Módulos</div>
        {nav.map(({ href, label, icon: Icon, desc, live }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
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
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
                    </span>
                  )}
                </div>
                <div className={clsx("text-[10px]", active ? "text-indigo-400" : "text-slate-400")}>{desc}</div>
              </div>
            </Link>
          );
        })}
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

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="text-[9px] text-slate-300 text-center">
          Synapse · Powered by Proarte AI · v1.2.4
        </div>
      </div>
    </aside>
  );
}
