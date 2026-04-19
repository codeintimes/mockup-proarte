"use client";

import {
  Bot,
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
  MessageSquare,
  FileText,
  ChevronRight,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import clsx from "clsx";
import { blockers, lastMeeting, frictionAlerts, aiRecommendations, commStats } from "@/lib/data";

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    critical: { label: "Crítico", cls: "bg-red-50 text-red-600 border-red-200" },
    high: { label: "Alto", cls: "bg-amber-50 text-amber-600 border-amber-200" },
    medium: { label: "Medio", cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  };
  const s = map[severity] ?? map.medium;
  return (
    <span className={clsx("text-[10px] px-2 py-0.5 rounded-full border font-semibold", s.cls)}>
      {s.label}
    </span>
  );
}

function ImpactBadge({ impact }: { impact: string }) {
  const map: Record<string, string> = {
    Crítico: "bg-red-50 text-red-600 border-red-200",
    Alto: "bg-amber-50 text-amber-600 border-amber-200",
    Medio: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  return (
    <span className={clsx("text-[10px] px-2 py-0.5 rounded-full border font-semibold", map[impact] ?? "bg-slate-50 text-slate-500 border-slate-200")}>
      {impact}
    </span>
  );
}

export default function MotorIA() {
  return (
    <div className="p-6 max-w-[1400px] fade-in">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Motor IA</h1>
              <span className="flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full px-2.5 py-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
                Activo
              </span>
            </div>
            <p className="text-sm text-slate-500">Análisis de comunicación y fricción del equipo · Conectian</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            Actualizado hace 3 min
          </div>
        </div>
      </div>

      {/* Comm Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Mensajes sin respuesta >4h", value: commStats.unansweredMessages, icon: MessageSquare, color: "amber", sub: "requieren seguimiento" },
          { label: "Tareas bloqueadas por espera", value: commStats.blockedTasks, icon: Clock, color: "red", sub: "de 47 tareas activas" },
          { label: "Tiempo medio de respuesta", value: commStats.avgResponseTime, icon: TrendingDown, color: "slate", sub: "objetivo: <2h" },
          { label: "Reuniones sin resumen", value: commStats.meetingsWithoutSummary, icon: FileText, color: "amber", sub: "esta semana" },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-slate-500 leading-snug">{label}</span>
              <div className={clsx(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                color === "red" ? "bg-red-50" : color === "amber" ? "bg-amber-50" : "bg-slate-100"
              )}>
                <Icon size={14} className={color === "red" ? "text-red-500" : color === "amber" ? "text-amber-500" : "text-slate-400"} />
              </div>
            </div>
            <div className={clsx(
              "text-2xl font-bold",
              color === "red" ? "text-red-600" : color === "amber" ? "text-amber-600" : "text-slate-700"
            )}>{value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left col: Blockers + Friction */}
        <div className="col-span-2 space-y-5">
          {/* Active Blockers */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">Bloqueos activos</h2>
                <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                  {blockers.length} detectados
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {blockers.map((b) => (
                <div key={b.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={clsx(
                      "flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg",
                      b.severity === "critical" ? "bg-red-50 text-red-700" :
                      b.severity === "high" ? "bg-amber-50 text-amber-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {b.from}
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      esperando a
                      <span className="font-semibold text-slate-700 ml-1">{b.to}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <SeverityBadge severity={b.severity} />
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={11} /> {b.days}d
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 ml-0">
                    <span className="text-slate-400">Motivo:</span> {b.reason}
                  </div>
                  <div className="text-xs text-amber-600 mt-0.5 flex items-center gap-1">
                    <AlertTriangle size={10} /> {b.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Friction Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-800">Fricción detectada</h2>
              <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Bot size={10} /> Análisis IA
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="grid grid-cols-[1fr_140px_110px_80px] gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Problema</span>
                <span>Equipo afectado</span>
                <span>Frecuencia</span>
                <span>Impacto</span>
              </div>
              {frictionAlerts.map((f) => (
                <div key={f.id} className="grid grid-cols-[1fr_140px_110px_80px] gap-3 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={12} className={clsx(
                      "mt-0.5 shrink-0",
                      f.severity === "critical" ? "text-red-500" :
                      f.severity === "high" ? "text-amber-500" : "text-yellow-500"
                    )} />
                    <span className="text-xs text-slate-700">{f.problem}</span>
                  </div>
                  <span className="text-xs text-slate-500">{f.team}</span>
                  <span className="text-xs text-slate-500">{f.frequency}</span>
                  <ImpactBadge impact={f.impact} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={14} className="text-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-800">Recomendaciones IA</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="border border-slate-200 rounded-xl p-3 hover:border-indigo-200 hover:bg-indigo-50/20 transition-colors group">
                  <div className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                    rec.icon === "users" ? "bg-indigo-50" : rec.icon === "zap" ? "bg-amber-50" : "bg-emerald-50"
                  )}>
                    {rec.icon === "users" ? <Users size={15} className="text-indigo-500" /> :
                     rec.icon === "zap" ? <Zap size={15} className="text-amber-500" /> :
                     <Bot size={15} className="text-emerald-500" />}
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mb-1">{rec.title}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed mb-2">{rec.description}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">Ahorro estimado</div>
                      <div className="text-xs font-bold text-emerald-600">{rec.saving}</div>
                    </div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 group-hover:gap-1 transition-all font-medium">
                      Ver <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col: Meeting Summary */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-0.5">
                <h2 className="text-sm font-semibold text-slate-800">Resumen — Última reunión</h2>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Sparkles size={9} /> Generado por IA
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <div className="text-sm font-semibold text-slate-800">{lastMeeting.title}</div>
                <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><Clock size={11} /> {lastMeeting.date} · {lastMeeting.time}</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {lastMeeting.attendees} asistentes</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Duración: {lastMeeting.duration}</div>
              </div>

              <div className="mb-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Decisiones tomadas</div>
                <div className="space-y-1.5">
                  {lastMeeting.decisions.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <Bot size={10} /> Tareas generadas automáticamente
                </div>
                <div className="space-y-2">
                  {lastMeeting.generatedTasks.map((t, i) => (
                    <div key={i} className={clsx(
                      "flex items-start gap-2 p-2 rounded-lg border text-xs",
                      t.done ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white border-slate-200"
                    )}>
                      {t.done
                        ? <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                        : <div className="w-3 h-3 rounded-full border-2 border-indigo-300 mt-0.5 shrink-0" />}
                      <div className="min-w-0">
                        <div className={clsx("font-medium truncate", t.done ? "line-through text-slate-400" : "text-slate-700")}>{t.task}</div>
                        <div className="text-slate-400 mt-0.5">
                          {t.assignee} · vence {t.due}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={14} className="text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-700">Próximo análisis</span>
            </div>
            <p className="text-xs text-indigo-600 leading-relaxed">
              El Motor IA analiza comunicación y tareas cada 15 min. El próximo análisis completo de fricción está programado para <strong>mañana, 08:00</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
