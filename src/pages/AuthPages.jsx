import { ArrowLeft, CalendarDays, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthShell({ title, subtitle, children, footer }) {
  return <main className="container-page grid min-h-[680px] place-items-center py-12"><div className="w-full max-w-md">
    <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><ArrowLeft size={16}/> Back to home</Link>
    <div className="surface p-7 shadow-xl shadow-slate-200/50 sm:p-9"><div className="mb-7 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white"><CalendarDays/></span><h1 className="mt-5 text-2xl font-black text-slate-900">{title}</h1><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>{children}<p className="mt-7 text-center text-sm text-slate-500">{footer}</p></div>
  </div></main>;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form,setForm]=useState({email:"",password:""});
  const [error,setError]=useState("");
  function submit(e){e.preventDefault();const result=login(form.email,form.password);if(!result.success)return setError(result.message);navigate(location.state?.from||"/");}
  return <AuthShell title="Welcome back" subtitle="Log in to continue exploring campus life." footer={<>New to CampusHub? <Link to="/register" className="font-bold text-indigo-600">Create an account</Link></>}>
    <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-bold text-slate-700">Email address<div className="relative mt-2"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input required type="email" className="field !pl-10" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></label>
      <label className="block text-sm font-bold text-slate-700">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input required type="password" className="field !pl-10" placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div></label>
      {error&&<p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}<button className="btn-primary w-full !py-3">Log in</button>
    </form>
    <div className="mt-6 rounded-xl bg-indigo-50 p-4"><p className="text-xs font-extrabold text-indigo-800">DEMO ACCOUNTS</p><p className="mt-2 text-xs leading-6 text-indigo-700">Student: student@campus.test<br/>Organizer: organizer@campus.test<br/>Admin: admin@campus.test<br/>Password for all: 123456</p></div>
  </AuthShell>;
}

export function Register() {
  const { register } = useAuth();
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [error,setError]=useState("");
  function submit(e){e.preventDefault();if(form.password.length<6)return setError("Password must be at least 6 characters.");if(form.password!==form.confirm)return setError("Passwords do not match.");const result=register(form.name,form.email,form.password);if(!result.success)return setError(result.message);navigate("/");}
  return <AuthShell title="Create your account" subtitle="Join the campus community and find your next event." footer={<>Already have an account? <Link to="/login" className="font-bold text-indigo-600">Log in</Link></>}>
    <form onSubmit={submit} className="space-y-4">
      {[["name","Full name","text",UserRound],["email","Email address","email",Mail],["password","Password","password",LockKeyhole],["confirm","Confirm password","password",LockKeyhole]].map(([key,label,type,Icon])=><label key={key} className="block text-sm font-bold text-slate-700">{label}<div className="relative mt-2"><Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input required type={type} className="field !pl-10" placeholder={label} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></div></label>)}
      {error&&<p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}<button className="btn-primary w-full !py-3">Create account</button>
    </form>
  </AuthShell>;
}
