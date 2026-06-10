function PageHeader({ title, tagline, extra }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-wc-gold/10">
      <div>
        <p className="text-wc-gold text-[10px] font-black uppercase tracking-[0.35em] mb-2 font-display">
          FIFA World Cup 2026
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-display text-white">
          {title}
        </h1>
      </div>
      <div className="flex flex-col items-start md:items-end gap-1">
        {tagline && (
          <p className="text-white/30 text-sm font-medium">{tagline}</p>
        )}
        {extra}
      </div>
    </div>
  )
}

export default PageHeader
