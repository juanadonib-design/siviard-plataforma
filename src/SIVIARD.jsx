import { useState, useEffect } from "react";
import {
  LayoutDashboard, FilePlus2, ClipboardList, CheckCircle2, ShieldCheck,
  BarChart3, Users, Settings, Bell, LogOut, Menu,
  TrendingUp, TrendingDown, DollarSign, AlertTriangle,
  MapPin, Clock, Calendar, Building2, User, CreditCard, Briefcase,
  Upload, Download, Printer, Mail, Filter, Search, Eye, Check,
  XCircle, MessageSquare, RefreshCw, Lock, Globe, Zap, Activity,
  ChevronRight, Shield, FileText, Navigation, Route, Crosshair,
  ScanLine, Fingerprint, Database, Network, Cpu, Radio, Satellite,
  MonitorCheck, BadgeCheck, Layers, GitBranch, PieChart as PieIcon,
  LineChart as LineIcon, Sun, Moon, Crown, Award, Target, Send,
  ChevronLeft, ChevronDown, MoreHorizontal, ExternalLink, Trash2,
  Edit3, AlertCircle, Info, Hash, MapPinned, DollarSign as Dollar,
  PanelLeftClose, PanelLeftOpen, Flame, Sparkles, Star,
  Radar, Hexagon, Binary, CircuitBoard, Workflow, BarChart2,
  AreaChart, TrendingUp as Trend, ShieldAlert, UserCog, BellRing,
  FlaskConical, Microscope, Telescope, Compass, Map, Waypoints,
  FileSearch, FileLock2, FileCheck2, FileBarChart2,
  UserCheck, UserX, UserPlus, UsersRound,
  SlidersHorizontal, ToggleRight, Gauge, Sliders,
  BrainCircuit, ScanFace, KeyRound, Unplug,
  ChartNoAxesCombined, ChartPie, ChartArea, ChartColumnBig,
  ArrowUpRight, ArrowDownRight, TriangleAlert, CircleCheck,
  Bolt, FlameKindling, Orbit, Atom, Plus
} from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart as ReAreaChart
} from "recharts";

const ROLES = {
  SUPER: "Súper Admin",
  ADMIN: "Admin de Empresa",
  COLAB: "Colaborador",
};

const EMPRESAS_INI = [
  { id: "emp-001", nombre: "Gobierno Digital RD", sector: "Administración Pública", logo: "GD", color: "#2563EB" },
  { id: "emp-002", nombre: "Infraestructura RD", sector: "Obras Públicas", logo: "IR", color: "#10B981" },
  { id: "emp-003", nombre: "Salud Nacional", sector: "Salud Pública", logo: "SN", color: "#8B5CF6" },
];

const USUARIOS_INI = [
  { id: "usr-001", empresaId: "emp-001", nombre: "Carlos Medina", email: "c.medina@gov.do", rol: ROLES.SUPER, password: "super123", av: "CM", accent: "#2563EB", empresaNombre: "Gobierno Digital RD" },
  { id: "usr-002", empresaId: "emp-001", nombre: "Laura Pérez", email: "l.perez@gov.do", rol: ROLES.ADMIN, password: "admin123", av: "LP", accent: "#06B6D4", empresaNombre: "Gobierno Digital RD" },
  { id: "usr-003", empresaId: "emp-002", nombre: "Miguel Ortiz", email: "m.ortiz@gov.do", rol: ROLES.ADMIN, password: "admin456", av: "MO", accent: "#10B981", empresaNombre: "Infraestructura RD" },
  { id: "usr-004", empresaId: "emp-002", nombre: "Ana Suárez", email: "a.suarez@gov.do", rol: ROLES.COLAB, password: "colab123", av: "AS", accent: "#0F766E", empresaNombre: "Infraestructura RD" },
  { id: "usr-005", empresaId: "emp-003", nombre: "Dra. Vargas Díaz", email: "v.diaz@gov.do", rol: ROLES.COLAB, password: "colab999", av: "VD", accent: "#8B5CF6", empresaNombre: "Salud Nacional" },
];

