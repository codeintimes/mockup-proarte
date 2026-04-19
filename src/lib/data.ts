export const currentUser = {
  name: "Sara Martínez",
  role: "Product Manager",
  team: "Producto",
  avatar: "SM",
  dayOnSystem: 47,
  emotionalState: "Bien",
  perceivedLoad: 8,
};

export const tasks = [
  {
    id: 1,
    title: "Informe Q2 — Resumen ejecutivo",
    priority: 9.2,
    estimatedTime: "1h 45min",
    status: "En progreso",
    blocker: null,
    aiReordered: true,
    tag: "Entrega hoy",
  },
  {
    id: 2,
    title: "Revisión propuesta cliente Repsol",
    priority: 8.8,
    estimatedTime: "45min",
    status: "Pendiente",
    blocker: null,
    aiReordered: true,
    tag: null,
  },
  {
    id: 3,
    title: "Reunión de producto — 14:00",
    priority: 7.1,
    estimatedTime: "1h",
    status: "Hoy",
    blocker: null,
    aiReordered: false,
    tag: "Reunión",
  },
  {
    id: 4,
    title: "Actualizar roadmap Q3",
    priority: 6.4,
    estimatedTime: "1h 30min",
    status: "Pendiente",
    blocker: "Esperando input de Tech",
    aiReordered: false,
    tag: null,
  },
  {
    id: 5,
    title: "Validar wireframes con Diseño",
    priority: 4.2,
    estimatedTime: "30min",
    status: "Bloqueada",
    blocker: "Esperando respuesta de Carlos (Diseño) — 2 días",
    aiReordered: false,
    tag: null,
  },
  {
    id: 6,
    title: "Reporte semanal de métricas",
    priority: 3.1,
    estimatedTime: "20min",
    status: "Recurrente",
    blocker: null,
    aiReordered: false,
    tag: "Automatizable",
  },
];

export const blockers = [
  {
    id: 1,
    from: "Equipo Diseño",
    to: "Equipo Producto",
    reason: "Esperando feedback de wireframes",
    days: 3,
    impact: "Retraso estimado: 3 días en sprint actual",
    severity: "high",
  },
  {
    id: 2,
    from: "Equipo Tech",
    to: "Dirección",
    reason: "Esperando aprobación de arquitectura cloud",
    days: 5,
    impact: "Bloquea integración de API — feature crítica de Q2",
    severity: "critical",
  },
  {
    id: 3,
    from: "Sara M.",
    to: "Carlos (Diseño)",
    reason: "Esperando wireframes v2 para validación",
    days: 2,
    impact: "Retrasa tarea 'Validar wireframes' del sprint",
    severity: "medium",
  },
  {
    id: 4,
    from: "Equipo Datos",
    to: "Equipo Tech",
    reason: "Esperando acceso a entorno de staging",
    days: 4,
    impact: "Paraliza análisis de datos de comportamiento",
    severity: "high",
  },
];

export const lastMeeting = {
  title: "Sync de Producto",
  date: "17 de abril",
  time: "14:00",
  duration: "52 min",
  attendees: 6,
  decisions: [
    "Se retrasa el lanzamiento de la feature de recomendaciones a mayo",
    "Sara liderará la propuesta comercial para cliente Repsol",
    "Tech necesita 2 semanas más para completar la integración de API",
  ],
  generatedTasks: [
    { assignee: "Sara Martínez", task: "Preparar propuesta comercial Repsol", due: "23 abr", done: false },
    { assignee: "Javier Romero", task: "Estimar tiempo integración API", due: "21 abr", done: false },
    { assignee: "Lucía Fernández", task: "Actualizar roadmap Q3 con nuevas fechas", due: "22 abr", done: false },
    { assignee: "Carlos Pérez", task: "Entregar wireframes v2 para validación", due: "20 abr", done: true },
  ],
};

export const frictionAlerts = [
  {
    id: 1,
    problem: "Aprobación de diseño tarda avg. 4 días",
    team: "Diseño → Producto",
    frequency: "Recurrente",
    impact: "Alto",
    severity: "high",
  },
  {
    id: 2,
    problem: "María López concentra 34% de decisiones de producto",
    team: "Producto",
    frequency: "Crónico",
    impact: "Crítico",
    severity: "critical",
  },
  {
    id: 3,
    problem: "Reuniones sin agenda ni acta registrada",
    team: "Todos los equipos",
    frequency: "3 esta semana",
    impact: "Medio",
    severity: "medium",
  },
  {
    id: 4,
    problem: "Backlog de Datos sin reducción en 3 semanas",
    team: "Datos",
    frequency: "Continuo",
    impact: "Alto",
    severity: "high",
  },
];

export const aiRecommendations = [
  {
    id: 1,
    title: "Redistribuir decisiones de producto",
    description:
      "María López es cuello de botella en el 34% de decisiones. Delegar aprobaciones de nivel 2 a Sara M. y Javier R. reduciría el tiempo de espera un 60%.",
    saving: "~2 días/sprint",
    effort: "Bajo",
    icon: "users",
  },
  {
    id: 2,
    title: "Simplificar flujo de aprobación de diseño",
    description:
      "Implementar formulario único con SLA de 24h entre Diseño y Producto. Actualmente el proceso implica 4 pasos manuales por email.",
    saving: "3 días/sprint",
    effort: "Medio",
    icon: "zap",
  },
  {
    id: 3,
    title: "Automatizar reporte semanal de Datos",
    description:
      "El equipo de Datos dedica 1.5h/persona/semana a generar reportes manualmente. Integración con herramientas actuales (Notion + Sheets) lo automatizaría.",
    saving: "33h/semana en equipo",
    effort: "Bajo",
    icon: "bot",
  },
];

