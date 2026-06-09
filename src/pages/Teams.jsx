import { useState } from 'react'

const teams = [
  { flag: '🇵🇹', name: 'Portugal', group: 'Group B', rank: 6, keyPlayer: 'Cristiano Ronaldo', style: 'Attack', form: ['W', 'W', 'W', 'D', 'W'] },
  { flag: '🇫🇷', name: 'France', group: 'Group D', rank: 2, keyPlayer: 'Kylian Mbappé', style: 'Attack', form: ['W', 'W', 'D', 'W', 'W'] },
  { flag: '🇧🇷', name: 'Brazil', group: 'Group G', rank: 4, keyPlayer: 'Vinicius Jr.', style: 'Attack', form: ['W', 'D', 'W', 'W', 'L'] },
  { flag: '🇦🇷', name: 'Argentina', group: 'Group C', rank: 1, keyPlayer: 'Lionel Messi', style: 'Press', form: ['W', 'W', 'W', 'W', 'D'] },
  { flag: '🇪🇸', name: 'Spain', group: 'Group B', rank: 7, keyPlayer: 'Pedri', style: 'Possession', form: ['W', 'D', 'W', 'L', 'W'] },
  { flag: '🇩🇪', name: 'Germany', group: 'Group E', rank: 15, keyPlayer: 'Jamal Musiala', style: 'Press', form: ['L', 'W', 'W', 'D', 'W'] },
  { flag: '🇬🇧', name: 'England', group: 'Group F', rank: 5, keyPlayer: 'Jude Bellingham', style: 'Counter', form: ['W', 'W', 'D', 'W', 'D'] },
  { flag: '🇲🇦', name: 'Morocco', group: 'Group F', rank: 14, keyPlayer: 'Achraf Hakimi', style: 'Defence', form: ['W', 'D', 'W', 'W', 'L'] },
]

const formColor = {
  W: 'bg-green-400 text-black',
  D: 'bg-white/20 text-white',
  L: 'bg-red-500/80 text-white',
}

function Teams() {
  const [search, setSearch] = useState('')

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Teams
        </h1>
        <p className="text-white/30 text-xl font-medium">
          every nation. every squad.
        </p>
      </div>

      <input
        type="text"
        placeholder="search a team..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 text-white placeholder-white/20 font-bold text-lg outline-none focus:border-green-400/50 transition-all duration-200 mb-8"
      />

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(team => (
          <div
            key={team.name}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 rounded-3xl px-8 py-6 flex items-center justify-between transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <span className="text-5xl">{team.flag}</span>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{team.name}</h2>
                <p className="text-white/30 text-sm font-bold uppercase tracking-widest mt-0.5">{team.group} · rank #{team.rank}</p>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-center">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">form</p>
                <div className="flex gap-1.5">
                  {team.form.map((result, i) => (
                    <span key={i} className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${formColor[result]}`}>
                      {result}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">key player</p>
                <p className="font-black text-base">{team.keyPlayer}</p>
              </div>

              <div className="text-center">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">style</p>
                <p className="font-black text-base text-green-400">{team.style}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Teams