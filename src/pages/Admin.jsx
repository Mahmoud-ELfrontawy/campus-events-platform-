import { CalendarDays, Users, TrendingUp } from "lucide-react";
import PageHeading from "../components/PageHeading";
import { useData } from "../context/DataContext";

export default function Admin(){
  const {events,registrations,updateEvent,deleteEvent}=useData();
  const totalSeats=events.reduce((sum,e)=>sum+e.capacity,0);
  return <main className="container-page py-12"><PageHeading eyebrow="ADMINISTRATION" title="Platform overview" description="Review campus events and moderate published content."/>
    <div className="mb-8 grid gap-4 md:grid-cols-3">{[[CalendarDays,events.length,"Total events"],[Users,registrations.length,"Registrations"],[TrendingUp,totalSeats?Math.round(registrations.length/totalSeats*100):0+"%","Capacity usage"]].map(([Icon,value,label])=><div key={label} className="surface p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon/></span><p className="mt-4 text-3xl font-black text-slate-900">{value}{label==="Capacity usage"?"%":""}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div>
    <div className="surface overflow-hidden"><div className="border-b border-slate-100 p-5 font-extrabold">Event moderation</div>{events.map(event=><div key={event.id} className="flex flex-col gap-3 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-slate-900">{event.title}</p><p className="mt-1 text-xs text-slate-500">{event.organizer} · {event.date}</p></div><div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-bold ${event.status==="Published"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{event.status}</span><button onClick={()=>updateEvent(event.id,{status:event.status==="Published"?"Cancelled":"Published"})} className="btn-secondary !px-3 !py-2 text-xs">{event.status==="Published"?"Cancel event":"Republish"}</button><button onClick={()=>{if(confirm("Delete event permanently?"))deleteEvent(event.id);}} className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600">Delete</button></div></div>)}</div>
  </main>;
}
