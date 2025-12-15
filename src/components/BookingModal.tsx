import { useEffect, useMemo, useState } from "react";
import {
  Appointment,
  createAppointment,
  generateSlotsForDate,
  getAvailableSlots,
  isWorkingDay,
} from "@/lib/appointments";
import { Calendar, Clock, PawPrint, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  pet_name: string;
  species: string;
  notes: string;
  date: string;
  slot: string;
};

const initialForm = (date: string): FormState => ({
  full_name: "",
  phone: "",
  email: "",
  pet_name: "",
  species: "",
  notes: "",
  date,
  slot: "",
});

function nextWorkingISO(base: Date) {
  const d = new Date(base);
  for (let i = 0; i < 7; i++) {
    if (isWorkingDay(d)) {
      return d.toISOString().split("T")[0];
    }
    d.setDate(d.getDate() + 1);
  }
  return base.toISOString().split("T")[0];
}

export default function BookingModal({ open, onClose }: Props) {
  const initialDate = useMemo(
    () => nextWorkingISO(new Date()),
    []
  );
  const [form, setForm] = useState<FormState>(() => initialForm(initialDate));
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setForm(initialForm(initialDate));
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [open, initialDate]);

  const loadSlots = async (date: string) => {
    setLoadingSlots(true);
    setErrorMsg(null);
    try {
      const slots = await getAvailableSlots(date);
      setAvailableSlots(slots);
      // set first slot default if exists
      setForm((prev) => ({
        ...prev,
        date,
        slot: slots[0] ?? "",
      }));
    } catch (err: any) {
      setErrorMsg(err?.message || "Nu am putut încărca intervalele.");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadSlots(initialDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "date") {
      loadSlots(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!form.slot) {
      setErrorMsg("Te rugăm să alegi un interval orar.");
      return;
    }
    if (!isWorkingDay(new Date(form.date))) {
      setErrorMsg("Selectează o zi lucrătoare (luni-sâmbătă).");
      return;
    }

    const [h, m] = form.slot.split(":").map(Number);
    const endHour = h + 1;
    const payload: Omit<Appointment, "id"> = {
      full_name: form.full_name,
      phone: form.phone,
      email: form.email || null,
      pet_name: form.pet_name || null,
      species: form.species || null,
      notes: form.notes || null,
      date: form.date,
      start_time: form.slot,
      end_time: `${endHour.toString().padStart(2, "0")}:${(m || 0)
        .toString()
        .padStart(2, "0")}`,
      status: "booked",
    };

    setSubmitting(true);
    try {
      await createAppointment(payload);
      setSuccessMsg("Programarea a fost înregistrată.");
      await loadSlots(form.date);
      setForm((prev) => ({ ...prev, notes: "", slot: "" }));
    } catch (err: any) {
      setErrorMsg(err?.message || "Nu am putut salva programarea.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const working = generateSlotsForDate(new Date(form.date)).length > 0;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white/95 backdrop-blur border border-border rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Programează o consultație</h2>
            <p className="text-sm text-gray-600 mt-1">
              Alege ziua și un interval liber de 1 oră. Program: Luni-Sâmbătă, 09:00 - 18:00.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
                <Clock className="w-3 h-3" /> Slot: 60 min
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100">
                <Calendar className="w-3 h-3" /> Luni - Sâmbătă
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nume *</label>
              <input
                name="full_name"
                required
                value={form.full_name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefon *</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Specie</label>
              <input
                name="species"
                value={form.species}
                onChange={handleChange}
                placeholder="Câine / Pisică / Altul"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nume animal</label>
              <input
                name="pet_name"
                value={form.pet_name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data *</label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                min={initialDate}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Interval disponibil *
              </label>
              {loadingSlots ? (
                <p className="text-sm text-gray-500">Se încarcă intervalele...</p>
              ) : !working ? (
                <p className="text-sm text-red-600">
                  Duminică este închis. Alege o zi lucrătoare.
                </p>
              ) : availableSlots.length === 0 ? (
                <p className="text-sm text-red-600">
                  Nu mai sunt intervale libere în această zi.
                </p>
              ) : (
                <select
                  name="slot"
                  value={form.slot}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                >
                  <option value="">Selectează un interval</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} - {`${(Number(slot.split(":")[0]) + 1)
                        .toString()
                        .padStart(2, "0")}:00`}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Detalii adiționale
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Simptome, preferințe, alte detalii"
            />
          </div>

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting || loadingSlots}
              className="btn-accent px-4 py-2 h-auto rounded-xl disabled:opacity-60"
            >
              {submitting ? "Se trimite..." : "Programează"}
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

