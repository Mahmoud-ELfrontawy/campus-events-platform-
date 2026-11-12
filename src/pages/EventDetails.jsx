import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function EventDetails() {
  const { id } = useParams();
  const { events, registrations, registerForEvent } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const event = events.find((item)=>item.id===id);
  if (!event) return <main className="container-page py-20 text-center"><h1 className="text-2xl font-black">Event not found</h1><Link className="btn-primary mt-5" to="/events">Back to events</Link></main>;
  const already = user && registrations.some((item)=>item.eventId===id && item.email===user.email);
  const full = event.registered >= event.capacity;
  function join() {
    if (!user) return navigate("/login", { state: { from: `/events/${id}` } });
    const result = registerForEvent(id, user.email);
    alert(result.message);
  }
  return <main className="container-page py-10">
    <Link to="/events" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"><ArrowLeft size={16}/> Back to events</Link>
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <div className="relative h-[280px] md:h-[430px]"><img src={event.image} alt={event.title} className="h-full w-full object-cover"/><span className="absolute bottom-6 left-6 rounded-full bg-white px-4 py-2 text-xs font-bold text-indigo-700">{event.category}</span></div>
      <div className="grid gap-10 p-6 md:grid-cols-[1fr_330px] md:p-10">
        <div><p className="eyebrow">EVENT DETAILS</p><h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-4xl">{event.title}</h1><p className="mt-5 text-base leading-8 text-slate-600">{event.description}</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">{[[CalendarDays,new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US",{dateStyle:"long"}),"Date"],[Clock3,event.time,"Time"],[MapPin,event.location,"Venue"],[Users,`${event.registered} / ${event.capacity} registered`,"Attendance"]].map(([Icon,value,label])=><div key={label} className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={19}/></span><div><p className="text-xs text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div></div>)}</div>
          <div className="mt-9 border-t border-slate-100 pt-6"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Organized by</p><p className="mt-2 font-bold text-slate-800">{event.organizer}</p></div>
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6"><p className="text-sm font-bold text-slate-500">Registration</p><div className="mt-3 flex items-end gap-2"><span className="text-3xl font-black text-slate-900">{Math.max(0,event.capacity-event.registered)}</span><span className="pb-1 text-sm text-slate-500">spots left</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-600" style={{width:`${Math.min(100,event.registered/event.capacity*100)}%`}}/></div>
          <p className="mt-3 text-xs text-slate-500">{event.registered} of {event.capacity} seats filled</p>
          {already ? <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700"><CheckCircle2 size={18}/> You’re registered</div> : <button disabled={full} onClick={join} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:bg-slate-300">{full?"Event fully booked":"Register for event"}</button>}
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">Registration is free. Your spot is subject to availability.</p>
        </aside>
      </div>
    </div>
  </main>;
}
