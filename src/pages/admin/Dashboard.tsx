import { Link } from "react-router-dom";
import { CalendarCheck, FileText, ImageIcon, ShieldCheck } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/admin/programari"
          className="group border rounded-2xl p-5 bg-white hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Programări
              </p>
              <p className="font-semibold text-lg">Calendar & listă</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Vizualizează programările pe zile, intervale și detalii de contact.
          </p>
        </Link>

        <Link
          to="/admin/articole"
          className="group border rounded-2xl p-5 bg-white hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Conținut
              </p>
              <p className="font-semibold text-lg">Educare și informare proprietar</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Creează, editează și gestionează materialele publicate pe site.
          </p>
        </Link>

        <div className="border rounded-2xl p-5 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Status
              </p>
              <p className="font-semibold text-lg">Autentificat</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Ai acces la programări, educare proprietar și galerie. Folosește meniul din stânga
            pentru navigare.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

