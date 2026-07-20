import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";
import {
  Search, Bell, ChevronDown, Plus, Sun, Moon, Users, BookOpen,
  Building2, Calendar, TrendingUp, AlertTriangle, CheckCircle2,
  Settings, LogOut, User, Shield, Menu, X, GraduationCap,
  ArrowUpRight, Filter, Download, MoreHorizontal,
  Cpu, RefreshCw, Play, Eye, Layers,
  Clock, MapPin, Mail, Phone, Lock, ChevronRight,
  BarChart2, Zap, Globe, Star, CheckCircle, ArrowRight,
  FileText, Printer, Edit2, Save, Upload, Activity,
  ChevronLeft, Grid, List, Award, Briefcase, Hash, Info,
  PieChart, Home, ToggleLeft, ToggleRight
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   PALETTE CONSTANTS
═══════════════════════════════════════════════════════════ */
const C = {
  green:  "#16a34a",
  gold:   "#ca8a04",
  teal:   "#0d9488",
  violet: "#7c3aed",
  red:    "#ef4444",
  amber:  "#f59e0b",
};

/* ═══════════════════════════════════════════════════════════
   SEED DATA
═══════════════════════════════════════════════════════════ */
const LECTURERS = [
  { id: 1,  name: "Mrs Moradeyo",    initials: "MM", qualification: "M.Sc Computer Science",       email: "moradeyo@aopoly.edu.ng",    phone: "08031234501", office: "CS-101", courses: ["COM 111","COM 121"],        hours: 8,  status: "Active",   specialization: "Programming Languages" },
  { id: 2,  name: "Mrs Olaniyan",    initials: "MO", qualification: "M.Sc Information Technology", email: "olaniyan@aopoly.edu.ng",     phone: "08031234502", office: "CS-102", courses: ["COM 123","COM 124","COM 211"], hours: 12, status: "Active",   specialization: "Software Engineering" },
  { id: 3,  name: "Mrs Idowu",       initials: "MI", qualification: "B.Sc Computer Science",       email: "idowu@aopoly.edu.ng",        phone: "08031234503", office: "CS-103", courses: ["COM 215","COM 217"],        hours: 8,  status: "Active",   specialization: "Office Applications" },
  { id: 4,  name: "Mr Dada",         initials: "DD", qualification: "M.Sc Computer Science",       email: "dada@aopoly.edu.ng",         phone: "08031234504", office: "CS-104", courses: ["COM 221","COM 222"],        hours: 8,  status: "Active",   specialization: "Networking" },
  { id: 5,  name: "Mr Ojoawo",       initials: "OJ", qualification: "M.Eng Computer Engineering",  email: "ojoawo@aopoly.edu.ng",       phone: "08031234505", office: "CS-105", courses: ["AIT 321","COM 212"],        hours: 10, status: "Active",   specialization: "AI & Machine Learning" },
  { id: 6,  name: "Mr Olorunnisola", initials: "OR", qualification: "M.Sc Computer Science",       email: "olorunnisola@aopoly.edu.ng", phone: "08031234506", office: "CS-106", courses: ["COM 213","COM 225"],        hours: 8,  status: "Active",   specialization: "Web Technologies" },
  { id: 7,  name: "Mr Kehinde",      initials: "KH", qualification: "M.Sc Networking",             email: "kehinde@aopoly.edu.ng",      phone: "08031234507", office: "CS-107", courses: ["COM 122","NCC 321","NCC 322"], hours: 12, status: "Active",   specialization: "Cloud Computing" },
  { id: 8,  name: "Mr Adeopa",       initials: "AD", qualification: "M.Sc Cybersecurity",          email: "adeopa@aopoly.edu.ng",       phone: "08031234508", office: "CS-108", courses: ["CYS 322","COM 214"],        hours: 8,  status: "On Leave", specialization: "Cybersecurity" },
  { id: 9,  name: "Mr Okunlola",     initials: "OK", qualification: "B.Sc Computer Science",       email: "okunlola@aopoly.edu.ng",     phone: "08031234509", office: "CS-109", courses: ["COM 125","COM 126"],        hours: 8,  status: "Active",   specialization: "System Analysis" },
  { id: 10, name: "Mr Akinola",      initials: "AK", qualification: "M.Sc Software Engineering",   email: "akinola@aopoly.edu.ng",      phone: "08031234510", office: "CS-110", courses: ["SWD 321","SWD 322"],        hours: 8,  status: "Active",   specialization: "Software Development" },
  { id: 11, name: "Mr Oladiti",      initials: "OL", qualification: "M.Sc Information Systems",    email: "oladiti@aopoly.edu.ng",      phone: "08031234511", office: "CS-111", courses: ["COM 218","COM 224"],        hours: 8,  status: "Active",   specialization: "MIS & E-Commerce" },
];

const COURSES = [
  { code:"COM 111", title:"Introduction to Computers",          programme:"ND",  level:"ND1",  semester:"1st", lecturer:"Mrs Moradeyo",    hours:2, type:"Lecture", credit:2 },
  { code:"COM 121", title:"C Programming Language",             programme:"ND",  level:"ND1",  semester:"1st", lecturer:"Mrs Moradeyo",    hours:3, type:"Lab",     credit:3 },
  { code:"COM 122", title:"Introduction to the Internet",       programme:"ND",  level:"ND1",  semester:"2nd", lecturer:"Mr Kehinde",      hours:2, type:"Lecture", credit:2 },
  { code:"COM 123", title:"Java Programming I",                 programme:"ND",  level:"ND1",  semester:"1st", lecturer:"Mrs Olaniyan",    hours:3, type:"Lab",     credit:3 },
  { code:"COM 124", title:"Data Structures and Algorithms",     programme:"ND",  level:"ND1",  semester:"2nd", lecturer:"Mrs Olaniyan",    hours:3, type:"Lecture", credit:3 },
  { code:"COM 125", title:"Introduction to System Analysis",    programme:"ND",  level:"ND1",  semester:"2nd", lecturer:"Mr Okunlola",     hours:2, type:"Lecture", credit:2 },
  { code:"COM 126", title:"PC Upgrade & Maintenance",           programme:"ND",  level:"ND1",  semester:"2nd", lecturer:"Mr Okunlola",     hours:2, type:"Lab",     credit:2 },
  { code:"COM 211", title:"Java Programming II",                programme:"ND",  level:"ND2",  semester:"1st", lecturer:"Mrs Olaniyan",    hours:3, type:"Lab",     credit:3 },
  { code:"COM 212", title:"Introduction to System Programming", programme:"ND",  level:"ND2",  semester:"1st", lecturer:"Mr Ojoawo",       hours:2, type:"Lecture", credit:2 },
  { code:"COM 213", title:"UML",                                programme:"ND",  level:"ND2",  semester:"1st", lecturer:"Mr Olorunnisola", hours:2, type:"Lecture", credit:2 },
  { code:"COM 214", title:"Computer System Troubleshooting",    programme:"ND",  level:"ND2",  semester:"1st", lecturer:"Mr Adeopa",       hours:2, type:"Lab",     credit:2 },
  { code:"COM 215", title:"Computer Application Packages",      programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mrs Idowu",       hours:2, type:"Lab",     credit:2 },
  { code:"COM 217", title:"Research Methodology",               programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mrs Idowu",       hours:2, type:"Lecture", credit:2 },
  { code:"COM 218", title:"E-Commerce",                         programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mr Oladiti",      hours:2, type:"Lecture", credit:2 },
  { code:"COM 221", title:"Basic Computing & Networking",       programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mr Dada",         hours:2, type:"Lecture", credit:2 },
  { code:"COM 222", title:"File Organisation and Management",   programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mr Dada",         hours:2, type:"Lecture", credit:2 },
  { code:"COM 224", title:"Management Information Systems",     programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mr Oladiti",      hours:2, type:"Lecture", credit:2 },
  { code:"COM 225", title:"Web Design Technology",              programme:"ND",  level:"ND2",  semester:"2nd", lecturer:"Mr Olorunnisola", hours:3, type:"Lab",     credit:3 },
  { code:"SWD 321", title:"Advanced Software Development",      programme:"HND", level:"HND1", semester:"1st", lecturer:"Mr Akinola",      hours:3, type:"Lab",     credit:3 },
  { code:"SWD 322", title:"Mobile Application Development",     programme:"HND", level:"HND1", semester:"2nd", lecturer:"Mr Akinola",      hours:3, type:"Lab",     credit:3 },
  { code:"NCC 321", title:"Network Administration",             programme:"HND", level:"HND1", semester:"1st", lecturer:"Mr Kehinde",      hours:3, type:"Lab",     credit:3 },
  { code:"NCC 322", title:"Cloud Computing Fundamentals",       programme:"HND", level:"HND1", semester:"2nd", lecturer:"Mr Kehinde",      hours:3, type:"Lab",     credit:3 },
  { code:"AIT 321", title:"Artificial Intelligence Techniques", programme:"HND", level:"HND1", semester:"1st", lecturer:"Mr Ojoawo",       hours:3, type:"Lab",     credit:3 },
  { code:"CYS 322", title:"Cybersecurity Fundamentals",         programme:"HND", level:"HND2", semester:"1st", lecturer:"Mr Adeopa",       hours:3, type:"Lab",     credit:3 },
];

const CLASSROOMS = [
  { id:1, name:"Lecture Hall 1",      code:"LH-1",  type:"Lecture Hall",  capacity:120, building:"Science Block A", floor:"Ground", projector:true,  smartboard:true,  ac:true,  usage:88, available:true  },
  { id:2, name:"Lecture Hall 2",      code:"LH-2",  type:"Lecture Hall",  capacity:100, building:"Science Block A", floor:"1st",    projector:true,  smartboard:false, ac:true,  usage:74, available:true  },
  { id:3, name:"Lecture Hall 3",      code:"LH-3",  type:"Lecture Hall",  capacity:80,  building:"Science Block B", floor:"Ground", projector:true,  smartboard:false, ac:false, usage:61, available:true  },
  { id:4, name:"Computer Laboratory A",code:"Lab A", type:"Laboratory",    capacity:40,  building:"ICT Building",    floor:"Ground", projector:true,  smartboard:true,  ac:true,  usage:95, available:false },
  { id:5, name:"Computer Laboratory B",code:"Lab B", type:"Laboratory",    capacity:40,  building:"ICT Building",    floor:"1st",    projector:true,  smartboard:false, ac:true,  usage:82, available:true  },
  { id:6, name:"Seminar Room",        code:"SEM-1", type:"Seminar Room",  capacity:30,  building:"Admin Block",     floor:"2nd",    projector:false, smartboard:false, ac:true,  usage:47, available:true  },
];

const TIMETABLE_GRID: Record<string, { time:string; course:string; lecturer:string; room:string; programme:string; color:string }[]> = {
  Monday:    [
    { time:"8:00 AM – 10:00 AM", course:"COM 111", lecturer:"Mrs Moradeyo",    room:"LH-1",  programme:"ND1",  color:C.green  },
    { time:"10:00 AM – 12:00 PM", course:"COM 124", lecturer:"Mrs Olaniyan",    room:"LH-2",  programme:"ND2",  color:C.gold   },
    { time:"12:00 PM – 2:00 PM", course:"SWD 321", lecturer:"Mr Akinola",      room:"Lab A", programme:"HND1", color:C.teal   },
    { time:"2:00 PM – 4:00 PM", course:"CYS 322", lecturer:"Mr Adeopa",       room:"Lab B", programme:"HND2", color:C.violet },
  ],
  Tuesday:   [
    { time:"8:00 AM – 10:00 AM", course:"COM 121", lecturer:"Mrs Moradeyo",    room:"Lab A", programme:"ND1",  color:C.green  },
    { time:"10:00 AM – 12:00 PM", course:"COM 221", lecturer:"Mr Dada",         room:"LH-2",  programme:"ND2",  color:C.gold   },
    { time:"2:00 PM – 4:00 PM", course:"AIT 321", lecturer:"Mr Ojoawo",       room:"Lab B", programme:"HND1", color:C.teal   },
  ],
  Wednesday: [
    { time:"8:00 AM – 10:00 AM", course:"COM 123", lecturer:"Mrs Olaniyan",    room:"LH-1",  programme:"ND1",  color:C.green  },
    { time:"10:00 AM – 12:00 PM", course:"COM 211", lecturer:"Mrs Olaniyan",    room:"Lab A", programme:"ND2",  color:C.gold   },
    { time:"12:00 PM – 2:00 PM", course:"NCC 321", lecturer:"Mr Kehinde",      room:"Lab B", programme:"HND1", color:C.teal   },
  ],
  Thursday:  [
    { time:"8:00 AM – 10:00 AM", course:"COM 213", lecturer:"Mr Olorunnisola", room:"LH-3",  programme:"ND2",  color:C.gold   },
    { time:"10:00 AM – 12:00 PM", course:"COM 212", lecturer:"Mr Ojoawo",       room:"LH-1",  programme:"ND2",  color:C.gold   },
    { time:"2:00 PM – 4:00 PM", course:"SWD 322", lecturer:"Mr Akinola",      room:"Lab A", programme:"HND1", color:C.teal   },
  ],
  Friday:    [
    { time:"8:00 AM – 10:00 AM", course:"COM 122", lecturer:"Mr Kehinde",      room:"LH-3",  programme:"ND1",  color:C.green  },
    { time:"10:00 AM – 12:00 PM", course:"COM 125", lecturer:"Mr Okunlola",     room:"LH-2",  programme:"ND1",  color:C.green  },
    { time:"12:00 PM – 2:00 PM", course:"COM 218", lecturer:"Mr Oladiti",      room:"LH-1",  programme:"ND2",  color:C.gold   },
  ],
};

const TIME_SLOTS = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

const FITNESS_DATA = [
  { gen:0,   fitness:0.12,  conflicts:84 },
  { gen:10,  fitness:0.24,  conflicts:61 },
  { gen:20,  fitness:0.41,  conflicts:43 },
  { gen:30,  fitness:0.58,  conflicts:29 },
  { gen:40,  fitness:0.70,  conflicts:18 },
  { gen:50,  fitness:0.79,  conflicts:11 },
  { gen:60,  fitness:0.86,  conflicts:6  },
  { gen:70,  fitness:0.91,  conflicts:3  },
  { gen:80,  fitness:0.95,  conflicts:1  },
  { gen:90,  fitness:0.97,  conflicts:0  },
  { gen:100, fitness:0.983, conflicts:0  },
];

const TT_ENTRIES = [
  { id:"TT-2025-001", programme:"ND1 – SWD", semester:"1st", status:"Published",  fitness:0.983, conflicts:0, lecturer:"Mrs Moradeyo",    course:"COM 111", room:"LH-1",  day:"Monday",    time:"8:00 AM – 10:00 AM" },
  { id:"TT-2025-002", programme:"ND2 – NCC", semester:"1st", status:"Approved",   fitness:0.971, conflicts:0, lecturer:"Mr Dada",         course:"COM 221", room:"LH-2",  day:"Tuesday",   time:"10:00 AM – 12:00 PM" },
  { id:"TT-2025-003", programme:"HND1 – AIT",semester:"2nd", status:"Draft",      fitness:0.886, conflicts:2, lecturer:"Mr Ojoawo",       course:"AIT 321", room:"Lab A", day:"Wednesday", time:"8:00 AM – 10:00 AM" },
  { id:"TT-2025-004", programme:"HND2 – CYS",semester:"2nd", status:"Generating", fitness:0.741, conflicts:5, lecturer:"Mrs Olaniyan",    course:"CYS 322", room:"Lab B", day:"Thursday",  time:"12:00 PM – 2:00 PM" },
  { id:"TT-2025-005", programme:"ND1 – NCC", semester:"1st", status:"Published",  fitness:0.978, conflicts:0, lecturer:"Mr Kehinde",      course:"COM 122", room:"LH-3",  day:"Friday",    time:"10:00 AM – 12:00 PM" },
  { id:"TT-2025-006", programme:"ND2 – SWD", semester:"1st", status:"Approved",   fitness:0.964, conflicts:0, lecturer:"Mrs Idowu",       course:"COM 124", room:"LH-1",  day:"Monday",    time:"12:00 PM – 2:00 PM" },
  { id:"TT-2025-007", programme:"HND1 – SWD",semester:"2nd", status:"Draft",      fitness:0.912, conflicts:1, lecturer:"Mr Akinola",      course:"SWD 321", room:"Lab A", day:"Tuesday",   time:"2:00 PM – 4:00 PM" },
];

const ROOM_UTIL = [
  { room:"LH-1",   usage:88, capacity:120 },
  { room:"LH-2",   usage:74, capacity:100 },
  { room:"Lab A",  usage:95, capacity:40  },
  { room:"Lab B",  usage:82, capacity:40  },
  { room:"LH-3",   usage:61, capacity:80  },
  { room:"Seminar",usage:47, capacity:30  },
];

const WEEKLY_LOAD = [
  { day:"Mon", nd1:6, nd2:5, hnd1:4, hnd2:3 },
  { day:"Tue", nd1:5, nd2:6, hnd1:5, hnd2:4 },
  { day:"Wed", nd1:4, nd2:4, hnd1:6, hnd2:5 },
  { day:"Thu", nd1:6, nd2:5, hnd1:4, hnd2:6 },
  { day:"Fri", nd1:3, nd2:3, hnd1:3, hnd2:2 },
];

type Page = "landing"|"login"|"register"|"dashboard"|"timetable"|"lecturers"|"courses"|"classrooms"|"analytics"|"settings"|"profile"|"permissions";
type Role = "student"|"lecturer"|"timetable_officer"|"hod"|"admin";
type Lecturer   = typeof LECTURERS[0];
type Course     = typeof COURSES[0];
type Classroom  = typeof CLASSROOMS[0];

/* ═══════════════════════════════════════════════════════════
   SHARED SMALL COMPONENTS
═══════════════════════════════════════════════════════════ */
function StatusBadge({ status }: { status:string }) {
  const map: Record<string,string> = {
    Published:  "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    Approved:   "bg-green-600/15 text-green-400 border border-green-600/25",
    Draft:      "bg-slate-500/15 text-slate-400 border border-slate-500/25",
    Generating: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    Active:     "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    "On Leave": "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    Lecture:    "bg-green-600/15 text-green-400 border border-green-600/25",
    Lab:        "bg-violet-500/15 text-violet-400 border border-violet-500/25",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? "bg-slate-500/15 text-slate-400"}`}>
      {(status==="Published"||status==="Active") && <span className="size-1.5 rounded-full bg-emerald-400" />}
      {status==="Generating" && <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />}
      {status}
    </span>
  );
}

function FitnessBar({ value }: { value:number }) {
  const pct = Math.round(value*100);
  const color = pct>=95 ? C.green : pct>=80 ? C.teal : pct>=60 ? C.amber : C.red;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:color }} />
      </div>
      <span className="text-xs font-mono" style={{ color }}>{pct}%</span>
    </div>
  );
}

function Av({ name, size="sm" }: { name:string; size?:"sm"|"md"|"lg" }) {
  const ini = name.split(" ").map(w=>w[0]).slice(0,2).join("");
  const sz  = size==="lg"?"size-14":size==="md"?"size-9":"size-7";
  const txt = size==="lg"?"text-lg":size==="md"?"text-sm":"text-[10px]";
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center text-white ${txt} font-bold shrink-0 shadow`}>
      {ini}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NIGERIA TIME (WAT = UTC+1)
═══════════════════════════════════════════════════════════ */
function useNigeriaTime() {
  const [now, setNow] = useState(new Date());
  useEffect(()=>{
    const id = setInterval(()=>setNow(new Date()), 1000);
    return ()=>clearInterval(id);
  },[]);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now.toLocaleString("en-NG", { timeZone:"Africa/Lagos", ...opts });
  const weekday = fmt({weekday:"long"});
  return {
    clock:   fmt({hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false}),
    date:    fmt({weekday:"short", day:"numeric", month:"short", year:"numeric"}),
    weekday,
    short:   fmt({hour:"2-digit", minute:"2-digit", hour12:true}),
    watDay:  weekday, // full weekday name for timetable matching
  };
}

/* Helper: format a past offset into a Nigeria-time string */
function watAgo(offsetMs: number) {
  const d = new Date(Date.now() - offsetMs);
  return d.toLocaleTimeString("en-NG", {timeZone:"Africa/Lagos", hour:"2-digit", minute:"2-digit", hour12:true});
}

/* ── Custom charts (no Recharts, avoids duplicate-key warnings) ── */
function FitnessChart({ data, isDark }: { data:typeof FITNESS_DATA; isDark:boolean }) {
  const W=600; const H=180; const p={t:10,r:8,b:28,l:32};
  const iW=W-p.l-p.r; const iH=H-p.t-p.b;
  const denom = Math.max(data.length-1, 1);
  const tx=(i:number)=>p.l+(i/denom)*iW;
  const tyF=(v:number)=>p.t+(1-v)*iH;
  const tyC=(v:number)=>p.t+(1-v/90)*iH;
  if(data.length===0) return null;
  const fitPath=data.map((d,i)=>`${i===0?"M":"L"}${tx(i).toFixed(1)},${tyF(d.fitness).toFixed(1)}`).join(" ");
  const areaPath=fitPath+` L${tx(data.length-1).toFixed(1)},${(p.t+iH).toFixed(1)} L${p.l},${(p.t+iH).toFixed(1)} Z`;
  const conPath=data.map((d,i)=>`${i===0?"M":"L"}${tx(i).toFixed(1)},${tyC(d.conflicts).toFixed(1)}`).join(" ");
  const sg=isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:180}}>
      <defs>
        <linearGradient id="grd1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={C.green} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={C.green} stopOpacity="0.01"/>
        </linearGradient>
      </defs>
      {[0,.25,.5,.75,1].map(v=>(
        <line key={v} x1={p.l} x2={p.l+iW} y1={tyF(v)} y2={tyF(v)} stroke={sg} strokeDasharray="3 3"/>
      ))}
      {data.filter((_,i)=>i%2===0).map(d=>(
        <text key={d.gen} x={tx(data.indexOf(d))} y={H-4} textAnchor="middle" fontSize={9} fill="#7a9a85">{d.gen}</text>
      ))}
      {[0,.5,1].map(v=>(
        <text key={`y${v}`} x={p.l-4} y={tyF(v)+3} textAnchor="end" fontSize={9} fill="#7a9a85">{Math.round(v*100)}%</text>
      ))}
      <path d={areaPath} fill="url(#grd1)"/>
      <path d={fitPath}  fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <path d={conPath}  fill="none" stroke={C.red}   strokeWidth={1.5} strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={tx(data.length-1)} cy={tyF(data[data.length-1].fitness)} r={4} fill={C.green}/>
    </svg>
  );
}

function RoomBars({ data, isDark }: { data:typeof ROOM_UTIL; isDark:boolean }) {
  const track=isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)";
  return (
    <div className="space-y-3">
      {data.map(r=>{
        const col=r.usage>=90?C.green:r.usage>=70?C.teal:C.gold;
        return (
          <div key={r.room}>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-[#e8edf5]">{r.room}</span>
              <span className="text-xs font-mono" style={{color:col}}>{r.usage}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{background:track}}>
              <div className="h-full rounded-full" style={{width:`${r.usage}%`,backgroundColor:col}}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeeklyBars({ data, isDark }: { data:typeof WEEKLY_LOAD; isDark:boolean }) {
  const series=[
    {key:"nd1" as const,  color:C.green },
    {key:"nd2" as const,  color:C.gold  },
    {key:"hnd1" as const, color:C.teal  },
    {key:"hnd2" as const, color:C.violet},
  ];
  return (
    <div className="flex gap-4">
      {data.map(day=>(
        <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 items-end" style={{height:100}}>
            {series.map(s=>(
              <div key={s.key} className="flex-1 rounded-t-sm" style={{height:`${(day[s.key]/7)*100}%`,backgroundColor:s.color,minHeight:3}}/>
            ))}
          </div>
          <div className="h-px w-full" style={{background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)"}}/>
          <span className="text-[10px]" style={{color:"#7a9a85"}}>{day.day}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════════ */
function LandingPage({ onNavigate }: { onNavigate:(p:Page)=>void }) {
  const features = [
    { icon:Cpu,       title:"Genetic Algorithm Engine",   desc:"IGA with tournament selection, elitism, crossover & mutation generates optimal schedules automatically.", color:"text-green-400",  bg:"bg-green-500/10" },
    { icon:Zap,       title:"Zero Scheduling Conflicts",  desc:"Hard constraints guarantee no lecturer, room, or student overlaps — fitness reaches 98%+ accuracy.",        color:"text-amber-400",  bg:"bg-amber-500/10" },
    { icon:BarChart2, title:"Real-Time Analytics",        desc:"Live GA fitness evolution, classroom utilisation, lecturer workload, and conflict tracking dashboards.",    color:"text-teal-400",   bg:"bg-teal-500/10"  },
    { icon:Globe,     title:"Multi-Programme Support",    desc:"Simultaneously schedules ND1, ND2, HND1, HND2 across SWD, NCC, AIT, and CYS programmes.",                  color:"text-violet-400", bg:"bg-violet-500/10"},
    { icon:Shield,    title:"Role-Based Access",          desc:"Admin, HOD, Timetable Officer, Lecturer, and Student each see exactly what they need.",                    color:"text-green-400",  bg:"bg-green-500/10" },
    { icon:Download,  title:"PDF & Excel Export",         desc:"One-click export to PDF, Excel, or CSV. Print-ready timetables for notice boards.",                         color:"text-amber-400",  bg:"bg-amber-500/10" },
  ];
  const stats=[{value:"11",label:"Lecturers"},{value:"42",label:"Courses"},{value:"98.3%",label:"Fitness Score"},{value:"<2s",label:"Generation Time"}];
  const steps=[
    {n:"01",title:"Load Data",        desc:"Input lecturers, courses, classrooms, and constraints. Seed data from the departmental allocation is pre-loaded."},
    {n:"02",title:"Run GA Engine",    desc:"The Improved Genetic Algorithm evolves through 100 generations, resolving conflicts and maximising the fitness function."},
    {n:"03",title:"Publish & Export", desc:"Review the conflict-free timetable, approve it, then export to PDF or Excel for departmental distribution."},
  ];
  return (
    <div className="min-h-screen bg-white text-[#0a1128]" style={{fontFamily:"'DM Sans',sans-serif"}}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="size-5 text-white"/>
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-[#0a1128]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Adeseun Ogundoyin</p>
              <p className="text-[10px] text-green-600 font-medium leading-tight">Computer Science Dept.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>onNavigate("login")}    className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Sign In</button>
            <button onClick={()=>onNavigate("register")} className="px-4 py-1.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all shadow-lg shadow-green-900/20">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white pt-16 pb-8 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-green-100 blur-[80px] opacity-70"/>
          <div className="absolute top-10 right-1/4 w-48 h-48 rounded-full bg-amber-100 blur-3xl opacity-60"/>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-medium mb-6">
            <GraduationCap className="size-3"/> Adeseun Ogundoyin Polytechnic, Eruwa · Faculty of Science
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-5 text-[#0a1128]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>
            Department of<br/>
            <span className="bg-gradient-to-r from-green-600 via-teal-600 to-amber-500 bg-clip-text text-transparent">Computer Science</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3 leading-relaxed font-medium">
            Timetable Management System
          </p>
          <p className="text-base text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            An Improved Genetic Algorithm generates conflict-free, optimised lecture timetables for all ND and HND programmes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button onClick={()=>onNavigate("register")} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-medium transition-all shadow-xl shadow-green-700/25 active:scale-95">
              Get Started <ArrowRight className="size-4"/>
            </button>
            <button onClick={()=>onNavigate("login")} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition-all shadow-sm">
              <Eye className="size-4"/> Sign In
            </button>
          </div>

          {/* Hero image — students with PC */}
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-green-400/20 via-teal-400/15 to-amber-400/20 blur-2xl"/>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-300/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                <span className="size-3 rounded-full bg-red-400"/>
                <span className="size-3 rounded-full bg-amber-400"/>
                <span className="size-3 rounded-full bg-green-500"/>
                <span className="ml-4 text-[10px] font-mono text-gray-400 truncate">aopoly-cs-timetable.edu.ng · Timetable Management System</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1758270705290-62b6294dd044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHVzaW5nJTIwY29tcHV0ZXJzJTIwbGFwdG9wJTIwY2xhc3Nyb29tJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3ODQxMzAwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students working on computers — Dept. of Computer Science"
                className="w-full object-cover"
                style={{height:340,objectPosition:"center center"}}
              />
              {/* Floating stat badges */}
              <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 text-xs font-semibold shadow-sm">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse"/> GA Engine Active
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-700 text-xs font-semibold shadow-sm">
                  98.3% Fitness Score
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-6 border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(s=>(
            <div key={s.label}>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-amber-500 bg-clip-text text-transparent mb-1" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{s.value}</p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-[#0a1128]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>System Features</h2>
            <p className="text-gray-400">Intelligent scheduling built for Nigerian polytechnics.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f=>(
              <div key={f.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50/40 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className={`size-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}><f.icon className={`size-5 ${f.color}`}/></div>
                <h3 className="font-semibold mb-2 text-[#0a1128]">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-[#0a1128]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>How It Works</h2>
            <p className="text-gray-400">From data entry to published timetable in three steps.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s,i)=>(
              <div key={s.n} className="relative">
                {i<steps.length-1&&<div className="hidden sm:block absolute top-7 left-[60%] right-[-40%] h-px bg-gradient-to-r from-green-400 to-transparent"/>}
                <div className="size-14 rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 border border-green-200 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-xl font-bold text-green-700" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{s.n}</span>
                </div>
                <h3 className="font-semibold text-[#0a1128] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-green-50 via-white to-amber-50 border border-green-100 shadow-xl shadow-green-100/50">
            <h2 className="text-3xl font-bold mb-4 text-[#0a1128]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Ready to manage your timetable?</h2>
            <p className="text-gray-500 mb-8">Register to access the timetable management system for the Department of Computer Science.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={()=>onNavigate("register")} className="px-8 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-medium transition-all shadow-lg shadow-green-700/25">Register as Student</button>
              <button onClick={()=>onNavigate("register")} className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium transition-all shadow-lg shadow-amber-600/25">Register as Lecturer</button>
              <button onClick={()=>onNavigate("register")} className="px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-medium transition-all shadow-lg shadow-teal-700/25">Timetable Officer</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400 bg-gray-50">
        <p>Department of Computer Science · Adeseun Ogundoyin Polytechnic, Eruwa · Faculty of Science · 2025/2026</p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AUTH PAGES
═══════════════════════════════════════════════════════════ */
const STAFF_CREDENTIALS: Record<string,{role:Role;label:string;info?:{name:string;matric:string;programme:string}}> = {
  "admin@aopoly.edu.ng":    {role:"admin",             label:"Admin"},
  "hod@aopoly.edu.ng":      {role:"hod",               label:"HOD"},
  "officer@aopoly.edu.ng":  {role:"timetable_officer", label:"Timetable Officer"},
  "student@aopoly.edu.ng":  {role:"student",           label:"Student", info:{name:"Adebayo Oluwaseun",matric:"AOPE/ND1/2025/001",programme:"ND1"}},
  "lecturer@aopoly.edu.ng": {role:"lecturer",          label:"Lecturer"},
};
const STAFF_PASSWORDS: Record<string,string> = {
  "admin@aopoly.edu.ng":    "Admin@2025",
  "hod@aopoly.edu.ng":      "HOD@2025",
  "officer@aopoly.edu.ng":  "Officer@2025",
  "student@aopoly.edu.ng":  "Student@2025",
  "lecturer@aopoly.edu.ng": "Lecturer@2025",
};


function AuthPage({ mode, onNavigate, onLogin }: { mode:"login"|"register"; onNavigate:(p:Page)=>void; onLogin:(r:Role,info?:{name:string;matric:string;programme:string})=>void }) {
  const [loginRole, setLoginRole] = useState<Role>("student");
  const [regRole,   setRegRole]   = useState<"student"|"lecturer"|"timetable_officer">("student");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [name,     setName]     = useState("");
  const [matric,   setMatric]   = useState("");
  const [staffId,  setStaffId]  = useState("");
  const [programme,setProgramme]= useState("ND1");
  const [qual,     setQual]     = useState("");
  const [spec,     setSpec]     = useState("");
  const [dept,     setDept]     = useState("Computer Science");

  const handleSignIn = () => {
    setLoginError("");
    const key = email.toLowerCase().trim();
    const cred = STAFF_CREDENTIALS[key];
    if(cred) {
      const expected = STAFF_PASSWORDS[key];
      if(password !== expected) { setLoginError("Incorrect password for this account."); return; }
      onLogin(cred.role, cred.info); return;
    }
    // Unrecognised email — use selected role tab, minimal info
    onLogin(loginRole, loginRole==="student"?{name:"Student",matric:"AOPE/ND/2025/001",programme:"ND1"}:undefined);
  };

  const loginRoles: {value:Role; label:string; icon:any; desc:string}[] = [
    { value:"student",           label:"Student",           icon:GraduationCap, desc:"View your class timetable" },
    { value:"lecturer",          label:"Lecturer",          icon:BookOpen,       desc:"View your teaching schedule" },
    { value:"timetable_officer", label:"Timetable Officer", icon:Calendar,       desc:"Generate & manage timetables" },
    { value:"hod",               label:"HOD",               icon:Award,          desc:"Approve and oversee timetables" },
    { value:"admin",             label:"Admin",             icon:Shield,         desc:"Full system access" },
  ];

  const regRoles: {value:"student"|"lecturer"|"timetable_officer"; label:string; icon:any}[] = [
    { value:"student",           label:"Student",           icon:GraduationCap },
    { value:"lecturer",          label:"Lecturer",          icon:BookOpen       },
    { value:"timetable_officer", label:"Timetable Officer", icon:Calendar       },
  ];

  const inp = "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/[0.05] border border-white/[0.08] text-[#e8edf5] placeholder:text-[#7a9a85]/50 outline-none focus:border-green-600/50 transition-colors";

  return (
    <div className="min-h-screen bg-[#050d1a] flex" style={{fontFamily:"'DM Sans',sans-serif"}}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-gradient-to-b from-[#071a0e] to-[#050d1a] border-r border-white/[0.07] p-10">
        <div>
          <button onClick={()=>onNavigate("landing")} className="flex items-center gap-3 mb-12">
            <div className="size-10 rounded-xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="size-5 text-white"/>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e8edf5]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Adeseun Ogundoyin</p>
              <p className="text-[10px] text-green-400">Computer Science Dept.</p>
            </div>
          </button>
          <h2 className="text-3xl font-bold mb-4 leading-tight text-[#e8edf5]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>
            {mode==="login"?"Welcome back.":"Join the system."}
          </h2>
          <p className="text-[#7a9a85] leading-relaxed mb-10">
            Timetable Management System for the Department of Computer Science, Adeseun Ogundoyin Polytechnic, Eruwa.
          </p>
          <div className="space-y-4">
            {["Zero scheduling conflicts","98.3% optimisation accuracy","PDF & Excel export","Role-based access control"].map(t=>(
              <div key={t} className="flex items-center gap-3 text-sm text-[#7a9a85]">
                <CheckCircle className="size-4 text-green-400 shrink-0"/>{t}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#7a9a85]/40">© 2025 Adeseun Ogundoyin Polytechnic, Eruwa</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <button onClick={()=>onNavigate("landing")} className="flex items-center gap-1.5 text-[#7a9a85] hover:text-white text-sm mb-8 transition-colors lg:hidden">
            <ChevronLeft className="size-4"/> Back to home
          </button>

          {mode==="login" ? (
            <>
              <h1 className="text-2xl font-bold mb-1 text-[#e8edf5]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Sign in</h1>
              <p className="text-[#7a9a85] text-sm mb-6">Enter your institutional credentials to continue.</p>

              <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-700/10 border border-green-700/20">
                <GraduationCap className="size-4 text-green-400 shrink-0"/>
                <p className="text-[11px] text-[#7a9a85] leading-relaxed">
                  Use the email and password provided by your department administrator or created during registration.
                </p>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#7a9a85]"/>
                    <input value={email} onChange={e=>{setEmail(e.target.value);setLoginError("");}} type="email" placeholder="you@aopoly.edu.ng" className={`${inp} pl-9`}/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#7a9a85]"/>
                    <input id="pw-field" value={password} onChange={e=>{setPassword(e.target.value);setLoginError("");}} type="password" placeholder="••••••••" className={`${inp} pl-9`}
                      onKeyDown={e=>e.key==="Enter"&&handleSignIn()}/>
                  </div>
                </div>
              </div>

              {/* Role selector — for students/lecturers not using staff emails */}
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {loginRoles.filter(r=>r.value==="student"||r.value==="lecturer").map(r=>(
                  <button key={r.value} onClick={()=>setLoginRole(r.value)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${loginRole===r.value?"bg-green-700/15 border-green-600/40 text-green-400":"border-white/[0.07] text-[#7a9a85] hover:border-white/15"}`}>
                    <r.icon className="size-3.5"/>{r.label}
                    <span className="ml-auto text-[9px] opacity-50">(register)</span>
                  </button>
                ))}
              </div>

              {loginError&&(
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4">
                  <AlertTriangle className="size-3.5 shrink-0"/>{loginError}
                </div>
              )}

              <button onClick={handleSignIn} className="w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-medium transition-all shadow-lg shadow-green-900/25 mb-4">Sign In</button>
              <p className="text-center text-sm text-[#7a9a85]">No account? <button onClick={()=>onNavigate("register")} className="text-green-400 hover:text-green-300">Create one</button></p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-1 text-[#e8edf5]" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Create account</h1>
              <p className="text-[#7a9a85] text-sm mb-6">Register to access the timetable system.</p>

              {/* 3-way role toggle */}
              <div className="flex gap-1.5 mb-6 p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                {regRoles.map(r=>(
                  <button key={r.value} onClick={()=>setRegRole(r.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${regRole===r.value?"bg-green-700 text-white shadow":"text-[#7a9a85]"}`}>
                    <r.icon className="size-3.5"/>
                    {r.value==="timetable_officer"?"T. Officer":r.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3.5 mb-6">
                {/* Common */}
                <div>
                  <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Full Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" className={inp}/>
                </div>

                {/* Student-specific */}
                {regRole==="student" && <>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Matric Number</label>
                    <input value={matric} onChange={e=>setMatric(e.target.value)} placeholder="AOPE/ND/2025/001" className={inp}/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Programme & Level</label>
                    <select value={programme} onChange={e=>setProgramme(e.target.value)} className={`${inp}`} style={{backgroundColor:"#0c1628",colorScheme:"dark"}}>
                      {["ND1","ND2","HND1","HND2"].map(p=><option key={p} style={{backgroundColor:"#0c1628",color:"#e8edf5"}}>{p}</option>)}
                    </select>
                  </div>
                </>}

                {/* Lecturer-specific */}
                {regRole==="lecturer" && <>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Staff ID</label>
                    <input value={staffId} onChange={e=>setStaffId(e.target.value)} placeholder="AOPoly/STAFF/CS/001" className={inp}/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Highest Qualification</label>
                    <input value={qual} onChange={e=>setQual(e.target.value)} placeholder="e.g. M.Sc Computer Science" className={inp}/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Specialization</label>
                    <input value={spec} onChange={e=>setSpec(e.target.value)} placeholder="e.g. Software Engineering" className={inp}/>
                  </div>
                </>}

                {/* Timetable Officer-specific */}
                {regRole==="timetable_officer" && <>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Staff ID</label>
                    <input value={staffId} onChange={e=>setStaffId(e.target.value)} placeholder="AOPoly/STAFF/TO/001" className={inp}/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Department</label>
                    <select value={dept} onChange={e=>setDept(e.target.value)} className={`${inp}`} style={{backgroundColor:"#0c1628",colorScheme:"dark"}}>
                      {["Computer Science","Mathematics","Physics","Chemistry","Statistics"].map(d=><option key={d} style={{backgroundColor:"#0c1628",color:"#e8edf5"}}>{d}</option>)}
                    </select>
                  </div>
                  <div className="p-3 rounded-xl bg-green-700/10 border border-green-700/20 text-xs text-green-400">
                    Timetable Officers can generate, edit, approve, and publish timetables for all programmes.
                  </div>
                </>}

                {/* Common */}
                <div>
                  <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Email Address</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@aopoly.edu.ng" className={inp}/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7a9a85] mb-1.5">Password</label>
                  <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Min. 8 characters" className={inp}/>
                </div>
              </div>

              <button onClick={()=>onLogin(regRole, regRole==="student"?{name:name||"Student",matric:matric||"AOPE/ND/2025/001",programme}:undefined)} className="w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-medium transition-all shadow-lg shadow-green-900/25 mb-4">
                Create Account
              </button>
              <p className="text-center text-sm text-[#7a9a85]">
                Already registered? <button onClick={()=>onNavigate("login")} className="text-green-400 hover:text-green-300">Sign in</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INNER PAGES (shared isDark / card / divider helpers)
═══════════════════════════════════════════════════════════ */
type SharedProps = {
  isDark:boolean; cardBg:string; divider:string; textPrimary:string; textMuted:string; surfaceBg:string; hoverRow:string;
  canManage?:boolean; role?:string;
  lecturers:Lecturer[];   addLecturer:(l:Lecturer)=>void;
  courses:Course[];       addCourse:(c:Course)=>void;
  classrooms:Classroom[]; addClassroom:(r:Classroom)=>void;
  navigate?:(p:Page)=>void;
};

/* ── TIMETABLE ── */
function TimetablePage({ isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,role,canManage }:SharedProps) {
  const [view,setView]=useState<"grid"|"list">("grid");
  const [filter,setFilter]=useState("All");
  const progColors:Record<string,string>={ND1:C.green,ND2:C.gold,HND1:C.teal,HND2:C.violet};
  const wat = useNigeriaTime();

  const exportCSV=()=>{
    const headers=["ID","Programme","Course","Lecturer","Room","Day","Time","Status","Fitness (%)"];
    const rows=TT_ENTRIES.map(e=>[e.id,e.programme,e.course,e.lecturer,e.room,e.day,e.time,e.status,(e.fitness*100).toFixed(1)]);
    const csv=[headers,...rows].map(r=>r.join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download="AOP-CS-Timetable-2024-25.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Timetable exported as CSV", {description:`Downloaded at ${wat.short} (WAT)`});
  };

  const exportPDF=()=>{
    const w=window.open("","_blank"); if(!w) return;
    w.document.write(`<html><head><title>Timetable 2025/2026</title>
    <style>body{font-family:sans-serif;font-size:12px;padding:24px}h1{font-size:18px;margin-bottom:4px}p.sub{color:#555;margin-bottom:16px}
    table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px 10px;text-align:left}th{background:#f3f4f6;font-weight:600}
    .pub{color:#15803d}.draft{color:#b45309}.appr{color:#0d9488}</style></head><body>
    <h1>Dept. of Computer Science — Lecture Timetable</h1>
    <p class="sub">Adeseun Ogundoyin Polytechnic, Eruwa · 1st Semester 2025/2026 · All times in WAT (UTC+1)</p>
    <table><tr><th>ID</th><th>Programme</th><th>Course</th><th>Lecturer</th><th>Room</th><th>Day</th><th>Time</th><th>Status</th></tr>
    ${TT_ENTRIES.map(e=>`<tr><td>${e.id}</td><td>${e.programme}</td><td>${e.course}</td><td>${e.lecturer}</td><td>${e.room}</td><td>${e.day}</td><td>${e.time}</td><td class="${e.status==="Published"?"pub":e.status==="Approved"?"appr":"draft"}">${e.status}</td></tr>`).join("")}
    </table></body></html>`);
    w.document.close(); w.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Lecture Timetable</h2>
          <p className={`text-sm ${textMuted}`}>1st Semester · 2025/2026 Academic Session</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>
            <button onClick={()=>setView("grid")} className={`p-1.5 rounded-lg transition-all ${view==="grid"?"bg-green-700 text-white":textMuted}`}><Grid className="size-3.5"/></button>
            <button onClick={()=>setView("list")} className={`p-1.5 rounded-lg transition-all ${view==="list"?"bg-green-700 text-white":textMuted}`}><List className="size-3.5"/></button>
          </div>
          <button onClick={exportPDF} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${divider} ${textMuted} text-xs hover:border-green-600/30 transition-colors`}>
            <Printer className="size-3"/> Print / PDF
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-xs font-medium transition-all">
            <Download className="size-3"/> Export Excel / CSV
          </button>
        </div>
      </div>

      <div className={`rounded-2xl p-4 ${cardBg} border ${divider} flex flex-wrap items-center justify-between gap-4`}>
        <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>
          {["All","ND1","ND2","HND1","HND2"].map(p=>(
            <button key={p} onClick={()=>setFilter(p)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filter===p?"bg-green-700 text-white shadow":textMuted}`}>{p}</button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs">
          {Object.entries(progColors).map(([prog,col])=>(
            <span key={prog} className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm inline-block" style={{backgroundColor:col}}/>{prog}
            </span>
          ))}
        </div>
      </div>

      {view==="grid" && (
        <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-6 border-b" style={{borderColor:isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}}>
                <div className={`p-3 text-xs font-semibold ${textMuted} border-r ${divider}`}>Time</div>
                {DAYS.map(d=>(<div key={d} className={`p-3 text-xs font-semibold ${textPrimary} text-center border-r ${divider} last:border-r-0`}>{d}</div>))}
              </div>
              {TIME_SLOTS.slice(0,-1).map((slot,si)=>(
                <div key={slot} className={`grid grid-cols-6 border-b ${divider} last:border-b-0`} style={{minHeight:60}}>
                  <div className={`p-2 text-[10px] font-mono ${textMuted} border-r ${divider} flex items-start pt-2`}>{slot}</div>
                  {DAYS.map(day=>{
                    const entry=TIMETABLE_GRID[day]?.find(e=>e.time.startsWith(slot));
                    const hidden=filter!=="All"&&entry&&!entry.programme.startsWith(filter);
                    return (
                      <div key={day} className={`p-1 border-r ${divider} last:border-r-0`}>
                        {entry&&!hidden&&(
                          <div className="h-full rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity" style={{backgroundColor:entry.color+"22",borderLeft:`3px solid ${entry.color}`}}>
                            <p className="text-[10px] font-bold" style={{color:entry.color}}>{entry.course}</p>
                            <p className={`text-[9px] ${textMuted} truncate`}>{entry.lecturer}</p>
                            <p className={`text-[9px] ${textMuted} font-mono`}>{entry.room}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view==="list" && (
        <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${surfaceBg} border-b ${divider}`}>
                {["ID","Programme","Course","Lecturer","Room","Day & Time","Fitness","Status"].map(h=>(
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${divider}`}>
              {TT_ENTRIES.filter(e=>filter==="All"||e.programme.includes(filter)).map(e=>(
                <tr key={e.id} className={`${hoverRow} transition-colors cursor-pointer`}>
                  <td className="px-4 py-3"><span className={`font-mono text-xs ${textMuted}`}>{e.id}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${textPrimary}`}>{e.programme}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono text-green-400">{e.course}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av name={e.lecturer}/><span className={`text-xs ${textPrimary}`}>{e.lecturer}</span></div></td>
                  <td className="px-4 py-3"><span className={`text-xs font-mono ${textMuted}`}>{e.room}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${textPrimary}`}>{e.day}</span><span className={`block text-[11px] font-mono ${textMuted}`}>{e.time}</span></td>
                  <td className="px-4 py-3"><FitnessBar value={e.fitness}/></td>
                  <td className="px-4 py-3"><StatusBadge status={e.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── ADD MODAL SHELL ── */
function Modal({title,onClose,children,isDark,divider,cardBg}:{title:string;onClose:()=>void;children:React.ReactNode;isDark:boolean;divider:string;cardBg:string}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
      <div className={`relative w-full max-w-lg rounded-2xl ${cardBg} border ${divider} shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`} onClick={e=>e.stopPropagation()}>
        <div className={`px-6 py-4 border-b ${divider} flex items-center justify-between shrink-0`}>
          <h3 className="text-sm font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{title}</h3>
          <button onClick={onClose} className={`size-7 rounded-lg flex items-center justify-center ${isDark?"hover:bg-white/10":"hover:bg-black/5"} transition-colors`}><X className="size-3.5"/></button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

/* ── LECTURERS ── */
function LecturersPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,canManage,role,lecturers,addLecturer,courses,addCourse,classrooms,addClassroom}:SharedProps) {
  const [search,setSearch]   = useState("");
  const [filter,setFilter]   = useState("All");
  const [selected,setSelected] = useState<Lecturer|null>(null);
  const [passwords,setPasswords] = useState<Record<number,string>>({});
  const [copied,setCopied]   = useState<number|null>(null);
  const [showAdd,setShowAdd] = useState(false);

  // Add form state
  const [fName,setFName]=useState(""); const [fQual,setFQual]=useState(""); const [fEmail,setFEmail]=useState("");
  const [fPhone,setFPhone]=useState(""); const [fOffice,setFOffice]=useState(""); const [fSpec,setFSpec]=useState("");
  const [fHours,setFHours]=useState("8"); const [fCourses,setFCourses]=useState("");

  const isAdmin = role==="admin";

  const filtered = lecturers.filter(l=>
    (filter==="All"||l.status===filter)&&
    (l.name.toLowerCase().includes(search.toLowerCase())||l.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddLecturer = () => {
    if(!fName.trim()||!fEmail.trim()) return;
    addLecturer({
      id: lecturers.length+1, name:fName, initials:fName.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase(),
      qualification:fQual, email:fEmail, phone:fPhone, office:fOffice, specialization:fSpec,
      courses:fCourses.split(",").map(c=>c.trim()).filter(Boolean), hours:parseInt(fHours)||8, status:"Active"
    });
    toast.success(`Lecturer added`, {description:`${fName} has been added to the department.`});
    setFName(""); setFQual(""); setFEmail(""); setFPhone(""); setFOffice(""); setFSpec(""); setFHours("8"); setFCourses("");
    setShowAdd(false);
  };

  const generatePassword = (id:number) => {
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!";
    const pwd = Array.from({length:12},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
    setPasswords(p=>({...p,[id]:pwd}));
  };

  const copyToClipboard = (id:number, pwd:string) => {
    navigator.clipboard.writeText(pwd).then(()=>{ setCopied(id); setTimeout(()=>setCopied(null),2000); });
  };

  const inpCls=`w-full pl-8 pr-3 py-2 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.04] border-black/[0.08] text-[#0a1128]"} placeholder:text-[#7a9a85]/60 outline-none focus:border-green-600/50`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Lecturers</h2>
          <p className={`text-sm ${textMuted}`}>{LECTURERS.length} staff · {LECTURERS.filter(l=>l.status==="Active").length} active</p>
        </div>
        {canManage&&<button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all self-start sm:self-auto"><Plus className="size-3.5"/> Add Lecturer</button>}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Table */}
        <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${divider} flex flex-col sm:flex-row gap-3`}>
            <div className="relative flex-1"><Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-3.5 ${textMuted}`}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…" className={inpCls}/></div>
            <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>{["All","Active","On Leave"].map(f=>(<button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filter===f?"bg-green-700 text-white shadow":textMuted}`}>{f}</button>))}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${surfaceBg} border-b ${divider}`}>
                  {["Lecturer","Courses","Hrs/Wk","Contact","Status",""].map(h=>(
                    <th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} whitespace-nowrap`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${divider}`}>
                {filtered.map(l=>(
                  <tr key={l.id}
                    onClick={()=>setSelected(l)}
                    className={`transition-colors cursor-pointer group ${selected?.id===l.id?(isDark?"bg-green-900/20":"bg-green-50"):hoverRow}`}>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Av name={l.name}/>
                        <div>
                          <p className={`text-sm font-medium ${textPrimary}`}>{l.name}</p>
                          <p className={`text-xs ${textMuted}`}>{l.specialization}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">{l.courses.slice(0,2).map(c=>(<span key={c} className="px-1.5 py-0.5 rounded-md bg-green-600/10 text-green-400 text-[10px] font-mono">{c}</span>))}{l.courses.length>2&&<span className={`text-[10px] ${textMuted}`}>+{l.courses.length-2}</span>}</div>
                    </td>
                    <td className="px-4 py-3.5"><span className={`text-xs font-mono ${textPrimary}`}>{l.hours}h</span></td>
                    <td className="px-4 py-3.5"><span className={`text-xs ${textMuted} truncate max-w-[140px] block`}>{l.email}</span></td>
                    <td className="px-4 py-3.5"><StatusBadge status={l.status}/></td>
                    <td className="px-4 py-3.5">
                      <button className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-all ${isDark?"bg-green-700/20 text-green-400":"bg-green-100 text-green-700"}`}>
                        <Eye className="size-3"/> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={`px-5 py-3 border-t ${divider} text-xs ${textMuted}`}>Showing {filtered.length} of {lecturers.length} lecturers · Click a row to view details</div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden sticky top-20`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b ${divider} flex items-center justify-between`}>
              <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Lecturer Profile</h3>
              <button onClick={()=>setSelected(null)} className={`size-7 rounded-lg flex items-center justify-center ${isDark?"hover:bg-white/10":"hover:bg-black/5"} transition-colors`}>
                <X className={`size-3.5 ${textMuted}`}/>
              </button>
            </div>

            {/* Profile info */}
            <div className="px-5 py-5">
              <div className="flex items-center gap-3 mb-5">
                <Av name={selected.name} size="md"/>
                <div>
                  <p className={`text-sm font-bold ${textPrimary}`}>{selected.name}</p>
                  <p className={`text-xs ${textMuted}`}>{selected.specialization}</p>
                  <StatusBadge status={selected.status}/>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                {[
                  {label:"Qualification", value:selected.qualification},
                  {label:"Office",        value:selected.office},
                  {label:"Phone",         value:selected.phone},
                  {label:"Weekly Hours",  value:`${selected.hours}h / week`},
                ].map(row=>(
                  <div key={row.label} className={`flex items-start justify-between gap-3 text-xs py-1.5 border-b ${divider}`}>
                    <span className={textMuted}>{row.label}</span>
                    <span className={`${textPrimary} font-medium text-right`}>{row.value}</span>
                  </div>
                ))}

                {/* Email — highlighted as login credential */}
                <div className={`flex items-start justify-between gap-3 text-xs py-1.5 border-b ${divider}`}>
                  <span className={textMuted}>Login Email</span>
                  <span className="text-green-500 font-mono font-medium text-right break-all">{selected.email}</span>
                </div>

                {/* Assigned courses */}
                <div className="pt-1">
                  <p className={`text-xs ${textMuted} mb-2`}>Assigned Courses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.courses.map(c=>(
                      <span key={c} className="px-2 py-1 rounded-lg bg-green-600/10 text-green-400 text-[10px] font-mono">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Login credentials — Admin only */}
              {isAdmin&&(
                <div className={`rounded-xl p-4 ${isDark?"bg-white/[0.03] border border-white/[0.07]":"bg-gray-50 border border-gray-100"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="size-3.5 text-amber-500"/>
                    <p className={`text-xs font-semibold ${textPrimary}`}>Login Credentials</p>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-500 uppercase tracking-wide">Admin only</span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div>
                      <p className={`text-[10px] ${textMuted} mb-1`}>Email address</p>
                      <div className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${isDark?"bg-white/[0.04] border border-white/[0.08]":"bg-white border border-gray-200"}`}>
                        <Mail className={`size-3 ${textMuted} shrink-0`}/>
                        <span className="text-xs font-mono text-green-500 flex-1 truncate">{selected.email}</span>
                      </div>
                    </div>

                    <div>
                      <p className={`text-[10px] ${textMuted} mb-1`}>Password</p>
                      {passwords[selected.id] ? (
                        <div className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${isDark?"bg-white/[0.04] border border-white/[0.08]":"bg-white border border-gray-200"}`}>
                          <Lock className={`size-3 ${textMuted} shrink-0`}/>
                          <span className="text-xs font-mono text-amber-400 flex-1 tracking-widest">{passwords[selected.id]}</span>
                          <button
                            onClick={()=>copyToClipboard(selected.id,passwords[selected.id])}
                            className={`shrink-0 text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${copied===selected.id?"text-green-400":"text-teal-400 hover:text-teal-300"}`}>
                            {copied===selected.id?"Copied!":"Copy"}
                          </button>
                        </div>
                      ) : (
                        <div className={`px-2.5 py-2 rounded-lg ${isDark?"bg-white/[0.04] border border-white/[0.08]":"bg-white border border-gray-200"} text-xs ${textMuted} italic`}>
                          No password generated yet
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={()=>generatePassword(selected.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-xs font-medium transition-all">
                      <RefreshCw className="size-3"/>
                      {passwords[selected.id]?"Regenerate":"Generate Password"}
                    </button>
                    {passwords[selected.id]&&(
                      <button
                        onClick={()=>copyToClipboard(selected.id,passwords[selected.id])}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${divider} ${textMuted} hover:border-green-600/30`}>
                        {copied===selected.id?<CheckCircle2 className="size-3.5 text-green-400"/>:<Hash className="size-3.5"/>}
                      </button>
                    )}
                  </div>

                  {passwords[selected.id]&&(
                    <p className={`text-[10px] ${textMuted} mt-2.5 leading-relaxed`}>
                      Share these credentials securely with <strong>{selected.name}</strong>. They can sign in at the login page using their email and this password.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl border ${divider} p-8 text-center ${isDark?"bg-white/[0.02]":"bg-gray-50"} sticky top-20`}>
            <div className={`size-12 rounded-2xl ${isDark?"bg-white/[0.04]":"bg-gray-100"} flex items-center justify-center mx-auto mb-3`}>
              <Users className={`size-5 ${textMuted}`}/>
            </div>
            <p className={`text-sm font-medium ${textPrimary} mb-1`}>Select a lecturer</p>
            <p className={`text-xs ${textMuted}`}>Click any row in the table to view full profile{isAdmin?" and manage login credentials":""}.</p>
          </div>
        )}
      </div>

      {/* Add Lecturer Modal */}
      {showAdd&&(
        <Modal title="Add New Lecturer" onClose={()=>setShowAdd(false)} isDark={isDark} divider={divider} cardBg={cardBg}>
          {(()=>{
            const fi=`w-full px-3 py-2.5 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.03] border-black/[0.08] text-[#0a1128]"} outline-none focus:border-green-600/50`;
            const lb=`block text-xs font-medium ${textMuted} mb-1.5`;
            return (
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lb}>Full Name *</label><input value={fName} onChange={e=>setFName(e.target.value)} placeholder="e.g. Mrs Adeyemi" className={fi}/></div>
                  <div><label className={lb}>Qualification</label><input value={fQual} onChange={e=>setFQual(e.target.value)} placeholder="e.g. M.Sc Computer Science" className={fi}/></div>
                </div>
                <div><label className={lb}>Email Address * (used for login)</label><input type="email" value={fEmail} onChange={e=>setFEmail(e.target.value)} placeholder="name@aopoly.edu.ng" className={fi}/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lb}>Phone Number</label><input value={fPhone} onChange={e=>setFPhone(e.target.value)} placeholder="080XXXXXXXX" className={fi}/></div>
                  <div><label className={lb}>Office</label><input value={fOffice} onChange={e=>setFOffice(e.target.value)} placeholder="e.g. CS-112" className={fi}/></div>
                </div>
                <div><label className={lb}>Specialization</label><input value={fSpec} onChange={e=>setFSpec(e.target.value)} placeholder="e.g. Database Systems" className={fi}/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lb}>Max Weekly Hours</label><input type="number" value={fHours} onChange={e=>setFHours(e.target.value)} className={fi}/></div>
                  <div><label className={lb}>Assigned Courses (comma-separated)</label><input value={fCourses} onChange={e=>setFCourses(e.target.value)} placeholder="COM 111, COM 121" className={fi}/></div>
                </div>
                <div className={`p-3 rounded-xl text-xs ${isDark?"bg-green-700/10 border border-green-700/20 text-green-400":"bg-green-50 border border-green-200 text-green-700"}`}>
                  The lecturer will receive their login credentials from the Admin after registration.
                </div>
                <div className="flex gap-3 pt-2 pb-1">
                  <button onClick={handleAddLecturer} className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all">Add Lecturer</button>
                  <button onClick={()=>setShowAdd(false)} className={`px-5 py-2.5 rounded-xl border ${divider} text-sm ${textMuted}`}>Cancel</button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
}

/* ── COURSES ── */
function CoursesPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,canManage,courses,addCourse,lecturers}:SharedProps) {
  const [search,setSearch]=useState(""); const [prog,setProg]=useState("All"); const [sem,setSem]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [fCode,setFCode]=useState(""); const [fTitle,setFTitle]=useState(""); const [fProg,setFProg]=useState("ND");
  const [fLevel,setFLevel]=useState("ND1"); const [fSem,setFSem]=useState("1st"); const [fLecturer,setFLecturer]=useState("");
  const [fHours,setFHours]=useState("2"); const [fType,setFType]=useState("Lecture"); const [fCredit,setFCredit]=useState("2");

  const filtered=courses.filter(c=>(prog==="All"||c.programme===prog)&&(sem==="All"||c.semester===sem)&&(c.code.toLowerCase().includes(search.toLowerCase())||c.title.toLowerCase().includes(search.toLowerCase())));
  const inpCls=`w-full pl-8 pr-3 py-2 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.04] border-black/[0.08] text-[#0a1128]"} placeholder:text-[#7a9a85]/60 outline-none focus:border-green-600/50`;
  const fi=`w-full px-3 py-2.5 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.03] border-black/[0.08] text-[#0a1128]"} outline-none focus:border-green-600/50`;
  const lb=`block text-xs font-medium ${textMuted} mb-1.5`;

  const handleAdd=()=>{
    if(!fCode.trim()||!fTitle.trim()) return;
    addCourse({code:fCode,title:fTitle,programme:fProg,level:fLevel,semester:fSem,lecturer:fLecturer||"TBA",hours:parseInt(fHours)||2,type:fType as "Lecture"|"Lab",credit:parseInt(fCredit)||2});
    toast.success(`Course added`, {description:`${fCode} — ${fTitle} added to ${fLevel}.`});
    setFCode(""); setFTitle(""); setFProg("ND"); setFLevel("ND1"); setFSem("1st"); setFLecturer(""); setFHours("2"); setFType("Lecture"); setFCredit("2");
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Courses</h2><p className={`text-sm ${textMuted}`}>{courses.length} courses · ND & HND programmes</p></div>
        {canManage&&<button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all self-start sm:self-auto"><Plus className="size-3.5"/> Add Course</button>}
      </div>
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${divider} flex flex-wrap gap-3`}>
          <div className="relative flex-1 min-w-48"><Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-3.5 ${textMuted}`}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search code or title…" className={inpCls}/></div>
          <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>{["All","ND","HND"].map(f=>(<button key={f} onClick={()=>setProg(f)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${prog===f?"bg-green-700 text-white shadow":textMuted}`}>{f}</button>))}</div>
          <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>{["All","1st","2nd"].map(f=>(<button key={f} onClick={()=>setSem(f)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${sem===f?"bg-amber-700 text-white shadow":textMuted}`}>{f}{f!=="All"&&" Sem"}</button>))}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className={`${surfaceBg} border-b ${divider}`}>{["Code","Title","Programme / Level","Lecturer","Sem","Hrs","Type","Credit"].map(h=>(<th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} whitespace-nowrap`}>{h}</th>))}</tr></thead>
            <tbody className={`divide-y ${divider}`}>
              {filtered.map(c=>(
                <tr key={c.code} className={`${hoverRow} transition-colors cursor-pointer`}>
                  <td className="px-4 py-3"><span className="font-mono text-xs text-green-400">{c.code}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs ${textPrimary}`}>{c.title}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className={`text-xs ${textMuted}`}>{c.programme} · </span><span className={`text-xs font-semibold ${textPrimary}`}>{c.level}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap"><div className="flex items-center gap-2"><Av name={c.lecturer}/><span className={`text-xs ${textPrimary}`}>{c.lecturer}</span></div></td>
                  <td className="px-4 py-3"><span className={`text-xs ${textMuted}`}>{c.semester}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-mono ${textPrimary}`}>{c.hours}h</span></td>
                  <td className="px-4 py-3"><StatusBadge status={c.type}/></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono text-teal-400">{c.credit} CU</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`px-5 py-3 border-t ${divider} text-xs ${textMuted}`}>Showing {filtered.length} of {courses.length} courses</div>
      </div>

      {showAdd&&(
        <Modal title="Add New Course" onClose={()=>setShowAdd(false)} isDark={isDark} divider={divider} cardBg={cardBg}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lb}>Course Code *</label><input value={fCode} onChange={e=>setFCode(e.target.value)} placeholder="e.g. COM 227" className={fi}/></div>
              <div><label className={lb}>Credit Units</label><input type="number" value={fCredit} onChange={e=>setFCredit(e.target.value)} className={fi}/></div>
            </div>
            <div><label className={lb}>Course Title *</label><input value={fTitle} onChange={e=>setFTitle(e.target.value)} placeholder="e.g. Operating Systems" className={fi}/></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lb}>Programme</label>
                <select value={fProg} onChange={e=>setFProg(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  {["ND","HND"].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className={lb}>Level</label>
                <select value={fLevel} onChange={e=>setFLevel(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  {["ND1","ND2","HND1","HND2"].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lb}>Semester</label>
                <select value={fSem} onChange={e=>setFSem(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  {["1st","2nd"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={lb}>Type</label>
                <select value={fType} onChange={e=>setFType(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  {["Lecture","Lab"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lb}>Assigned Lecturer</label>
                <select value={fLecturer} onChange={e=>setFLecturer(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  <option value="">— Select —</option>
                  {lecturers?.map(l=><option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
              <div><label className={lb}>Hours / Week</label><input type="number" value={fHours} onChange={e=>setFHours(e.target.value)} className={fi}/></div>
            </div>
            <div className="flex gap-3 pt-2 pb-1">
              <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all">Add Course</button>
              <button onClick={()=>setShowAdd(false)} className={`px-5 py-2.5 rounded-xl border ${divider} text-sm ${textMuted}`}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ── CLASSROOMS ── */
function ClassroomsPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,canManage,classrooms,addClassroom}:SharedProps) {
  const [filter,setFilter]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [fName,setFName]=useState(""); const [fCode,setFCode]=useState(""); const [fType,setFType]=useState("Lecture Hall");
  const [fCap,setFCap]=useState("60"); const [fBuilding,setFBuilding]=useState(""); const [fFloor,setFFloor]=useState("Ground");
  const [fProjector,setFProjector]=useState(false); const [fSmartboard,setFSmartboard]=useState(false); const [fAC,setFAC]=useState(false);

  const filtered=(classrooms||[]).filter(r=>filter==="All"||r.type===filter);
  const fi=`w-full px-3 py-2.5 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.03] border-black/[0.08] text-[#0a1128]"} outline-none focus:border-green-600/50`;
  const lb=`block text-xs font-medium ${textMuted} mb-1.5`;

  const handleAdd=()=>{
    if(!fName.trim()||!fCode.trim()) return;
    addClassroom({id:(classrooms?.length||0)+1,name:fName,code:fCode,type:fType as any,capacity:parseInt(fCap)||60,building:fBuilding||"Main Block",floor:fFloor,projector:fProjector,smartboard:fSmartboard,ac:fAC,usage:0,available:true});
    toast.success("Room added", {description:`${fName} (${fCode}) — capacity ${fCap} seats.`});
    setFName(""); setFCode(""); setFType("Lecture Hall"); setFCap("60"); setFBuilding(""); setFFloor("Ground"); setFProjector(false); setFSmartboard(false); setFAC(false);
    setShowAdd(false);
  };

  const Chk=({label,val,set}:{label:string;val:boolean;set:(v:boolean)=>void})=>(
    <button onClick={()=>set(!val)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${val?(isDark?"bg-green-700/20 border-green-600/30 text-green-400":"bg-green-100 border-green-300 text-green-700"):`border-white/[0.07] ${textMuted}`}`}>
      {val?<CheckCircle2 className="size-3.5"/>:<div className="size-3.5 rounded border border-current opacity-40"/>}{label}
    </button>
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Classrooms & Labs</h2><p className={`text-sm ${textMuted}`}>{(classrooms||[]).length} rooms · {(classrooms||[]).filter(r=>r.available).length} available now</p></div>
        {canManage&&<button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all self-start sm:self-auto"><Plus className="size-3.5"/> Add Room</button>}
      </div>
      <div className={`flex gap-1 p-1 rounded-xl ${isDark?"bg-white/[0.04]":"bg-black/[0.04]"} self-start`}>
        {["All","Lecture Hall","Laboratory","Seminar Room"].map(t=>(
          <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter===t?"bg-green-700 text-white shadow":textMuted}`}>{t}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(room=>{
          const col=room.usage>=90?C.green:room.usage>=70?C.teal:C.gold;
          const tc=room.type==="Laboratory"?"text-violet-400 bg-violet-500/10":room.type==="Seminar Room"?"text-amber-400 bg-amber-500/10":"text-green-400 bg-green-500/10";
          return (
            <div key={room.id} className={`rounded-2xl p-5 ${cardBg} border ${divider} hover:border-green-600/25 transition-all cursor-pointer`}>
              <div className="flex items-start justify-between mb-4">
                <div><h3 className={`font-semibold text-sm ${textPrimary}`}>{room.name}</h3><p className={`text-xs font-mono ${textMuted} mt-0.5`}>{room.code}</p></div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tc}`}>{room.type}</span>
                  <span className={`text-[10px] ${room.available?"text-emerald-400":"text-red-400"}`}>{room.available?"● Available":"● In Use"}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`rounded-xl p-3 ${isDark?"bg-white/[0.03]":"bg-black/[0.03]"}`}><p className={`text-[10px] ${textMuted}`}>Capacity</p><p className={`text-lg font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{room.capacity}</p><p className={`text-[10px] ${textMuted}`}>seats</p></div>
                <div className={`rounded-xl p-3 ${isDark?"bg-white/[0.03]":"bg-black/[0.03]"}`}><p className={`text-[10px] ${textMuted}`}>Utilization</p><p className="text-lg font-bold" style={{color:col,fontFamily:"'Bricolage Grotesque',sans-serif"}}>{room.usage}%</p><p className={`text-[10px] ${textMuted}`}>this semester</p></div>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden mb-4 ${isDark?"bg-white/[0.06]":"bg-black/[0.06]"}`}><div className="h-full rounded-full" style={{width:`${room.usage}%`,backgroundColor:col}}/></div>
              <div className={`flex items-center gap-1.5 text-[10px] ${textMuted} mb-3`}><MapPin className="size-3"/> {room.building} · {room.floor} floor</div>
              <div className="flex flex-wrap gap-1.5">
                {room.projector&&<span className="px-2 py-0.5 rounded-full bg-green-600/10 text-green-400 text-[10px]">Projector</span>}
                {room.smartboard&&<span className="px-2 py-0.5 rounded-full bg-teal-600/10 text-teal-400 text-[10px]">Smart Board</span>}
                {room.ac&&<span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px]">A/C</span>}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd&&(
        <Modal title="Add New Room / Classroom" onClose={()=>setShowAdd(false)} isDark={isDark} divider={divider} cardBg={cardBg}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lb}>Room Name *</label><input value={fName} onChange={e=>setFName(e.target.value)} placeholder="e.g. Lecture Hall 4" className={fi}/></div>
              <div><label className={lb}>Room Code *</label><input value={fCode} onChange={e=>setFCode(e.target.value)} placeholder="e.g. LH-4" className={fi}/></div>
            </div>
            <div>
              <label className={lb}>Room Type</label>
              <select value={fType} onChange={e=>setFType(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                {["Lecture Hall","Laboratory","Seminar Room"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lb}>Capacity (seats)</label><input type="number" value={fCap} onChange={e=>setFCap(e.target.value)} className={fi}/></div>
              <div>
                <label className={lb}>Floor</label>
                <select value={fFloor} onChange={e=>setFFloor(e.target.value)} className={fi} style={isDark?{backgroundColor:"#0c1628",colorScheme:"dark"}:{}}>
                  {["Ground","1st","2nd","3rd"].map(f=><option key={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div><label className={lb}>Building</label><input value={fBuilding} onChange={e=>setFBuilding(e.target.value)} placeholder="e.g. Science Block C" className={fi}/></div>
            <div>
              <label className={lb}>Equipment / Facilities</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <Chk label="Projector"  val={fProjector}  set={setFProjector}/>
                <Chk label="Smart Board" val={fSmartboard} set={setFSmartboard}/>
                <Chk label="Air Conditioning" val={fAC} set={setFAC}/>
              </div>
            </div>
            <div className="flex gap-3 pt-2 pb-1">
              <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all">Add Room</button>
              <button onClick={()=>setShowAdd(false)} className={`px-5 py-2.5 rounded-xl border ${divider} text-sm ${textMuted}`}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ── ANALYTICS ── */
function AnalyticsPage({isDark,cardBg,divider,textPrimary,textMuted}:SharedProps) {
  const constraints=[
    {label:"Lecturer double-booking",  value:0, color:C.green},
    {label:"Room capacity exceeded",   value:0, color:C.green},
    {label:"Student overlap",          value:0, color:C.green},
    {label:"Lab assigned to lecture",  value:0, color:C.green},
    {label:"Outside school hours",     value:0, color:C.green},
    {label:"Soft: idle periods",       value:3, color:C.amber},
  ];
  const gaStats=[
    {label:"Population Size",  value:"50",  unit:"chromosomes"},
    {label:"Crossover Rate",   value:"80%", unit:"single-point"},
    {label:"Mutation Rate",    value:"2.5%",unit:"per gene"},
    {label:"Elite Preserved",  value:"5",   unit:"per gen"},
    {label:"Tournament Size",  value:"3",   unit:"competitors"},
    {label:"Total Generations",value:"100", unit:"iterations"},
  ];
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Analytics & GA Performance</h2><p className={`text-sm ${textMuted}`}>Genetic algorithm metrics and scheduling statistics</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"Fitness Score",       value:"98.3%",  icon:TrendingUp,   col:"text-green-400",  bg:"bg-green-500/10"},
          {label:"Conflicts Resolved",  value:"84 → 0", icon:CheckCircle2, col:"text-teal-400",   bg:"bg-teal-500/10"},
          {label:"Execution Time",      value:"1.8s",   icon:Clock,        col:"text-violet-400", bg:"bg-violet-500/10"},
          {label:"Optimisation",        value:"98.3%",  icon:Activity,     col:"text-amber-400",  bg:"bg-amber-500/10"},
        ].map(k=>(
          <div key={k.label} className={`rounded-2xl p-5 ${cardBg} border ${divider}`}>
            <div className={`size-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}><k.icon className={`size-4 ${k.col}`}/></div>
            <p className={`text-2xl font-bold ${k.col}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{k.value}</p>
            <p className={`text-xs ${textMuted} mt-0.5`}>{k.label}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <div className="flex items-center justify-between mb-4">
            <div><h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Fitness Evolution</h3><p className={`text-xs ${textMuted}`}>Over 100 generations</p></div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full inline-block" style={{backgroundColor:C.green}}/> Fitness</span>
              <span className={`flex items-center gap-1.5 ${textMuted}`}><span className="size-2 rounded-full bg-red-400 inline-block"/> Conflicts</span>
            </div>
          </div>
          <FitnessChart data={FITNESS_DATA} isDark={isDark}/>
        </div>
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <h3 className={`text-sm font-semibold ${textPrimary} mb-5`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Constraint Violations</h3>
          <div className="space-y-4">
            {constraints.map(c=>(
              <div key={c.label}>
                <div className="flex justify-between mb-1"><span className={`text-xs ${textMuted}`}>{c.label}</span><span className="text-xs font-mono" style={{color:c.color}}>{c.value} violations</span></div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark?"bg-white/[0.06]":"bg-black/[0.06]"}`}><div className="h-full rounded-full" style={{width:`${(c.value/10)*100}%`,backgroundColor:c.color}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <h3 className={`text-sm font-semibold ${textPrimary} mb-5`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>GA Engine Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            {gaStats.map(s=>(
              <div key={s.label} className={`rounded-xl p-3 ${isDark?"bg-white/[0.03]":"bg-black/[0.03]"}`}>
                <p className="text-lg font-bold text-green-400" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{s.value}</p>
                <p className={`text-xs ${textPrimary} mt-0.5`}>{s.label}</p>
                <p className={`text-[10px] ${textMuted}`}>{s.unit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <h3 className={`text-sm font-semibold ${textPrimary} mb-5`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Room Utilisation</h3>
          <RoomBars data={ROOM_UTIL} isDark={isDark}/>
        </div>
      </div>
      <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Weekly Distribution</h3>
          <div className="flex gap-3 text-xs">
            {[{l:"ND1",c:C.green},{l:"ND2",c:C.gold},{l:"HND1",c:C.teal},{l:"HND2",c:C.violet}].map(x=>(
              <span key={x.l} className="flex items-center gap-1.5"><span className="size-2 rounded-full inline-block" style={{backgroundColor:x.c}}/><span className={textMuted}>{x.l}</span></span>
            ))}
          </div>
        </div>
        <WeeklyBars data={WEEKLY_LOAD} isDark={isDark}/>
      </div>
    </div>
  );
}

/* ── SETTINGS ── */
function SettingsPage({isDark,cardBg,divider,textPrimary,textMuted}:SharedProps) {
  const [gaP,setGaP]=useState(50); const [gaM,setGaM]=useState(2.5); const [gaG,setGaG]=useState(100);
  const [nE,setNE]=useState(true); const [nC,setNC]=useState(true); const [nPub,setNPub]=useState(false); const [aS,setAS]=useState(true);
  const [saved,setSaved]=useState(false);
  const wat=useNigeriaTime();
  const handleSave=()=>{
    setSaved(true);
    toast.success("Settings saved", {description:`Saved at ${wat.short} WAT · GA: pop=${gaP}, mut=${gaM}%, gen=${gaG}`});
    setTimeout(()=>setSaved(false),3000);
  };
  const numInp=`w-20 px-3 py-1.5 rounded-xl text-sm border text-right font-mono ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.04] border-black/[0.08] text-[#0a1128]"} outline-none`;
  const Tog=({v,o}:{v:boolean;o:()=>void})=>(
    <button onClick={o} className={`flex items-center justify-center size-8 rounded-lg transition-colors ${v?"text-green-400":textMuted}`}>
      {v?<ToggleRight className="size-5"/>:<ToggleLeft className="size-5"/>}
    </button>
  );
  const sections=[
    {title:"GA Engine",icon:Cpu,items:[
      {label:"Population Size",  desc:"Chromosomes per generation",ctrl:<input type="number" value={gaP} onChange={e=>setGaP(+e.target.value)} className={numInp}/>},
      {label:"Mutation Rate (%)",desc:"Gene mutation probability",  ctrl:<input type="number" step="0.5" value={gaM} onChange={e=>setGaM(+e.target.value)} className={numInp}/>},
      {label:"Max Generations",  desc:"Stop condition",             ctrl:<input type="number" value={gaG} onChange={e=>setGaG(+e.target.value)} className={numInp}/>},
    ]},
    {title:"Notifications",icon:Bell,items:[
      {label:"Email Notifications",desc:"Receive updates via email",          ctrl:<Tog v={nE}   o={()=>setNE(v=>!v)}/>},
      {label:"Conflict Alerts",    desc:"Alert on conflict detection",         ctrl:<Tog v={nC}   o={()=>setNC(v=>!v)}/>},
      {label:"Publish Alerts",     desc:"Notify when timetable is published",  ctrl:<Tog v={nPub} o={()=>setNPub(v=>!v)}/>},
    ]},
    {title:"System",icon:Settings,items:[
      {label:"Auto Save",desc:"Automatically save GA progress",ctrl:<Tog v={aS} o={()=>setAS(v=>!v)}/>},
    ]},
  ];
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Settings</h2><p className={`text-sm ${textMuted}`}>Configure the GA engine and system preferences.</p></div>
      {sections.map(sec=>(
        <div key={sec.title} className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${divider} flex items-center gap-2.5`}><sec.icon className="size-4 text-green-400"/><h3 className={`text-sm font-semibold ${textPrimary}`}>{sec.title}</h3></div>
          <div className={`divide-y ${divider}`}>
            {sec.items.map(item=>(
              <div key={item.label} className="px-6 py-4 flex items-center justify-between gap-4">
                <div><p className={`text-sm font-medium ${textPrimary}`}>{item.label}</p><p className={`text-xs ${textMuted} mt-0.5`}>{item.desc}</p></div>
                {item.ctrl}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-lg ${saved?"bg-teal-600 shadow-teal-900/20":"bg-green-700 hover:bg-green-600 shadow-green-900/20"}`}>
        {saved?<CheckCircle2 className="size-4"/>:<Save className="size-4"/>}
        {saved?"Saved!":"Save Changes"}
      </button>
    </div>
  );
}

/* ── PROFILE ── */
function ProfilePage({role,isDark,cardBg,divider,textPrimary,textMuted,userInfo}:SharedProps&{role:Role|null;userInfo?:{name:string;matric:string;programme:string}}) {
  const isStudent = role==="student";
  const [editing,setEditing]=useState(false);
  const [dname,setDname]=useState(isStudent&&userInfo?.name?userInfo.name:"Timetable Officer");
  const [email,setEmail]=useState(isStudent?"student@aopoly.edu.ng":"officer@aopoly.edu.ng");
  const [phone,setPhone]=useState("08031234500");
  const [office,setOffice]=useState(isStudent?(userInfo?.matric||"AOPE/ND/2025/001"):"CS-100");
  const inpCls=`w-full px-3.5 py-2.5 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.04] border-black/[0.08] text-[#0a1128]"} outline-none focus:border-green-600/50`;
  const wat=useNigeriaTime();
  const handleProfileSave=()=>{
    setEditing(false);
    toast.success("Profile updated", {description:`Changes saved at ${wat.short} WAT`});
  };
  const Field=({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void})=>(
    <div><label className={`block text-xs font-medium ${textMuted} mb-1.5`}>{label}</label>{editing?<input value={value} onChange={e=>onChange(e.target.value)} className={inpCls}/>:<p className={`text-sm ${textPrimary} py-2.5`}>{value}</p>}</div>
  );
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>My Profile</h2><p className={`text-sm ${textMuted}`}>Manage your personal information.</p></div>
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-6 py-6 border-b ${divider} flex items-center gap-5`}>
          <div className="size-16 rounded-2xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {dname.split(" ").map(w=>w[0]).slice(0,2).join("")||"ST"}
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${textPrimary}`}>{dname}</h3>
            {isStudent&&<p className="text-sm font-mono text-green-500 mt-0.5">{userInfo?.matric||"AOPE/ND/2025/001"}</p>}
            {isStudent&&<p className={`text-xs ${textMuted}`}>{userInfo?.programme||"ND1"} · 1st Semester 2025/2026</p>}
            <p className={`text-sm ${textMuted} capitalize mt-0.5`}>{role?.replace("_"," ")}</p>
            <p className={`text-xs ${textMuted} mt-0.5`}>Dept. of Computer Science · AO Polytechnic, Eruwa</p>
          </div>
          <button onClick={()=>setEditing(v=>!v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${divider} ${textMuted} hover:border-green-600/30 transition-colors`}>
            <Edit2 className="size-3"/> {editing?"Cancel":"Edit"}
          </button>
        </div>
        <div className="px-6 py-6 grid sm:grid-cols-2 gap-5">
          <Field label="Full Name"                         value={dname}  onChange={setDname}/>
          <Field label="Email Address"                     value={email}  onChange={setEmail}/>
          <Field label="Phone Number"                      value={phone}  onChange={setPhone}/>
          <Field label={isStudent?"Matric Number":"Office"} value={office} onChange={setOffice}/>
        </div>
        {editing&&(
          <div className={`px-6 py-4 border-t ${divider} flex gap-3`}>
            <button onClick={handleProfileSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-medium transition-all"><Save className="size-3.5"/> Save</button>
            <button onClick={()=>setEditing(false)} className={`px-4 py-2 rounded-xl border ${divider} text-sm ${textMuted}`}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PERMISSIONS ── */
function PermissionsPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg}:SharedProps) {
  const roles=["Admin","HOD","T. Officer","Lecturer","Student"];
  const permsInit=[
    {label:"View Timetable",    values:[true,true,true,true,true]},
    {label:"Generate Timetable",values:[true,false,true,false,false]},
    {label:"Approve Timetable", values:[true,true,false,false,false]},
    {label:"Publish Timetable", values:[true,true,true,false,false]},
    {label:"Edit Lecturers",    values:[true,true,true,false,false]},
    {label:"Edit Courses",      values:[true,true,true,false,false]},
    {label:"Edit Classrooms",   values:[true,false,true,false,false]},
    {label:"View Analytics",    values:[true,true,true,false,false]},
    {label:"Manage Users",      values:[true,false,false,false,false]},
    {label:"Export Reports",    values:[true,true,true,true,false]},
    {label:"Configure GA",      values:[true,false,true,false,false]},
    {label:"Audit Logs",        values:[true,false,false,false,false]},
  ];
  const [perms,setPerms]=useState(permsInit.map(p=>[...p.values]));
  const toggle=(pi:number,ri:number)=>setPerms(prev=>prev.map((row,i)=>i===pi?row.map((v,j)=>j===ri?!v:v):row));
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Permissions</h2><p className={`text-sm ${textMuted}`}>Role-based access control for all modules.</p></div>
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className={`${surfaceBg} border-b ${divider}`}>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold ${textMuted} w-44`}>Permission</th>
              {roles.map(r=>(<th key={r} className={`px-4 py-3.5 text-center text-xs font-semibold ${textPrimary} whitespace-nowrap`}>{r}</th>))}
            </tr></thead>
            <tbody className={`divide-y ${divider}`}>
              {permsInit.map((perm,pi)=>(
                <tr key={perm.label} className={`transition-colors ${isDark?"hover:bg-white/[0.02]":"hover:bg-green-50/40"}`}>
                  <td className={`px-5 py-3 text-sm ${textPrimary}`}>{perm.label}</td>
                  {roles.map((_,ri)=>(
                    <td key={ri} className="px-4 py-3 text-center">
                      <button onClick={()=>toggle(pi,ri)} className="mx-auto flex items-center justify-center transition-transform hover:scale-110">
                        {perms[pi][ri]
                          ? <CheckCircle className="size-4 text-green-400"/>
                          : <div className={`size-4 rounded-full border-2 ${isDark?"border-white/20":"border-black/20"}`}/>}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`flex items-center gap-3 p-4 rounded-xl ${isDark?"bg-amber-500/5 border border-amber-500/15":"bg-amber-50 border border-amber-200"}`}>
        <Info className="size-4 text-amber-400 shrink-0"/>
        <p className={`text-xs ${textMuted}`}>Click any checkbox to toggle permissions. Changes are reflected immediately across all active sessions.</p>
      </div>
    </div>
  );
}

/* ── DASHBOARD ── */
function DashboardPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,gaGen,gaRunning,runGA,lecturers,courses,classrooms,navigate}:SharedProps&{gaGen:number;gaRunning:boolean;runGA:()=>void}) {
  const curFit=FITNESS_DATA[Math.min(Math.floor(gaGen/10),FITNESS_DATA.length-1)].fitness;
  const liveData=FITNESS_DATA.slice(0,Math.min(Math.ceil(gaGen/10)+1,FITNESS_DATA.length));
  const [tableFilter,setTableFilter]=useState("All");
  const filtered=tableFilter==="All"?TT_ENTRIES:TT_ENTRIES.filter(e=>e.status===tableFilter);
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className={`relative rounded-3xl overflow-hidden p-8 ${isDark?"bg-gradient-to-br from-[#071a0e] via-[#0a1f10] to-[#050d1a]":"bg-gradient-to-br from-[#15803d] via-[#16a34a] to-[#ca8a04]"}`}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 size-72 rounded-full bg-green-700/15 blur-3xl"/>
          <div className="absolute bottom-0 left-1/3 size-48 rounded-full bg-amber-600/10 blur-3xl"/>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${isDark?"bg-green-700/20 text-green-400 border border-green-700/30":"bg-white/20 text-white border border-white/30"}`}>
              <GraduationCap className="size-3"/> Dept. of Computer Science — Adeseun Ogundoyin Polytechnic, Eruwa
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Timetable Management System</h1>
            <p className={`text-base mb-6 max-w-lg ${isDark?"text-green-200/70":"text-white/80"}`}>Genetic Algorithm scheduling for 4 programmes, 11 lecturers, and 6 rooms.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={runGA} disabled={gaRunning} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white text-sm font-medium transition-all shadow-lg shadow-green-900/30 active:scale-95">
                {gaRunning?<RefreshCw className="size-3.5 animate-spin"/>:<Play className="size-3.5"/>}
                {gaRunning?"Optimising…":"Run GA Engine"}
              </button>
              <button onClick={()=>navigate?.("timetable")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isDark?"bg-white/10 hover:bg-white/15 text-white border border-white/10":"bg-white/20 hover:bg-white/30 text-white border border-white/25"}`}>
                <Eye className="size-3.5"/> View Timetables
              </button>
            </div>
          </div>
          <div className={`rounded-2xl p-5 min-w-[240px] ${isDark?"bg-white/[0.04] border border-white/[0.08]":"bg-white/15 border border-white/25"} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-semibold uppercase tracking-widest ${isDark?"text-green-300/70":"text-white/70"}`}>GA Engine</span>
              <span className={`flex items-center gap-1.5 text-xs ${gaRunning?"text-amber-400":"text-green-400"}`}>
                <span className={`size-1.5 rounded-full ${gaRunning?"bg-amber-400 animate-pulse":"bg-green-400"}`}/>
                {gaRunning?"Running":"Ready"}
              </span>
            </div>
            <div className="space-y-2.5">
              {[["Generation",`${gaGen} / 100`],["Fitness",`${(curFit*100).toFixed(1)}%`],["Population","50 chromosomes"]].map(([k,v])=>(
                <div key={k} className="flex items-center justify-between">
                  <span className={`text-xs ${isDark?"text-green-200/60":"text-white/60"}`}>{k}</span>
                  <span className={`text-sm font-mono ${k==="Fitness"?"text-green-400 font-bold":isDark?"text-white":"text-white"}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className={`h-1.5 rounded-full ${isDark?"bg-white/10":"bg-white/20"} overflow-hidden`}>
                <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-amber-500 transition-all duration-300" style={{width:`${gaGen}%`}}/>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative mt-8 pt-8 border-t ${isDark?"border-white/[0.06]":"border-white/20"} grid grid-cols-2 sm:grid-cols-4 gap-6`}>
          {[
            {label:"Fitness Score",     value:`${(curFit*100).toFixed(1)}%`, sub:"+12.4%", icon:TrendingUp,   col:"text-green-400"},
            {label:"Conflict-Free",     value:"312 / 312",                   sub:"100%",    icon:CheckCircle2, col:"text-teal-400"},
            {label:"Rooms Optimised",   value:"6 / 6",                       sub:"74% avg", icon:Building2,    col:"text-amber-400"},
            {label:"Live Timetables",   value:"4",                           sub:"3 pending",icon:Layers,      col:"text-violet-400"},
          ].map(s=>(
            <div key={s.label} className="flex items-start gap-3">
              <div className={`size-9 rounded-xl flex items-center justify-center ${isDark?"bg-white/[0.06]":"bg-white/15"}`}><s.icon className={`size-4 ${s.col}`}/></div>
              <div>
                <p className="text-2xl font-bold text-white" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{s.value}</p>
                <p className={`text-xs mt-0.5 ${isDark?"text-green-200/60":"text-white/60"}`}>{s.label}</p>
                <p className="text-xs font-medium mt-0.5 text-green-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {title:"Lecturers",   value:(lecturers||[]).length.toString(), sub:`${(lecturers||[]).filter(l=>l.status==="Active").length} active`, icon:Users, col:"text-green-400", ibg:"bg-green-500/15", grad:"from-green-600/20 to-green-600/5"},
          {title:"Courses",     value:(courses||[]).length.toString(),   sub:"ND & HND · 2 semesters", icon:BookOpen, col:"text-amber-400", ibg:"bg-amber-500/15", grad:"from-amber-600/20 to-amber-600/5"},
          {title:"Classrooms",  value:(classrooms||[]).length.toString(),sub:`${(classrooms||[]).filter(r=>r.available).length} available`, icon:Building2, col:"text-teal-400", ibg:"bg-teal-500/15", grad:"from-teal-600/20 to-teal-600/5"},
          {title:"Timetables",  value:"7",  sub:"4 published · 3 draft",     icon:Calendar,  col:"text-violet-400", ibg:"bg-violet-500/15", grad:"from-violet-600/20 to-violet-600/5"},
        ].map(card=>(
          <div key={card.title} className={`relative rounded-2xl p-5 overflow-hidden ${cardBg} border ${divider} group cursor-pointer hover:border-green-600/30 hover:-translate-y-0.5 transition-all duration-200`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${card.grad} opacity-0 group-hover:opacity-100 transition-opacity`}/>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`size-10 rounded-xl ${card.ibg} flex items-center justify-center`}><card.icon className={`size-5 ${card.col}`}/></div>
                <ArrowUpRight className={`size-4 ${textMuted} opacity-0 group-hover:opacity-100 transition-opacity`}/>
              </div>
              <p className={`text-3xl font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{card.value}</p>
              <p className={`text-sm font-medium ${textMuted}`}>{card.title}</p>
              <p className={`text-xs mt-1 ${textMuted} opacity-70`}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <div className="flex items-center justify-between mb-4">
            <div><h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>GA Fitness Evolution</h3><p className={`text-xs ${textMuted}`}>Live generation progress</p></div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full inline-block" style={{backgroundColor:C.green}}/> Fitness</span>
              <span className={`flex items-center gap-1.5 ${textMuted}`}><span className="size-2 rounded-full bg-red-400 inline-block"/> Conflicts</span>
            </div>
          </div>
          <FitnessChart data={liveData} isDark={isDark}/>
        </div>
        <div className={`rounded-2xl p-6 ${cardBg} border ${divider}`}>
          <h3 className={`text-sm font-semibold ${textPrimary} mb-5`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Room Utilisation</h3>
          <RoomBars data={ROOM_UTIL} isDark={isDark}/>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-6 py-5 border-b ${divider} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div><h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Timetable Entries</h3><p className={`text-xs mt-0.5 ${textMuted}`}>{filtered.length} entries · 1st Semester 2025/2026</p></div>
          <div className={`flex gap-1 p-1 rounded-xl ${surfaceBg}`}>
            {["All","Published","Approved","Draft","Generating"].map(f=>(
              <button key={f} onClick={()=>setTableFilter(f)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${tableFilter===f?"bg-green-700 text-white shadow":textMuted}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className={`${surfaceBg} border-b ${divider}`}>{["ID","Programme","Course","Lecturer","Room","Day & Time","Fitness","Status"].map(h=>(<th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} whitespace-nowrap`}>{h}</th>))}</tr></thead>
            <tbody className={`divide-y ${divider}`}>
              {filtered.map(e=>(
                <tr key={e.id} className={`${hoverRow} transition-colors cursor-pointer`}>
                  <td className="px-4 py-3.5"><span className={`font-mono text-xs ${textMuted}`}>{e.id}</span></td>
                  <td className="px-4 py-3.5"><span className={`text-xs font-medium ${textPrimary}`}>{e.programme}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs font-mono text-green-400">{e.course}</span></td>
                  <td className="px-4 py-3.5"><div className="flex items-center gap-2"><Av name={e.lecturer}/><span className={`text-xs ${textPrimary}`}>{e.lecturer}</span></div></td>
                  <td className="px-4 py-3.5"><span className={`text-xs font-mono ${textMuted}`}>{e.room}</span></td>
                  <td className="px-4 py-3.5"><span className={`text-xs ${textPrimary}`}>{e.day}</span><span className={`block text-[11px] font-mono ${textMuted}`}>{e.time}</span></td>
                  <td className="px-4 py-3.5"><FitnessBar value={e.fitness}/></td>
                  <td className="px-4 py-3.5"><StatusBadge status={e.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── STUDENT DASHBOARD ── */
function StudentDashboardPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,userInfo,courses,lecturers}:SharedProps&{userInfo:{name:string;matric:string;programme:string}}) {
  const wat = useNigeriaTime();
  // Nigeria time weekday — fallback to Monday on weekends
  const watWeekday = wat.weekday;
  const today = DAYS.includes(watWeekday) ? watWeekday : "Monday";
  const todaySlots = TIMETABLE_GRID[today]||[];
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className={`rounded-2xl p-6 bg-gradient-to-br ${isDark?"from-[#071a0e] to-[#050d1a]":"from-green-50 to-white"} border ${divider}`}>
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {userInfo.name?userInfo.name.split(" ").map(w=>w[0]).slice(0,2).join(""):"ST"}
          </div>
          <div className="flex-1">
            <h2 className={`text-xl font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Welcome, {userInfo.name||"Student"}</h2>
            <div className="flex flex-wrap gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-sm font-mono text-green-500"># {userInfo.matric||"AOPE/ND/2025/001"}</span>
              <span className={`text-sm ${textMuted}`}>· {userInfo.programme||"ND1"} · 1st Semester 2025/2026</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`hidden sm:inline-block px-4 py-2 rounded-xl ${isDark?"bg-green-700/15 text-green-400 border border-green-700/20":"bg-green-100 text-green-700 border border-green-200"} text-xs font-medium`}>Active Student</span>
            <span className={`text-[10px] font-mono ${textMuted} hidden sm:block`}>{wat.short} WAT</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {label:"My Courses",     value:(courses||[]).filter(c=>c.level===(userInfo.programme||"ND1")).length.toString(), icon:BookOpen, col:"text-green-400", bg:"bg-green-500/10"},
          {label:"Classes Today",  value:todaySlots.length.toString(), icon:Calendar, col:"text-amber-400", bg:"bg-amber-500/10"},
          {label:"My Lecturers",   value:(lecturers||[]).length.toString(), icon:Users, col:"text-teal-400", bg:"bg-teal-500/10"},
          {label:"Programme",      value:userInfo.programme||"ND1", icon:Award, col:"text-violet-400", bg:"bg-violet-500/10"},
        ].map(c=>(
          <div key={c.label} className={`rounded-2xl p-4 ${cardBg} border ${divider}`}>
            <div className={`size-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}><c.icon className={`size-4 ${c.col}`}/></div>
            <p className={`text-2xl font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{c.value}</p>
            <p className={`text-xs ${textMuted} mt-0.5`}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Today's classes */}
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${divider} flex items-center gap-2`}>
          <Calendar className="size-4 text-green-500"/>
          <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Today's Classes — {today}</h3>
          <span className={`ml-auto text-xs font-mono ${textMuted}`}>{wat.short} WAT</span>
        </div>
        {todaySlots.length===0?(
          <div className="px-5 py-10 text-center">
            <CheckCircle2 className="size-8 text-green-400 mx-auto mb-2"/>
            <p className={`text-sm ${textMuted}`}>No classes scheduled for today.</p>
          </div>
        ):(
          <div className={`divide-y ${divider}`}>
            {todaySlots.map((s,i)=>(
              <div key={i} className={`px-5 py-4 flex items-center gap-4 ${hoverRow}`}>
                <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:s.color+"22",border:`2px solid ${s.color}55`}}>
                  <span className="text-[10px] font-bold" style={{color:s.color}}>{s.programme}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${textPrimary}`}>{s.course}</p>
                  <p className={`text-xs ${textMuted}`}>{s.lecturer} · {s.room}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-mono font-medium ${textPrimary}`}>{s.time}</p>
                  <p className={`text-[10px] ${textMuted}`}>{s.room}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly timetable preview */}
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${divider}`}>
          <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Weekly Schedule</h3>
          <p className={`text-xs ${textMuted} mt-0.5`}>1st Semester 2025/2026</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead><tr className={`${surfaceBg} border-b ${divider}`}>{["Day","Course","Lecturer","Room","Time"].map(h=>(<th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted}`}>{h}</th>))}</tr></thead>
            <tbody className={`divide-y ${divider}`}>
              {DAYS.flatMap(day=>(TIMETABLE_GRID[day]||[]).map((e,i)=>({...e,day,key:`${day}-${i}`}))).slice(0,10).map(e=>(
                <tr key={e.key} className={`${hoverRow}`}>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${textPrimary}`}>{e.day}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono text-green-500">{e.course}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs ${textMuted}`}>{e.lecturer}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-mono ${textMuted}`}>{e.room}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs ${textPrimary}`}>{e.time}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── LECTURER DASHBOARD ── */
function LecturerDashboardPage({isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,lecturers,courses}:SharedProps) {
  const myLecturer = (lecturers||[])[0]||LECTURERS[0];
  const myCourses  = (courses||[]).filter(c=>myLecturer.courses.includes(c.code));
  const mySlots    = DAYS.flatMap(day=>(TIMETABLE_GRID[day]||[]).filter(e=>e.lecturer===myLecturer.name).map(e=>({...e,day})));

  // All courses grouped by level
  const levels: {label:string; level:string; color:string; bg:string}[] = [
    {label:"ND 1",  level:"ND1",  color:"text-green-500",  bg:"bg-green-500/10"},
    {label:"ND 2",  level:"ND2",  color:"text-amber-500",  bg:"bg-amber-500/10"},
    {label:"HND 1", level:"HND1", color:"text-teal-500",   bg:"bg-teal-500/10"},
    {label:"HND 2", level:"HND2", color:"text-violet-500", bg:"bg-violet-500/10"},
  ];
  const [activeLevel, setActiveLevel] = useState("ND1");
  const visibleCourses = (courses||[]).filter(c=>c.level===activeLevel);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className={`rounded-2xl p-6 bg-gradient-to-br ${isDark?"from-[#071a0e] to-[#050d1a]":"from-green-50 to-white"} border ${divider}`}>
        <div className="flex items-center gap-4">
          <Av name={myLecturer.name} size="lg"/>
          <div className="flex-1">
            <h2 className={`text-xl font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{myLecturer.name}</h2>
            <p className={`text-sm ${textMuted} mt-0.5`}>{myLecturer.qualification} · {myLecturer.specialization}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {myLecturer.courses.map(c=>(<span key={c} className="px-2 py-0.5 rounded-md bg-green-600/10 text-green-500 text-[10px] font-mono">{c}</span>))}
            </div>
          </div>
          <div className={`hidden sm:block px-4 py-2 rounded-xl ${isDark?"bg-green-700/15 text-green-400 border border-green-700/20":"bg-green-100 text-green-700 border border-green-200"} text-xs font-medium`}>
            {myLecturer.status}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {label:"My Courses",   value:myCourses.length.toString(),  icon:BookOpen, col:"text-green-400",  bg:"bg-green-500/10"},
          {label:"Weekly Hours", value:`${myLecturer.hours}h`,       icon:Clock,    col:"text-amber-400",  bg:"bg-amber-500/10"},
          {label:"Classes/Wk",   value:mySlots.length.toString(),    icon:Calendar, col:"text-teal-400",   bg:"bg-teal-500/10"},
          {label:"Office",       value:myLecturer.office,            icon:MapPin,   col:"text-violet-400", bg:"bg-violet-500/10"},
        ].map(c=>(
          <div key={c.label} className={`rounded-2xl p-4 ${cardBg} border ${divider}`}>
            <div className={`size-9 rounded-xl ${c.bg} flex items-center justify-center mb-3`}><c.icon className={`size-4 ${c.col}`}/></div>
            <p className={`text-2xl font-bold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>{c.value}</p>
            <p className={`text-xs ${textMuted} mt-0.5`}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* My teaching schedule */}
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${divider} flex items-center gap-2`}>
          <Calendar className="size-4 text-amber-500"/>
          <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>My Teaching Schedule</h3>
        </div>
        {mySlots.length===0?(
          <div className="px-5 py-8 text-center"><p className={`text-sm ${textMuted}`}>No classes assigned yet.</p></div>
        ):(
          <div className={`divide-y ${divider}`}>
            {mySlots.map((s,i)=>(
              <div key={i} className={`px-5 py-3.5 flex items-center gap-3 ${hoverRow}`}>
                <div className="size-8 rounded-lg shrink-0 flex items-center justify-center" style={{backgroundColor:s.color+"22"}}>
                  <span className="text-[9px] font-bold" style={{color:s.color}}>{s.day.slice(0,3).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${textPrimary}`}>{s.course}</p>
                  <p className={`text-[10px] ${textMuted}`}>{s.room} · {s.programme}</p>
                </div>
                <span className={`text-xs font-mono ${textMuted}`}>{s.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All department courses by level */}
      <div className={`rounded-2xl ${cardBg} border ${divider} overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${divider} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-green-500"/>
            <h3 className={`text-sm font-semibold ${textPrimary}`} style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Department Course Catalogue</h3>
          </div>
          {/* Level tabs */}
          <div className={`flex gap-1 p-1 rounded-xl ${isDark?"bg-white/[0.04]":"bg-black/[0.04]"}`}>
            {levels.map(lv=>(
              <button key={lv.level} onClick={()=>setActiveLevel(lv.level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeLevel===lv.level?"bg-green-700 text-white shadow":textMuted}`}>
                {lv.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${isDark?"bg-white/[0.02]":"bg-gray-50"} border-b ${divider}`}>
                {["Code","Title","Lecturer","Semester","Hrs","Type","Credit"].map(h=>(
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${textMuted} whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${divider}`}>
              {visibleCourses.map(c=>(
                <tr key={c.code} className={`${hoverRow} transition-colors`}>
                  <td className="px-4 py-3"><span className="font-mono text-xs text-green-500">{c.code}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs ${textPrimary}`}>{c.title}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Av name={c.lecturer}/>
                      <span className={`text-xs ${textMuted}`}>{c.lecturer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs ${textMuted}`}>{c.semester} Sem.</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-mono ${textPrimary}`}>{c.hours}h</span></td>
                  <td className="px-4 py-3"><StatusBadge status={c.type}/></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono text-teal-500">{c.credit} CU</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`px-5 py-3 border-t ${divider} text-xs ${textMuted}`}>
          {visibleCourses.length} courses · {levels.find(l=>l.level===activeLevel)?.label} Programme
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page,setPage]       = useState<Page>("landing");
  const [role,setRole]       = useState<Role|null>(null);
  const [theme,setTheme]     = useState<"dark"|"light">("dark");
  const [gaRunning,setGaRun] = useState(false);
  const [gaGen,setGaGen]     = useState(100);
  const wat = useNigeriaTime();
  const [profOpen,setProfOpen]   = useState(false);
  const [notifOpen,setNotifOpen] = useState(false);
  const [mobileOpen,setMobileOpen] = useState(false);
  const profRef  = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const isDark = theme==="dark";

  useEffect(()=>{ document.documentElement.className=isDark?"":"light"; },[theme]);

  useEffect(()=>{
    const h=(e:MouseEvent)=>{
      if(profRef.current  && !profRef.current.contains(e.target as Node))  setProfOpen(false);
      if(notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  const runGA=()=>{
    setGaRun(true); setGaGen(0); let g=0;
    toast("GA Engine started", {description:"Optimising timetable across 50 chromosomes…", icon:"⚙️"});
    const iv=setInterval(()=>{
      g+=5; setGaGen(g);
      if(g>=100){
        clearInterval(iv); setGaRun(false); setGaGen(100);
        toast.success("Optimisation complete!", {description:`98.3% fitness · 0 conflicts · ${new Date().toLocaleTimeString("en-NG",{timeZone:"Africa/Lagos",hour:"2-digit",minute:"2-digit",hour12:true})} WAT`});
      }
    },80);
  };

  const [userInfo,setUserInfo]     = useState<{name:string;matric:string;programme:string}>({name:"",matric:"",programme:""});
  const [lecturers,  setLecturers]  = useState<Lecturer[]>(LECTURERS);
  const [courses,    setCourses]    = useState<Course[]>(COURSES);
  const [classrooms, setClassrooms] = useState<Classroom[]>(CLASSROOMS);
  const addLecturer  = (l:Lecturer)  => setLecturers(prev=>[...prev,l]);
  const addCourse    = (c:Course)    => setCourses(prev=>[...prev,c]);
  const addClassroom = (r:Classroom) => setClassrooms(prev=>[...prev,r]);

  const handleLogin  = (r:Role,info?:{name:string;matric:string;programme:string})=>{ setRole(r); if(info) setUserInfo(info); setPage("dashboard"); };
  const handleLogout = ()=>{ setRole(null); setPage("landing"); };

  const canManage = role==="timetable_officer"||role==="hod"||role==="admin";

  if(page==="landing")  return <LandingPage onNavigate={setPage}/>;
  if(page==="login")    return <AuthPage mode="login"    onNavigate={setPage} onLogin={(r,info)=>handleLogin(r,info)}/>;
  if(page==="register") return <AuthPage mode="register" onNavigate={setPage} onLogin={(r,info)=>handleLogin(r,info)}/>;
  if(!role)             return <LandingPage onNavigate={setPage}/>;

  const cardBg    = isDark?"bg-[#0c1628]":"bg-white";
  const surfaceBg = isDark?"bg-[#0e1e14]":"bg-[#f0fff4]";
  const textPrimary = isDark?"text-[#e8edf5]":"text-[#0a1128]";
  const textMuted   = isDark?"text-[#7a9a85]":"text-[#3a5a45]";
  const divider     = isDark?"border-white/[0.07]":"border-black/[0.08]";
  const hoverRow    = isDark?"hover:bg-white/[0.03]":"hover:bg-green-50/60";
  const shared:SharedProps = {isDark,cardBg,divider,textPrimary,textMuted,surfaceBg,hoverRow,canManage,role:role!,lecturers,addLecturer,courses,addCourse,classrooms,addClassroom,navigate:setPage};

  const allNavLinks:{key:Page;label:string;icon:any;roles:Role[]}[]=[
    {key:"dashboard",  label:"Dashboard",  icon:Home,      roles:["student","lecturer","timetable_officer","hod","admin"]},
    {key:"timetable",  label:"Timetable",  icon:Calendar,  roles:["student","lecturer","timetable_officer","hod","admin"]},
    {key:"lecturers",  label:"Lecturers",  icon:Users,     roles:["lecturer","timetable_officer","hod","admin"]},
    {key:"courses",    label:"Courses",    icon:BookOpen,  roles:["lecturer","timetable_officer","hod","admin"]},
    {key:"classrooms", label:"Classrooms", icon:Building2, roles:["timetable_officer","hod","admin"]},
    {key:"analytics",  label:"Analytics",  icon:PieChart,  roles:["timetable_officer","hod","admin"]},
    {key:"settings",   label:"Settings",   icon:Settings,  roles:["timetable_officer","hod","admin"]},
  ];
  const navLinks = allNavLinks.filter(l=>l.roles.includes(role!));

  const roleInitials:Record<Role,string>={student:"ST",lecturer:"LC",timetable_officer:"TO",hod:"HD",admin:"AD"};

  return (
    <div className={`min-h-screen ${isDark?"bg-[#050d1a]":"bg-[#f0fff4]"} ${textPrimary} transition-colors duration-300`} style={{fontFamily:"'DM Sans',sans-serif"}}>
      <Toaster position="bottom-right" theme={isDark?"dark":"light"} richColors closeButton/>
      {isDark&&<div className="fixed inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(ellipse 80% 50% at 50% -10%,rgba(22,163,74,0.10) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(202,138,4,0.06) 0%,transparent 60%)"}}/>}

      {/* ── NAV ── */}
      <header className={`sticky top-0 z-50 w-full ${isDark?"bg-[#050d1a]/80 border-b border-white/[0.07]":"bg-white/80 border-b border-black/[0.08]"} backdrop-blur-xl`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-3">

          {/* Logo */}
          <button onClick={()=>setPage("dashboard")} className="flex items-center gap-2.5 mr-1 shrink-0">
            <div className="size-8 rounded-xl bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="size-4 text-white"/>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-bold" style={{fontFamily:"'Bricolage Grotesque',sans-serif"}}>Adeseun Ogundoyin</p>
              <p className="text-[9px] text-green-400 font-medium">Computer Science Dept.</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map(link=>(
              <button key={link.key} onClick={()=>setPage(link.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${page===link.key?"bg-green-700/15 text-green-400":`${textMuted} hover:text-foreground`}`}>
                <link.icon className="size-3.5"/>{link.label}
              </button>
            ))}
          </nav>
          <div className="flex-1 lg:flex-none"/>

          {/* Live Nigeria time clock */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border ${isDark?"border-white/[0.07] bg-white/[0.03]":"border-black/[0.07] bg-black/[0.02]"}`}>
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse shrink-0"/>
            <span className={`text-xs font-mono ${textMuted} tabular-nums`}>{wat.clock}</span>
            <span className={`text-[10px] ${textMuted} opacity-60`}>WAT</span>
          </div>

          {/* Search */}
          <div className="relative hidden md:block w-44">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-3.5 ${textMuted}`}/>
            <input placeholder="Search…" className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-sm border ${isDark?"bg-white/[0.05] border-white/[0.08] text-[#e8edf5]":"bg-black/[0.04] border-black/[0.08] text-[#0a1128]"} placeholder:text-[#7a9a85]/60 outline-none focus:border-green-600/50`}
              onKeyDown={e=>{
                if(e.key==="Enter"){
                  const q=(e.target as HTMLInputElement).value.toLowerCase();
                  if(q.includes("timetable")||q.includes("schedule")) setPage("timetable");
                  else if(q.includes("lecturer")||q.includes("staff")) setPage("lecturers");
                  else if(q.includes("course")||q.includes("subject")) setPage("courses");
                  else if(q.includes("room")||q.includes("class")) setPage("classrooms");
                  else if(q.includes("analytic")||q.includes("chart")) setPage("analytics");
                  else if(q.includes("setting")) setPage("settings");
                  else if(q.includes("profile")) setPage("profile");
                  (e.target as HTMLInputElement).value="";
                }
              }}
            />
          </div>

          {/* Bell */}
          <div ref={notifRef} className="relative">
            <button onClick={()=>setNotifOpen(v=>!v)} className={`relative size-8 rounded-xl flex items-center justify-center ${isDark?"hover:bg-white/[0.06]":"hover:bg-black/[0.05]"} transition-colors`}>
              <Bell className={`size-4 ${textMuted}`}/>
              <span className={`absolute top-1 right-1 size-2 rounded-full bg-green-500 border-2 ${isDark?"border-[#050d1a]":"border-white"}`}/>
            </button>
            {notifOpen&&(
              <div className={`absolute right-0 top-10 w-72 ${cardBg} border ${divider} rounded-2xl shadow-2xl overflow-hidden z-50`}>
                <div className={`px-4 py-3 border-b ${divider} flex items-center justify-between`}>
                  <span className="text-sm font-semibold">Notifications</span>
                  <span className="text-xs text-green-400 cursor-pointer">Mark all read</span>
                </div>
                {[
                  {icon:CheckCircle2, col:"text-green-400",  text:"TT-2025-001 published successfully", ms:2*60*1000},
                  {icon:Zap,          col:"text-teal-400",   text:"GA complete — 98.3% fitness achieved",ms:15*60*1000},
                  {icon:AlertTriangle,col:"text-amber-400",  text:"2 conflicts detected in HND1-AIT",   ms:60*60*1000},
                ].map((n,i)=>(
                  <div key={i} className={`px-4 py-3 flex gap-3 ${hoverRow} cursor-pointer`}>
                    <n.icon className={`size-4 shrink-0 mt-0.5 ${n.col}`}/>
                    <div><p className="text-xs leading-relaxed">{n.text}</p><p className={`text-[11px] mt-1 font-mono ${textMuted}`}>{watAgo(n.ms)} WAT</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generate — staff only */}
          {canManage&&(
          <button onClick={runGA} disabled={gaRunning} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white text-sm font-medium transition-all shadow-lg shadow-green-900/20">
            {gaRunning?<RefreshCw className="size-3.5 animate-spin"/>:<Plus className="size-3.5"/>}
            {gaRunning?"Running…":"Generate"}
          </button>
          )}

          {/* Theme toggle */}
          <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} className={`size-8 rounded-xl flex items-center justify-center ${isDark?"hover:bg-white/[0.06]":"hover:bg-black/[0.05]"} transition-colors`}>
            {isDark?<Sun className="size-4 text-amber-400"/>:<Moon className="size-4 text-green-600"/>}
          </button>

          {/* Avatar */}
          <div ref={profRef} className="relative">
            <button onClick={()=>setProfOpen(v=>!v)} className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl hover:bg-white/[0.06] transition-colors">
              <div className="size-7 rounded-lg bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold">
                {roleInitials[role!]}
              </div>
              <ChevronDown className={`size-3.5 ${textMuted} hidden sm:block`}/>
            </button>
            {profOpen&&(
              <div className={`absolute right-0 top-10 w-56 ${cardBg} border ${divider} rounded-2xl shadow-2xl overflow-hidden z-50`}>
                <div className={`px-4 py-3 border-b ${divider}`}>
                  <p className="text-sm font-semibold">{role==="student"&&userInfo.name?userInfo.name:role?.replace("_"," ")}</p>
                  {role==="student"&&userInfo.matric&&<p className={`text-xs font-mono text-green-500 mt-0.5`}>{userInfo.matric}</p>}
                  <p className={`text-xs ${textMuted} mt-0.5 capitalize`}>{role?.replace("_"," ")}</p>
                </div>
                {[
                  {icon:User,    label:"My Profile", action:()=>{setPage("profile");setProfOpen(false);}, show:true},
                  {icon:Shield,  label:"Permissions",action:()=>{setPage("permissions");setProfOpen(false);}, show:canManage},
                  {icon:Settings,label:"Settings",   action:()=>{setPage("settings");setProfOpen(false);}, show:canManage},
                  {icon:isDark?Sun:Moon, label:isDark?"Light Mode":"Dark Mode", action:()=>setTheme(t=>t==="dark"?"light":"dark"), show:true},
                ].filter(i=>i.show).map((item,i)=>(
                  <button key={i} onClick={item.action} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm ${textMuted} ${hoverRow} transition-colors`}>
                    <item.icon className="size-3.5"/> {item.label}
                  </button>
                ))}
                <div className={`border-t ${divider}`}>
                  <button onClick={handleLogout} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 ${hoverRow} transition-colors`}>
                    <LogOut className="size-3.5"/> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button onClick={()=>setMobileOpen(v=>!v)} className={`lg:hidden size-8 rounded-xl flex items-center justify-center ${isDark?"hover:bg-white/[0.06]":"hover:bg-black/[0.05]"} transition-colors`}>
            {mobileOpen?<X className={`size-4 ${textMuted}`}/>:<Menu className={`size-4 ${textMuted}`}/>}
          </button>
        </div>

        {mobileOpen&&(
          <div className={`lg:hidden ${isDark?"bg-[#050d1a]/97":"bg-white/97"} border-t ${divider} px-4 py-3 flex flex-wrap gap-1.5`}>
            {navLinks.map(link=>(
              <button key={link.key} onClick={()=>{setPage(link.key);setMobileOpen(false);}}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium ${page===link.key?"bg-green-700/15 text-green-400":textMuted}`}>
                <link.icon className="size-3.5"/>{link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── CONTENT ── */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {page==="dashboard"  && role==="student"  && <StudentDashboardPage  {...shared} userInfo={userInfo} courses={courses} lecturers={lecturers}/>}
        {page==="dashboard"  && role==="lecturer" && <LecturerDashboardPage {...shared}/>}
        {page==="dashboard"  && canManage         && <DashboardPage         {...shared} gaGen={gaGen} gaRunning={gaRunning} runGA={runGA}/>}
        {page==="timetable"  && <TimetablePage  {...shared} role={role!}/>}
        {page==="lecturers"  && <LecturersPage  {...shared} canManage={canManage}/>}
        {page==="courses"    && <CoursesPage    {...shared} canManage={canManage}/>}
        {page==="classrooms" && <ClassroomsPage {...shared} canManage={canManage}/>}
        {page==="analytics"  && <AnalyticsPage  {...shared}/>}
        {page==="settings"   && canManage && <SettingsPage   {...shared}/>}
        {page==="profile"    && <ProfilePage    {...shared} role={role} userInfo={userInfo}/>}
        {page==="permissions"&& canManage && <PermissionsPage {...shared}/>}
      </main>

      <footer className={`max-w-[1600px] mx-auto px-4 sm:px-6 py-6 text-center text-xs ${textMuted} border-t ${divider} mt-4`}>
        <p>Dept. of Computer Science · Adeseun Ogundoyin Polytechnic, Eruwa · Faculty of Science · 2025/2026</p>
        <p className="mt-1 opacity-40 font-mono">IGA Engine v2.1 · Fitness {(FITNESS_DATA[FITNESS_DATA.length-1].fitness*100).toFixed(1)}% · Pop 50 · Gen 100 · {wat.date} · {wat.clock} WAT</p>
      </footer>
    </div>
  );
}
