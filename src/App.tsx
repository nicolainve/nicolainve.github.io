import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Leaf, Wheat, Wine, MapPin, Clock, CalendarDays, Check } from "lucide-react";

const asset = (path: string) => import.meta.env.BASE_URL + path;

const menu = {
  Antipasti: [
    { name: "Burrata e pomodori di stagione", description: "Burrata cremosa, pomodori, basilico e pane croccante", price: "14", allergens: "Latte, glutine" },
    { name: "Il tagliere dell’osteria", description: "Salumi, formaggi, confettura di fichi e focaccia calda", price: "18", allergens: "Latte, glutine" },
    { name: "Verdure, come piacciono a noi", description: "Orto di stagione al forno, hummus di ceci e sesamo", price: "12", allergens: "Sesamo" },
  ],
  Primi: [
    { name: "Tagliatelle dell’osteria", description: "Pasta all’uovo, manzo rosolato, funghi e pomodorini", price: "18", allergens: "Glutine, uova, latte" },
    { name: "Farfalle al pesto fresco", description: "Basilico, pinoli, Parmigiano e pomodorini dolci", price: "16", allergens: "Glutine, latte, frutta a guscio" },
    { name: "Risotto di stagione", description: "Riso Carnaroli, zucca arrosto, rosmarino e caprino", price: "17", allergens: "Latte, sedano" },
  ],
  Secondi: [
    { name: "Tagliata al rosmarino", description: "Manzo alla griglia, patate al forno e sale alle erbe", price: "25", allergens: "Da verificare con il personale" },
    { name: "Il pescato del giorno", description: "Filetto di orata, verdure di stagione e olio al limone", price: "24", allergens: "Pesce" },
    { name: "La melanzana", description: "Melanzana al forno, pomodoro, mozzarella e basilico", price: "17", allergens: "Latte" },
  ],
  Dolci: [
    { name: "Cioccolato, gelato e caramello", description: "Tortino al cioccolato, gelato alla vaniglia e caramello", price: "8", allergens: "Glutine, uova, latte" },
    { name: "Il nostro tiramisù", description: "Mascarpone, savoiardi, caffè e cacao amaro", price: "8", allergens: "Glutine, uova, latte" },
    { name: "Panna cotta del giorno", description: "Vaniglia, frutta di stagione e crumble alle mandorle", price: "7", allergens: "Latte, glutine, frutta a guscio" },
  ],
};
type MenuCategory = keyof typeof menu;
const links = [{href:"#storia",text:"La nostra storia"},{href:"#menu",text:"Il menu"},{href:"#atmosfera",text:"L’atmosfera"},{href:"#contatti",text:"Dove siamo"}];

