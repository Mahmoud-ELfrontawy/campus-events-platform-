import { ArrowRight, ArrowUpRight, CalendarCheck, Search, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useData } from "../context/DataContext";

export default function Home() {
  const { events } = useData();
  const featured = events.filter((event) => event.status === "Published" && event.featured).slice(0, 3);
  return <>
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-3xl"/>
      <div className="absolute -bottom-52 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl"/>
      <div className="container-page relative grid min-h-[610px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-indigo-200"><Sparkles size={14}/> YOUR CAMPUS. YOUR COMMUNITY.</span>
          <h1 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl">Make your campus life <span className="text-indigo-400">unforgettable.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">Find events, discover new interests, meet people, and be part of the moments that make university life special.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/events" className="btn-primary !px-6 !py-3">Explore events <ArrowRight size={17}/></Link><Link to="/register" className="btn-secondary !border-white/20 !bg-white/5 !px-6 !py-3 !text-white hover:!bg-white/10">Join the community</Link></div>
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7"><div><p className="text-2xl font-black text-white">{events.length}+</p><p className="mt-1 text-xs text-slate-400">Upcoming events</p></div><div><p className="text-2xl font-black text-white">6</p><p className="mt-1 text-xs text-slate-400">Categories</p></div><div><p className="text-2xl font-black text-white">1</p><p className="mt-1 text-xs text-slate-400">Campus community</p></div></div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[34px] bg-gradient-to-br from-indigo-500/30 to-cyan-400/10 blur-2xl"/>
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85" alt="Students at a campus event" className="h-[390px] w-full rounded-[20px] object-cover"/>
            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur"><div className="flex items-center justify-between"><span className="text-xs font-bold text-indigo-600">UP NEXT</span><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Registration open</span></div><h3 className="mt-2 text-lg font-extrabold text-slate-900">Future Builders Tech Summit</h3><p className="mt-1 text-xs text-slate-500">December 3 · Main Auditorium</p></div>
          </div>
          <div className="absolute -left-7 top-12 hidden rounded-2xl bg-white p-4 shadow-xl sm:block"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Users/></span><div><p className="text-sm font-extrabold text-slate-900">Meet your people</p><p className="text-xs text-slate-500">Find your community</p></div></div></div>
        </div>
      </div>
    </section>
    <section className="container-page section-space">
      <div className="mb-9 flex items-end justify-between gap-4"><div><p className="eyebrow">DON'T MISS OUT</p><h2 className="mt-2 text-3xl font-black text-slate-900">Featured events</h2><p className="mt-2 text-sm text-slate-500">A few great ways to make the most of your campus.</p></div><Link to="/events" className="hidden items-center gap-2 text-sm font-bold text-indigo-600 sm:flex">View all events <ArrowUpRight size={17}/></Link></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((event) => <EventCard key={event.id} event={event}/>)}</div>
      <div className="mt-7 sm:hidden"><Link to="/events" className="btn-secondary w-full">View all events <ArrowRight size={16}/></Link></div>
    </section>
    <section className="bg-indigo-50 py-16"><div className="container-page grid gap-8 md:grid-cols-3">
      {[{icon:Search,title:"Discover",desc:"Explore events that match your interests and curiosity."},{icon:CalendarCheck,title:"Register",desc:"Save your spot in a few simple steps."},{icon:Zap,title:"Get involved",desc:"Meet people and create memories beyond the classroom."}].map((item) => <div key={item.title} className="rounded-2xl bg-white p-7"><span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><item.icon/></span><h3 className="mt-5 text-lg font-extrabold text-slate-900">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p></div>)}
    </div></section>
  </>;
}
