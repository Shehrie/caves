/* Pure functions kept separate so filtering and shortlist behaviour can be tested. */
const CavesCore = {
 filter(items, f = {}) {
  const q = (f.query || '').trim().toLowerCase();
  return items.filter(x => (!q || [x.title,x.subtitle,x.place,x.interest,x.category].join(' ').toLowerCase().includes(q))
   && (!f.category || f.category === 'All' || x.category === f.category)
   && (!f.interest || x.interest === f.interest)
   && (!f.free || x.cost === 0)
   && (!f.stepfree || x.access === 'yes')
   && (!f.quiet || x.quiet)
   && (!f.under18 || x.minAge <= 17)
   && (!f.short || x.minutes <= 60));
 },
 readSaved(raw, items) {
  try { const ids = JSON.parse(raw); return Array.isArray(ids) ? [...new Set(ids.filter(id => items.some(x=>x.id===id)))] : []; }
  catch { return []; }
 },
 toggle(ids, id) { return ids.includes(id) ? ids.filter(x=>x!==id) : [...ids,id]; },
 csv(items) {
  const cell = v => '"'+String(v).replaceAll('"','""')+'"';
  return ['Title,Area,Sample day,Minutes,Cost GBP,Minimum age,Access status,Data status',...items.map(x=>[x.title,x.place,x.day,x.minutes,x.cost,x.minAge,x.access,"Fictional demo - not a booking"].map(cell).join(','))].join('\r\n');
 }
};
if (typeof module !== 'undefined') module.exports = CavesCore;