function Sun({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true"><circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="1.5" />{Array.from({length:12}, (_,i)=><path key={i} d="M40 8v10" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${i*30} 40 40)`}/>)}<path d="M34 43c4 4 8 4 12 0" stroke="currentColor" strokeWidth="1.5"/><circle cx="35" cy="36" r="1" fill="currentColor"/><circle cx="45" cy="36" r="1" fill="currentColor"/></svg>;
}

export default function Home() {
  const [mobileOpen,setMobileOpen] = useState(false);
  const [category,setCategory] = useState<MenuCategory>("Antipasti");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("20:00");
  const [guests,setGuests] = useState("2");
  const [bookingPreview,setBookingPreview] = useState(false);
  const [dateError,setDateError] = useState("");
  const [today,setToday] = useState("");
  const menuDialog=useRef<HTMLDialogElement>(null);
  const bookingDialog=useRef<HTMLDialogElement>(null);
  const infoDialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{setToday(new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Rome",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()));},[]);
  const openBooking=()=>{setMobileOpen(false);setBookingPreview(false);setDateError("");bookingDialog.current?.showModal();};
  const closeOnBackdrop=(event:React.MouseEvent<HTMLDialogElement>)=>{if(event.target===event.currentTarget)event.currentTarget.close();};
  const changeTab=(event:React.KeyboardEvent<HTMLButtonElement>,cat:MenuCategory)=>{
    const keys=Object.keys(menu) as MenuCategory[];let n=keys.indexOf(cat);
    if(event.key==="ArrowRight")n=(n+1)%keys.length;
    else if(event.key==="ArrowLeft")n=(n+keys.length-1)%keys.length;
    else if(event.key==="Home")n=0;else if(event.key==="End")n=keys.length-1;else return;
    event.preventDefault();setCategory(keys[n]);document.getElementById(`tab-${keys[n]}`)?.focus();
  };

  return <>
    <a className="skip-link" href="#contenuto">Vai al contenuto</a>
    <header className="site-header">
      <a href="#" className="wordmark" aria-label="Osteria Sera, inizio pagina">sera<span>.</span><small>OSTERIA CONTEMPORANEA</small></a>
      <nav className="desktop-nav" aria-label="Navigazione principale">{links.map(link=><a key={link.href} href={link.href}>{link.text}</a>)}</nav>
      <div className="nav-actions"><button className="button button-small" onClick={openBooking}>Prenota un tavolo <ArrowUpRight size={16}/></button><button className="mobile-toggle icon-button" onClick={()=>setMobileOpen(!mobileOpen)} aria-label={mobileOpen?"Chiudi navigazione":"Apri navigazione"} aria-expanded={mobileOpen} aria-controls="mobile-nav">{mobileOpen?<X/>:<Menu/>}</button></div>
      {mobileOpen&&<nav id="mobile-nav" className="mobile-nav" aria-label="Navigazione mobile">{links.map(link=><a key={link.href} href={link.href} onClick={()=>setMobileOpen(false)}>{link.text}<ArrowUpRight size={18}/></a>)}</nav>}
    </header>
    <main id="contenuto">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="little-dot"/> CUCINA ITALIANA, ANIMA CONVIVIALE</div>
          <h1 id="hero-title">Le cose buone.<br/>Le persone care.<br/><em>Senza fretta.</em></h1>
          <p>La pasta fatta in casa, un calice di vino, il piacere<br className="desktop-break"/> di ritrovarsi. Benvenuti da Sera.</p>
          <div className="hero-actions"><button className="button" onClick={openBooking}>Ti teniamo un posto <ArrowUpRight size={18}/></button><a className="text-link" href="#menu">Scopri il menu <ArrowRight size={17}/></a></div>
          <a className="hero-bottom" href="#storia"><span className="circle-arrow"><ArrowDown size={17}/></span> LA BELLEZZA DELLE COSE SEMPLICI</a>
        </div>
        <div className="hero-visual">
          <img src={asset("images/ristorante.jpg")} alt="Una tavola accogliente, tra calici di vino e piatti appena serviti" fetchPriority="high"/>
          <div className="photo-shade"/>
          <div className="hero-photo-label"><span>Un buon piatto.<br/><em>Un bel momento.</em></span><span className="photo-index">LA NOSTRA IDEA DI OSPITALITÀ</span></div>
          <div className="round-stamp"><span>FATTO CON CURA</span><Sun/><span>CONDIVISO CON AMORE</span></div>
        </div>
      </section>
      <div className="values-strip" aria-label="La nostra cucina"><span><Wheat/> Pasta fatta in casa</span><i/><span><Leaf/> Ingredienti di stagione</span><i/><span><Wine/> Vini scelti con passione</span><i/><span className="strip-last">A tavola, ci si sente a casa.</span></div>

      <section id="storia" className="story section-pad">
        <div className="story-heading"><span className="eyebrow">01 — LA NOSTRA FILOSOFIA</span><h2>Una cucina sincera.<br/>Una porta <em>sempre aperta.</em></h2></div>
        <div className="story-copy"><Sun className="story-sun"/><p>Ci piacciono le ricette che sanno di casa e gli ingredienti che seguono le stagioni. Le mani nella farina, i sughi che cuociono piano e le tavolate che si allungano.</p><p>Sera nasce da un’idea semplice: farvi stare bene, un piatto alla volta. Con la familiarità di un’osteria e la curiosità di provare qualcosa di nuovo.</p><a href="#atmosfera" className="text-link">Entra, accomodati <ArrowUpRight size={17}/></a></div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="section-heading"><div><span className="eyebrow">02 — DALLA NOSTRA CUCINA</span><h2>Il buono, <em>ogni giorno.</em></h2></div><p>Pochi ingredienti, scelti bene.<br/>Il resto lo fanno le mani e il tempo.</p></div>
        <div className="dish-grid">
          <article className="dish"><div className="dish-image"><img src={asset("images/pasta.jpg")} alt="Tagliatelle con manzo, funghi e pomodorini" loading="lazy"/><span className="dish-tag">IL PIATTO DI CASA</span></div><div className="dish-title"><h3>Tagliatelle dell’osteria</h3><span>18 €</span></div><p>Pasta all’uovo, manzo rosolato, funghi e pomodorini.</p></article>
          <article className="dish"><div className="dish-image"><img src={asset("images/pesto.jpg")} alt="Farfalle al pesto con pomodorini e basilico fresco" loading="lazy"/><span className="dish-tag"><Leaf size={12}/> VEGETARIANO</span></div><div className="dish-title"><h3>Farfalle al pesto fresco</h3><span>16 €</span></div><p>Basilico, pinoli, Parmigiano e il profumo dell’estate.</p></article>
          <article className="dish"><div className="dish-image"><img src={asset("images/dolce.jpg")} alt="Tortino al cioccolato con gelato alla vaniglia e caramello" loading="lazy"/><span className="dish-tag">UN FINALE FELICE</span></div><div className="dish-title"><h3>Cioccolato e caramello</h3><span>8 €</span></div><p>Tortino al cioccolato, gelato alla vaniglia e caramello.</p></article>
        </div>
        <div className="menu-bottom"><p>Un assaggio della nostra cucina. C’è molto altro da scoprire.</p><button className="button button-outline" onClick={()=>menuDialog.current?.showModal()}>Sfoglia il menu completo <ArrowUpRight size={18}/></button></div>
      </section>

      <section id="atmosfera" className="atmosphere">
        <div className="atmosphere-image"><img src={asset("images/sala.jpg")} alt="Una sala calda e luminosa, con tavoli in legno e piante" loading="lazy"/><span>IL TUO PROSSIMO POSTO DEL CUORE</span></div>
        <div className="atmosphere-copy"><span className="eyebrow">03 — IL PIACERE DI RESTARE</span><h2>Ci sono posti.<br/>E poi ci sono<br/><em>i bei momenti.</em></h2><p>La luce giusta, il legno dei tavoli, le chiacchiere che continuano. Un pranzo tranquillo, una cena a due o una serata con tutta la compagnia.</p><p>Da Sera, ogni occasione ha il suo posto.</p><button className="text-link" onClick={openBooking}>Trova il tuo tavolo <ArrowUpRight size={18}/></button></div>
      </section>

      <section id="contatti" className="contact section-pad">
        <div className="contact-intro"><span className="eyebrow">04 — CI VEDIAMO DA SERA</span><h2>Il tavolo è pronto.<br/><em>Manchi solo tu.</em></h2><p>Porta chi vuoi. Al resto pensiamo noi.</p><button className="button" onClick={openBooking}>Prenota un tavolo <ArrowUpRight size={18}/></button></div>
        <div className="contact-details"><div className="contact-block"><h3><MapPin size={18}/> Vieni a trovarci</h3><p>Via dei Sapori, 12<br/>20100 Milano</p><small>Indirizzo dimostrativo</small></div><div className="contact-block"><h3><Clock size={18}/> I nostri orari</h3><dl><div><dt>Martedì — Domenica</dt><dd>12:00–14:30<br/>19:00–23:00</dd></div><div><dt>Lunedì</dt><dd>Ci riposiamo</dd></div></dl></div><div className="contact-block contact-wide"><h3>Due parole, prima di venire?</h3><p>02 0000 0000 <span>·</span> ciao@osteriasera.example</p><small>Contatti di esempio, non attivi</small></div></div>
      </section>
      <section className="farewell"><Sun/><p>Le serate migliori iniziano <em>a tavola.</em></p><span>TI ASPETTIAMO.</span></section>
    </main>
    <footer><div className="footer-top"><a href="#" className="wordmark">sera<span>.</span><small>OSTERIA CONTEMPORANEA</small></a><p>Cucina italiana.<br/>Momenti da condividere.</p><a className="text-link" href="#">Torna su <ArrowUpRight size={16}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Osteria Sera · Concept dimostrativo</span><p>Nome, menu, prezzi, orari e contatti sono di esempio. Foto illustrative.</p><button onClick={()=>infoDialog.current?.showModal()}>Informazioni sul sito</button></div></footer>

    <dialog ref={menuDialog} className="menu-dialog" onClick={closeOnBackdrop} aria-labelledby="menu-dialog-title"><div className="dialog-inner"><button className="dialog-close icon-button" aria-label="Chiudi menu" onClick={()=>menuDialog.current?.close()}><X/></button><span className="eyebrow">IL MENU DI SERA</span><h2 id="menu-dialog-title">Scegli ciò che <em>ti va.</em></h2><div className="menu-tabs" role="tablist" aria-label="Categorie del menu">{(Object.keys(menu) as MenuCategory[]).map(cat=><button key={cat} id={`tab-${cat}`} role="tab" aria-selected={category===cat} aria-controls="menu-panel" tabIndex={category===cat?0:-1} onKeyDown={event=>changeTab(event,cat)} onClick={()=>setCategory(cat)}>{cat}</button>)}</div><div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${category}`} tabIndex={0}>{menu[category].map(dish=><article className="menu-row" key={dish.name}><div><h3>{dish.name}</h3><p>{dish.description}</p><small>Allergeni: {dish.allergens}</small></div><strong>{dish.price} €</strong></article>)}</div><p className="menu-note">Menu e prezzi dimostrativi · Coperto 2,50 € · Le informazioni sugli allergeni sono illustrative e vanno verificate con il personale del ristorante reale.</p><button className="button" onClick={()=>{menuDialog.current?.close();openBooking();}}>Un tavolo per assaggiare tutto <ArrowUpRight size={17}/></button></div></dialog>

    <dialog ref={bookingDialog} className="booking-dialog" onClick={closeOnBackdrop} aria-labelledby="booking-title"><div className="dialog-inner"><button className="dialog-close icon-button" aria-label="Chiudi prenotazione" onClick={()=>bookingDialog.current?.close()}><X/></button><span className="eyebrow">UN POSTO DA SERA</span><h2 id="booking-title">Mettiamoci <em>a tavola.</em></h2><p className="demo-notice">Questa è una dimostrazione. Puoi provare la scelta del tavolo, ma nessuna prenotazione verrà inviata.</p>{!bookingPreview?<form onSubmit={event=>{event.preventDefault();if(!date||date<today){setDateError("Scegli una data da oggi in poi.");return;}if(new Date(date+"T12:00:00").getDay()===1){setDateError("Il lunedì ci riposiamo. Scegli un altro giorno.");return;}setDateError("");setBookingPreview(true);}}><label htmlFor="booking-date">Quando vieni?<input id="booking-date" name="date" type="date" required min={today} value={date} onChange={event=>{setDate(event.target.value);setDateError("");}} aria-describedby={dateError?"date-error":undefined}/></label><div className="form-row"><label htmlFor="booking-time">A che ora?<select id="booking-time" name="time" value={time} onChange={event=>setTime(event.target.value)}>{["12:00","12:30","13:00","13:30","14:00","19:00","19:30","20:00","20:30","21:00","21:30"].map(t=><option key={t}>{t}</option>)}</select></label><label htmlFor="booking-guests">Quanti siete?<select id="booking-guests" name="guests" value={guests} onChange={event=>setGuests(event.target.value)}>{Array.from({length:8},(_,i)=>i+1).map(n=><option value={n} key={n}>{n} {n===1?"persona":"persone"}</option>)}</select></label></div>{dateError&&<p id="date-error" className="form-error" role="alert">{dateError}</p>}<p className="booking-help"><CalendarDays size={16}/> Da martedì a domenica, a pranzo e a cena.</p><button type="submit" className="button form-submit">Visualizza la richiesta <ArrowRight size={18}/></button></form>:<div className="booking-result"><span className="result-icon"><Check/></span><h3>Ecco la tua richiesta di esempio</h3><p>{new Date(date+"T12:00:00").toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}<br/>Ore {time} · {guests} {guests==="1"?"persona":"persone"}</p><strong>Nessun tavolo è stato prenotato.</strong><p className="result-note">In un sito reale, da qui potresti inviare la richiesta al ristorante.</p><button className="button button-outline" onClick={()=>setBookingPreview(false)}>Modifica la scelta</button></div>}</div></dialog>

    <dialog ref={infoDialog} className="info-dialog" onClick={closeOnBackdrop} aria-labelledby="info-title"><div className="dialog-inner"><button className="dialog-close icon-button" aria-label="Chiudi informazioni" onClick={()=>infoDialog.current?.close()}><X/></button><span className="eyebrow">INFORMAZIONI</span><h2 id="info-title">Un’osteria <em>da immaginare.</em></h2><p>Osteria Sera è un ristorante immaginario creato per presentare un esempio di sito vetrina. Menu, prezzi, indirizzo, orari e contatti sono illustrativi.</p><p>La scelta del tavolo è una simulazione locale: il sito non invia prenotazioni, non raccoglie i tuoi contatti e non conserva i dati inseriti. Non sono inclusi strumenti pubblicitari o di analisi. L’hosting può gestire dati tecnici necessari al servizio e all’accesso.</p><p>Le fotografie illustrative provengono da Unsplash e non ritraggono un locale chiamato Osteria Sera.</p></div></dialog>
  </>;
}
