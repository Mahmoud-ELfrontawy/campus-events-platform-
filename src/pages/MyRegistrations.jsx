import { CalendarDays, TicketX } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function MyRegistrations() {
  const { user }=useAuth(); const { events,registrations,cancelRegistration }=useData();
  const mine=registrations.filter(item=>item.email===user.email).map(item=>events.find(event=>event.id===item.eventId)).filter(Boolean);
  return <main className="container-page py-12"><PageHeading eyebrow="YOUR CAMPUS PLANS" title="My registrations" description="Keep track of the events you have signed up for."/>
    {mine.length?<><div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500"><CalendarDays size={17}/>{mine.length} registered events</div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{mine.map(event=><div key={event.id}><EventCard event={event}/><button onClick={()=>{if(confirm("Cancel your registration?"))cancelRegistration(event.id,user.email);}} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50"><TicketX size={16}/> Cancel registration</button></div>)}</div></>:<div className="surface py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><CalendarDays/></span><h2 className="mt-5 text-xl font-black text-slate-900">No registrations yet</h2><p className="mt-2 text-sm text-slate-500">Explore campus events and save your first spot.</p><Link to="/events" className="btn-primary mt-6">Explore events</Link></div>}
  </main>;
}
