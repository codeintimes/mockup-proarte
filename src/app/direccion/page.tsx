"use client";

import {
  Bot,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Users,
  Activity,
} from "lucide-react";
import clsx from "clsx";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
} from "recharts";
import { teams, kpis, sparklines, criticalAlerts, actionableInsights, emotionalHeatmap } from "@/lib/data";

function TrendIcon({ value }: { value: number }) {
  if (value > 0) return <TrendingUp size={12} className="text-emerald-500" />;
  if (value < 0) return <TrendingDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-slate-400" />;
}

function KpiCard({
  label, value, unit, trend, sparkData, color,
}: {
  label: string; value: number; unit: string; trend: number; sparkData: number[]; color: string;
}) {
  const trendColor = trend > 0 ? "text-emerald-600" : trend < 0 ? "text-red-600" : "text-slate-400";
  const trendBg = trend > 0 ? "bg-emerald-50" : trend < 0 ? "bg-red-50" : "bg-slate-50";

  const sparkPoints = sparkData.map((v, i) => ({ i, v }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-slate-500 leading-snug">{label}</span>
        <span className={clsx("flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded", trendBg, trendColor)}>
          <TrendIcon value={trend} />
          {trend > 0 ? "+" : ""}{trend}{unit === "/5" ? "" : unit === "%" ? "%" : ""}
        </span>
      </div>
      <div className={clsx("text-2xl font-bold mb-1", color)}>
        {value}{unit}
      </div>
      <div className="h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkPoints}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={trend >= 0 ? "#10b981" : "#ef4444"}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-slate-400 mt-1">vs semana anterior</div>
    </div>
  );
}

const heatmapColor = (v: number) => {
  const map: Record<number, string> = {
    1: "bg-red-200 text-red-700",
    2: "bg-orange-100 text-orange-700",
    3: "bg-yellow-100 text-yellow-700",
    4: "bg-emerald-100 text-emerald-700",
    5: "bg-emerald-200 text-emerald-800",
  };
  return map[v] ?? "bg-slate-100 text-slate-500";
};

const heatmapLabel = (v: number) => {
  const map: Record<number, string> = { 1: "😟", 2: "😕", 3: "😐", 4: "🙂", 5: "😊" };
  return map[v] ?? "—";
};

const saturationColor = (v: number) => {
  if (v >= 85) return "#EF4444";
  if (v >= 70) return "#F59E0B";
  return "#10B981";
};

export default function Direccion() {
  const chartData = teams.map((t) => ({
    name: t.name,
    saturation: t.saturation,
    fill: saturationColor(t.saturation),
  }));

  return (
    <div className="p-6 max-w-[1400px] fade-in">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Panel de Dirección</h1>
            <p className="text-sm text-slate-500">Visibilidad de equipo · Conectian · 200 empleados</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full px-2.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
              Datos en tiempo real
            </span>
            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              Sem. del 14 al 19 de abril
            </span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard
          label={kpis.teamHealth.label}
          value={kpis.teamHealth.value}
          unit={kpis.teamHealth.unit}
          trend={kpis.teamHealth.trend}
          sparkData={sparklines.teamHealth}
          color="text-amber-600"
        />
        <KpiCard
          label={kpis.avgLoad.label}
          value={kpis.avgLoad.value}
          unit={kpis.avgLoad.unit}
          trend={kpis.avgLoad.trend}
          sparkData={sparklines.avgLoad}
          color="text-amber-500"
        />
        <KpiCard
          label={kpis.taskCompletion.label}
          value={kpis.taskCompletion.value}
          unit={kpis.taskCompletion.unit}
          trend={kpis.taskCompletion.trend}
          sparkData={sparklines.taskCompletion}
          color="text-emerald-600"
        />
        <KpiCard
          label={kpis.emotionalIndex.label}
          value={kpis.emotionalIndex.value}
          unit={kpis.emotionalIndex.unit}
          trend={kpis.emotionalIndex.trend}
          sparkData={sparklines.emotionalIndex}
          color="text-indigo-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left+Center: Charts */}
        <div className="col-span-2 space-y-5">
          {/* Team Saturation Chart */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Saturación por equipo</h2>
                <p className="text-xs text-slate-400 mt-0.5">% de carga respecto a capacidad · línea roja = umbral crítico (85%)</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Crítico</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Aviso</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> OK</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} width={90} />
                <Tooltip
                  formatter={(v) => [`${v}%`, "Carga"]}
                  contentStyle={{ fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 8 }}
                />
                <ReferenceLine x={85} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1.5} />
                <Bar dataKey="saturation" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Emotional Heatmap */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Mapa de clima emocional</h2>
                <p className="text-xs text-slate-400 mt-0.5">Datos anónimos y agregados · no se registran respuestas individuales</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200" /> Mal</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100" /> Regular</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-200" /> Bien</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left text-slate-400 font-medium pb-2 pr-3 w-28">Equipo</th>
                    {["Lun 14", "Mar 15", "Mié 16", "Jue 17", "Vie 18"].map((d) => (
                      <th key={d} className="text-center text-slate-400 font-medium pb-2 px-1">{d}</th>
                    ))}
                    <th className="text-center text-slate-400 font-medium pb-2 px-1">Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {emotionalHeatmap.map((row) => {
                    const vals = [row.lu, row.ma, row.mi, row.ju, row.vi];
                    const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
                    return (
                      <tr key={row.team}>
                        <td className="py-1.5 pr-3 font-medium text-slate-700">{row.team}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="py-1.5 px-1 text-center">
                            <span className={clsx("inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm", heatmapColor(v))}>
                              {heatmapLabel(v)}
                            </span>
                          </td>
                        ))}
                        <td className="py-1.5 px-1 text-center">
                          <span className={clsx("inline-flex items-center justify-center w-10 h-7 rounded-lg text-xs font-bold", heatmapColor(Math.round(Number(avg))))}>
                            {avg}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={14} className="text-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-800">Insights accionables</h2>
              <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Sparkles size={9} /> Generados por IA
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {actionableInsights.map((ins) => {
                const tagColors: Record<string, string> = {
                  amber: "bg-amber-50 text-amber-700 border-amber-200",
                  red: "bg-red-50 text-red-700 border-red-200",
                  orange: "bg-orange-50 text-orange-700 border-orange-200",
                };
                return (
                  <div key={ins.id} className="border border-slate-200 rounded-xl p-3 hover:border-indigo-200 hover:shadow-sm transition-all group">
                    <div className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 inline-block", tagColors[ins.tagColor])}>
                      {ins.tag}
                    </div>
                    <h3 className="text-xs font-semibold text-slate-800 mb-1.5 leading-snug">{ins.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{ins.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400">Impacto estimado</div>
                        <div className="text-xs font-bold text-indigo-600">{ins.impact}</div>
                      </div>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 group-hover:gap-1 transition-all font-medium">
                        {ins.action} <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Alerts */}
        <div className="space-y-4">
          {/* Critical Alerts */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <Activity size={14} className="text-red-500" />
              <h2 className="text-sm font-semibold text-slate-800">Alertas automáticas</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2.5">
                    {alert.severity === "critical" ? (
                      <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    ) : alert.severity === "warning" ? (
                      <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <div className={clsx(
                        "text-xs font-semibold mb-0.5",
                        alert.severity === "critical" ? "text-red-700" :
                        alert.severity === "warning" ? "text-amber-700" : "text-emerald-700"
                      )}>
                        {alert.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-snug">{alert.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Quick Stats */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-800">Equipos en riesgo</h2>
            </div>
            <div className="space-y-2">
              {teams.filter(t => t.severity !== "ok").map((team) => (
                <div key={team.name} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-slate-700">{team.name}</span>
                      <span className={clsx(
                        "text-xs font-bold",
                        team.saturation >= 85 ? "text-red-600" : "text-amber-600"
                      )}>{team.saturation}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={clsx("h-full rounded-full", team.saturation >= 85 ? "bg-red-400" : "bg-amber-400")}
                        style={{ width: `${team.saturation}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
              {teams.filter(t => t.severity === "ok").length} equipos dentro de umbral saludable
            </div>
          </div>

          {/* Summary box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={14} className="text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-700">Resumen ejecutivo IA</span>
            </div>
            <p className="text-xs text-indigo-600 leading-relaxed">
              Esta semana el mayor riesgo es el <strong>equipo de Producto</strong> (91% carga, burnout inminente). Prioridad inmediata: redistribuir carga y resolver la dependencia en María López. El resto del equipo evoluciona de forma estable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
