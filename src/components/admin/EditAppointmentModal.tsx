import { useEffect, useState } from "react";
import {
  APPOINTMENT_STATUSES,
  Appointment,
  getAvailableSlots,
  isWorkingDay,
  updateAppointment,
} from "@/lib/appointments";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditAppointmentModal({
  open,
  appointment,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Appointment | null>(appointment);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setForm(appointment);
    setErrorMsg(null);
    if (appointment?.date) {
      loadSlots(appointment.date, appointment.start_time);
    } else {
      setSlots([]);
    }
  }, [appointment]);

  const loadSlots = async (date: string, keepSlot?: string) => {
    setLoadingSlots(true);
    try {
      let available = await getAvailableSlots(date);
      if (keepSlot && !available.includes(keepSlot)) {
        available = [keepSlot, ...available];
      }
      setSlots(available);
    } catch (err: any) {
      setSlots([]);
      setErrorMsg(err?.message || "Nu am putut încărca sloturile.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (name === "date") {
      loadSlots(value, next.start_time);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setErrorMsg(null);

    if (!isWorkingDay(new Date(form.date))) {
      setErrorMsg("Selectează o zi lucrătoare (luni-sâmbătă).");
      return;
    }
    if (!form.start_time) {
      setErrorMsg("Alege un interval orar.");
      return;
    }
    setSaving(true);
    try {
      const [h, m] = form.start_time.split(":").map(Number);
      const end_hour = (h + 1).toString().padStart(2, "0");
      await updateAppointment(form.id, {
        full_name: form.full_name,
        phone: form.phone,
        email: form.email || null,
        pet_name: form.pet_name || null,
        species: form.species || null,
        notes: form.notes || null,
        date: form.date,
        start_time: form.start_time,
        end_time: `${end_hour}:${(m || 0).toString().padStart(2, "0")}`,
        status: form.status || "booked",
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Nu am putut salva modificările.");
    } finally {
      setSaving(false);
    }
  };

  if (!open || !form) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-2">Editează programarea</h2>
        <p className="text-sm text-gray-600 mb-4">ID: {form.id}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nume *</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefon *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Specie</label>
              <input
                name="species"
                value={form.species || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nume animal</label>
              <input
                name="pet_name"
                value={form.pet_name || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Interval disponibil *
              </label>
              {loadingSlots ? (
                <p className="text-sm text-gray-500">Se încarcă...</p>
              ) : !isWorkingDay(new Date(form.date)) ? (
                <p className="text-sm text-red-600">
                  Duminică este închis. Alege o zi lucrătoare.
                </p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-red-600">Nu sunt intervale libere.</p>
              ) : (
                <select
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {s} - {`${(Number(s.split(":")[0]) + 1)
                        .toString()
                        .padStart(2, "0")}:00`}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status || "booked"}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                {APPOINTMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Detalii</label>
            <textarea
              name="notes"
              value={form.notes || ""}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || loadingSlots}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Se salvează..." : "Salvează"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:underline"
            >
              Anulează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

