import { useEffect, useMemo, useState } from "react";
import {
  Appointment,
  fetchAppointmentsRange,
  isWorkingDay,
} from "@/lib/appointments";
import { RefreshCw, Pencil } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import EditAppointmentModal from "@/components/admin/EditAppointmentModal";

type DayGroup = {
  date: string;
  items: Appointment[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AdminAppointments() {
  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [from, setFrom] = useState(todayIso);
  const [to, setTo] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await fetchAppointmentsRange(from, to);
    if (error) {
      setError("Nu am putut încărca programările.");
      setItems([]);
    } else {
      setItems((data as Appointment[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const sorted = [...items].sort((a, b) =>
    a.date === b.date
      ? a.start_time.localeCompare(b.start_time)
      : a.date.localeCompare(b.date)
  );
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const grouped = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    paged.forEach((a) => {
      if (!map.has(a.date)) map.set(a.date, []);
      map.get(a.date)!.push(a);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map<DayGroup>(([date, list]) => ({
        date,
        items: list.sort((x, y) =>
          x.start_time < y.start_time ? -1 : x.start_time > y.start_time ? 1 : 0
        ),
      }));
  }, [paged]);

  return (
    <AdminLayout title="Programări">
      <EditAppointmentModal
        open={modalOpen}
        appointment={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSaved={load}
      />
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <span>Interval: {from} → {to}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">De la</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Până la</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Reîncarcă
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <span>
          Pagina {safePage} / {totalPages} ({items.length} programări)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-3 py-1 border rounded disabled:opacity-60"
          >
            ‹ Înapoi
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-60"
          >
            Înainte ›
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Se încarcă programările...</p>
      ) : !grouped.length ? (
        <p className="text-gray-600">Nu există programări în interval.</p>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => {
            const closed = !isWorkingDay(new Date(group.date));
            return (
              <div key={group.date} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{formatDate(group.date)}</h3>
                    {closed && (
                      <p className="text-xs text-red-600">
                        Duminică – închis (programările au fost introduse manual).
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {group.items.length} programări
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left border-b">
                      <tr>
                        <th className="py-2 pr-4">Interval</th>
                        <th className="py-2 pr-4">Pacient</th>
                        <th className="py-2 pr-4">Contact</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Detalii</th>
                        <th className="py-2 pr-4">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((a) => (
                        <tr key={a.id} className="border-b last:border-0">
                          <td className="py-2 pr-4 whitespace-nowrap font-medium">
                            {a.start_time} - {a.end_time}
                          </td>
                          <td className="py-2 pr-4">
                            <div className="font-medium">{a.full_name}</div>
                            {a.pet_name && (
                              <div className="text-xs text-gray-600">
                                {a.pet_name} {a.species ? `(${a.species})` : ""}
                              </div>
                            )}
                          </td>
                          <td className="py-2 pr-4">
                            <div>{a.phone}</div>
                            {a.email && (
                              <div className="text-xs text-gray-600">{a.email}</div>
                            )}
                          </td>
                          <td className="py-2 pr-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                a.status === "completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : a.status === "canceled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {a.status || "booked"}
                            </span>
                          </td>
                          <td className="py-2 pr-4 max-w-[320px]">
                            <div className="text-xs text-gray-600 whitespace-pre-line">
                              {a.notes || "—"}
                            </div>
                          </td>
                          <td className="py-2 pr-4">
                            <button
                              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                              onClick={() => {
                                setEditing(a);
                                setModalOpen(true);
                              }}
                            >
                              <Pencil className="w-3 h-3" />
                              Editează
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

