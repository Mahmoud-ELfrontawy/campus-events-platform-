import { CalendarPlus, Pencil, Trash2, Users } from "lucide-react";
import { useState } from "react";
import PageHeading from "../components/PageHeading";
import { useData } from "../context/DataContext";

const blank={title:"",category:"Technology",date:"",time:"10:00 AM",location:"",organizer:"Student Club",capacity:50,image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",description:""};
export default function Organizer(){
  const {events,addEvent,updateEvent,deleteEvent}=useData();
  const [form,setForm]=useState(blank); const [editing,setEditing]=useState(null); const [show,setShow]=useState(false);
  const mine=events;
  function submit(e){e.preventDefault();if(editing)updateEvent(editing,form);else addEvent(form);setForm(blank);setEditing(null);setShow(false);}
  function edit(event){setEditing(event.id);setForm({...event});setShow(true);}
  return <main className="container-page py-12"><PageHeading eyebrow="ORGANIZER WORKSPACE" title="Manage your events" description="Create, update, and manage campus event listings."><button onClick={()=>{setForm(blank);setEditing(null);setShow(!show);}} className="btn-primary"><CalendarPlus size={17}/> Create event</button></PageHeading>
    {show&&<form onSubmit={submit} className="surface mb-8 grid gap-4 p-6 md:grid-cols-2"><h2 className="md:col-span-2 text-xl font-black">{editing?"Edit event":"Create a new event"}</h2>
      <input className="field" placeholder="Event title" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <select className="field" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{["Technology","Workshop","Sports","Career","Community","Arts"].map(x=><option key={x}>{x}</option>)}</select>
      <input className="field" type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <input className="field" placeholder="Time (e.g. 10:00 AM)" required value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
      <input className="field" placeholder="Venue" required value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
      <input className="field" placeholder="Organizer" required value={form.organizer} onChange={e=>setForm({...form,organizer:e.target.value})}/>
      <input className="field" type="number" min="1" placeholder="Capacity" required value={form.capacity} onChange={e=>setForm({...form,capacity:Number(e.target.value)})}/>
      <input className="field" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
      <textarea className="field min-h-28 md:col-span-2" placeholder="Event description" required value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <div className="flex gap-3 md:col-span-2"><button className="btn-primary">{editing?"Save changes":"Publish event"}</button><button type="button" className="btn-secondary" onClick={()=>setShow(false)}>Cancel</button></div>
    </form>}
    <div className="surface overflow-hidden"><div className="flex items-center justify-between border-b border-slate-100 p-5"><h2 className="font-extrabold text-slate-900">All events</h2><span className="text-xs text-slate-500">{mine.length} total</span></div>
      <div className="divide-y divide-slate-100">{mine.map(event=><div key={event.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="font-bold text-slate-900">{event.title}</p><p className="mt-1 text-xs text-slate-500">{event.date} · {event.location} · <span className="inline-flex items-center gap-1"><Users size={12}/>{event.registered}/{event.capacity}</span></p></div><div className="flex gap-2"><button onClick={()=>edit(event)} className="btn-secondary !px-3 !py-2"><Pencil size={15}/> Edit</button><button onClick={()=>{if(confirm("Delete this event?"))deleteEvent(event.id);}} className="btn-secondary !border-rose-200 !px-3 !py-2 !text-rose-600"><Trash2 size={15}/> Delete</button></div></div>)}</div>
    </div>
  </main>;
}
