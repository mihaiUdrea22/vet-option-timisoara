import { supabase } from "./supabaseClient";

export type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  pet_name?: string | null;
  species?: string | null;
  notes?: string | null;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  status?: string | null;
  created_at?: string;
};

// Program: Luni-Sâmbătă, 09:00 - 18:00, slot 60 min. Duminica închis.
const WORK_START = 9;
const WORK_END = 18;
const SLOT_MINUTES = 60;

export function isWorkingDay(date: Date) {
  const day = date.getDay(); // 0 duminică
  return day >= 1 && day <= 6;
}

export function generateSlotsForDate(date: Date) {
  if (!isWorkingDay(date)) return [] as string[];
  const slots: string[] = [];
  for (let h = WORK_START; h < WORK_END; h++) {
    const hour = h.toString().padStart(2, "0");
    slots.push(`${hour}:00`);
  }
  return slots;
}

export async function fetchAppointmentsByDate(date: string) {
  return supabase
    .from("appointments")
    .select("*")
    .eq("date", date)
    .order("start_time", { ascending: true });
}

export async function fetchAppointmentsRange(from: string, to: string) {
  return supabase
    .from("appointments")
    .select("*")
    .gte("date", from)
    .lte("date", to)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
}

export async function getAvailableSlots(date: string) {
  const baseSlots = generateSlotsForDate(new Date(date));
  if (!baseSlots.length) return [];

  const { data, error } = await fetchAppointmentsByDate(date);
  if (error || !data) return baseSlots;

  const booked = new Set((data as Appointment[]).map((a) => a.start_time));
  return baseSlots.filter((s) => !booked.has(s));
}

export async function createAppointment(payload: Omit<Appointment, "id">) {
  // verificare conflict simplă: start_time deja ocupat în acea zi
  const { data: existing, error: fetchError } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", payload.date)
    .eq("start_time", payload.start_time)
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }
  if (existing) {
    throw new Error("Acest interval este deja rezervat.");
  }

  const { error } = await supabase.from("appointments").insert(payload);
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateAppointment(
  id: string,
  payload: Partial<Omit<Appointment, "id">>
) {
  if (payload.date && payload.start_time) {
    const { data: existing, error: fetchError } = await supabase
      .from("appointments")
      .select("id")
      .eq("date", payload.date)
      .eq("start_time", payload.start_time)
      .neq("id", id)
      .limit(1)
      .maybeSingle();

    if (fetchError) throw new Error(fetchError.message);
    if (existing) throw new Error("Acest interval este deja rezervat.");
  }

  const { error } = await supabase.from("appointments").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateAppointmentStatus(id: string, status: string) {
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}

export const APPOINTMENT_STATUSES = ["booked", "completed", "canceled"] as const;

