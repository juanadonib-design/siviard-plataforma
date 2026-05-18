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
  // Premium additional icons
  Radar, Hexagon, Binary, CircuitBoard, Workflow, BarChart2,
  AreaChart, TrendingUp as Trend, ShieldAlert, UserCog, BellRing,
  FlaskConical, Microscope, Telescope, Compass, Map, Waypoints,
  FileSearch, FileLock2, FileCheck2, FileBarChart2,
  UserCheck, UserX, UserPlus, UsersRound,
  SlidersHorizontal, ToggleRight, Gauge, Sliders,
  BrainCircuit, ScanFace, KeyRound, Unplug,
  ArrowUpRight, ArrowDownRight, TriangleAlert, CircleCheck,
  Bolt, FlameKindling, Orbit, Atom
} from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart as ReAreaChart
} from "recharts";

/* ─── DATA ─── */
const SOLICITUDES = [
  { id:"VIA-2025-001", empleado:"Ing. Ramírez Mejía", cedula:"001-1234567-8", cargo:"Ingeniero Senior", depto:"Obras Públicas", provincia:"Santiago", fecha:"2025-05-10", monto:4500, estado:"Aprobado", motivo:"Supervisión de infraestructura vial", supervisor:"Dir. García Núñez", riesgo:"Bajo", avatar:"RM" },
  { id:"VIA-2025-002", empleado:"Lic. Pérez Santos", cedula:"002-9876543-1", cargo:"Analista Legal", depto:"Asesoría Jurídica", provincia:"La Vega", fecha:"2025-05-12", monto:3200, estado:"Pendiente", motivo:"Audiencia judicial provincial", supervisor:"Dir. Martínez Ruiz", riesgo:"Bajo", avatar:"PS" },
  { id:"VIA-2025-003", empleado:"Dra. Vargas Díaz", cedula:"003-1122334-5", cargo:"Directora Regional", depto:"Salud Pública", provincia:"San Pedro de Macorís", fecha:"2025-05-13", monto:5800, estado:"En Revisión", motivo:"Evaluación centros de salud", supervisor:"Min. Rodríguez López", riesgo:"Medio", avatar:"VD" },
  { id:"VIA-2025-004", empleado:"Sr. Torres Cabral", cedula:"004-5566778-9", cargo:"Técnico de Campo", depto:"Agricultura", provincia:"Distrito Nacional", fecha:"2025-05-14", monto:0, estado:"Rechazado", motivo:"Visita técnica agraria", supervisor:"Dir. Sánchez Marte", riesgo:"Alto", avatar:"TC", alerta:true },
  { id:"VIA-2025-005", empleado:"Arq. Guzmán Peña", cedula:"005-9988776-6", cargo:"Arquitecta Proyectista", depto:"Planificación Urbana", provincia:"Puerto Plata", fecha:"2025-05-15", monto:6200, estado:"Aprobado", motivo:"Revisión proyecto costero turístico", supervisor:"Dir. Castillo Reyes", riesgo:"Bajo", avatar:"GP" },
  { id:"VIA-2025-006", empleado:"Prof. Montero Silva", cedula:"006-3344556-7", cargo:"Supervisor Educativo", depto:"Educación", provincia:"Barahona", fecha:"2025-05-16", monto:7100, estado:"Pendiente", motivo:"Evaluación docente provincial", supervisor:"Dir. Jiménez Cruz", riesgo:"Bajo", avatar:"MS" },
];

const GASTOS_DATA = [
  { mes:"Ene", monto:142000 }, { mes:"Feb", monto:185000 }, { mes:"Mar", monto:134000 },
  { mes:"Abr", monto:210000 }, { mes:"May", monto:178000 }, { mes:"Jun", monto:225000 },
];
const PROV_DATA = [
  { name:"Santiago", value:28 }, { name:"La Vega", value:18 }, { name:"San Pedro", value:14 },
  { name:"Puerto Plata", value:21 }, { name:"Barahona", value:12 }, { name:"Otros", value:7 },
];
const PIE_COLORS = ["#2563EB","#06B6D4","#10B981","#8B5CF6","#F59E0B","#64748B"];
const PROVINCIAS = ["Santiago","La Vega","San Pedro de Macorís","Puerto Plata","Barahona","Monte Cristi","Samaná","Azua","Baní","Bonao","Cotui","Moca","San Juan de la Maguana","Nagua","Higuey","San Francisco de Macorís"];
const AUDIT_LOG = [
  { id:1, ts:"2025-05-16 09:42", usuario:"Adm. Carlos Medina", accion:"APROBACIÓN", recurso:"VIA-2025-005", ip:"192.168.1.10", nivel:"Info" },
  { id:2, ts:"2025-05-16 09:15", usuario:"Sistema SIVIARD", accion:"RECHAZO AUTOMÁTICO", recurso:"VIA-2025-004", ip:"Sistema", nivel:"Alerta" },
  { id:3, ts:"2025-05-16 08:55", usuario:"Prof. Montero Silva", accion:"SOLICITUD", recurso:"VIA-2025-006", ip:"192.168.1.44", nivel:"Info" },
  { id:4, ts:"2025-05-15 17:30", usuario:"Dpto. Finanzas", accion:"REVISIÓN", recurso:"VIA-2025-003", ip:"192.168.1.22", nivel:"Info" },
  { id:5, ts:"2025-05-15 14:00", usuario:"Tesorería", accion:"DESEMBOLSO", recurso:"VIA-2025-001", ip:"192.168.1.30", nivel:"Info" },
  { id:6, ts:"2025-05-14 11:20", usuario:"Dir. Martínez Ruiz", accion:"INICIO SESIÓN", recurso:"Portal SIVIARD", ip:"192.168.1.5", nivel:"Info" },
];
const EMPLEADOS = [
  { nombre:"Adm. Carlos Medina", rol:"Administrador", email:"c.medina@gov.do", depto:"Tecnología", avatar:"CM", color:"#2563EB", solic:12 },
  { nombre:"Dra. Vargas Díaz", rol:"Directora Regional", email:"v.diaz@gov.do", depto:"Salud Pública", avatar:"VD", color:"#8B5CF6", solic:8 },
  { nombre:"Ing. Ramírez Mejía", rol:"Ingeniero Senior", email:"r.mejia@gov.do", depto:"Obras Públicas", avatar:"RM", color:"#10B981", solic:5 },
  { nombre:"Prof. Montero Silva", rol:"Supervisor Educativo", email:"m.silva@gov.do", depto:"Educación", avatar:"MS", color:"#F59E0B", solic:7 },
];

/* ─── PREMIUM STYLES ─── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

*{box-sizing:border-box;margin:0;padding:0}

/* ── Keyframes ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes bounce{0%,80%,100%{transform:scale(.55);opacity:.3}40%{transform:scale(1.1);opacity:1}}
@keyframes shimmer{0%{background-position:-300% 0}100%{background-position:300% 0}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0)}50%{box-shadow:0 0 0 8px rgba(37,99,235,.12)}}
@keyframes toastIn{from{opacity:0;transform:translateX(28px) scale(.96)}to{opacity:1;transform:translateX(0) scale(1)}}
@keyframes pulseRing{0%{transform:scale(.95);opacity:.7}100%{transform:scale(1.15);opacity:0}}
@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes scanLine{0%{transform:translateY(-100%)}100%{transform:translateY(600%)}}
@keyframes ripple{0%{transform:scale(0);opacity:.6}100%{transform:scale(2.5);opacity:0}}
@keyframes iconPop{0%{transform:scale(1)}40%{transform:scale(1.28) rotate(-8deg)}70%{transform:scale(.94) rotate(4deg)}100%{transform:scale(1) rotate(0)}}
@keyframes statusPulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes borderGlow{0%,100%{border-color:rgba(37,99,235,.15)}50%{border-color:rgba(37,99,235,.45)}}
@keyframes orbReveal{from{clip-path:circle(0% at 50% 50%);opacity:0}to{clip-path:circle(100% at 50% 50%);opacity:1}}

/* ── Card animations ── */
.card{animation:fadeUp .42s cubic-bezier(.22,1,.36,1) both}
.card:nth-child(1){animation-delay:.04s}.card:nth-child(2){animation-delay:.09s}
.card:nth-child(3){animation-delay:.14s}.card:nth-child(4){animation-delay:.19s}
.card:nth-child(5){animation-delay:.24s}.card:nth-child(6){animation-delay:.29s}

/* ── Hover lift ── */
.hover-lift{transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease}
.hover-lift:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,.14)}

/* ── Nav button ── */
.nav-btn{transition:all .22s cubic-bezier(.4,0,.2,1);cursor:pointer;border:none;background:transparent;width:100%;display:flex;align-items:center;text-align:left;position:relative;overflow:hidden}
.nav-btn::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.07),transparent 60%);opacity:0;transition:opacity .3s}
.nav-btn:hover::after{opacity:1}

/* ── Premium icon wrapper ── */
.ico-premium{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease,filter .2s;position:relative}
.ico-premium:hover{transform:scale(1.18) translateY(-1px);filter:brightness(1.12)}
.ico-premium:hover .ico-glow{opacity:1}
.ico-glow{position:absolute;inset:-4px;border-radius:inherit;background:inherit;filter:blur(8px);opacity:0;transition:opacity .25s;z-index:-1}

/* ── Nav icon ── */
.n-icon{transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .2s,box-shadow .25s}
.nav-btn:hover .n-icon{transform:scale(1.2) rotate(-5deg)}
.nav-btn.active .n-icon{animation:floatUp 3s ease-in-out infinite}

/* ── Action buttons ── */
.act-btn{transition:all .2s cubic-bezier(.34,1.56,.64,1);cursor:pointer;border:none;display:flex;align-items:center;gap:7px;font-weight:700;position:relative;overflow:hidden}
.act-btn::before{content:'';position:absolute;inset:0;background:rgba(255,255,255,0);transition:background .15s}
.act-btn:hover::before{background:rgba(255,255,255,.08)}
.act-btn:hover{transform:translateY(-2px);filter:brightness(1.06)}
.act-btn:active{transform:scale(.97)}

/* ── Icon button (topbar etc) ── */
.ic-btn{transition:all .22s cubic-bezier(.34,1.56,.64,1);cursor:pointer;border:none;background:transparent;display:flex;align-items:center;justify-content:center;position:relative}
.ic-btn:hover{transform:scale(1.14)}
.ic-btn:hover .ic-inner{background:rgba(37,99,235,.12)!important}

/* ── Module icon boxes ── */
.mod-icon{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease;cursor:default}
.mod-icon:hover{transform:scale(1.15) rotate(-6deg);box-shadow:0 8px 24px rgba(0,0,0,.18)}

/* ── Table rows ── */
.row{transition:background .14s,transform .14s}
.row:hover{background:rgba(37,99,235,.04)!important}

/* ── Pills/chips ── */
.pill{transition:all .18s cubic-bezier(.34,1.56,.64,1);cursor:pointer;border:none}
.pill:hover{transform:scale(1.07)}

/* ── Status chip dot ── */
.status-dot{animation:statusPulse 2.5s ease-in-out infinite}

/* ── Notification badge ── */
.notif-badge{animation:pulseRing 1.8s ease-out infinite}

/* ── Form inputs ── */
input,select,textarea{font-family:'DM Sans',system-ui,sans-serif;outline:none;transition:border-color .2s,box-shadow .2s,background .15s}
input:focus,select:focus,textarea:focus{border-color:#2563EB!important;box-shadow:0 0 0 3px rgba(37,99,235,.15)!important}

/* ── Scrollbar ── */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(100,116,139,.18);border-radius:99px}
::-webkit-scrollbar-thumb:hover{background:rgba(100,116,139,.38)}

/* ── Sidebar scan effect ── */
.sidebar-scan::before{content:'';position:absolute;left:0;right:0;height:60px;background:linear-gradient(180deg,transparent,rgba(37,99,235,.04),transparent);animation:scanLine 5s linear infinite;pointer-events:none;z-index:0}

/* ── KPI card glow ring ── */
.kpi-ring{transition:box-shadow .3s}
.kpi-ring:hover{box-shadow:0 0 0 1px rgba(37,99,235,.25), 0 20px 48px rgba(0,0,0,.14)}

