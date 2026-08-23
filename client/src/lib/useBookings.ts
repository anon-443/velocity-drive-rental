import { useEffect, useMemo, useState } from "react";
import { readStoredValue, type TripRecord, writeStoredValue } from "@/lib/velocityStore";

const BOOKING_KEY = "velocity-drive-bookings";

export function useBookings() {
  const [bookings, setBookings] = useState<TripRecord[]>(() => readStoredValue<TripRecord[]>(BOOKING_KEY, []));
  useEffect(() => { writeStoredValue(BOOKING_KEY, bookings); }, [bookings]);
  const sortedBookings = useMemo(() => [...bookings].sort((a, b) => (b.createdAt ?? b.pickupDate).localeCompare(a.createdAt ?? a.pickupDate)), [bookings]);
  const addBooking = (booking: TripRecord) => setBookings((current) => [booking, ...current.filter((item) => item.id !== booking.id)].slice(0, 24));
  const cancelBooking = (id: string) => setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status: "Cancelled" } : booking));
  const clearBookings = () => setBookings([]);
  return { bookings: sortedBookings, addBooking, cancelBooking, clearBookings };
}