export const commStats = {
  unansweredMessages: 14,
  blockedTasks: 7,
  avgResponseTime: "4.2h",
  meetingsWithoutSummary: 3,
};

export const teams = [
  { name: "Producto", members: 18, saturation: 91, severity: "critical" },
  { name: "Datos", members: 22, saturation: 88, severity: "high" },
  { name: "Diseño", members: 14, saturation: 76, severity: "medium" },
  { name: "Comercial", members: 40, saturation: 71, severity: "medium" },
  { name: "Tech", members: 35, saturation: 68, severity: "ok" },
  { name: "RRHH", members: 12, saturation: 62, severity: "ok" },
  { name: "Operaciones", members: 28, saturation: 58, severity: "ok" },
  { name: "Marketing", members: 31, saturation: 54, severity: "ok" },
];

export const kpis = {
  teamHealth: { value: 72, trend: -3, label: "Salud del equipo", unit: "%" },
  avgLoad: { value: 78, trend: 0, label: "Carga media", unit: "%" },
  taskCompletion: { value: 84, trend: 6, label: "Cumplimiento de tareas", unit: "%" },
  emotionalIndex: { value: 3.4, trend: -0.2, label: "Índice emocional", unit: "/5" },
};

export const sparklines = {
  teamHealth: [75, 74, 76, 73, 74, 72, 72],
  avgLoad: [76, 78, 77, 79, 78, 78, 78],
  taskCompletion: [78, 80, 81, 82, 83, 84, 84],
  emotionalIndex: [3.7, 3.6, 3.5, 3.6, 3.5, 3.4, 3.4],
};

export const criticalAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "Riesgo de burnout en Producto",
    description: "3 personas llevan 2+ semanas con saturación >90%. Requiere acción inmediata.",
  },
  {
    id: 2,
    severity: "critical",
    title: "Dependencia única — María López",
    description: "Es responsable única de 12 tareas activas. Riesgo operativo alto si causa baja.",
  },
  {
    id: 3,
    severity: "warning",
    title: "Backlog de Datos estancado",
    description: "Sin reducción en 3 semanas. Posible bloqueo sistémico no identificado.",
  },
  {
    id: 4,
    severity: "warning",
    title: "4 reuniones sin acta ni tareas",
    description: "Tiempo perdido estimado esta semana: 8h en toda la empresa.",
  },
  {
    id: 5,
    severity: "positive",
    title: "Marketing mejora cumplimiento",
    description: "Cumplimiento de tareas +18% este mes. Patrón positivo sostenido.",
  },
];

export const actionableInsights = [
  {
    id: 1,
    tag: "Aquí se pierde tiempo",
    tagColor: "amber",
    title: "Reuniones sin agenda consumen 460h semanales",
    description:
      "Las reuniones de sincronización sin agenda previa cuestan 2.3h/semana por persona. Con 200 empleados, son 460h semanales — equivalente a 57 jornadas completas. Implementar agendas automáticas resolvería el 80% del problema.",
    impact: "460h/semana",
    action: "Activar agendas automáticas",
  },
  {
    id: 2,
    tag: "Equipo desalineado",
    tagColor: "red",
    title: "Producto y Tech tienen objetivos divergentes en Q2",
    description:
      "Producto prioriza nuevas features; Tech prioriza deuda técnica. Falta de alineación detectada en 3 conversaciones de Slack esta semana y en el retraso de la integración de API. Sin intervención, el conflicto escalará en 2-3 semanas.",
    impact: "Retraso estimado: 3 semanas",
    action: "Reunión de alineación Q2",
  },
  {
    id: 3,
    tag: "Proceso con fricción",
    tagColor: "orange",
    title: "Aprobación de presupuestos tarda 6 días de media",
    description:
      "El 70% del tiempo en aprobaciones es espera pasiva: el proceso tiene 4 pasos manuales con 3 personas involucradas. Simplificar a un flujo de 1 paso con aprobación delegada reduciría el tiempo a menos de 24h.",
    impact: "6 días → <24h",
    action: "Rediseñar flujo de aprobación",
  },
];

export const emotionalHeatmap = [
  { team: "Producto", lu: 2, ma: 2, mi: 3, ju: 2, vi: 3 },
  { team: "Tech", lu: 3, ma: 4, mi: 3, ju: 3, vi: 4 },
  { team: "Datos", lu: 2, ma: 2, mi: 2, ju: 3, vi: 2 },
  { team: "Diseño", lu: 4, ma: 3, mi: 4, ju: 4, vi: 5 },
  { team: "Comercial", lu: 3, ma: 3, mi: 4, ju: 3, vi: 4 },
  { team: "RRHH", lu: 4, ma: 4, mi: 4, ju: 5, vi: 4 },
  { team: "Operaciones", lu: 3, ma: 4, mi: 3, ju: 4, vi: 4 },
  { team: "Marketing", lu: 5, ma: 4, mi: 5, ju: 4, vi: 5 },
];
