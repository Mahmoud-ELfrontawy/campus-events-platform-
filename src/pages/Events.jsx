import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import PageHeading from "../components/PageHeading";
import { categories } from "../data/seed";
import { useData } from "../context/DataContext";

export default function Events() {
  const { events } = useData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("soonest");
  const visible = useMemo(() => events.filter((event) => {
    const matchesQuery = `${event.title} ${event.location} ${event.organizer}`.toLowerCase().includes(query.toLowerCase());
    return event.status === "Published" && matchesQuery && (category === "All" || event.category === category);
  }).sort((a,b) => sort === "soonest" ? a.date.localeCompare(b.date) : b.registered-a.registered), [events, query, category, sort]);

  return <main className="container-page py-12">
    <PageHeading eyebrow="CAMPUS CALENDAR" title="Explore events" description="Find your next opportunity to learn, connect, compete, and create memories."/>
    <div className="surface mb-8 grid gap-3 p-4 md:grid-cols-[1fr_220px_190px]">
      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input className="field !pl-11" placeholder="Search events, places, organizers..." value={query} onChange={(e)=>setQuery(e.target.value)}/></div>
      <select className="field" value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map((item)=><option key={item}>{item}</option>)}</select>
      <select className="field" value={sort} onChange={(e)=>setSort(e.target.value)}><option value="soonest">Date: Soonest first</option><option value="popular">Most registered</option></select>
    </div>
    <div className="mb-5 flex items-center justify-between"><p className="text-sm font-semibold text-slate-600">{visible.length} events found</p><span className="flex items-center gap-1 text-xs text-slate-400"><SlidersHorizontal size={14}/> Filters</span></div>
    {visible.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map((event)=><EventCard key={event.id} event={event}/>)}</div> : <div className="surface py-16 text-center"><p className="text-lg font-bold text-slate-800">No events found</p><p className="mt-2 text-sm text-slate-500">Try changing your search or category.</p><button className="btn-secondary mt-5" onClick={()=>{setQuery("");setCategory("All");}}>Clear filters</button></div>}
  </main>;
}
