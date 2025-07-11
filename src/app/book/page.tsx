'use client'

import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'

export default function Book() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    car: '',
    carPriceperDay: ''
  })

  type Car = {
    _id: string
    name: string
    brand: string
    pricePerDay: number
  }
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)

  // Fetch cars from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      const data = await client.fetch(`*[_type == "car"]{
        _id,
        name,
        brand,
        pricePerDay
      }`)
      setCars(data)
    }
    fetchCars()
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle car dropdown separately
  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = cars.find(c => c._id === e.target.value)
    if (selected) {
      setForm({
        ...form,
        car: selected.name,
        carPriceperDay: String(selected.pricePerDay)
      })
    }
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setSuccess(true)
        setForm({
          fullName: '',
          email: '',
          phone: '',
          pickupDate: '',
          returnDate: '',
          car: '',
          carPriceperDay: ''
        })
      } else {
        setSuccess(false)
      }
    } catch (err) {
      console.error('Error submitting:', err)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Book a Car</h1>

        <form className="grid gap-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
          <input
            name="fullName"
            value={form.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          {/* Car Selection Dropdown */}
          <select
            name="carSelect"
            onChange={handleCarChange}
            value={cars.find(c => c.name === form.car)?._id || ''}
            required
            className="border p-2 rounded"
          >
            <option value="">Choose a car</option>
            {cars.map(car => (
              <option key={car._id} value={car._id}>
                {car.name} ({car.brand}) - ${car.pricePerDay}/day
              </option>
            ))}
          </select>

          <input
            name="pickupDate"
            type="date"
            value={form.pickupDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="returnDate"
            type="date"
            value={form.returnDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Book Now'}
          </button>

          {/* Feedback Messages */}
          {success === true && (
            <p className="text-green-600">Booking submitted successfully!</p>
          )}
          {success === false && (
            <p className="text-red-600">Failed to submit. Please try again.</p>
          )}
        </form>
      </main>
    </div>
  )
}
