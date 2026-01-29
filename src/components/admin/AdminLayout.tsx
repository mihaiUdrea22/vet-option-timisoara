import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, FileText, ImageIcon, LayoutDashboard, Menu, X } from "lucide-react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Programări", href: "/admin/programari", icon: CalendarCheck },
  { label: "Educare și informare proprietar", href: "/admin/articole", icon: FileText },
  { label: "Galerie", href: "/admin/galerie", icon: ImageIcon },
];

export default function AdminLayout({ title, children }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 flex items-center px-4 border-b">
            <span className="text-lg font-semibold">Admin</span>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-h-screen lg:pl-64">
          <header className="h-16 flex items-center justify-between px-4 border-b bg-white sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md border hover:bg-slate-100"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle nav"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

