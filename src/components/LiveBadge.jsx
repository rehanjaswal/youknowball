function LiveBadge({ elapsed }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-400/40">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-green-400 text-[10px] font-black uppercase tracking-widest font-display">
        {elapsed}
      </span>
    </span>
  )
}

export default LiveBadge