const WORKFLOW_INI = [
  { id: "wf-001", empresaId: "emp-001", nombre: "Flujo de Viajes", pasos: ["Solicitud", "Aprobación Jefe", "Control Financiero"] },
  { id: "wf-002", empresaId: "emp-002", nombre: "Flujo de Compras", pasos: ["Solicitud", "Revisión Técnica", "Aprobación Superior"] },
  { id: "wf-003", empresaId: "emp-003", nombre: "Flujo de Salud", pasos: ["Solicitud", "Revisión Médica", "Aprobación Ejecutivo"] },
];

const SOLICITUDES_INI = [
  { id: "SOL-001", empresaId: "emp-001", empleado: "Ana Delgado", departamento: "Planificación", monto: 4800, estado: "Pendiente", motivo: "Visita técnica provincia", fecha: "2025-05-18" },
  { id: "SOL-002", empresaId: "emp-002", empleado: "Carlos Jiménez", departamento: "Infraestructura", monto: 11200, estado: "Aprobado", motivo: "Inspección puente", fecha: "2025-05-15" },
  { id: "SOL-003", empresaId: "emp-003", empleado: "Marta López", departamento: "Salud Pública", monto: 7600, estado: "Rechazado", motivo: "Visita hospital", fecha: "2025-05-14" },
];

const PROVINCIAS = ["Santiago","La Vega","San Pedro","Puerto Plata","Barahona","Distrito Nacional"];
const PIE_COLORS = ["#2563EB","#06B6D4","#10B981","#8B5CF6","#F59E0B","#64748B"];
const KPI_DATA = [
  { titulo: "Solicitudes abiertas", valor: 23, icon: Waypoints, color: "#2563EB", gradient: "rgba(37,99,235,.16)" },
  { titulo: "Aprobaciones hoy", valor: 11, icon: CheckCircle2, color: "#10B981", gradient: "rgba(16,185,129,.16)" },
  { titulo: "Gasto mensual", valor: "RD$ 172K", icon: DollarSign, color: "#F59E0B", gradient: "rgba(245,158,11,.16)" },
  { titulo: "Alertas activas", valor: 4, icon: AlertTriangle, color: "#EF4444", gradient: "rgba(239,68,68,.16)" },
];

const CHART_DATA = [
  { mes: "Ene", gasto: 118000 },
  { mes: "Feb", gasto: 132000 },
  { mes: "Mar", gasto: 154000 },
  { mes: "Abr", gasto: 189000 },
  { mes: "May", gasto: 172000 },
  { mes: "Jun", gasto: 163000 },
];

const AUDIT_INI = [
  { id: 1, fecha: "2025-05-16", usuario: "Laura Pérez", accion: "Creó flujo de aprobación", detalle: "Gobierno Digital RD" },
  { id: 2, fecha: "2025-05-16", usuario: "Miguel Ortiz", accion: "Aprobó solicitud", detalle: "Infraestructura RD" },
  { id: 3, fecha: "2025-05-15", usuario: "Dra. Vargas Díaz", accion: "Rechazó solicitud", detalle: "Salud Nacional" },
];

