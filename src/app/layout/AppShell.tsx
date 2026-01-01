import { NavLink, Outlet } from "react-router-dom";

const linkBase = "text-sm text-zinc-600 hover:text-zinc-900";
const linkActive = "text-sm font-semibold text-zinc-900";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-zinc-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Personal Dev Dashboard</div>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </header>

      {/* <main className="mx-auto max-w-6xl px-4 py-6"> */}
        <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
