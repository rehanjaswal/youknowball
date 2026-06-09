# youknowball ⚽

> Live scores, player stats, and deep football analytics for the 2026 FIFA World Cup.

Built for people who actually watch the game — not just the scoreline.

---

## What It Does

**youknowball** is a real-time football analytics web app covering every match of the 2026 FIFA World Cup. No fluff, just data and design.

- **Live Scores** — Every match, live. Auto-refreshes so you never miss a goal.
- **Top Scorers & Assisters** — Live golden boot and assist race, updated after every game.
- **Head-to-Head Player Comparison** — Pick any two players from the tournament and compare their stats side by side with visual charts.
- **Dark Horses** — Data-backed spotlight on the teams most likely to surprise everyone.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite |
| Routing | React Router |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Data | API-Football / worldcup26.ir |
| Deployment | Vercel |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/youknowball.git
cd youknowball

# Install dependencies
npm install

# Add your API key
cp .env.example .env
# → paste your API-Football key into .env

# Run locally
npm run dev
```

Open `http://localhost:5173` and you're in.

---

## Environment Variables

```
VITE_API_KEY=your_api_football_key_here
VITE_API_BASE_URL=https://v3.football.api-sports.io
```

Get a free API key at [api-football.com](https://www.api-football.com).

---

## Project Structure

```
youknowball/
├── src/
│   ├── api/          # All API fetch calls in one place
│   ├── components/   # Reusable UI components
│   ├── pages/        # LiveScores, TopStats, H2H, DarkHorses
│   ├── utils/        # Helpers, formatters
│   └── App.jsx
├── public/
└── ...
```

---

## Roadmap

- [x] Live scores with auto-refresh
- [x] Top scorers and assisters leaderboard
- [x] H2H player comparison with radar charts
- [x] Dark horses tracker
- [ ] Match timeline / key events
- [ ] Group stage simulator
- [ ] Push notifications for goals

---

## About

Made by [Rehan Jaswal](https://github.com/rehanjaswal) — a football fan who got tired of ugly stats websites.

Portugal to win it. Not up for debate.

---

## License

MIT
