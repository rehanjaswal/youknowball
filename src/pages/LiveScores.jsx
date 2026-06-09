function LiveScores() {
  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Live<br />Scores
        </h1>
        <p className="text-white/30 text-xl font-medium">
          Every match. Every goal. Real time.
        </p>
      </div>

      <div className="flex gap-3 mb-10">
        {['All', 'Live', 'Today', 'Upcoming', 'Finished'].map(filter => (
          <button
            key={filter}
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200 first:bg-green-400 first:text-black first:border-green-400"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[
          { home: '🇵🇹', homeName: 'Portugal', away: '🇪🇸', awayName: 'Spain', score: '2 — 1', status: 'live', time: "67'" },
          { home: '🇧🇷', homeName: 'Brazil', away: '🇦🇷', awayName: 'Argentina', score: '0 — 0', status: 'live', time: "23'" },
          { home: '🇫🇷', homeName: 'France', away: '🇩🇪', awayName: 'Germany', score: '— —', status: 'upcoming', time: '21:00' },
        ].map((match, i) => (
          <div
            key={i}
            className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 rounded-3xl p-8 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {match.status === 'live' && (
              <div className="absolute inset-0 bg-green-400/[0.03] rounded-3xl" />
            )}

            <div className="relative flex items-center justify-between gap-8">

              <div className="flex items-center gap-5 flex-1">
                <span className="text-5xl">{match.home}</span>
                <span className="text-2xl font-black uppercase tracking-tight">{match.homeName}</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[140px]">
                <span className="text-5xl font-black tracking-tighter">{match.score}</span>
                {match.status === 'live' ? (
                  <span className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {match.time}
                  </span>
                ) : (
                  <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{match.time}</span>
                )}
              </div>

              <div className="flex items-center gap-5 flex-1 justify-end">
                <span className="text-2xl font-black uppercase tracking-tight">{match.awayName}</span>
                <span className="text-5xl">{match.away}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveScores