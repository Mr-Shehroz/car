'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

type Reservation = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  car: string;
  carPriceperDay: number;
  pickupDate: string;
  returnDate: string;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('/api/submit') // calls GET route
        const data = await res.json()
        setReservations(data)
      } catch (err) {
        console.error('Failed to fetch:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-8 text-center">
          Reservations
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-gray-500">No reservations found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reservations.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">{r.car}</h2>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Name:</strong> {r.fullName}</p>
                  <p><strong>Email:</strong> {r.email}</p>
                  <p><strong>Phone:</strong> {r.phone}</p>
                  <p><strong>Price/Day:</strong> ${r.carPriceperDay}</p>
                  <p><strong>Pickup:</strong> {new Date(r.pickupDate).toLocaleDateString()}</p>
                  <p><strong>Return:</strong> {new Date(r.returnDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
