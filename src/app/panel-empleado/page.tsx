"use client";

import { useState } from "react";
import {
  Bot,
  Clock,
  Lock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Zap,
  TrendingUp,
  Calendar,
} from "lucide-react";
import clsx from "clsx";
import { tasks, currentUser } from "@/lib/data";

const emotionOptions = [
  { label: "Muy cansada", emoji: "😴", value: 1 },
  { label: "Cansada", emoji: "😕", value: 2 },
  { label: "Normal", emoji: "😐", value: 3 },
  { label: "Bien", emoji: "🙂", value: 4 },
  { label: "Con energía", emoji: "⚡", value: 5 },
];

function PriorityBadge({ score }: { score: number }) {
  if (score >= 8.5) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {score}
    </span>
  );
  if (score >= 6) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {score}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {score}
    </span>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Bloqueada") return <Lock size={13} className="text-slate-400" />;
  if (status === "En progreso") return <RefreshCw size={13} className="text-indigo-500 animate-spin" />;
  if (status === "Hoy") return <Calendar size={13} className="text-amber-500" />;
  if (status === "Recurrente") return <TrendingUp size={13} className="text-slate-400" />;
  return <CheckCircle2 size={13} className="text-slate-300" />;
}

export default function PanelEmpleado() {
  const [selectedEmotion, setSelectedEmotion] = useState(4);
  const [load, setLoad] = useState(8);
  const [suggestionAccepted, setSuggestionAccepted] = useState(false);

  const capacityPct = 87;

  return (
    <div className="p-6 max-w-[1400px] fade-in">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Buenos días, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-slate-500">Lunes, 19 de abril · Equipo Producto</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 text-indigo-600">
            <Bot size={13} />
            Sistema en aprendizaje · Día {currentUser.dayOnSystem} con Conectian
          </div>
        </div>

        {/* AI Banner */}
        <div className="mt-3 bg-indigo-600 text-white rounded-xl px-4 py-3 flex items-start gap-3">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-indigo-200" />
          <p className="text-sm leading-snug">
            Tienes <strong>6 tareas</strong> hoy. He reorganizado tu agenda para que puedas entregar el{" "}
            <strong>Informe Q2</strong> antes de tu reunión de las 14:00. Tu carga actual es{" "}
            <strong>alta</strong> — te sugiero mover 1 tarea a mañana.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Tasks (2/3) */}
        <div className="col-span-2 space-y-4">
          {/* Task List */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">Tareas del día</h2>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 font-medium flex items-center gap-1">
                  <Bot size={10} /> Priorizadas por IA
                </span>
              </div>
              <span className="text-xs text-slate-400">Actualizado hace 2 min</span>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="grid grid-cols-[1fr_90px_90px_100px_140px] gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Tarea</span>
                <span>Prioridad IA</span>
                <span>Tiempo est.</span>
                <span>Estado</span>
                <span>Bloqueo</span>
              </div>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={clsx(
                    "grid grid-cols-[1fr_90px_90px_100px_140px] gap-3 px-4 py-3 items-center hover:bg-slate-50 transition-colors group",
                    task.status === "Bloqueada" && "opacity-60"
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={clsx("text-sm font-medium truncate", task.status === "Bloqueada" ? "text-slate-400" : "text-slate-800")}>
                        {task.title}
                      </span>
                      {task.aiReordered && (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 border border-indigo-100 font-medium">
                          <Sparkles size={9} /> Reordenado por IA
                        </span>
                      )}
                      {task.tag && task.tag !== "Reordenado por IA" && (
                        <span className={clsx(
                          "shrink-0 inline-flex items-center text-[10px] px-1.5 py-0.5 rounded font-medium",
                          task.tag === "Automatizable" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                          task.tag === "Entrega hoy" ? "bg-red-50 text-red-600 border border-red-200" :
                          "bg-amber-50 text-amber-600 border border-amber-200"
                        )}>
                          {task.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div><PriorityBadge score={task.priority} /></div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} className="text-slate-300" />
                    {task.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <StatusIcon status={task.status} />
                    {task.status}
                  </div>
                  <div className="text-xs">
                    {task.blocker ? (
                      <span className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle size={11} />
                        <span className="truncate">{task.blocker}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-800">Capacidad del día</h2>
              <span className="text-xs text-slate-400">6h 20min estimadas · día de 8h</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${capacityPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertTriangle size={12} />
                <span className="font-medium">{capacityPct}% de carga</span>
                <span className="text-slate-400">— riesgo de sobrecarga</span>
              </div>
            </div>
            {!suggestionAccepted ? (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Bot size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700">
                    <strong>Sugerencia IA:</strong> Mover &ldquo;Reporte semanal de métricas&rdquo; a mañana — impacto bajo, libera 20 min.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSuggestionAccepted(true)}
                    className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Aceptar
                  </button>
                  <button className="text-xs bg-white border border-amber-200 text-amber-600 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                    Ver opciones
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle2 size={13} />
                Tarea movida a mañana. Tu carga ahora es del 83%.
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={14} className="text-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-800">Sugerencias de la IA</h2>
            </div>
            <div className="space-y-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start justify-between gap-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group">
                <div className="flex items-start gap-2.5">
                  <Zap size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-700 font-medium">El reporte semanal de métricas se genera manualmente cada viernes.</p>
                    <p className="text-xs text-slate-500 mt-0.5">Puedo automatizarlo — ahorrarías ~20 min/semana.</p>
                  </div>
                </div>
                <button className="shrink-0 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Ver <ChevronRight size={12} />
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start justify-between gap-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group">
                <div className="flex items-start gap-2.5">
                  <Calendar size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-700 font-medium">Tienes 3 reuniones esta semana sin agenda definida.</p>
                    <p className="text-xs text-slate-500 mt-0.5">¿Quieres que genere una agenda automática para cada una?</p>
                  </div>
                </div>
                <button className="shrink-0 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Generar <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Emotional check-in + stats (1/3) */}
        <div className="space-y-4">
          {/* Emotional Check-in */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">Check-in emocional</h2>
            <p className="text-xs text-slate-400 mb-3">¿Cómo estás hoy?</p>
            <div className="grid grid-cols-5 gap-1 mb-4">
              {emotionOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedEmotion(opt.value)}
                  className={clsx(
                    "flex flex-col items-center gap-1 py-2 px-1 rounded-lg border transition-all text-center",
                    selectedEmotion === opt.value
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="text-[9px] text-slate-500 leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Carga percibida hoy</span>
                <span className={clsx("font-semibold", load >= 7 ? "text-amber-600" : "text-emerald-600")}>
                  {load}/10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={load}
                onChange={(e) => setLoad(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-300 mt-0.5">
                <span>Baja</span>
                <span>Alta</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
              <Bot size={13} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                Llevas 4 días con carga alta. ¿Quieres que bloquee 30 min de foco esta tarde?
              </p>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Esta semana</h2>
            <div className="space-y-3">
              {[
                { label: "Tareas completadas", value: "8/12", color: "indigo" },
                { label: "Reuniones", value: "4", color: "slate" },
                { label: "Tareas bloqueadas", value: "2", color: "amber" },
                { label: "Tiempo en foco", value: "6.5h", color: "emerald" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className={clsx(
                    "text-xs font-bold",
                    color === "indigo" ? "text-indigo-600" :
                    color === "amber" ? "text-amber-600" :
                    color === "emerald" ? "text-emerald-600" : "text-slate-700"
                  )}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Meeting */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-2">Próxima reunión</h2>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-semibold text-slate-700">Sync de Producto</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Clock size={11} /> Hoy a las 14:00 · 6 asistentes
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5">
                <Bot size={11} className="text-indigo-400" />
                <span className="text-[10px] text-slate-500">Agenda generada automáticamente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