const G = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,html,#root{min-height:100vh;width:100%;font-family:'DM Sans',system-ui,sans-serif;background:#F8FAFC;overflow-x:hidden}
button,input,select,textarea{font-family:inherit}
button{cursor:pointer}
.nav-btn{border:none;background:transparent;color:inherit;text-align:left;display:flex;align-items:center;gap:12px;width:100%;padding:10px 12px;border-radius:12px;transition:all .2s ease}
.nav-btn:hover{background:rgba(255,255,255,.08)}
.nav-btn.active{background:rgba(37,99,235,.12);color:#111827}
.act-btn{border:none;border-radius:14px;transition:all .2s ease;display:inline-flex;align-items:center;gap:8px}
.card{background:#fff;border:1px solid rgba(15,23,42,.06);border-radius:22px;box-shadow:0 25px 60px rgba(15,23,42,.06)}
.card:hover{transform:translateY(-2px)}
.toast{animation:toastIn .35s ease both}
@keyframes toastIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
`; 

function Ico({ ic: Icon, size = 16, color, className = "", style = {} }) {
  return <Icon size={size} color={color} className={className} style={style} />;
}

function IcoBox({ ic, size = 16, color, bg, pad = 10, radius = 12, glow = false }) {
  return (
    <div style={{ width: size + pad * 2, height: size + pad * 2, borderRadius: radius, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: glow ? `0 14px 40px ${color}33` : 'none' }}>
      <Ico ic={ic} size={size} color={color} />
    </div>
  );
}

function Chip({ label }) {
  const palette = {
    Aprobado: { bg: '#DCFCE7', color: '#166534' },
    Pendiente: { bg: '#FEF3C7', color: '#92400E' },
    Rechazado: { bg: '#FEE2E2', color: '#991B1B' },
    'En Revisión': { bg: '#DBEAFE', color: '#1E40AF' },
  };
  const style = palette[label] || { bg: '#E2E8F0', color: '#334155' };
  return <span style={{ padding: '6px 12px', borderRadius: 999, background: style.bg, color: style.color, fontSize: 11, fontWeight: 700 }}>{label}</span>;
}

function Toast({ msg, type = 'success', onClose }) {
  const isError = type === 'error';
  return (
    <div className="toast" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      <div style={{ minWidth: 280, padding: '14px 18px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 12, background: isError ? '#FEF2F2' : '#ECFDF5', border: `1px solid ${isError ? '#FCA5A5' : '#A7F3D0'}` }}>
        <Ico ic={isError ? AlertCircle : CircleCheck} size={18} color={isError ? '#B91C1C' : '#047857'} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: isError ? '#B91C1C' : '#047857' }}>{isError ? 'Error' : 'Correcto'}</div>
          <div style={{ fontSize: 12, color: isError ? '#9A3412' : '#065F46', marginTop: 2 }}>{msg}</div>
        </div>
        <button onClick={onClose} className="ic-btn" style={{ background: 'transparent', border: 'none', color: '#475569' }}><Ico ic={XCircle} size={16} /></button>
      </div>
    </div>
  );
}

export default function SIVIARD() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('login');
  const [menu, setMenu] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState(EMPRESAS_INI);
  const [users, setUsers] = useState(USUARIOS_INI);
  const [workflows, setWorkflows] = useState(WORKFLOW_INI);
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_INI);
  const [audit, setAudit] = useState(AUDIT_INI);
  const [selectedCompanyId, setSelectedCompanyId] = useState(EMPRESAS_INI[0].id);
  const [loginF, setLoginF] = useState({ email: '', password: '', error: '' });
  const [newStepText, setNewStepText] = useState('');
  const [newUser, setNewUser] = useState({ nombre: '', email: '', rol: ROLES.COLAB, empresaId: EMPRESAS_INI[0].id });
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [workflowName, setWorkflowName] = useState('Nuevo flujo de aprobación');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const theme = {
    BG: dark ? '#0B1220' : '#F8FAFC',
    CARD: dark ? '#111827' : '#FFFFFF',
    CARD2: dark ? '#1F2937' : '#F8FAFC',
    BDR: dark ? '#273449' : '#E2E8F0',
    TXT: dark ? '#E2E8F0' : '#0F172A',
    MUT: dark ? '#94A3B8' : '#64748B',
    SIDE: dark ? '#0F172A' : '#0F172A',
  };

  const company = companies.find((c) => c.id === selectedCompanyId) || companies[0];
  const companyWorkflows = workflows.filter((wf) => wf.empresaId === selectedCompanyId);
  const companyUsers = users.filter((u) => u.empresaId === selectedCompanyId);
  const companySolicitudes = solicitudes.filter((s) => s.empresaId === selectedCompanyId);

  const visibleNav = user ? (
    user.rol === ROLES.SUPER ? [
      { id: 'dashboard', label: 'Dashboard', ic: LayoutDashboard, color: '#2563EB' },
      { id: 'empresas', label: 'Empresas', ic: Building2, color: '#10B981' },
      { id: 'usuarios', label: 'Usuarios', ic: UsersRound, color: '#06B6D4' },
      { id: 'workflows', label: 'Workflows', ic: Workflow, color: '#8B5CF6' },
      { id: 'solicitudes', label: 'Solicitudes', ic: ClipboardList, color: '#F59E0B' },
      { id: 'auditoria', label: 'Auditoría', ic: Radar, color: '#EF4444' },
      { id: 'config', label: 'Configuración', ic: Settings, color: '#64748B' },
    ] : user.rol === ROLES.ADMIN ? [
      { id: 'dashboard', label: 'Dashboard', ic: LayoutDashboard, color: '#2563EB' },
      { id: 'solicitud', label: 'Nueva Solicitud', ic: FilePlus2, color: '#06B6D4' },
      { id: 'solicitudes', label: 'Solicitudes', ic: ClipboardList, color: '#10B981' },
      { id: 'workflows', label: 'Workflows', ic: Workflow, color: '#8B5CF6' },
      { id: 'usuarios', label: 'Usuarios', ic: UsersRound, color: '#F59E0B' },
      { id: 'auditoria', label: 'Auditoría', ic: Radar, color: '#EF4444' },
    ] : [
      { id: 'dashboard', label: 'Dashboard', ic: LayoutDashboard, color: '#2563EB' },
      { id: 'solicitud', label: 'Nueva Solicitud', ic: FilePlus2, color: '#06B6D4' },
      { id: 'solicitudes', label: 'Solicitudes', ic: ClipboardList, color: '#10B981' },
      { id: 'auditoria', label: 'Auditoría', ic: Radar, color: '#EF4444' },
    ]
  ) : [];

  const filteredSolicitudes = companySolicitudes.filter((sol) => {
    const query = searchQuery.toLowerCase();
    const statusMatch = filterEstado === 'Todos' || sol.estado === filterEstado;
    const textMatch = [sol.empleado, sol.departamento, sol.motivo].some((value) => value.toLowerCase().includes(query));
    return statusMatch && textMatch;
  });

  const login = () => {
    const match = users.find((u) => u.email === loginF.email && u.password === loginF.password);
    if (!match) {
      setLoginF((prev) => ({ ...prev, error: 'Correo o contraseña incorrectos' }));
      return;
    }
    setUser(match);
    setSelectedCompanyId(match.empresaId);
    setPage('app');
    setMenu('dashboard');
    setLoginF({ email: '', password: '', error: '' });
    notify(`Bienvenido ${match.nombre}`, 'success');
  };

  const notify = (message, type = 'success') => {
    setToast({ msg: message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleAddStep = () => {
    if (!newStepText.trim()) return;
    setWorkflows((prev) => prev.map((wf) => wf.empresaId === selectedCompanyId && wf.id === companyWorkflows[0]?.id
      ? { ...wf, pasos: [...wf.pasos, newStepText.trim()] }
      : wf
    ));
    setNewStepText('');
    notify('Paso de workflow agregado');
  };

  const handleCreateUser = () => {
    if (!newUser.nombre || !newUser.email) return;
    setUsers((prev) => [...prev, {
      id: `usr-${prev.length + 1}`,
      ...newUser,
      av: newUser.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
      accent: '#2563EB',
      empresaNombre: companies.find((c) => c.id === newUser.empresaId)?.nombre || '',
      password: 'welcome123',
    }]);
    setNewUser({ nombre: '', email: '', rol: ROLES.COLAB, empresaId: selectedCompanyId });
    notify('Usuario creado con éxito');
  };

  const handleAddSolicitud = () => {
    const id = `SOL-${solicitudes.length + 1}`.padStart(7, '0');
    setSolicitudes((prev) => [...prev, {
      id,
      empresaId: selectedCompanyId,
      empleado: user.nombre,
      departamento: user.rol === ROLES.ADMIN ? 'Administración' : 'Colaboración',
      monto: 4200,
      estado: 'Pendiente',
      motivo: 'Desplazamiento institucional',
      fecha: new Date().toISOString().slice(0, 10),
    }]);
    notify('Solicitud creada para revisión');
    setMenu('solicitudes');
  };

  const handleApprove = (id) => {
    setSolicitudes((prev) => prev.map((sol) => sol.id === id ? { ...sol, estado: 'Aprobado' } : sol));
    setAudit((prev) => [{ id: prev.length + 1, fecha: new Date().toISOString().slice(0, 10), usuario: user.nombre, accion: 'Aprobó solicitud', detalle: id }, ...prev]);
    notify('Solicitud aprobada');
  };

  const handleReject = (id) => {
    setSolicitudes((prev) => prev.map((sol) => sol.id === id ? { ...sol, estado: 'Rechazado' } : sol));
    setAudit((prev) => [{ id: prev.length + 1, fecha: new Date().toISOString().slice(0, 10), usuario: user.nombre, accion: 'Rechazó solicitud', detalle: id }, ...prev]);
    notify('Solicitud rechazada');
  };

  const CompanyFilter = () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, background: theme.CARD, border: `1px solid ${theme.BDR}` }}>
        <span style={{ fontSize: 12, color: theme.MUT }}>Empresa</span>
        <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)} style={{ border: 'none', background: 'transparent', color: theme.TXT, fontSize: 13, outline: 'none' }}>
          {companies.map((company) => <option key={company.id} value={company.id}>{company.nombre}</option>)}
        </select>
      </div>
      {user?.rol === ROLES.SUPER && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, background: theme.CARD, border: `1px solid ${theme.BDR}` }}>
          <span style={{ fontSize: 12, color: theme.MUT }}>Modo</span>
          <button onClick={() => setDark((value) => !value)} className="act-btn" style={{ padding: '8px 12px', borderRadius: 12, background: theme.BDR, color: theme.TXT }}>
            {dark ? <Sun size={14} /> : <Moon size={14} />} {dark ? 'Claro' : 'Oscuro'}
          </button>
        </div>
      )}
    </div>
  );

  const Dashboard = () => (
    <div style={{ animation: 'fadeUp .35s ease', minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#2563EB' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Dashboard</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Resumen por empresa y flujo de trabajo</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="act-btn" onClick={() => setMenu('solicitud')} style={{ padding: '12px 18px', background: '#2563EB', color: '#fff' }}>Solicitar nuevo viático</button>
          <button className="act-btn" onClick={() => setMenu('workflows')} style={{ padding: '12px 18px', background: '#10B981', color: '#fff' }}>Editar workflow</button>
        </div>
      </div>

      <CompanyFilter />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(200px,1fr))', gap: 16, marginBottom: 20 }}>
        {KPI_DATA.map((item) => (
          <div key={item.titulo} className="card" style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: item.gradient, opacity: 0.14, filter: 'blur(18px)' }} />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: theme.MUT, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 6 }}>{item.titulo}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: item.color }}>{item.valor}</div>
              </div>
              <IcoBox ic={item.icon} size={18} color={item.color} bg={`${item.color}22`} glow />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: theme.TXT }}>Ejecución de recursos</div>
              <div style={{ color: theme.MUT, fontSize: 12 }}>Gastos mensuales por empresa</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['1M', '3M', '6M'].map((label) => (
                <button key={label} className="act-btn" style={{ padding: '8px 12px', borderRadius: 12, background: theme.BDR, color: theme.TXT, border: 'none' }}>{label}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ReAreaChart data={CHART_DATA} margin={{ top: 6, right: 14, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke={theme.BDR} />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: theme.MUT, fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.MUT, fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.BDR}`, background: theme.CARD, color: theme.TXT }} />
              <Area type="monotone" dataKey="gasto" stroke="#2563EB" fill="url(#g1)" strokeWidth={3} dot={{ r: 4 }} />
            </ReAreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: theme.TXT }}>Provincias</div>
              <div style={{ color: theme.MUT, fontSize: 12 }}>Distribución de destinos</div>
            </div>
            <Ico ic={MapPin} size={18} color="#8B5CF6" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PROVINCIAS.map((name, index) => ({ name, value: 100 / PROVINCIAS.length }))} dataKey="value" outerRadius={80} innerRadius={42} strokeWidth={0}>
                {PROVINCIAS.map((_, index) => <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 14, border: `1px solid ${theme.BDR}`, background: theme.CARD, color: theme.TXT }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const Solicitud = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#06B6D4' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Nueva Solicitud</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Envía una solicitud de viático para tu empresa</p>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 18 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: theme.MUT }}>Motivo</label>
            <input type="text" placeholder="Motivo de viaje" style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: theme.MUT }}>Monto estimado</label>
            <input type="number" placeholder="RD$ 4,200" style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: theme.MUT }}>Provincia destino</label>
            <select style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }}>
              {PROVINCIAS.map((province) => <option key={province} value={province}>{province}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 700, color: theme.MUT }}>Supervisor</label>
            <input type="text" placeholder="Nombre del supervisor" style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 22 }}>
          <button className="act-btn" onClick={handleAddSolicitud} style={{ padding: '14px 20px', background: '#2563EB', color: '#fff', borderRadius: 14 }}>Enviar solicitud</button>
        </div>
      </div>
    </div>
  );

  const Solicitudes = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#10B981' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Solicitudes</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Todas las solicitudes de la empresa actual</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, background: theme.CARD, border: `1px solid ${theme.BDR}` }}>
          <span style={{ fontSize: 12, color: theme.MUT }}>Estado</span>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} style={{ border: 'none', background: 'transparent', color: theme.TXT, fontSize: 13 }}>
            {['Todos', 'Pendiente', 'Aprobado', 'Rechazado', 'En Revisión'].map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 240, padding: '12px 16px', borderRadius: 16, background: theme.CARD, border: `1px solid ${theme.BDR}` }}>
          <input placeholder="Buscar solicitudes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', color: theme.TXT, outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {filteredSolicitudes.map((sol) => (
          <div key={sol.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: theme.TXT }}>{sol.empleado}</div>
                <div style={{ color: theme.MUT, fontSize: 12 }}>{sol.departamento} · {sol.fecha}</div>
              </div>
              <Chip label={sol.estado} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div><span style={{ display: 'block', color: theme.MUT, fontSize: 11 }}>Monto</span><div style={{ fontSize: 16, fontWeight: 700, color: '#2563EB' }}>RD$ {sol.monto.toLocaleString()}</div></div>
              <div><span style={{ display: 'block', color: theme.MUT, fontSize: 11 }}>Motivo</span><div style={{ color: theme.TXT, fontSize: 14 }}>{sol.motivo}</div></div>
              <div><span style={{ display: 'block', color: theme.MUT, fontSize: 11 }}>Solicitud</span><div style={{ color: theme.TXT, fontSize: 14 }}>{sol.id}</div></div>
            </div>
            {(user.rol !== ROLES.COLAB && sol.estado === 'Pendiente') && (
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button onClick={() => handleApprove(sol.id)} className="act-btn" style={{ padding: '10px 16px', borderRadius: 12, background: '#10B981', color: '#fff' }}>Aprobar</button>
                <button onClick={() => handleReject(sol.id)} className="act-btn" style={{ padding: '10px 16px', borderRadius: 12, background: '#FEE2E2', color: '#991B1B' }}>Rechazar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Workflows = () => {
    const activeWorkflow = companyWorkflows[0] || { pasos: [] };
    return (
      <div style={{ animation: 'fadeUp .35s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 4, height: 24, borderRadius: 999, background: '#8B5CF6' }} />
              <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Workflow de la empresa</h2>
            </div>
            <p style={{ color: theme.MUT, fontSize: 13 }}>Configura la aprobación por empresa</p>
          </div>
          <button className="act-btn" onClick={handleAddStep} style={{ padding: '12px 18px', background: '#8B5CF6', color: '#fff', borderRadius: 14 }}>
            <Ico ic={Plus} size={16} /> Añadir paso
          </button>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            <input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} placeholder="Nombre del workflow" style={{ flex: 1, minWidth: 280, padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
            <input value={newStepText} onChange={(e) => setNewStepText(e.target.value)} placeholder="Nuevo paso" style={{ flex: 1, minWidth: 240, padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {activeWorkflow.pasos.map((step, index) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 18, borderRadius: 18, border: `1px solid ${theme.BDR}`, background: theme.CARD2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: '#E0E7FF', display: 'grid', placeItems: 'center' }}><Ico ic={ArrowUpRight} size={16} color="#2563EB" /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: theme.TXT }}>{step}</div>
                    <div style={{ fontSize: 11, color: theme.MUT }}>Paso {index + 1}</div>
                  </div>
                </div>
                <button className="act-btn" style={{ padding: '10px 14px', borderRadius: 12, background: '#F8FAFC', color: '#475569' }}>Reordenar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Usuarios = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#06B6D4' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Usuarios</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Gestión por empresa y acceso</p>
        </div>
        <button className="act-btn" onClick={handleCreateUser} style={{ padding: '12px 18px', background: '#06B6D4', color: '#fff', borderRadius: 14 }}>
          <Ico ic={UserPlus} size={16} /> Crear usuario
        </button>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <input value={newUser.nombre} onChange={(e) => setNewUser((prev) => ({ ...prev, nombre: e.target.value }))} placeholder="Nombre completo" style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          <input value={newUser.email} onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))} placeholder="Correo institucional" style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
          <select value={newUser.rol} onChange={(e) => setNewUser((prev) => ({ ...prev, rol: e.target.value }))} style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }}>
            {Object.values(ROLES).map((rol) => <option key={rol} value={rol}>{rol}</option>)}
          </select>
          <select value={newUser.empresaId} onChange={(e) => setNewUser((prev) => ({ ...prev, empresaId: e.target.value }))} style={{ width: '100%', padding: 14, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }}>
            {companies.map((company) => <option key={company.id} value={company.id}>{company.nombre}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {companyUsers.map((userRow) => (
          <div key={userRow.id} className="card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: userRow.accent + '22', display: 'grid', placeItems: 'center', color: userRow.accent, fontWeight: 800 }}>{userRow.av}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: theme.TXT }}>{userRow.nombre}</div>
                <div style={{ color: theme.MUT, fontSize: 12 }}>{userRow.rol} · {userRow.empresaNombre}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ padding: '8px 12px', borderRadius: 14, background: '#F8FAFC', color: '#475569', fontSize: 12 }}>{userRow.email}</span>
              <button className="act-btn" style={{ padding: '10px 14px', borderRadius: 12, background: '#E2E8F0' }}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Empresas = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#10B981' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Empresas</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Administración multi-empresa</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {companies.map((comp) => (
          <div key={comp.id} className="card" style={{ padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 18, background: comp.color + '22', display: 'grid', placeItems: 'center', color: comp.color, fontSize: 18, fontWeight: 900 }}>{comp.logo}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: theme.TXT }}>{comp.nombre}</div>
                <div style={{ color: theme.MUT, fontSize: 12 }}>{comp.sector}</div>
              </div>
            </div>
            <button className="act-btn" onClick={() => setSelectedCompanyId(comp.id)} style={{ padding: '10px 16px', borderRadius: 14, background: selectedCompanyId === comp.id ? '#2563EB' : '#E2E8F0', color: selectedCompanyId === comp.id ? '#fff' : '#475569' }}>{selectedCompanyId === comp.id ? 'Seleccionada' : 'Seleccionar'}</button>
          </div>
        ))}
      </div>
    </div>
  );

  const Auditoria = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#EF4444' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Auditoría</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Registro de acciones y trazabilidad</p>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {audit.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 16, borderRadius: 18, background: theme.CARD2, border: `1px solid ${theme.BDR}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.TXT }}>{item.accion}</div>
                <div style={{ color: theme.MUT, fontSize: 12 }}>{item.usuario} · {item.fecha}</div>
              </div>
              <div style={{ color: theme.MUT, fontSize: 12 }}>{item.detalle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Config = () => (
    <div style={{ animation: 'fadeUp .35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 4, height: 24, borderRadius: 999, background: '#64748B' }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.TXT, margin: 0 }}>Configuración</h2>
          </div>
          <p style={{ color: theme.MUT, fontSize: 13 }}>Preferencias globales del SaaS</p>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div style={{ padding: 18, borderRadius: 20, background: theme.CARD2, border: `1px solid ${theme.BDR}` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: theme.TXT, marginBottom: 12 }}>Apariencia</div>
            <button onClick={() => setDark((prev) => !prev)} className="act-btn" style={{ padding: '10px 14px', borderRadius: 14, background: '#E2E8F0', color: '#0F172A' }}>{dark ? 'Modo Claro' : 'Modo Oscuro'}</button>
          </div>
          <div style={{ padding: 18, borderRadius: 20, background: theme.CARD2, border: `1px solid ${theme.BDR}` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: theme.TXT, marginBottom: 12 }}>Seguridad</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="act-btn" style={{ padding: '10px 14px', borderRadius: 14, background: '#E2E8F0' }}>Reiniciar tokens</button>
              <button className="act-btn" style={{ padding: '10px 14px', borderRadius: 14, background: '#E2E8F0' }}>Ver roles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PAGE_MAP = {
    dashboard: Dashboard,
    solicitud: Solicitud,
    solicitudes: Solicitudes,
    workflows: Workflows,
    usuarios: Usuarios,
    empresas: Empresas,
    auditoria: Auditoria,
    config: Config,
  };

  const CurPage = PAGE_MAP[menu] || Dashboard;
  const PageComponent = CurPage;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
        <style>{G}</style>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 46, fontWeight: 900, marginBottom: 12 }}>SIVIARD</div>
          <div style={{ fontSize: 14, color: '#94A3B8' }}>Cargando plataforma multi-empresa...</div>
        </div>
      </div>
    );
  }

  if (page === 'login') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0F172A, #111827)' }}>
        <style>{G}</style>
        <div style={{ width: 480, borderRadius: 28, padding: 36, background: dark ? '#111827' : '#F8FAFC', boxShadow: '0 40px 80px rgba(15,23,42,.24)' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: theme.TXT }}>Bienvenido a SIVIARD</div>
            <div style={{ color: theme.MUT, marginTop: 6 }}>Accede con tu cuenta institucional para continuar.</div>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <input value={loginF.email} onChange={(e) => setLoginF((prev) => ({ ...prev, email: e.target.value, error: '' }))} placeholder="Correo institucional" style={{ width: '100%', padding: 16, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
            <input type="password" value={loginF.password} onChange={(e) => setLoginF((prev) => ({ ...prev, password: e.target.value, error: '' }))} placeholder="Contraseña" style={{ width: '100%', padding: 16, borderRadius: 16, border: `1px solid ${theme.BDR}`, background: theme.CARD2, color: theme.TXT }} />
            {loginF.error && <div style={{ color: '#EF4444', fontSize: 12 }}>{loginF.error}</div>}
            <button onClick={login} className="act-btn" style={{ width: '100%', padding: 16, borderRadius: 16, background: '#2563EB', color: '#fff', fontWeight: 800 }}>Ingresar</button>
          </div>
          <div style={{ marginTop: 18, color: theme.MUT, fontSize: 12 }}>Usa tus credenciales institucionales para acceder al modo SaaS multi-empresa.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.BG, color: theme.TXT }}>
      <style>{G}</style>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <aside style={{ width: sideOpen ? 260 : 74, background: '#0F172A', color: '#F8FAFC', padding: '24px 18px', display: 'flex', flexDirection: 'column', transition: 'width .25s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sideOpen ? 'space-between' : 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: sideOpen ? 1 : 0, transition: 'opacity .2s ease' }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: '#2563EB', display: 'grid', placeItems: 'center' }}><Ico ic={Orbit} size={20} color="#fff" /></div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>SIVIARD</div>
              <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: 1.4 }}>Multi-empresa</div>
            </div>
          </div>
          <button onClick={() => setSideOpen((value) => !value)} className="ic-btn" style={{ background: 'rgba(255,255,255,.05)', borderRadius: 14, width: 38, height: 38, display: 'grid', placeItems: 'center' }}><Ico ic={sideOpen ? PanelLeftClose : PanelLeftOpen} size={18} /></button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {visibleNav.map((nav) => (
            <button key={nav.id} className={`nav-btn ${menu === nav.id ? 'active' : ''}`} onClick={() => { setMenu(nav.id); setPage('app'); }} style={{ color: menu === nav.id ? '#fff' : '#CBD5E1', background: menu === nav.id ? `${nav.color}20` : 'transparent' }}>
              <Ico ic={nav.ic} size={18} color={nav.color} />
              {sideOpen && <span style={{ fontSize: 14, fontWeight: 700 }}>{nav.label}</span>}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: user.accent + '33', display: 'grid', placeItems: 'center', color: user.accent, fontWeight: 800 }}>{user.av}</div>
            {sideOpen && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{user.nombre}</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{user.rol}</div>
              </div>
            )}
          </div>
          <button onClick={() => { setPage('login'); setUser(null); }} className="act-btn" style={{ marginTop: 18, width: '100%', padding: '12px 14px', borderRadius: 14, background: '#1E293B', color: '#fff' }}>
            <Ico ic={LogOut} size={16} /> {sideOpen ? 'Cerrar sesión' : ''}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 28, minHeight: '100vh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 13, color: theme.MUT, textTransform: 'uppercase', letterSpacing: 1.4 }}>Empresa</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: theme.TXT }}>{company.nombre}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="ic-btn" onClick={() => setPage('app')} style={{ width: 44, height: 44, borderRadius: 14, background: theme.CARD, color: theme.TXT }}><Ico ic={RefreshCw} size={18} /></button>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: theme.CARD, display: 'grid', placeItems: 'center' }}><Ico ic={Bell} size={18} /></div>
          </div>
        </header>
        <PageComponent />
      </main>
    </div>
  );
}
