---
# Fullstack Bun Project

This project is a fullstack application built with [Bun](https://bun.sh/), containing separate frontend and backend apps running in parallel.
---

## ⚙️ Requirements

-   [Bun](https://bun.sh/) installed (version 1.0+)
-   Git Bash or WSL for running `.sh` scripts (or use `dev.bat` on Windows)

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/WolfHunter-HKIT/announcement-board.git
cd announcement-board
```

### 2. Install dependencies

Install all dependencies from both frontend and backend:

```
cd frontend && bun install
cd ../backend && bun install
```

---

## 🧪 Development

### 🔁 Start both frontend and backend

#### On **Git Bash / WSL / Linux / macOS**:

```
./dev.sh
```

#### On **Windows CMD / PowerShell**:

```
dev.bat
```

This will start both servers in parallel, each in its own terminal or process.

---

## 📦 Scripts

Each app includes its own scripts, typically located in `package.json` or `bunfig.toml`.

Common commands:

-   `bun run dev` — Start development server
-   `bun run build` — Build the project
-   `bun run lint` — Run linter (if configured)
-   `bun run test` — Run tests (if any)

---

## 💡 Database Configuration

### If self-hosting your database:

Don't forget to update the database connection pool settings in `/backend/server.js` to reflect your local or hosted database configuration.

## 🧹 Cleaning Up

If you're using processes started in the background, you may need to kill them manually:

-   On Windows: Use Task Manager or `taskkill`
-   On Unix systems: `kill` the PIDs or close the terminal

---

## 📝 License

MIT © TwinWolf

---