/* ── Topbar icon ripple ── */
.topbar-ico{position:relative;overflow:hidden}
.topbar-ico:active::after{content:'';position:absolute;inset:0;border-radius:inherit;background:rgba(37,99,235,.2);animation:ripple .4s ease}
`;

/* ─── MICRO COMPONENTS ─── */
function Ico({ ic: I, size=16, color, className="", style={} }) {
  return <I size={size} color={color} strokeWidth={1.7} className={className} style={style} />;
}

// Premium icon box with glow effect
function IcoBox({ ic, size=16, color, bg, pad=10, radius=11, className="", style={}, glow=false }) {
  return (
    <div
      className={`mod-icon ${className}`}
      style={{
        width:pad*2+size, height:pad*2+size, borderRadius:radius,
        background:bg, display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0, position:"relative",
        boxShadow: glow ? `0 4px 16px ${color}30` : "none",
        ...style
      }}
    >
      {glow && <div style={{ position:"absolute", inset:0, borderRadius:radius, background:bg, filter:"blur(10px)", opacity:.5, zIndex:-1 }} />}
      <Ico ic={ic} size={size} color={color} />
    </div>
  );
}

const STATUS = {
  Aprobado:    { bg:"#D1FAE5", c:"#065F46", dot:"#10B981", ic:CircleCheck },
  Pendiente:   { bg:"#FEF3C7", c:"#92400E", dot:"#F59E0B", ic:Clock },
  Rechazado:   { bg:"#FEE2E2", c:"#991B1B", dot:"#EF4444", ic:XCircle },
  "En Revisión":{ bg:"#DBEAFE", c:"#1E40AF", dot:"#2563EB", ic:ScanLine },
  Info:        { bg:"#DBEAFE", c:"#1E40AF", dot:"#2563EB", ic:Info },
  Alerta:      { bg:"#FEF3C7", c:"#92400E", dot:"#F59E0B", ic:TriangleAlert },
  Bajo:        { bg:"#D1FAE5", c:"#065F46", dot:"#10B981", ic:Shield },
  Medio:       { bg:"#FEF3C7", c:"#92400E", dot:"#F59E0B", ic:ShieldAlert },
  Alto:        { bg:"#FEE2E2", c:"#991B1B", dot:"#EF4444", ic:ShieldAlert },
  Activo:      { bg:"#D1FAE5", c:"#065F46", dot:"#10B981", ic:Bolt },
};

function Chip({ label }) {
  const s = STATUS[label] || { bg:"#F1F5F9", c:"#64748B", dot:"#94A3B8", ic:Zap };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg, color:s.c, fontSize:10.5, fontWeight:700, padding:"3px 9px 3px 7px", borderRadius:99, letterSpacing:.1 }}>
      <s.ic size={10} color={s.dot} strokeWidth={2.2} style={{ flexShrink:0 }} />
      {label}
    </span>
  );
}

function Toast({ msg, type, onClose }) {
  const err = type === "error";
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:9999, animation:"toastIn .32s cubic-bezier(.34,1.56,.64,1)" }}>
      <div style={{ background:err?"#FEF2F2":"#F0FDF4", border:`1.5px solid ${err?"#FCA5A5":"#6EE7B7"}`, borderRadius:16, padding:"14px 18px", display:"flex", alignItems:"center", gap:13, minWidth:300, boxShadow:"0 24px 60px rgba(0,0,0,.2)" }}>
        <IcoBox ic={err?AlertCircle:CircleCheck} size={18} color={err?"#EF4444":"#10B981"} bg={err?"#FEE2E2":"#D1FAE5"} pad={9} radius={10} glow />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:800, color:err?"#991B1B":"#065F46", fontFamily:"'DM Sans',system-ui" }}>{err?"Error del sistema":"Operación exitosa"}</div>
          <div style={{ fontSize:12, color:err?"#B91C1C":"#047857", marginTop:2 }}>{msg}</div>
        </div>
        <button className="ic-btn" onClick={onClose}><Ico ic={XCircle} size={15} color="#94A3B8" /></button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function SIVIARD() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [sideOpen, setSideOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginF, setLoginF] = useState({ email:"", pass:"", err:"" });
  const [step, setStep] = useState(1);
  const [dnAlert, setDnAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre:"",cedula:"",cargo:"",depto:"",fecha:"",horaSalida:"",horaLlegada:"",motivo:"",provincia:"",transporte:"",supervisor:"" });
  const [q, setQ] = useState("");
  const [fEst, setFEst] = useState("Todos");
  const [selSol, setSelSol] = useState(null);
  const [hovNav, setHovNav] = useState(null);

  // ── TOOLTIP STATE ──
  const [tooltipStep, setTooltipStep] = useState(null);
  const [tooltipPos,  setTooltipPos]  = useState({ x:0, y:0 });

  // ── FLUJO EDITOR STATE ──
  const [flujoSteps, setFlujoSteps] = useState([
    { id:"s1", label:"Solicitante",  ic:"FilePlus2",  color:"#2563EB", responsable:"Sistema SIVIARD",       suplente:"—",                    locked:true  },
    { id:"s2", label:"Supervisor",   ic:"UserCog",    color:"#8B5CF6", responsable:"Dir. Martínez Ruiz",    suplente:"Lic. Pérez Santos",     locked:false },
    { id:"s3", label:"Director",     ic:"Crown",      color:"#F59E0B", responsable:"Min. Rodríguez López",  suplente:"Dir. García Núñez",     locked:false },
    { id:"s4", label:"Finanzas",     ic:"BarChart2",  color:"#10B981", responsable:"Dpto. Finanzas",        suplente:"Cont. Vargas Herrera",  locked:false },
    { id:"s5", label:"Auditoría",    ic:"Radar",      color:"#06B6D4", responsable:"Unidad de Auditoría",   suplente:"—",                    locked:true  },
  ]);
  const [flujoModalOpen, setFlujoModalOpen]   = useState(false);
  const [editingStep,    setEditingStep]       = useState(null);   // null = new, obj = editing
  const [hoveredStep,    setHoveredStep]       = useState(null);
  const [stepForm, setStepForm] = useState({ label:"", ic:"UserCheck", color:"#8B5CF6", responsable:"", suplente:"" });

  // Icon catalogue for selector
  const ICON_CATALOGUE = [
    { key:"UserCog",    Ic:UserCog,    label:"Supervisor"   },
    { key:"Crown",      Ic:Crown,      label:"Director"     },
    { key:"BarChart2",  Ic:BarChart2,  label:"Finanzas"     },
    { key:"Shield",     Ic:Shield,     label:"Seguridad"    },
    { key:"Building2",  Ic:Building2,  label:"Institución"  },
    { key:"UserCheck",  Ic:UserCheck,  label:"Validador"    },
    { key:"DollarSign", Ic:DollarSign, label:"Tesorería"    },
    { key:"FileCheck2", Ic:FileCheck2, label:"Revisión"     },
    { key:"Briefcase",  Ic:Briefcase,  label:"RRHH"         },
    { key:"Database",   Ic:Database,   label:"Registros"    },
    { key:"Workflow",   Ic:Workflow,   label:"Proceso"      },
    { key:"ShieldCheck",Ic:ShieldCheck,label:"Compliance"   },
  ];

  const COLOR_PALETTE = [
    "#2563EB","#8B5CF6","#F59E0B","#10B981","#EF4444",
    "#06B6D4","#EC4899","#F97316","#14B8A6","#6366F1",
  ];

  // Resolve icon component from string key
  const ICON_MAP = {
    FilePlus2, UserCog, Crown, BarChart2, Radar, Shield, Building2,
    UserCheck, DollarSign, FileCheck2, Briefcase, Database, Workflow,
    ShieldCheck, GitBranch, Star: Star ?? ShieldCheck,
  };
  const resolveIc = (key) => ICON_MAP[key] || UserCheck;

  const openNewStep = () => {
    setEditingStep(null);
    setStepForm({ label:"", ic:"UserCheck", color:"#8B5CF6", responsable:"", suplente:"" });
    setFlujoModalOpen(true);
  };
  const openEditStep = (step) => {
    setEditingStep(step);
    setStepForm({ label:step.label, ic:step.ic, color:step.color, responsable:step.responsable, suplente:step.suplente });
    setFlujoModalOpen(true);
  };
  const saveStep = () => {
    if (!stepForm.label.trim() || !stepForm.responsable.trim()) return;
    const newId = "s" + Date.now();
    setFlujoSteps(prev => {
      if (editingStep) {
        return prev.map(s => s.id === editingStep.id ? { ...s, ...stepForm } : s);
      } else {
        // Insert before last locked step (Auditoría)
        const insertIdx = prev.length - 1;
        const next = [...prev];
        next.splice(insertIdx, 0, { id:newId, ...stepForm, locked:false });
        return next;
      }
    });
    setFlujoModalOpen(false);
  };
  const deleteStep = (id) => {
    setFlujoSteps(prev => prev.filter(s => s.id !== id));
  };
  const moveStep = (id, dir) => {
    setFlujoSteps(prev => {
      const idx = prev.findIndex(s => s.id === id);
      const newArr = [...prev];
      const swapIdx = dir === "up" ? idx - 1 : idx + 1;
      // Never swap with locked extremes
      if (swapIdx < 0 || swapIdx >= newArr.length) return prev;
      if (newArr[swapIdx].locked) return prev;
      [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
      return newArr;
    });
  };

  useEffect(() => { setTimeout(() => setLoading(false), 1900); }, []);
  const notify = (msg, type="success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3600); };

  const login = () => {
    if (loginF.email === "c.medina@gov.do" && loginF.pass === "admin123") {
      setUser({ nombre:"Carlos Medina", rol:"Administrador", av:"CM", accent:"#2563EB" }); setPage("app");
    } else if (loginF.email === "m.gonzalez@gov.do" && loginF.pass === "super123") {
      setUser({ nombre:"María González", rol:"Supervisora", av:"MG", accent:"#8B5CF6" }); setPage("app");
    } else setLoginF(p => ({ ...p, err:"Credenciales inválidas. Verifique su acceso institucional." }));
  };

  const d = dark;
  const BG    = d ? "#080E1B" : "#EEF2F7";
  const CARD  = d ? "#111827" : "#FFFFFF";
  const CARD2 = d ? "#1C2537" : "#F8FAFC";
  const BDR   = d ? "#1F2D45" : "#E2E8F0";
  const TXT   = d ? "#E2E8F0" : "#0F172A";
  const MUT   = d ? "#64748B" : "#6B7280";
  const SIDE  = d ? "#060C18" : "#090F1E";

  // Premium NAV config with upgraded icons and descriptions
  const NAV = [
    { id:"dashboard",   label:"Dashboard",       ic:BarChart3, color:"#2563EB", bg:"rgba(37,99,235,.18)",  desc:"Visión ejecutiva" },
    { id:"solicitud",   label:"Nueva Solicitud", ic:FilePlus2,           color:"#06B6D4", bg:"rgba(6,182,212,.18)",  desc:"Crear viático" },
    { id:"solicitudes", label:"Solicitudes",     ic:Waypoints,           color:"#10B981", bg:"rgba(16,185,129,.18)", desc:"Gestión completa" },
    { id:"aprobacion",  label:"Aprobaciones",    ic:FileCheck2,          color:"#F59E0B", bg:"rgba(245,158,11,.18)", desc:"Flujo jerárquico" },
    { id:"auditoria",   label:"Auditoría",       ic:Radar,               color:"#8B5CF6", bg:"rgba(139,92,246,.18)", desc:"Trazabilidad total" },
    { id:"reportes",    label:"Reportes",        ic:ChartArea,           color:"#EF4444", bg:"rgba(239,68,68,.18)",  desc:"Estadísticas" },
    { id:"usuarios",    label:"Usuarios",        ic:UsersRound,          color:"#06B6D4", bg:"rgba(6,182,212,.18)",  desc:"Gestión de accesos" },
    { id:"config",      label:"Configuración",   ic:Sliders,             color:"#94A3B8", bg:"rgba(148,163,184,.18)",desc:"Parámetros" },
  ];

  const FILTERED = SOLICITUDES.filter(s =>
    (fEst === "Todos" || s.estado === fEst) &&
    [s.empleado, s.id, s.provincia].some(v => v.toLowerCase().includes(q.toLowerCase()))
  );

  /* ── LOADER ── */
  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#060C18", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <style>{G}</style>
      <div style={{ position:"relative", marginBottom:40 }}>
        <div style={{ position:"absolute", inset:-24, borderRadius:"50%", border:"1px solid rgba(37,99,235,.2)", animation:"spinSlow 8s linear infinite" }} />
        <div style={{ position:"absolute", inset:-42, borderRadius:"50%", border:"1px dashed rgba(6,182,212,.1)", animation:"spinSlow 14s linear infinite reverse" }} />
        <div style={{ position:"absolute", inset:-60, borderRadius:"50%", border:"1px solid rgba(139,92,246,.06)", animation:"spinSlow 22s linear infinite" }} />
        <div style={{ width:80, height:80, borderRadius:24, background:"linear-gradient(135deg,#1D4ED8,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 60px rgba(37,99,235,.5), 0 0 120px rgba(37,99,235,.2)", animation:"floatUp 3s ease-in-out infinite" }}>
          <Ico ic={Orbit} size={38} color="#fff" />
        </div>
      </div>
      <div style={{ fontSize:32, fontWeight:900, letterSpacing:-1.5, background:"linear-gradient(90deg,#60A5FA,#38BDF8,#06B6D4,#38BDF8,#60A5FA)", backgroundSize:"300%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 2.4s linear infinite" }}>SIVIARD</div>
      <div style={{ color:"#1E2D45", fontSize:10, letterSpacing:5.5, marginTop:5, marginBottom:36, fontFamily:"'JetBrains Mono',monospace" }}>REPÚBLICA DOMINICANA · v2.1</div>
      <div style={{ display:"flex", gap:9 }}>{[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg,#2563EB,#06B6D4)", animation:`bounce 1.3s ease ${i*.22}s infinite` }} />)}</div>
    </div>
  );

  /* ── LOGIN ── */
  if (page === "login") return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 25% 30%, #0F2559 0%, #060C18 60%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',system-ui,sans-serif", overflow:"hidden", position:"relative" }}>
      <style>{G}</style>
      {/* bg orbs */}
      <div style={{ position:"absolute", top:"8%", left:"6%", width:340, height:340, borderRadius:"50%", background:"rgba(37,99,235,.06)", filter:"blur(80px)", animation:"floatUp 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"12%", right:"5%", width:260, height:260, borderRadius:"50%", background:"rgba(6,182,212,.06)", filter:"blur(60px)", animation:"floatUp 8s ease-in-out 1s infinite" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, borderRadius:"50%", background:"rgba(139,92,246,.03)", filter:"blur(100px)", pointerEvents:"none" }} />
      {/* grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.022) 1px, transparent 0)", backgroundSize:"38px 38px" }} />

      <div style={{ width:440, background:"rgba(11,18,36,.82)", backdropFilter:"blur(40px)", borderRadius:24, border:"1px solid rgba(37,99,235,.2)", padding:"46px 40px", boxShadow:"0 40px 100px rgba(0,0,0,.7)", animation:"fadeUp .5s cubic-bezier(.22,1,.36,1)" }}>
        {/* Logo block */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", inset:-6, borderRadius:22, border:"1px solid rgba(37,99,235,.28)", animation:"borderGlow 3s ease infinite" }} />
              <div style={{ position:"absolute", inset:-14, borderRadius:28, border:"1px dashed rgba(6,182,212,.1)", animation:"spinSlow 12s linear infinite" }} />
              <div style={{ width:70, height:70, borderRadius:20, background:"linear-gradient(135deg,#1D4ED8,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 36px rgba(37,99,235,.45)", animation:"floatUp 4s ease-in-out infinite" }}>
                <Ico ic={Orbit} size={34} color="#fff" />
              </div>
            </div>
            <div>
              <div style={{ fontSize:28, fontWeight:900, color:"#F1F5F9", letterSpacing:-1.2, fontFamily:"'DM Sans',system-ui" }}>SIVIARD</div>
              <div style={{ color:"#1E3A5F", fontSize:9.5, letterSpacing:4.5, marginTop:4, fontFamily:"'JetBrains Mono',monospace" }}>SISTEMA INTELIGENTE DE VIÁTICOS · RD</div>
            </div>
          </div>
          <p style={{ color:"#475569", fontSize:13, marginTop:14, lineHeight:1.5 }}>Plataforma institucional de República Dominicana</p>
        </div>

        {/* Inputs */}
        {[["CORREO INSTITUCIONAL","email","text","usuario@gov.do",Mail],["CONTRASEÑA","pass","password","••••••••",KeyRound]].map(([lbl,key,type,ph,Ic]) => (
          <div key={key} style={{ marginBottom:16 }}>
            <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:10.5, fontWeight:700, color:"#334155", letterSpacing:1.2, marginBottom:8 }}>
              <Ic size={11} color="#475569" strokeWidth={2} />{lbl}
            </label>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><Ico ic={Ic} size={14} color="#475569" /></div>
              <input type={type} value={loginF[key]} placeholder={ph} onChange={e => setLoginF(p => ({...p,[key]:e.target.value,err:""}))} onKeyDown={e => e.key==="Enter"&&login()} style={{ width:"100%", padding:"13px 14px 13px 42px", background:"rgba(15,23,42,.65)", border:"1px solid rgba(51,65,85,.55)", borderRadius:12, color:"#E2E8F0", fontSize:14 }} />
            </div>
          </div>
        ))}

        {loginF.err && (
          <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", borderRadius:11, padding:"11px 14px", marginBottom:14 }}>
            <Ico ic={ShieldAlert} size={15} color="#EF4444" />
            <span style={{ fontSize:12, color:"#FCA5A5" }}>{loginF.err}</span>
          </div>
        )}

        <div style={{ textAlign:"right", marginBottom:20 }}>
          <span style={{ color:"#3B82F6", fontSize:12, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5 }}>
            <Ico ic={KeyRound} size={11} color="#3B82F6" /> ¿Olvidó su contraseña?
          </span>
        </div>

        <button className="act-btn" onClick={login} style={{ width:"100%", padding:15, background:"linear-gradient(135deg,#2563EB,#0891B2)", borderRadius:13, color:"#fff", fontSize:14, fontWeight:900, justifyContent:"center", gap:10, boxShadow:"0 12px 28px rgba(37,99,235,.4)", fontFamily:"'DM Sans',system-ui" }}>
          <Ico ic={ScanFace} size={19} color="#fff" /> Acceder al Sistema
        </button>

        <div style={{ marginTop:24, padding:"14px 17px", background:"rgba(6,182,212,.06)", border:"1px solid rgba(6,182,212,.14)", borderRadius:13 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
            <Ico ic={BrainCircuit} size={13} color="#06B6D4" />
            <span style={{ fontSize:10.5, color:"#06B6D4", fontWeight:800, letterSpacing:.8, fontFamily:"'JetBrains Mono',monospace" }}>ACCESO DEMO</span>
          </div>
          <div style={{ fontSize:11, color:"#334155", lineHeight:2 }}>
            Admin: <span style={{ color:"#38BDF8", fontFamily:"'JetBrains Mono',monospace" }}>c.medina@gov.do</span> / <span style={{ color:"#38BDF8", fontFamily:"'JetBrains Mono',monospace" }}>admin123</span><br />
            Super: <span style={{ color:"#38BDF8", fontFamily:"'JetBrains Mono',monospace" }}>m.gonzalez@gov.do</span> / <span style={{ color:"#38BDF8", fontFamily:"'JetBrains Mono',monospace" }}>super123</span>
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:20, display:"flex", alignItems:"center", justifyContent:"center", gap:7, color:"#1E2D45", fontSize:11 }}>
          <Ico ic={FileLock2} size={11} color="#1E2D45" /> Acceso restringido — Solo personal autorizado
        </div>
      </div>
    </div>
  );

  /* ── PAGES ── */
  const Dashboard = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
            <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#2563EB,#06B6D4)" }} />
            <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Dashboard Ejecutivo</h2>
          </div>
          <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>{new Date().toLocaleDateString("es-DO",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, background:CARD, border:`1px solid ${BDR}`, borderRadius:12, padding:"9px 15px" }}>
          <IcoBox ic={Gauge} size={13} color="#10B981" bg="rgba(16,185,129,.12)" pad={5} radius={7} glow />
          <span style={{ fontSize:11, color:"#10B981", fontWeight:700 }}>Sistema activo</span>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", boxShadow:"0 0 0 3px rgba(16,185,129,.2)", animation:"statusPulse 2.5s ease infinite" }} />
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:15, marginBottom:22 }}>
        {[
          { lbl:"Total Solicitudes", val:"48",      sub:"+6 esta semana", ic:Waypoints,          ac:"#2563EB", li:"rgba(37,99,235,.1)",  trend:ArrowUpRight, tc:"#10B981" },
          { lbl:"Aprobadas",         val:"31",      sub:"64.6% del total", ic:FileCheck2,         ac:"#10B981", li:"rgba(16,185,129,.1)", trend:ArrowUpRight, tc:"#10B981" },
          { lbl:"Rechazadas",        val:"8",       sub:"2 por alerta DN", ic:FileSearch,         ac:"#EF4444", li:"rgba(239,68,68,.1)",  trend:ArrowDownRight,tc:"#EF4444" },
          { lbl:"Gasto del Mes",     val:"RD$178K", sub:"↑12% vs anterior", ic:BarChart3,   ac:"#F59E0B", li:"rgba(245,158,11,.1)", trend:ArrowUpRight, tc:"#10B981" },
        ].map((m,i) => (
          <div key={i} className="card hover-lift kpi-ring" style={{ background:CARD, borderRadius:18, padding:"22px 24px", border:`1px solid ${BDR}`, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-18, right:-18, width:80, height:80, borderRadius:"50%", background:m.li, filter:"blur(2px)" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${m.ac}22,${m.ac},${m.ac}22)`, opacity:.6 }} />
            <div style={{ position:"relative" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:15 }}>
                <IcoBox ic={m.ic} size={22} color={m.ac} bg={m.li} pad={11} radius={14} glow />
                <div style={{ display:"flex", alignItems:"center", gap:4, background:m.tc==="#10B981"?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", borderRadius:9, padding:"4px 9px" }}>
                  <m.trend size={12} color={m.tc} strokeWidth={2.5} />
                </div>
              </div>
              <div style={{ fontSize:30, fontWeight:900, color:m.ac, letterSpacing:-1.4, lineHeight:1, fontFamily:"'DM Sans',system-ui" }}>{m.val}</div>
              <div style={{ fontSize:12.5, color:TXT, marginTop:5, fontWeight:600 }}>{m.lbl}</div>
              <div style={{ fontSize:11, color:MUT, marginTop:3 }}>{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2.1fr 1fr", gap:15, marginBottom:15 }}>
        {/* ÁREA CHART */}
        <div className="card" style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <IcoBox ic={ChartArea} size={16} color="#2563EB" bg="rgba(37,99,235,.1)" pad={9} radius={11} glow />
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:TXT }}>Evolución de Gastos 2025</div>
                <div style={{ fontSize:11, color:MUT }}>Viáticos desembolsados mensualmente (RD$)</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:5 }}>
              {["1M","3M","6M"].map((t,i) => <button key={t} className="pill" style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${i===2?"#2563EB":BDR}`, background:i===2?"#2563EB":"transparent", color:i===2?"#fff":MUT, fontSize:11, fontWeight:700 }}>{t}</button>)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={185}>
            <ReAreaChart data={GASTOS_DATA}>
              <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={.2}/><stop offset="95%" stopColor="#2563EB" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={BDR} />
              <XAxis dataKey="mes" tick={{fontSize:11,fill:MUT,fontFamily:"'DM Sans',system-ui"}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:11,fill:MUT}} tickFormatter={v=>`${v/1000}K`} axisLine={false} tickLine={false} />
              <Tooltip formatter={v=>[`RD$ ${v.toLocaleString()}`,"Monto"]} contentStyle={{borderRadius:12,border:`1px solid ${BDR}`,background:CARD,color:TXT,fontSize:12}} />
              <Area type="monotone" dataKey="monto" stroke="#2563EB" strokeWidth={2.5} fill="url(#ag)" dot={{r:4,fill:"#2563EB",strokeWidth:0}} activeDot={{r:6}} />
            </ReAreaChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="card" style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <IcoBox ic={PieIcon} size={16} color="#8B5CF6" bg="rgba(139,92,246,.1)" pad={9} radius={11} glow />
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:TXT }}>Provincias</div>
              <div style={{ fontSize:11, color:MUT }}>Destinos visitados</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={148}>
            <PieChart>
              <Pie data={PROV_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={62} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {PROV_DATA.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{borderRadius:10,border:`1px solid ${BDR}`,background:CARD,fontSize:12}} />
            </PieChart>
          </ResponsiveContainer>
          {PROV_DATA.map((p,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:PIE_COLORS[i] }} />
                <span style={{ fontSize:11, color:MUT }}>{p.name}</span>
              </div>
              <span style={{ fontSize:11, fontWeight:800, color:TXT }}>{p.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div className="card" style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <IcoBox ic={Radio} size={16} color="#06B6D4" bg="rgba(6,182,212,.1)" pad={9} radius={11} glow />
            <span style={{ fontSize:14, fontWeight:800, color:TXT }}>Actividad Reciente del Sistema</span>
          </div>
          <button className="act-btn" style={{ fontSize:11, color:"#2563EB", background:"transparent", border:`1px solid ${BDR}`, borderRadius:9, padding:"6px 13px", fontWeight:700 }}>
            Ver todo <Ico ic={ChevronRight} size={12} color="#2563EB" />
          </button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {[
            { t:"VIA-2025-006 enviada para aprobación", w:"Prof. Montero", time:"5 min",  ic:Send,         c:"#06B6D4" },
            { t:"VIA-2025-005 aprobada por Director",   w:"Dir. Castillo", time:"23 min", ic:CircleCheck,  c:"#10B981" },
            { t:"VIA-2025-004 rechazada — Destino DN",  w:"Sistema SIVIARD",time:"1h",   ic:TriangleAlert, c:"#EF4444" },
            { t:"VIA-2025-003 en revisión por Finanzas",w:"Dpto. Finanzas", time:"2h",   ic:ScanLine,     c:"#F59E0B" },
            { t:"VIA-2025-001 desembolsada — RD$ 4,500",w:"Tesorería",     time:"3h",    ic:DollarSign,   c:"#10B981" },
          ].map((a,i) => (
            <div key={i} className="row" style={{ display:"flex", alignItems:"center", gap:13, padding:"12px 15px", borderRadius:13, background:CARD2, border:`1px solid ${BDR}` }}>
              <div style={{ width:38, height:38, borderRadius:12, background:a.c+"1A", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 4px 12px ${a.c}22` }}>
                <Ico ic={a.ic} size={17} color={a.c} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:TXT, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.t}</div>
                <div style={{ fontSize:11, color:MUT, marginTop:2 }}>{a.w}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
                <Ico ic={Clock} size={11} color={MUT} /><span style={{ fontSize:11, color:MUT }}>Hace {a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── SOLICITUD FORM ─── */
  const SolicitudForm = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
          <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#06B6D4,#2563EB)" }} />
          <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Nueva Solicitud de Viáticos</h2>
        </div>
        <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Complete todos los campos para procesar su solicitud</p>
      </div>

      {/* STEPPER */}
      <div style={{ display:"flex", alignItems:"center", background:CARD, border:`1px solid ${BDR}`, borderRadius:16, padding:"18px 22px", marginBottom:26, gap:0, overflowX:"auto" }}>
        {[["Datos del Empleado",UserCheck],["Detalles del Viaje",Compass],["Validación Geográfica",Map],["Documentación",FileBarChart2]].map(([lbl,Ic],i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", flex:1, minWidth:0 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, flex:1 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:step>i+1?"linear-gradient(135deg,#10B981,#059669)":step===i+1?"linear-gradient(135deg,#2563EB,#1D4ED8)":BDR, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .35s cubic-bezier(.34,1.56,.64,1)", boxShadow:step===i+1?"0 0 0 5px rgba(37,99,235,.18), 0 8px 20px rgba(37,99,235,.28)":step>i+1?"0 6px 16px rgba(16,185,129,.28)":"none" }}>
                {step>i+1 ? <Ico ic={Check} size={16} color="#fff" /> : <Ico ic={Ic} size={15} color={step===i+1?"#fff":MUT} />}
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:step===i+1?"#2563EB":step>i+1?"#10B981":MUT, textAlign:"center", letterSpacing:.3, whiteSpace:"nowrap" }}>{lbl}</span>
            </div>
            {i<3 && <div style={{ height:2, width:40, flexShrink:0, background:step>i+1?"linear-gradient(90deg,#10B981,#059669)":BDR, margin:"0 4px 18px", borderRadius:1, transition:"background .35s" }} />}
          </div>
        ))}
      </div>

      {submitted ? (
        <div style={{ background:"#F0FDF4", border:"1.5px solid #6EE7B7", borderRadius:20, padding:48, textAlign:"center", animation:"fadeUp .35s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ width:76, height:76, borderRadius:"50%", background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:"0 12px 32px rgba(16,185,129,.35)" }}>
            <Ico ic={CircleCheck} size={40} color="#fff" />
          </div>
          <div style={{ fontSize:21, fontWeight:900, color:"#065F46" }}>Solicitud Registrada Exitosamente</div>
          <div style={{ color:"#047857", fontSize:14, marginTop:9 }}>ID: <strong style={{ fontFamily:"'JetBrains Mono',monospace" }}>VIA-2025-007</strong> · En revisión por su supervisor asignado</div>
          <button className="act-btn" onClick={()=>setSubmitted(false)} style={{ marginTop:28, padding:"12px 30px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:13, color:"#fff", fontSize:14, fontWeight:700, justifyContent:"center", border:"none", boxShadow:"0 8px 20px rgba(16,185,129,.32)" }}>
            <Ico ic={FilePlus2} size={17} color="#fff" /> Nueva Solicitud
          </button>
        </div>
      ) : (
        <div style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, overflow:"hidden" }}>
          <div style={{ padding:"18px 26px", borderBottom:`1px solid ${BDR}`, background:CARD2, display:"flex", alignItems:"center", gap:11 }}>
            <IcoBox ic={[UserCheck,Compass,Map,FileBarChart2][step-1]} size={16} color="#2563EB" bg="rgba(37,99,235,.1)" pad={9} radius={10} glow />
            <span style={{ fontSize:14, fontWeight:800, color:TXT }}>{["Información del Empleado","Detalles del Desplazamiento","Validación Geográfica del Destino","Documentación y Confirmación"][step-1]}</span>
          </div>
          <div style={{ padding:28 }}>
            {step===1 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[["Nombre Completo","nombre","text","Ing. Juan Pérez",UserCheck],["Número de Cédula","cedula","text","000-0000000-0",CreditCard],["Cargo / Posición","cargo","text","Ingeniero Senior",Briefcase],["Departamento","depto","text","Obras Públicas",Building2]].map(([lbl,key,type,ph,Ic])=>(
                  <div key={key}>
                    <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:MUT, marginBottom:9, letterSpacing:.5 }}><Ico ic={Ic} size={12} color={MUT}/>{lbl}</label>
                    <input type={type} value={form[key]} placeholder={ph} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} style={{ width:"100%", padding:"12px 14px", borderRadius:11, border:`1px solid ${BDR}`, background:BG, color:TXT, fontSize:13 }} />
                  </div>
                ))}
              </div>
            )}
            {step===2 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {[["Fecha del Viaje","fecha","date","",Calendar],["Hora de Salida","horaSalida","time","",Clock],["Hora de Llegada","horaLlegada","time","",Clock],["Transporte Utilizado","transporte","text","Vehículo institucional",Waypoints],["Supervisor Responsable","supervisor","text","Nombre del supervisor",UserCheck],["Motivo del Viaje","motivo","text","Propósito del viaje",Target]].map(([lbl,key,type,ph,Ic])=>(
                  <div key={key}>
                    <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:MUT, marginBottom:9, letterSpacing:.5 }}><Ico ic={Ic} size={12} color={MUT}/>{lbl}</label>
                    <input type={type} value={form[key]} placeholder={ph} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} style={{ width:"100%", padding:"12px 14px", borderRadius:11, border:`1px solid ${BDR}`, background:BG, color:TXT, fontSize:13 }} />
                  </div>
                ))}
              </div>
            )}
            {step===3 && (
              <div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:MUT, marginBottom:9, letterSpacing:.5 }}><Ico ic={MapPinned} size={12} color={MUT}/>PROVINCIA DESTINO</label>
                  <select value={form.provincia} onChange={e=>{setForm(p=>({...p,provincia:e.target.value}));setDnAlert(e.target.value==="Distrito Nacional")}} style={{ width:"100%", padding:"12px 14px", borderRadius:11, border:`1px solid ${BDR}`, background:BG, color:TXT, fontSize:13 }}>
                    <option value="">-- Seleccione la provincia destino --</option>
                    <option value="Distrito Nacional">Distrito Nacional</option>
                    {PROVINCIAS.map(p=><option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                {dnAlert && (
                  <div style={{ background:"#FEF2F2", border:"2px solid #EF4444", borderRadius:18, padding:24, marginBottom:20, animation:"fadeUp .28s cubic-bezier(.22,1,.36,1)" }}>
                    <div style={{ display:"flex", gap:15 }}>
                      <IcoBox ic={ShieldAlert} size={28} color="#EF4444" bg="#FEE2E2" pad={13} radius={14} glow />
                      <div>
                        <div style={{ fontSize:15, fontWeight:900, color:"#991B1B", marginBottom:10 }}>⚠️ DESTINO NO ELEGIBLE — ALERTA NORMATIVA</div>
                        <div style={{ fontSize:13, color:"#B91C1C", lineHeight:1.7 }}>Esta ubicación pertenece al <strong>Distrito Nacional</strong>. Según el <strong>Decreto No. 685-00</strong>, no corresponde asignación de viáticos para desplazamientos dentro del área metropolitana habitual.</div>
                        <div style={{ marginTop:13, display:"flex", alignItems:"center", gap:9, background:"#FEE2E2", borderRadius:11, padding:"9px 15px" }}>
                          <Ico ic={FileLock2} size={14} color="#991B1B" />
                          <span style={{ fontSize:12, color:"#991B1B", fontWeight:800 }}>Solicitud bloqueada automáticamente por SIVIARD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!dnAlert && form.provincia && (
                  <div style={{ background:"#F0FDF4", border:"1px solid #6EE7B7", borderRadius:16, padding:22, marginBottom:20, animation:"fadeUp .28s cubic-bezier(.22,1,.36,1)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                      <IcoBox ic={Crosshair} size={15} color="#10B981" bg="#D1FAE5" pad={8} radius={10} glow />
                      <span style={{ fontSize:13, fontWeight:800, color:"#065F46" }}>Destino Validado — {form.provincia}</span>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                      {[["🗺️ Región","Norte"],["📏 Distancia","~185 km"],["⏱️ Tiempo","2h 30min"],["💰 Viático base","RD$ 2,500"],["⛽ Combustible","RD$ 800"],["✅ Elegible","Sí"]].map(([l,v])=>(
                        <div key={l} style={{ background:"#fff", borderRadius:11, padding:"11px 13px" }}>
                          <div style={{ fontSize:10, color:"#6B7280" }}>{l}</div>
                          <div style={{ fontSize:13, fontWeight:700, color:"#065F46" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ background:CARD2, border:`2px dashed ${BDR}`, borderRadius:16, height:260, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
                  <IcoBox ic={Satellite} size={32} color="#2563EB" bg="rgba(37,99,235,.1)" pad={16} radius={20} glow />
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:TXT }}>Mapa Interactivo — Google Maps API</div>
                    <div style={{ fontSize:12, color:MUT, marginTop:4 }}>Configure su API Key para geocodificación en tiempo real</div>
                  </div>
                  <div style={{ display:"flex", gap:9, flexWrap:"wrap", justifyContent:"center" }}>
                    {[["Geocodificación",Crosshair,"#DBEAFE","#1E40AF"],["Cálculo de rutas",Waypoints,"#D1FAE5","#065F46"],["Detección DN",ShieldAlert,"#FEE2E2","#991B1B"]].map(([l,Ic,ibg,ic])=>(
                      <div key={l} style={{ display:"flex", alignItems:"center", gap:6, background:ibg, borderRadius:9, padding:"7px 13px" }}>
                        <Ico ic={Ic} size={12} color={ic}/><span style={{ fontSize:11, fontWeight:700, color:ic }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step===4 && (
              <div>
                <div style={{ border:`2px dashed ${BDR}`, borderRadius:16, padding:36, textAlign:"center", marginBottom:20, cursor:"pointer", transition:"border-color .22s,background .22s" }} onMouseOver={e=>{e.currentTarget.style.borderColor="#2563EB";e.currentTarget.style.background="rgba(37,99,235,.025)"}} onMouseOut={e=>{e.currentTarget.style.borderColor=BDR;e.currentTarget.style.background="transparent"}}>
                  <IcoBox ic={Upload} size={26} color="#2563EB" bg="rgba(37,99,235,.09)" pad={16} radius={18} style={{ margin:"0 auto 16px" }} glow />
                  <div style={{ fontSize:14, fontWeight:700, color:TXT }}>Arrastre sus documentos aquí</div>
                  <div style={{ fontSize:12, color:MUT, marginTop:4 }}>PDF, DOCX, JPG, PNG · Máx. 10MB por archivo</div>
                  <div style={{ marginTop:16, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                    {[["Oficio de comisión",FileText],["Agenda del viaje",Calendar],["Autorización director",FileCheck2]].map(([lbl,Ic])=>(
                      <span key={lbl} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 13px", background:"#DBEAFE", color:"#1E40AF", borderRadius:20, fontSize:11, fontWeight:700 }}>
                        <Ico ic={Ic} size={12} color="#1E40AF"/>{lbl}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:13, padding:20, marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:13 }}>
                    <IcoBox ic={Waypoints} size={14} color="#92400E" bg="#FEF3C7" pad={7} radius={8} />
                    <span style={{ fontSize:13, fontWeight:800, color:"#92400E" }}>Resumen de Solicitud</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, fontSize:12 }}>
                    {[["Empleado",form.nombre||"—"],["Cédula",form.cedula||"—"],["Destino",form.provincia||"—"],["Fecha",form.fecha||"—"],["Motivo",form.motivo||"—"],["Supervisor",form.supervisor||"—"]].map(([k,v])=>(
                      <div key={k}><span style={{ color:"#92400E" }}>{k}:</span> <strong style={{ color:"#78350F" }}>{v}</strong></div>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:11, padding:16, background:"#F0FDF4", borderRadius:13, border:"1px solid #6EE7B7" }}>
                  <input type="checkbox" id="cert" style={{ width:16, height:16, flexShrink:0 }} />
                  <label htmlFor="cert" style={{ fontSize:12, color:"#065F46", lineHeight:1.6, cursor:"pointer" }}>Certifico que la información es verídica y acepto las disposiciones normativas vigentes sobre viáticos institucionales de la República Dominicana.</label>
                </div>
              </div>
            )}
          </div>
          <div style={{ padding:"16px 26px", borderTop:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", background:CARD2 }}>
            <button className="act-btn" onClick={()=>step>1&&setStep(p=>p-1)} disabled={step===1} style={{ padding:"11px 24px", borderRadius:11, border:`1px solid ${BDR}`, color:step===1?MUT:TXT, opacity:step===1?.4:1, fontSize:13, fontWeight:700, background:"transparent" }}>
              <Ico ic={ChevronLeft} size={14} color={step===1?MUT:TXT}/> Anterior
            </button>
            {step<4
              ? <button className="act-btn" onClick={()=>!dnAlert&&setStep(p=>p+1)} disabled={dnAlert} style={{ padding:"11px 28px", borderRadius:11, border:"none", background:dnAlert?"#9CA3AF":"linear-gradient(135deg,#2563EB,#1D4ED8)", color:"#fff", fontSize:13, fontWeight:800, boxShadow:dnAlert?"none":"0 8px 20px rgba(37,99,235,.32)" }}>
                  Siguiente <Ico ic={ChevronRight} size={14} color="#fff"/>
                </button>
              : <button className="act-btn" onClick={()=>{setSubmitting(true);setTimeout(()=>{setSubmitting(false);setSubmitted(true);notify("Solicitud VIA-2025-007 enviada exitosamente")},2000)}} disabled={submitting||dnAlert} style={{ padding:"11px 28px", borderRadius:11, border:"none", background:submitting?"#9CA3AF":"linear-gradient(135deg,#10B981,#059669)", color:"#fff", fontSize:13, fontWeight:800, boxShadow:"0 8px 20px rgba(16,185,129,.32)" }}>
                  {submitting ? <><Ico ic={RefreshCw} size={14} color="#fff" style={{animation:"spin 1s linear infinite"}}/> Enviando...</> : <><Ico ic={Send} size={14} color="#fff"/> Enviar Solicitud</>}
                </button>
            }
          </div>
        </div>
      )}
    </div>
  );

  /* ─── SOLICITUDES LIST ─── */
  const Solicitudes = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:26 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
            <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#10B981,#06B6D4)" }} />
            <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Gestión de Solicitudes</h2>
          </div>
          <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Registro completo de viáticos institucionales</p>
        </div>
        <button className="act-btn" onClick={()=>setMenu("solicitud")} style={{ padding:"12px 22px", background:"linear-gradient(135deg,#2563EB,#1D4ED8)", borderRadius:13, color:"#fff", fontSize:13, fontWeight:800, border:"none", boxShadow:"0 8px 18px rgba(37,99,235,.3)" }}>
          <Ico ic={FilePlus2} size={16} color="#fff"/> Nueva Solicitud
        </button>
      </div>
      <div style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BDR}`, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ position:"relative", flex:1, minWidth:200 }}>
            <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}><Ico ic={Search} size={14} color={MUT}/></div>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por empleado, ID o provincia..." style={{ width:"100%", padding:"10px 13px 10px 38px", borderRadius:11, border:`1px solid ${BDR}`, background:BG, color:TXT, fontSize:12 }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <IcoBox ic={Filter} size={13} color={MUT} bg={CARD2} pad={5} radius={7} />
            {["Todos","Aprobado","Pendiente","En Revisión","Rechazado"].map(f=>(
              <button key={f} className="pill" onClick={()=>setFEst(f)} style={{ padding:"7px 14px", borderRadius:20, border:`1px solid ${fEst===f?"#2563EB":BDR}`, background:fEst===f?"#2563EB":"transparent", color:fEst===f?"#fff":MUT, fontSize:11, fontWeight:700 }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:CARD2 }}>
                {[["ID",Binary],["Empleado",UserCheck],["Provincia",MapPinned],["Fecha",Calendar],["Monto",DollarSign],["Estado",Gauge],["Riesgo",ShieldAlert],["",Bolt]].map(([h,Ic])=>(
                  <th key={h} style={{ padding:"12px 16px", textAlign:"left" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, color:MUT, letterSpacing:.6 }}>
                      <Ico ic={Ic} size={11} color={MUT}/>{h}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILTERED.map(s => (
                <tr key={s.id} className="row" style={{ borderTop:`1px solid ${BDR}` }}>
                  <td style={{ padding:"14px 16px" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#2563EB", fontSize:11, background:"rgba(37,99,235,.08)", padding:"3px 9px", borderRadius:7 }}>{s.id}</span>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:11, background:"linear-gradient(135deg,#2563EB,#06B6D4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"#fff", flexShrink:0, boxShadow:"0 4px 10px rgba(37,99,235,.3)" }}>{s.avatar}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:TXT }}>{s.empleado}</div>
                        <div style={{ fontSize:11, color:MUT }}>{s.cargo}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <Ico ic={s.alerta?TriangleAlert:MapPinned} size={13} color={s.alerta?"#EF4444":"#06B6D4"}/>
                      <span style={{ fontSize:12, color:s.alerta?"#EF4444":TXT, fontWeight:s.alerta?700:400 }}>{s.provincia}</span>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}><Ico ic={Calendar} size={11} color={MUT}/><span style={{ fontSize:12, color:MUT }}>{s.fecha}</span></div>
                  </td>
                  <td style={{ padding:"14px 16px", fontSize:13, fontWeight:800, color:s.monto>0?"#10B981":"#EF4444" }}>
                    {s.monto>0?`RD$ ${s.monto.toLocaleString()}`:"—"}
                  </td>
                  <td style={{ padding:"14px 16px" }}><Chip label={s.estado}/></td>
                  <td style={{ padding:"14px 16px" }}><Chip label={s.riesgo}/></td>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button className="ic-btn topbar-ico" onClick={()=>setSelSol(s)} style={{ width:32, height:32, borderRadius:9, background:"rgba(37,99,235,.09)", border:"none" }}><Ico ic={Eye} size={15} color="#2563EB"/></button>
                      <button className="ic-btn topbar-ico" style={{ width:32, height:32, borderRadius:9, border:`1px solid ${BDR}`, background:"transparent" }}><Ico ic={MoreHorizontal} size={15} color={MUT}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:MUT }}>{FILTERED.length} solicitudes · Pág. 1 de 3</span>
          <div style={{ display:"flex", gap:5 }}>
            <button className="ic-btn" style={{ width:30,height:30,borderRadius:8,border:`1px solid ${BDR}` }}><Ico ic={ChevronLeft} size={13} color={MUT}/></button>
            {[1,2,3].map(p=><button key={p} className="ic-btn" style={{ width:30,height:30,borderRadius:8,border:`1px solid ${p===1?"#2563EB":BDR}`,background:p===1?"#2563EB":"transparent",color:p===1?"#fff":MUT,fontSize:12,fontWeight:700 }}>{p}</button>)}
            <button className="ic-btn" style={{ width:30,height:30,borderRadius:8,border:`1px solid ${BDR}` }}><Ico ic={ChevronRight} size={13} color={MUT}/></button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selSol && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:20, animation:"fadeIn .2s ease" }}>
          <div style={{ background:CARD, borderRadius:22, border:`1px solid ${BDR}`, width:"100%", maxWidth:550, maxHeight:"88vh", overflow:"auto", boxShadow:"0 40px 100px rgba(0,0,0,.35)", animation:"fadeUp .28s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{ padding:"22px 26px", borderBottom:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                <IcoBox ic={FileBarChart2} size={18} color="#fff" bg="linear-gradient(135deg,#2563EB,#06B6D4)" pad={10} radius={13} glow />
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:TXT, fontFamily:"'JetBrains Mono',monospace" }}>{selSol.id}</div>
                  <div style={{ fontSize:12, color:MUT }}>{selSol.empleado}</div>
                </div>
              </div>
              <button className="ic-btn topbar-ico" onClick={()=>setSelSol(null)} style={{ width:36,height:36,borderRadius:11,border:`1px solid ${BDR}` }}><Ico ic={XCircle} size={17} color={MUT}/></button>
            </div>
            <div style={{ padding:24 }}>
              {selSol.alerta && (
                <div style={{ display:"flex",gap:10,alignItems:"center",background:"#FEF2F2",border:"1px solid #EF4444",borderRadius:13,padding:"13px 16px",marginBottom:18 }}>
                  <Ico ic={TriangleAlert} size={16} color="#EF4444"/>
                  <span style={{ fontSize:13,color:"#991B1B",fontWeight:700 }}>Rechazado automáticamente — Destino: Distrito Nacional</span>
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11 }}>
                {[["ID",selSol.id,Binary,"#2563EB"],["Cédula",selSol.cedula,CreditCard,MUT],["Cargo",selSol.cargo,Briefcase,MUT],["Departamento",selSol.depto,Building2,MUT],["Fecha",selSol.fecha,Calendar,MUT],["Provincia",selSol.provincia,MapPinned,"#06B6D4"],["Supervisor",selSol.supervisor,UserCheck,MUT],["Monto",selSol.monto>0?`RD$ ${selSol.monto.toLocaleString()}`:"No aplica",DollarSign,selSol.monto>0?"#10B981":"#EF4444"]].map(([k,v,Ic,ic])=>(
                  <div key={k} style={{ padding:"11px 14px", background:CARD2, borderRadius:12, border:`1px solid ${BDR}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,color:MUT,marginBottom:5 }}><Ico ic={Ic} size={10} color={MUT}/>{k}</div>
                    <div style={{ fontSize:13,fontWeight:700,color:ic!==MUT?ic:TXT,fontFamily:k==="ID"?"'JetBrains Mono',monospace":"inherit" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:11,padding:"11px 14px",background:CARD2,borderRadius:12,border:`1px solid ${BDR}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:10,color:MUT,marginBottom:5 }}><Ico ic={Target} size={10} color={MUT}/>Motivo del viaje</div>
                <div style={{ fontSize:13,color:TXT }}>{selSol.motivo}</div>
              </div>
              {selSol.estado==="Pendiente" && (
                <div style={{ display:"flex",gap:11,marginTop:22 }}>
                  <button className="act-btn" onClick={()=>{notify(`${selSol.id} aprobada`);setSelSol(null)}} style={{ flex:1,padding:13,background:"linear-gradient(135deg,#10B981,#059669)",borderRadius:12,color:"#fff",fontSize:13,fontWeight:800,justifyContent:"center",border:"none",boxShadow:"0 6px 18px rgba(16,185,129,.3)" }}>
                    <Ico ic={CircleCheck} size={16} color="#fff"/> Aprobar
                  </button>
                  <button className="act-btn" onClick={()=>{notify(`${selSol.id} rechazada`,"error");setSelSol(null)}} style={{ flex:1,padding:13,background:"linear-gradient(135deg,#EF4444,#DC2626)",borderRadius:12,color:"#fff",fontSize:13,fontWeight:800,justifyContent:"center",border:"none",boxShadow:"0 6px 18px rgba(239,68,68,.3)" }}>
                    <Ico ic={XCircle} size={16} color="#fff"/> Rechazar
                  </button>
                  <button className="act-btn" style={{ padding:13,borderRadius:12,border:`1px solid ${BDR}`,background:"transparent",color:MUT,justifyContent:"center" }}>
                    <Ico ic={MessageSquare} size={16} color={MUT}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ─── APROBACION ─── */
  const handleStepEnter = (step, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipStep(step);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  };
  const handleStepLeave = () => setTooltipStep(null);

  const Aprobacion = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:11, marginBottom:5 }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#F59E0B,#EF4444)" }} />
            <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Panel de Aprobaciones</h2>
          </div>
          {/* EDIT FLOW BUTTON */}
          <button
            className="act-btn"
            onClick={() => setFlujoModalOpen(true)}
            style={{ padding:"9px 18px", background:"linear-gradient(135deg,rgba(139,92,246,.18),rgba(37,99,235,.18))", border:"1px solid rgba(139,92,246,.35)", borderRadius:12, color:"#A78BFA", fontSize:12, fontWeight:800, justifyContent:"center", gap:7, backdropFilter:"blur(8px)" }}
          >
            <Ico ic={SlidersHorizontal} size={14} color="#A78BFA"/>
            Editar Flujo
            <span style={{ background:"rgba(139,92,246,.25)", borderRadius:6, padding:"1px 7px", fontSize:10, fontWeight:900, color:"#C4B5FD" }}>{flujoSteps.length} pasos</span>
          </button>
        </div>
        <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Flujo jerárquico de autorización institucional · {flujoSteps.length} niveles configurados</p>
      </div>

      {/* ── FLUJO VISUAL DINÁMICO ── */}
      <div style={{ background:CARD, border:`1px solid ${BDR}`, borderRadius:18, padding:26, marginBottom:22, overflow:"hidden", position:"relative" }}>
        {/* Background grid decoration */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px, rgba(139,92,246,.04) 1px, transparent 0)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, position:"relative" }}>
          <IcoBox ic={Workflow} size={16} color="#8B5CF6" bg="rgba(139,92,246,.1)" pad={9} radius={11} glow />
          <span style={{ fontSize:13, fontWeight:800, color:TXT }}>Flujo de Autorización Jerárquico</span>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, background:"rgba(16,185,129,.08)", border:"1px solid rgba(16,185,129,.2)", borderRadius:8, padding:"5px 12px" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"statusPulse 2.5s ease-in-out infinite" }}/>
            <span style={{ fontSize:10.5, fontWeight:700, color:"#10B981" }}>Flujo activo</span>
          </div>
        </div>

        {/* STEP NODES — dynamic .map() from flujoSteps state */}
        <div style={{ display:"flex", alignItems:"flex-start", overflowX:"auto", gap:0, paddingBottom:8, position:"relative" }}>
          {flujoSteps.map((step, i) => {
            const Ic = resolveIc(step.ic);
            const isFirst = i === 0;
            const isLast  = i === flujoSteps.length - 1;
            const nextStep = flujoSteps[i + 1];

            return (
              <div key={step.id} style={{ display:"flex", alignItems:"center", flex:1, minWidth:0 }}>
                {/* NODE */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, flex:1, padding:"0 6px", position:"relative" }}>

                  {/* ICON BUBBLE */}
                  <div
                    style={{ position:"relative", cursor:"pointer" }}
                    onMouseEnter={e => handleStepEnter(step, e)}
                    onMouseLeave={handleStepLeave}
                  >
                    {/* Lock badge for immutable steps */}
                    {step.locked && (
                      <div style={{ position:"absolute", top:-6, right:-6, zIndex:2, width:18, height:18, borderRadius:"50%", background: isFirst ? "linear-gradient(135deg,#2563EB,#0891B2)" : "linear-gradient(135deg,#06B6D4,#0891B2)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,.3)", border:`2px solid ${CARD}` }}>
                        <Ico ic={Lock} size={8} color="#fff" />
                      </div>
                    )}
                    {/* Step number badge */}
                    <div style={{ position:"absolute", top:-7, left:-7, zIndex:2, width:17, height:17, borderRadius:"50%", background:"rgba(0,0,0,.55)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, color:"rgba(255,255,255,.7)", fontFamily:"'JetBrains Mono',monospace", border:`1px solid ${step.color}44` }}>
                      {i+1}
                    </div>
                    {/* Main icon circle */}
                    <div
                      style={{ width:56, height:56, borderRadius:18, background:`${step.color}14`, border:`2px solid ${step.color}30`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 22px ${step.color}22`, transition:"all .28s cubic-bezier(.34,1.56,.64,1)" }}
                      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px) scale(1.1)"; e.currentTarget.style.boxShadow = `0 14px 32px ${step.color}40`; e.currentTarget.style.borderColor = `${step.color}70`; }}
                      onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 6px 22px ${step.color}22`; e.currentTarget.style.borderColor = `${step.color}30`; }}
                    >
                      <Ico ic={Ic} size={24} color={step.color} />
                    </div>
                    {/* Glow ring pulse for locked steps */}
                    {step.locked && (
                      <div style={{ position:"absolute", inset:-4, borderRadius:22, border:`1px solid ${step.color}30`, animation:"pulseRing 2.5s ease-out infinite", pointerEvents:"none" }} />
                    )}
                  </div>

                  {/* Color accent bar */}
                  <div style={{ width:28, height:3, borderRadius:2, background:`linear-gradient(90deg,${step.color},${step.color}55)` }} />

                  {/* Label */}
                  <div style={{ textAlign:"center" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:TXT, display:"block", letterSpacing:.1 }}>{step.label}</span>
                    {step.locked
                      ? <span style={{ fontSize:9.5, color:step.color, fontWeight:700, letterSpacing:.5, fontFamily:"'JetBrains Mono',monospace" }}>{isFirst ? "INICIO" : "FINAL"}</span>
                      : <span style={{ fontSize:9.5, color:MUT, letterSpacing:.2 }}>Nivel {i}</span>
                    }
                  </div>
                </div>

                {/* CONNECTOR ARROW between nodes */}
                {!isLast && (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:28, marginBottom:32 }}>
                    <div style={{ width:"100%", height:2, background:`linear-gradient(90deg,${step.color},${nextStep?.color || step.color})`, borderRadius:1, position:"relative" }}>
                      {/* Arrow head */}
                      <div style={{ position:"absolute", right:-1, top:"50%", transform:"translateY(-50%)", width:0, height:0, borderTop:"4px solid transparent", borderBottom:"4px solid transparent", borderLeft:`6px solid ${nextStep?.color || step.color}` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div style={{ marginTop:20, paddingTop:18, borderTop:`1px solid ${BDR}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:11, color:MUT, fontWeight:600 }}>Progreso del flujo configurado</span>
            <span style={{ fontSize:11, color:"#10B981", fontWeight:800, fontFamily:"'JetBrains Mono',monospace" }}>{flujoSteps.length} / {flujoSteps.length} niveles</span>
          </div>
          <div style={{ height:4, borderRadius:2, background:`${BDR}`, overflow:"hidden" }}>
            <div style={{ height:"100%", width:"100%", background:"linear-gradient(90deg,#2563EB,#8B5CF6,#F59E0B,#10B981,#06B6D4)", backgroundSize:"300%", animation:"gradShift 4s ease infinite", borderRadius:2 }} />
          </div>
        </div>
      </div>

      {/* ── PENDING SOLICITUDES ── */}
      <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
        {SOLICITUDES.filter(s=>s.estado==="Pendiente"||s.estado==="En Revisión").map(s=>(
          <div key={s.id} className="hover-lift" style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, padding:22 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:13 }}>
              <div style={{ flex:1, minWidth:220 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:11 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#2563EB", fontSize:11, background:"rgba(37,99,235,.08)", padding:"3px 9px", borderRadius:7 }}>{s.id}</span>
                  <Chip label={s.estado}/><Chip label={s.riesgo}/>
                </div>
                <div style={{ fontSize:14, fontWeight:800, color:TXT, marginBottom:8 }}>{s.empleado} <span style={{ color:MUT, fontWeight:400, fontSize:12 }}>— {s.cargo}</span></div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:13 }}>
                  {[[MapPinned,s.provincia,"#06B6D4"],[Calendar,s.fecha,MUT],[DollarSign,`RD$ ${s.monto.toLocaleString()}`,s.monto>0?"#10B981":MUT]].map(([Ic,v,c],j)=>(
                    <div key={j} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12 }}><Ico ic={Ic} size={13} color={c}/><span style={{ color:c }}>{v}</span></div>
                  ))}
                </div>
                {/* Mini flujo progress indicator */}
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:12 }}>
                  {flujoSteps.map((step, i) => {
                    const StepIc = resolveIc(step.ic);
                    const done = i === 0;
                    const active = i === 1;
                    return (
                      <div key={step.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <div title={step.label} style={{ width:22, height:22, borderRadius:7, background: done ? `${step.color}22` : active ? `${step.color}18` : "rgba(100,116,139,.06)", border:`1.5px solid ${done || active ? step.color+"44" : BDR}`, display:"flex", alignItems:"center", justifyContent:"center", opacity: done || active ? 1 : 0.4 }}>
                          <StepIc size={11} color={done || active ? step.color : MUT} strokeWidth={1.8} />
                        </div>
                        {i < flujoSteps.length - 1 && <div style={{ width:10, height:1.5, background: done ? `linear-gradient(90deg,${step.color},${flujoSteps[i+1]?.color})` : BDR, borderRadius:1 }} />}
                      </div>
                    );
                  })}
                  <span style={{ fontSize:10, color:"#F59E0B", fontWeight:700, marginLeft:4 }}>En: {flujoSteps[1]?.label}</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:9, flexShrink:0 }}>
                <button className="act-btn" onClick={()=>notify(`${s.id} aprobada`)} style={{ padding:"10px 19px",background:"linear-gradient(135deg,#10B981,#059669)",borderRadius:11,color:"#fff",fontSize:12,fontWeight:800,justifyContent:"center",border:"none",boxShadow:"0 6px 16px rgba(16,185,129,.28)" }}>
                  <Ico ic={CircleCheck} size={15} color="#fff"/> Aprobar
                </button>
                <button className="act-btn" onClick={()=>notify(`${s.id} rechazada`,"error")} style={{ padding:"10px 19px",background:"linear-gradient(135deg,#EF4444,#DC2626)",borderRadius:11,color:"#fff",fontSize:12,fontWeight:800,justifyContent:"center",border:"none",boxShadow:"0 6px 16px rgba(239,68,68,.28)" }}>
                  <Ico ic={XCircle} size={15} color="#fff"/> Rechazar
                </button>
                <button className="act-btn" style={{ padding:"10px 13px",border:`1px solid ${BDR}`,borderRadius:11,background:"transparent",color:MUT,justifyContent:"center" }}>
                  <Ico ic={MessageSquare} size={15} color={MUT}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FLOATING TOOLTIP ── */}
      {tooltipStep && (
        <div
          style={{ position:"fixed", left: tooltipPos.x, top: tooltipPos.y - 8, transform:"translate(-50%, -100%)", zIndex:9998, pointerEvents:"none", animation:"fadeUp .18s cubic-bezier(.22,1,.36,1)" }}
        >
          <div style={{ background:"rgba(9,15,30,.96)", border:`1px solid ${tooltipStep.color}44`, borderRadius:14, padding:"13px 16px", minWidth:200, boxShadow:`0 20px 50px rgba(0,0,0,.55), 0 0 0 1px ${tooltipStep.color}22`, backdropFilter:"blur(20px)" }}>
            {/* Header row */}
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:11, paddingBottom:10, borderBottom:`1px solid rgba(255,255,255,.06)` }}>
              <div style={{ width:32, height:32, borderRadius:10, background:`${tooltipStep.color}20`, border:`1.5px solid ${tooltipStep.color}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ico ic={resolveIc(tooltipStep.ic)} size={16} color={tooltipStep.color} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:800, color:"#F1F5F9", letterSpacing:-.2 }}>{tooltipStep.label}</div>
                {tooltipStep.locked && <div style={{ fontSize:9, color:tooltipStep.color, fontWeight:700, letterSpacing:1, fontFamily:"'JetBrains Mono',monospace" }}>NIVEL PERMANENTE</div>}
              </div>
            </div>
            {/* Info rows */}
            {[
              [UserCheck,  "Responsable",  tooltipStep.responsable, "#10B981"],
              [UserX,      "Suplente",      tooltipStep.suplente || "—", "#F59E0B"],
              [Lock,       "Tipo",         tooltipStep.locked ? "Inmutable" : "Configurable", tooltipStep.locked ? "#EF4444" : "#06B6D4"],
            ].map(([TooltipIc, lbl, val, c]) => (
              <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <div style={{ width:22, height:22, borderRadius:7, background:`${c}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <TooltipIc size={11} color={c} strokeWidth={1.9} />
                </div>
                <div>
                  <div style={{ fontSize:9, color:"rgba(148,163,184,.7)", fontWeight:600, letterSpacing:.6 }}>{lbl.toUpperCase()}</div>
                  <div style={{ fontSize:12, color:"#E2E8F0", fontWeight:600 }}>{val}</div>
                </div>
              </div>
            ))}
            {/* Arrow pointer */}
            <div style={{ position:"absolute", bottom:-7, left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderTop:`7px solid ${tooltipStep.color}44` }} />
          </div>
        </div>
      )}

      {/* ── EDITOR MODAL ── */}
      {flujoModalOpen && (
        <div
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.72)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20, animation:"fadeIn .2s ease" }}
          onClick={e => { if(e.target===e.currentTarget) setFlujoModalOpen(false); }}
        >
          <div style={{ background: dark?"#111827":"#FFFFFF", borderRadius:24, border:`1px solid ${BDR}`, width:"100%", maxWidth:820, maxHeight:"92vh", overflow:"auto", boxShadow:"0 48px 120px rgba(0,0,0,.45)", animation:"fadeUp .3s cubic-bezier(.22,1,.36,1)" }}>

            {/* Modal header */}
            <div style={{ padding:"22px 26px", borderBottom:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center", background: dark?"rgba(139,92,246,.05)":"rgba(139,92,246,.03)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                <IcoBox ic={Workflow} size={18} color="#8B5CF6" bg="linear-gradient(135deg,rgba(139,92,246,.25),rgba(37,99,235,.15))" pad={10} radius={13} glow />
                <div>
                  <div style={{ fontSize:16, fontWeight:900, color:TXT }}>Diseñador del Flujo de Aprobación</div>
                  <div style={{ fontSize:11, color:MUT, marginTop:2 }}>Gestione los niveles intermedios de autorización institucional</div>
                </div>
              </div>
              <button className="ic-btn topbar-ico" onClick={()=>setFlujoModalOpen(false)} style={{ width:38,height:38,borderRadius:12,border:`1px solid ${BDR}` }}>
                <Ico ic={XCircle} size={18} color={MUT}/>
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:0, minHeight:500 }}>

              {/* LEFT: Step list manager */}
              <div style={{ padding:"22px 24px", borderRight:`1px solid ${BDR}` }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:TXT }}>Niveles del Flujo</div>
                  <button
                    className="act-btn"
                    onClick={openNewStep}
                    style={{ padding:"8px 15px", background:"linear-gradient(135deg,#2563EB,#0891B2)", border:"none", borderRadius:10, color:"#fff", fontSize:12, fontWeight:800, justifyContent:"center", gap:6, boxShadow:"0 6px 16px rgba(37,99,235,.3)" }}
                  >
                    <Ico ic={UserPlus} size={13} color="#fff"/>
                    Añadir Nivel
                  </button>
                </div>

                {/* Rules info banner */}
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"rgba(245,158,11,.06)", border:"1px solid rgba(245,158,11,.2)", borderRadius:12, padding:"10px 13px", marginBottom:16 }}>
                  <Ico ic={TriangleAlert} size={14} color="#F59E0B" style={{ flexShrink:0, marginTop:1 }} />
                  <div style={{ fontSize:11, color: dark?"#FEF3C7":"#92400E", lineHeight:1.6 }}>
                    Los niveles <strong>Solicitante</strong> y <strong>Auditoría</strong> son permanentes e inmutables. Solo los niveles intermedios pueden modificarse.
                  </div>
                </div>

                {/* Step rows */}
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {flujoSteps.map((step, i) => {
                    const StepIc = resolveIc(step.ic);
                    const isFirst = i === 0;
                    const isLast  = i === flujoSteps.length - 1;
                    return (
                      <div
                        key={step.id}
                        style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 15px", borderRadius:13, border:`1.5px solid ${step.locked ? step.color+"30" : BDR}`, background: step.locked ? `${step.color}07` : dark?"rgba(255,255,255,.02)":"#FAFAFA", transition:"all .2s" }}
                        onMouseOver={e => !step.locked && (e.currentTarget.style.borderColor = `${step.color}50`)}
                        onMouseOut={e  => !step.locked && (e.currentTarget.style.borderColor = BDR)}
                      >
                        {/* Drag handle / order number */}
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, flexShrink:0 }}>
                          <span style={{ fontSize:11, fontWeight:900, color:step.color, fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>{String(i+1).padStart(2,"0")}</span>
                          {!step.locked && (
                            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                              <button className="ic-btn" disabled={i <= 1} onClick={()=>moveStep(step.id,"up")} style={{ opacity: i<=1?0.25:1, padding:0, width:14, height:14 }}>
                                <Ico ic={ChevronLeft} size={11} color={MUT} style={{ transform:"rotate(90deg)" }}/>
                              </button>
                              <button className="ic-btn" disabled={i >= flujoSteps.length-2} onClick={()=>moveStep(step.id,"down")} style={{ opacity: i>=flujoSteps.length-2?0.25:1, padding:0, width:14, height:14 }}>
                                <Ico ic={ChevronRight} size={11} color={MUT} style={{ transform:"rotate(90deg)" }}/>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Icon */}
                        <div style={{ width:38, height:38, borderRadius:11, background:`${step.color}15`, border:`1.5px solid ${step.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <StepIc size={18} color={step.color} strokeWidth={1.7} />
                        </div>

                        {/* Info */}
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontSize:13, fontWeight:800, color:TXT }}>{step.label}</span>
                            {step.locked && (
                              <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:`${step.color}15`, border:`1px solid ${step.color}30`, borderRadius:6, padding:"1px 7px", fontSize:9, fontWeight:700, color:step.color, letterSpacing:.5 }}>
                                <Ico ic={Lock} size={8} color={step.color} />FIJO
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize:11, color:MUT, marginTop:2, display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                              <Ico ic={UserCheck} size={10} color={MUT}/>{step.responsable}
                            </span>
                            {step.suplente && step.suplente !== "—" && (
                              <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                                <Ico ic={UserX} size={10} color={MUT}/>{step.suplente}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                          {!step.locked && (
                            <>
                              <button
                                className="ic-btn topbar-ico"
                                onClick={()=>openEditStep(step)}
                                title="Editar nivel"
                                style={{ width:30,height:30,borderRadius:9,background:"rgba(37,99,235,.09)",border:"none" }}
                              >
                                <Ico ic={Edit3} size={13} color="#2563EB"/>
                              </button>
                              <button
                                className="ic-btn topbar-ico"
                                onClick={()=>deleteStep(step.id)}
                                title="Eliminar nivel"
                                style={{ width:30,height:30,borderRadius:9,background:"rgba(239,68,68,.08)",border:"none" }}
                              >
                                <Ico ic={Trash2} size={13} color="#EF4444"/>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live mini-preview of the flow */}
                <div style={{ marginTop:20, paddingTop:16, borderTop:`1px solid ${BDR}` }}>
                  <div style={{ fontSize:11, fontWeight:700, color:MUT, marginBottom:10, letterSpacing:.5 }}>VISTA PREVIA DEL FLUJO</div>
                  <div style={{ display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
                    {flujoSteps.map((step, i) => {
                      const StepIc = resolveIc(step.ic);
                      return (
                        <div key={step.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div title={step.label} style={{ width:28, height:28, borderRadius:9, background:`${step.color}15`, border:`1.5px solid ${step.color}35`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <StepIc size={13} color={step.color} strokeWidth={1.7} />
                          </div>
                          {i < flujoSteps.length - 1 && (
                            <div style={{ display:"flex", alignItems:"center", gap:1 }}>
                              <div style={{ width:10, height:1.5, background:`linear-gradient(90deg,${step.color},${flujoSteps[i+1]?.color})`, borderRadius:1 }} />
                              <div style={{ width:0, height:0, borderTop:"3px solid transparent", borderBottom:"3px solid transparent", borderLeft:`4px solid ${flujoSteps[i+1]?.color}` }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop:8, fontSize:10, color:MUT }}>{flujoSteps.length} niveles · {flujoSteps.filter(s=>!s.locked).length} configurables · 2 permanentes</div>
                </div>
              </div>

              {/* RIGHT: Add/Edit form */}
              <div style={{ padding:"22px 24px", background: dark?"rgba(255,255,255,.015)":"rgba(248,250,252,1)" }}>
                <div style={{ fontSize:13, fontWeight:800, color:TXT, marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
                  <IcoBox ic={editingStep ? Edit3 : UserPlus} size={13} color="#2563EB" bg="rgba(37,99,235,.1)" pad={7} radius={8} />
                  {editingStep ? `Editar: ${editingStep.label}` : "Nuevo Nivel de Aprobación"}
                </div>

                {/* Nombre del nivel */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:MUT, marginBottom:8, letterSpacing:.8 }}>
                    <Ico ic={Briefcase} size={11} color={MUT}/> NOMBRE DEL NIVEL / CARGO
                  </label>
                  <input
                    value={stepForm.label}
                    placeholder="Ej: Director de RRHH"
                    onChange={e=>setStepForm(p=>({...p,label:e.target.value}))}
                    style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid ${BDR}`, background: dark?"rgba(15,23,42,.5)":"#fff", color:TXT, fontSize:13 }}
                  />
                </div>

                {/* Responsable */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:MUT, marginBottom:8, letterSpacing:.8 }}>
                    <Ico ic={UserCheck} size={11} color={MUT}/> RESPONSABLE PRIMARIO
                  </label>
                  <input
                    value={stepForm.responsable}
                    placeholder="Ej: Lic. García Rodríguez"
                    onChange={e=>setStepForm(p=>({...p,responsable:e.target.value}))}
                    style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid ${BDR}`, background: dark?"rgba(15,23,42,.5)":"#fff", color:TXT, fontSize:13 }}
                  />
                </div>

                {/* Suplente */}
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:MUT, marginBottom:8, letterSpacing:.8 }}>
                    <Ico ic={UserX} size={11} color={MUT}/> USUARIO SUPLENTE
                  </label>
                  <input
                    value={stepForm.suplente}
                    placeholder="Ej: Dra. Méndez Castillo"
                    onChange={e=>setStepForm(p=>({...p,suplente:e.target.value}))}
                    style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid ${BDR}`, background: dark?"rgba(15,23,42,.5)":"#fff", color:TXT, fontSize:13 }}
                  />
                </div>

                {/* Color selector */}
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:MUT, marginBottom:10, letterSpacing:.8 }}>
                    <Ico ic={Sliders} size={11} color={MUT}/> COLOR DEL NIVEL
                  </label>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                    {COLOR_PALETTE.map(c => (
                      <div
                        key={c}
                        onClick={()=>setStepForm(p=>({...p,color:c}))}
                        style={{ width:26, height:26, borderRadius:8, background:c, cursor:"pointer", border:`2.5px solid ${stepForm.color===c?"#fff":"transparent"}`, boxShadow: stepForm.color===c?`0 0 0 2px ${c}, 0 4px 12px ${c}55`:"none", transition:"all .18s cubic-bezier(.34,1.56,.64,1)", transform: stepForm.color===c?"scale(1.2)":"scale(1)" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Icon selector */}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:MUT, marginBottom:10, letterSpacing:.8 }}>
                    <Ico ic={Layers} size={11} color={MUT}/> ÍCONO REPRESENTATIVO
                  </label>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
                    {ICON_CATALOGUE.map(({ key, Ic: CatIc, label: catLabel }) => (
                      <div
                        key={key}
                        onClick={()=>setStepForm(p=>({...p,ic:key}))}
                        title={catLabel}
                        style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"9px 4px", borderRadius:10, border:`1.5px solid ${stepForm.ic===key ? stepForm.color : BDR}`, background: stepForm.ic===key ? `${stepForm.color}15` : dark?"rgba(255,255,255,.02)":"#fff", cursor:"pointer", transition:"all .18s", boxShadow: stepForm.ic===key ? `0 4px 12px ${stepForm.color}30` : "none" }}
                        onMouseOver={e => stepForm.ic!==key && (e.currentTarget.style.borderColor = stepForm.color+"50")}
                        onMouseOut={e  => stepForm.ic!==key && (e.currentTarget.style.borderColor = BDR)}
                      >
                        <CatIc size={18} color={stepForm.ic===key ? stepForm.color : MUT} strokeWidth={1.7} />
                        <span style={{ fontSize:9, color: stepForm.ic===key ? stepForm.color : MUT, fontWeight:700, textAlign:"center", letterSpacing:.2 }}>{catLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview mini card */}
                <div style={{ marginBottom:18, padding:"13px 14px", borderRadius:12, border:`1.5px solid ${stepForm.color}35`, background:`${stepForm.color}08` }}>
                  <div style={{ fontSize:10, color:MUT, fontWeight:700, marginBottom:9, letterSpacing:.5 }}>VISTA PREVIA</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:`${stepForm.color}18`, border:`1.5px solid ${stepForm.color}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {(() => { const PreviewIc = resolveIc(stepForm.ic); return <PreviewIc size={18} color={stepForm.color} strokeWidth={1.7} />; })()}
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:800, color:TXT }}>{stepForm.label || "Nombre del nivel"}</div>
                      <div style={{ fontSize:11, color:MUT }}>{stepForm.responsable || "Responsable"}</div>
                      {stepForm.suplente && <div style={{ fontSize:10, color:MUT, opacity:.7 }}>Suplente: {stepForm.suplente}</div>}
                    </div>
                  </div>
                </div>

                {/* Save / Cancel */}
                <div style={{ display:"flex", gap:9 }}>
                  <button
                    className="act-btn"
                    onClick={saveStep}
                    disabled={!stepForm.label.trim() || !stepForm.responsable.trim()}
                    style={{ flex:1, padding:"12px", background: (!stepForm.label.trim()||!stepForm.responsable.trim()) ? "#9CA3AF" : `linear-gradient(135deg,${stepForm.color},${stepForm.color}cc)`, borderRadius:11, color:"#fff", fontSize:13, fontWeight:800, justifyContent:"center", border:"none", boxShadow: (!stepForm.label.trim()||!stepForm.responsable.trim()) ? "none" : `0 6px 18px ${stepForm.color}40` }}
                  >
                    <Ico ic={CircleCheck} size={15} color="#fff"/>
                    {editingStep ? "Guardar Cambios" : "Agregar Nivel"}
                  </button>
                  <button
                    className="act-btn"
                    onClick={()=>{ setFlujoModalOpen(false); setEditingStep(null); }}
                    style={{ padding:"12px 16px", border:`1px solid ${BDR}`, borderRadius:11, background:"transparent", color:MUT, justifyContent:"center" }}
                  >
                    <Ico ic={XCircle} size={15} color={MUT}/>
                  </button>
                </div>

                {editingStep && (
                  <div style={{ marginTop:10, padding:"9px 13px", borderRadius:10, background:"rgba(239,68,68,.05)", border:"1px solid rgba(239,68,68,.15)", display:"flex", alignItems:"center", gap:8 }}>
                    <Ico ic={TriangleAlert} size={12} color="#EF4444"/>
                    <span style={{ fontSize:11, color: dark?"#FCA5A5":"#991B1B" }}>Los cambios afectarán todas las solicitudes en curso.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ padding:"16px 26px", borderTop:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center", background: dark?"rgba(255,255,255,.01)":"rgba(248,250,252,1)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Ico ic={ShieldCheck} size={13} color="#10B981"/>
                <span style={{ fontSize:11, color:"#10B981", fontWeight:600 }}>Cambios guardados automáticamente en el flujo institucional</span>
              </div>
              <button
                className="act-btn"
                onClick={()=>{ setFlujoModalOpen(false); notify("Flujo de aprobación actualizado exitosamente"); }}
                style={{ padding:"10px 22px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:11, color:"#fff", fontSize:12, fontWeight:800, justifyContent:"center", border:"none", boxShadow:"0 6px 16px rgba(16,185,129,.28)" }}
              >
                <Ico ic={CircleCheck} size={14} color="#fff"/>
                Confirmar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ─── AUDITORIA ─── */
  const Auditoria = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
          <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#8B5CF6,#06B6D4)" }} />
          <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Módulo de Auditoría</h2>
        </div>
        <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Bitácora completa · Trazabilidad total del sistema</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:13, marginBottom:22 }}>
        {[["248","Eventos Totales",Database,"#2563EB"],["3","Alertas Activas",TriangleAlert,"#EF4444"],["12","Usuarios Activos",UsersRound,"#10B981"],["94.2%","Cumplimiento",Gauge,"#F59E0B"]].map(([v,l,Ic,c])=>(
          <div key={l} className="hover-lift" style={{ background:CARD, borderRadius:16, padding:22, border:`1px solid ${BDR}`, display:"flex", gap:15, alignItems:"center" }}>
            <IcoBox ic={Ic} size={22} color={c} bg={`${c}18`} pad={11} radius={14} glow />
            <div>
              <div style={{ fontSize:24, fontWeight:900, color:c, letterSpacing:-1.2 }}>{v}</div>
              <div style={{ fontSize:11, color:MUT, marginTop:2 }}>{l}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, overflow:"hidden" }}>
        <div style={{ padding:"16px 22px", borderBottom:`1px solid ${BDR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <IcoBox ic={Radar} size={16} color="#8B5CF6" bg="rgba(139,92,246,.1)" pad={9} radius={11} glow />
            <span style={{ fontSize:13, fontWeight:800, color:TXT }}>Bitácora del Sistema</span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="act-btn" style={{ padding:"8px 15px",background:"rgba(37,99,235,.08)",border:`1px solid rgba(37,99,235,.15)`,borderRadius:10,color:"#2563EB",fontSize:12,fontWeight:700,justifyContent:"center" }}>
              <Ico ic={Download} size={13} color="#2563EB"/> CSV
            </button>
            <button className="act-btn" style={{ padding:"8px 15px",background:"rgba(239,68,68,.08)",border:`1px solid rgba(239,68,68,.15)`,borderRadius:10,color:"#EF4444",fontSize:12,fontWeight:700,justifyContent:"center" }}>
              <Ico ic={FileBarChart2} size={13} color="#EF4444"/> PDF
            </button>
          </div>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:CARD2 }}>
              {[["Timestamp",Clock],["Usuario",UserCheck],["Acción",Bolt],["Recurso",FileText],["IP",CircuitBoard],["Nivel",ShieldCheck]].map(([h,Ic])=>(
                <th key={h} style={{ padding:"12px 16px", textAlign:"left" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,color:MUT,letterSpacing:.6 }}>
                    <Ico ic={Ic} size={11} color={MUT}/>{h}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOG.map(l=>(
              <tr key={l.id} className="row" style={{ borderTop:`1px solid ${BDR}` }}>
                <td style={{ padding:"13px 16px",fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:MUT }}>{l.ts}</td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                    <div style={{ width:28,height:28,borderRadius:9,background:"rgba(37,99,235,.08)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <Ico ic={l.usuario==="Sistema SIVIARD"?BrainCircuit:UserCheck} size={13} color="#2563EB"/>
                    </div>
                    <span style={{ fontSize:12,fontWeight:600,color:TXT }}>{l.usuario}</span>
                  </div>
                </td>
                <td style={{ padding:"13px 16px" }}>
                  <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700, background:l.accion.includes("RECHAZO")?"#FEE2E2":["APROBACIÓN","DESEMBOLSO"].includes(l.accion)?"#D1FAE5":"#DBEAFE", color:l.accion.includes("RECHAZO")?"#991B1B":["APROBACIÓN","DESEMBOLSO"].includes(l.accion)?"#065F46":"#1E40AF" }}>
                    <Ico ic={l.accion.includes("RECHAZO")?XCircle:l.accion==="APROBACIÓN"?CircleCheck:l.accion==="DESEMBOLSO"?DollarSign:l.accion==="SOLICITUD"?FilePlus2:l.accion==="REVISIÓN"?ScanLine:KeyRound} size={11} color={l.accion.includes("RECHAZO")?"#991B1B":["APROBACIÓN","DESEMBOLSO"].includes(l.accion)?"#065F46":"#1E40AF"}/>
                    {l.accion}
                  </span>
                </td>
                <td style={{ padding:"13px 16px",fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:"#2563EB",fontWeight:700 }}>{l.recurso}</td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <Ico ic={l.ip==="Sistema"?BrainCircuit:Globe} size={12} color={MUT}/>
                    <span style={{ fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:MUT }}>{l.ip}</span>
                  </div>
                </td>
                <td style={{ padding:"13px 16px" }}><Chip label={l.nivel}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── REPORTES ─── */
  const Reportes = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:26 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
            <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#EF4444,#F59E0B)" }} />
            <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Reportes & Estadísticas</h2>
          </div>
          <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Análisis avanzado de viáticos institucionales</p>
        </div>
        <div style={{ display:"flex", gap:9 }}>
          {[[Download,"PDF","#EF4444"],[FileBarChart2,"Excel","#10B981"],[Mail,"Email","#2563EB"],[Printer,"Imprimir","#64748B"]].map(([Ic,l,c])=>(
            <button key={l} className="act-btn" onClick={()=>notify(`${l} generado exitosamente`)} style={{ padding:"10px 16px",background:`${c}12`,border:`1px solid ${c}28`,borderRadius:11,color:c,fontSize:12,fontWeight:700,justifyContent:"center" }}>
              <Ico ic={Ic} size={15} color={c}/>{l}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:15, marginBottom:15 }}>
        <div style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
            <IcoBox ic={BarChart3} size={16} color="#2563EB" bg="rgba(37,99,235,.1)" pad={9} radius={11} glow/>
            <div><div style={{ fontSize:14,fontWeight:800,color:TXT }}>Gastos Mensuales</div><div style={{ fontSize:11,color:MUT }}>RD$ por mes — 2025</div></div>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={GASTOS_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={BDR}/>
              <XAxis dataKey="mes" tick={{fontSize:11,fill:MUT}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:MUT}} tickFormatter={v=>`${v/1000}K`} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v=>[`RD$ ${v.toLocaleString()}`,"Monto"]} contentStyle={{borderRadius:12,border:`1px solid ${BDR}`,background:CARD,color:TXT,fontSize:12}} cursor={{fill:"rgba(37,99,235,.04)"}}/>
              <Bar dataKey="monto" fill="#2563EB" radius={[8,8,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
            <IcoBox ic={PieIcon} size={16} color="#8B5CF6" bg="rgba(139,92,246,.1)" pad={9} radius={11} glow/>
            <div><div style={{ fontSize:14,fontWeight:800,color:TXT }}>Estados de Solicitudes</div><div style={{ fontSize:11,color:MUT }}>Distribución del flujo</div></div>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <PieChart>
              <Pie data={[{name:"Aprobado",value:31},{name:"Pendiente",value:9},{name:"Rechazado",value:8}]} cx="50%" cy="50%" outerRadius={72} dataKey="value" strokeWidth={0} label={({name,value})=>`${name}: ${value}`} fontSize={10}>
                <Cell fill="#10B981"/><Cell fill="#F59E0B"/><Cell fill="#EF4444"/>
              </Pie>
              <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${BDR}`,background:CARD,fontSize:12}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ background:CARD, borderRadius:18, padding:26, border:`1px solid ${BDR}` }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <IcoBox ic={Award} size={16} color="#F59E0B" bg="rgba(245,158,11,.1)" pad={9} radius={11} glow/>
            <span style={{ fontSize:14,fontWeight:800,color:TXT }}>Ranking de Viáticos por Servidor Público</span>
          </div>
          <button className="act-btn" style={{ fontSize:11,color:"#2563EB",background:"transparent",border:`1px solid ${BDR}`,borderRadius:9,padding:"6px 13px",fontWeight:700 }}>
            Ver completo <Ico ic={ExternalLink} size={12} color="#2563EB"/>
          </button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:CARD2 }}>
              {[["#",Star],["Servidor Público",UserCheck],["Departamento",Building2],["Solicitudes",Waypoints],["Total",DollarSign],["Estado",Gauge]].map(([h,Ic])=>(
                <th key={h} style={{ padding:"11px 15px",textAlign:"left" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,color:MUT,letterSpacing:.6 }}><Ico ic={Ic} size={11} color={MUT}/>{h}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[["1","Dra. Vargas Díaz","Salud Pública",8,42000,"#F59E0B","VD"],["2","Arq. Guzmán Peña","Planificación",6,34500,"#94A3B8","GP"],["3","Prof. Montero Silva","Educación",7,31200,"#CD7F32","MS"],["4","Ing. Ramírez Mejía","Obras Públicas",5,28800,"#2563EB","RM"],["5","Lic. Pérez Santos","Asesoría Jurídica",4,18500,"#64748B","PS"]].map(([n,e,dep,s,t,mc,av])=>(
              <tr key={n} className="row" style={{ borderTop:`1px solid ${BDR}` }}>
                <td style={{ padding:"13px 15px" }}>
                  <div style={{ width:28,height:28,borderRadius:9,background:`${mc}16`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:mc }}>#{n}</div>
                </td>
                <td style={{ padding:"13px 15px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <div style={{ width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#2563EB,#06B6D4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff" }}>{av}</div>
                    <span style={{ fontSize:13,fontWeight:700,color:TXT }}>{e}</span>
                  </div>
                </td>
                <td style={{ padding:"13px 15px",fontSize:12,color:MUT }}>{dep}</td>
                <td style={{ padding:"13px 15px",fontSize:12,fontWeight:600,color:TXT }}>{s}</td>
                <td style={{ padding:"13px 15px",fontSize:13,fontWeight:800,color:"#10B981" }}>RD$ {t.toLocaleString()}</td>
                <td style={{ padding:"13px 15px" }}><Chip label="Activo"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── USUARIOS ─── */
  const Usuarios = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:26 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
            <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#06B6D4,#8B5CF6)" }} />
            <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Gestión de Usuarios</h2>
          </div>
          <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Administración de accesos institucionales</p>
        </div>
        <button className="act-btn" style={{ padding:"12px 22px",background:"linear-gradient(135deg,#06B6D4,#0891B2)",borderRadius:13,color:"#fff",fontSize:13,fontWeight:800,border:"none",boxShadow:"0 8px 18px rgba(6,182,212,.3)" }}>
          <Ico ic={UserPlus} size={16} color="#fff"/> Nuevo Usuario
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:15 }}>
        {EMPLEADOS.map((u,i) => (
          <div key={i} className="hover-lift card" style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, padding:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:15, marginBottom:18 }}>
              <div style={{ width:54,height:54,borderRadius:17,background:`linear-gradient(135deg,${u.color},${u.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#fff",flexShrink:0,boxShadow:`0 8px 20px ${u.color}35` }}>{u.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:800,color:TXT }}>{u.nombre}</div>
                <div style={{ fontSize:12,color:MUT }}>{u.rol} · {u.depto}</div>
              </div>
              <Chip label="Activo"/>
            </div>
            <div style={{ borderTop:`1px solid ${BDR}`, paddingTop:15, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[[Mail,u.email.split("@")[0]+"@...",MUT],[Waypoints,`${u.solic} solicitudes`,"#2563EB"],[ShieldCheck,"Verificado","#10B981"]].map(([Ic,v,c],j)=>(
                <div key={j} style={{ textAlign:"center",padding:"9px 6px",background:CARD2,borderRadius:11 }}>
                  <Ico ic={Ic} size={15} color={c} style={{ marginBottom:4 }}/>
                  <div style={{ fontSize:10,fontWeight:600,color:c,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:13,display:"flex",gap:9 }}>
              <button className="act-btn" style={{ flex:1,padding:"9px",border:`1px solid ${BDR}`,borderRadius:10,background:"transparent",color:MUT,fontSize:12,fontWeight:600,justifyContent:"center" }}>
                <Ico ic={UserCog} size={14} color={MUT}/> Editar
              </button>
              <button className="act-btn" style={{ padding:"9px 15px",border:`1px solid rgba(239,68,68,.2)`,borderRadius:10,background:"rgba(239,68,68,.06)",color:"#EF4444",justifyContent:"center" }}>
                <Ico ic={UserX} size={15} color="#EF4444"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── CONFIG ─── */
  const Config = () => (
    <div style={{ animation:"fadeUp .42s cubic-bezier(.22,1,.36,1)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:5 }}>
          <div style={{ width:4, height:24, borderRadius:2, background:"linear-gradient(180deg,#64748B,#94A3B8)" }} />
          <h2 style={{ fontSize:23, fontWeight:900, color:TXT, letterSpacing:-.7 }}>Configuración del Sistema</h2>
        </div>
        <p style={{ color:MUT, fontSize:13, paddingLeft:15 }}>Parámetros institucionales y preferencias de SIVIARD</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:15 }}>
        {[
          { title:"Apariencia",        ic:Sliders,       items:[["Modo oscuro","toggle",dark],["Idioma","sel","Español (RD)"],["Zona horaria","sel","America/Santo_Domingo"]] },
          { title:"Seguridad",         ic:FileLock2,     items:[["Doble autenticación","toggle",true],["Sesión activa (min)","num","30"],["Bloqueo automático","toggle",true]] },
          { title:"Notificaciones",    ic:BellRing,      items:[["Email institucional","toggle",true],["Alertas en tiempo real","toggle",true],["Resumen semanal","toggle",false]] },
          { title:"Google Maps API",   ic:Satellite,     items:[["API Key","txt","••••••••••••AIza"],["Geocodificación","toggle",true],["Detección DN auto","toggle",true]] },
        ].map((sec,i)=>(
          <div key={i} style={{ background:CARD, borderRadius:18, border:`1px solid ${BDR}`, overflow:"hidden" }}>
            <div style={{ padding:"16px 22px", borderBottom:`1px solid ${BDR}`, background:CARD2, display:"flex", alignItems:"center", gap:11 }}>
              <IcoBox ic={sec.ic} size={16} color="#2563EB" bg="rgba(37,99,235,.1)" pad={9} radius={11} glow/>
              <span style={{ fontSize:13, fontWeight:800, color:TXT }}>{sec.title}</span>
            </div>
            <div style={{ padding:"11px 22px", display:"flex", flexDirection:"column" }}>
              {sec.items.map(([lbl,type,val],j)=>(
                <div key={j} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 0",borderBottom:j<sec.items.length-1?`1px solid ${BDR}`:"none" }}>
                  <span style={{ fontSize:13,color:TXT }}>{lbl}</span>
                  {type==="toggle"
                    ? <div onClick={()=>{}} style={{ width:42,height:23,borderRadius:12,background:val?"linear-gradient(90deg,#2563EB,#06B6D4)":"#E2E8F0",position:"relative",cursor:"pointer",flexShrink:0,transition:"background .22s",boxShadow:val?"0 3px 10px rgba(37,99,235,.28)":"none" }}>
                        <div style={{ width:17,height:17,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:val?22:3,transition:"left .22s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 1px 4px rgba(0,0,0,.22)" }}/>
                      </div>
                    : <input defaultValue={val} style={{ width:135,padding:"8px 12px",borderRadius:10,border:`1px solid ${BDR}`,background:BG,color:TXT,fontSize:12 }}/>
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex",gap:11,marginTop:18,justifyContent:"flex-end" }}>
        <button className="act-btn" style={{ padding:"12px 26px",border:`1px solid ${BDR}`,borderRadius:12,background:"transparent",color:MUT,fontSize:13,fontWeight:700,justifyContent:"center" }}>Cancelar</button>
        <button className="act-btn" onClick={()=>notify("Configuración guardada exitosamente")} style={{ padding:"12px 26px",background:"linear-gradient(135deg,#2563EB,#1D4ED8)",borderRadius:12,color:"#fff",fontSize:13,fontWeight:800,justifyContent:"center",border:"none",boxShadow:"0 8px 20px rgba(37,99,235,.3)" }}>
          <Ico ic={CircleCheck} size={16} color="#fff"/> Guardar Cambios
        </button>
      </div>
    </div>
  );

  const PAGE_MAP = { dashboard:Dashboard, solicitud:SolicitudForm, solicitudes:Solicitudes, aprobacion:Aprobacion, auditoria:Auditoria, reportes:Reportes, usuarios:Usuarios, config:Config };
  const CurPage = PAGE_MAP[menu] || Dashboard;
  const curNav = NAV.find(n=>n.id===menu);

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", background:BG }}>
      <style>{G}</style>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}

      {/* ── SIDEBAR ── */}
      <div style={{ width:sideOpen?252:68, background:SIDE, transition:"width .3s cubic-bezier(.4,0,.2,1)", flexShrink:0, display:"flex", flexDirection:"column", overflow:"hidden", borderRight:"1px solid rgba(255,255,255,.04)", position:"relative" }}>
        {/* subtle scan line */}
        <div className="sidebar-scan" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }} />

        {/* Logo */}
        <div style={{ padding:"18px 14px 14px", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:12, position:"relative", zIndex:1 }}>
          <div style={{ width:40,height:40,borderRadius:13,background:"linear-gradient(135deg,#1D4ED8,#0891B2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 6px 18px rgba(37,99,235,.5)" }}>
            <Ico ic={Orbit} size={20} color="#fff"/>
          </div>
          {sideOpen && <div>
            <div style={{ fontSize:15,fontWeight:900,color:"#F1F5F9",letterSpacing:-.4,fontFamily:"'DM Sans',system-ui" }}>SIVIARD</div>
            <div style={{ fontSize:8,color:"#1E3A5F",letterSpacing:2.8,fontFamily:"'JetBrains Mono',monospace" }}>REPÚBLICA DOM.</div>
          </div>}
        </div>

        {/* User mini */}
        {sideOpen && (
          <div style={{ padding:"12px 14px", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:11, position:"relative", zIndex:1 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${user?.accent||"#2563EB"},#06B6D4)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",flexShrink:0,boxShadow:`0 4px 12px ${user?.accent||"#2563EB"}44` }}>{user?.av}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12,fontWeight:700,color:"#E2E8F0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{user?.nombre}</div>
              <div style={{ fontSize:10,color:"#334155" }}>{user?.rol}</div>
            </div>
            <div style={{ width:7,height:7,borderRadius:"50%",background:"#10B981",flexShrink:0,boxShadow:"0 0 0 2.5px rgba(16,185,129,.25)",animation:"statusPulse 2.5s ease infinite" }}/>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto", overflowX:"hidden", position:"relative", zIndex:1 }}>
          {NAV.map(n => {
            const act = menu===n.id;
            return (
              <button
                key={n.id}
                className={`nav-btn${act?" active":""}`}
                onClick={()=>setMenu(n.id)}
                onMouseEnter={()=>setHovNav(n.id)}
                onMouseLeave={()=>setHovNav(null)}
                style={{ color:act?"#fff":hovNav===n.id?"#CBD5E1":"#475569", background:act?`linear-gradient(90deg,${n.color}22,transparent)`:hovNav===n.id?"rgba(255,255,255,.04)":"transparent", borderLeft:`3px solid ${act?n.color:"transparent"}`, marginBottom:3, padding:sideOpen?"9px 13px":"9px 0", justifyContent:sideOpen?"flex-start":"center", borderRadius:"0 12px 12px 0", gap:12 }}
              >
                <span className="n-icon" style={{ width:32,height:32,borderRadius:10,background:act?n.bg:hovNav===n.id?"rgba(255,255,255,.05)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .22s",boxShadow:act?`0 4px 12px ${n.color}30`:"none" }}>
                  <Ico ic={n.ic} size={16} color={act?n.color:hovNav===n.id?"#94A3B8":"#334155"}/>
                </span>
                {sideOpen && <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13,fontWeight:act?700:500,whiteSpace:"nowrap",letterSpacing:-.1 }}>{n.label}</div>
                  {act && <div style={{ fontSize:9.5,color:n.color,opacity:.8,marginTop:1,letterSpacing:.2 }}>{n.desc}</div>}
                </div>}
                {sideOpen && act && <Ico ic={ChevronRight} size={12} color={n.color} style={{ marginLeft:"auto",flexShrink:0 }}/>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:"10px 8px", borderTop:"1px solid rgba(255,255,255,.05)", position:"relative", zIndex:1 }}>
          <button className="nav-btn" onClick={()=>{setPage("login");setUser(null)}} style={{ color:"#334155",justifyContent:sideOpen?"flex-start":"center",padding:sideOpen?"9px 13px":"9px 0",gap:12,borderRadius:"0 12px 12px 0" }}>
            <span style={{ width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Ico ic={Unplug} size={16} color="#334155"/>
            </span>
            {sideOpen && <span style={{ fontSize:13,fontWeight:500 }}>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* TOPBAR */}
        <div style={{ height:63, background:CARD, borderBottom:`1px solid ${BDR}`, display:"flex", alignItems:"center", padding:"0 22px", gap:14, flexShrink:0, position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)" }}>
          <button className="ic-btn topbar-ico" onClick={()=>setSideOpen(p=>!p)} style={{ width:36,height:36,borderRadius:11,border:`1px solid ${BDR}`,transition:"all .22s" }}>
            <div className="ic-inner" style={{ width:"100%",height:"100%",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s" }}>
              <Ico ic={sideOpen?PanelLeftClose:PanelLeftOpen} size={17} color={MUT}/>
            </div>
          </button>

          {/* Page label */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {curNav && <IcoBox ic={curNav.ic} size={15} color={curNav.color} bg={curNav.bg} pad={8} radius={10} glow />}
            <div>
              <div style={{ fontSize:14,fontWeight:800,color:TXT,lineHeight:1.2 }}>{curNav?.label}</div>
              <div style={{ fontSize:10,color:MUT,fontFamily:"'JetBrains Mono',monospace" }}>SIVIARD · Sistema Institucional RD</div>
            </div>
          </div>

          <div style={{ flex:1 }}/>

          {/* Search */}
          <div style={{ position:"relative", width:220 }}>
            <div style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}><Ico ic={Search} size={14} color={MUT}/></div>
            <input placeholder="Búsqueda rápida..." style={{ width:"100%",padding:"9px 13px 9px 34px",borderRadius:11,border:`1px solid ${BDR}`,background:BG,color:TXT,fontSize:12 }}/>
          </div>

          {/* Dark mode */}
          <button className="ic-btn topbar-ico" onClick={()=>setDark(p=>!p)} style={{ width:36,height:36,borderRadius:11,border:`1px solid ${BDR}` }}>
            <Ico ic={dark?Sun:Moon} size={17} color={MUT}/>
          </button>

          {/* Notifications */}
          <div style={{ position:"relative" }}>
            <button className="ic-btn topbar-ico" style={{ width:36,height:36,borderRadius:11,border:`1px solid ${BDR}` }}>
              <Ico ic={BellRing} size={17} color={MUT}/>
            </button>
            <div className="notif-badge" style={{ position:"absolute",top:-3,right:-3,width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,#EF4444,#DC2626)",border:`2px solid ${CARD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8.5,color:"#fff",fontWeight:900 }}>3</div>
          </div>

          {/* Profile */}
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderRadius:13,background:BG,border:`1px solid ${BDR}`,cursor:"pointer",transition:"all .2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#2563EB"} onMouseOut={e=>e.currentTarget.style.borderColor=BDR}>
            <div style={{ width:30,height:30,borderRadius:10,background:`linear-gradient(135deg,${user?.accent||"#2563EB"},#06B6D4)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",boxShadow:`0 4px 10px ${user?.accent||"#2563EB"}44` }}>{user?.av}</div>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:TXT,lineHeight:1.2 }}>{user?.nombre}</div>
              <div style={{ fontSize:10,color:MUT }}>{user?.rol}</div>
            </div>
            <Ico ic={ChevronDown} size={13} color={MUT}/>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex:1, overflow:"auto", padding:26 }}>
          <CurPage/>
        </div>
      </div>
    </div>
  );
}
