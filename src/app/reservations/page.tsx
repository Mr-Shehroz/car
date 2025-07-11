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
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reservations</h1>

        {loading ? (
          <p>Loading...</p>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <ul className="space-y-4">
            {reservations.map((r) => (
              <li key={r._id} className="bg-white shadow p-4 rounded border">
                <p><strong>Name:</strong> {r.fullName}</p>
                <p><strong>Email:</strong> {r.email}</p>
                <p><strong>Phone:</strong> {r.phone}</p>
                <p><strong>Car:</strong> {r.car}</p>
                <p><strong>Price per Day:</strong> ${r.carPriceperDay}</p>
                <p><strong>Pickup Date:</strong> {new Date(r.pickupDate).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {new Date(r.returnDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
