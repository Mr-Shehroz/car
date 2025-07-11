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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-8">
          Book a Car
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 grid gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="fullName"
              value={form.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md w-full"
            />
          </div>

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-md w-full"
          />

          <select
            name="carSelect"
            onChange={handleCarChange}
            value={cars.find(c => c.name === form.car)?._id || ''}
            required
            className="border border-gray-300 p-3 rounded-md w-full bg-white"
          >
            <option value="">Choose a car</option>
            {cars.map(car => (
              <option key={car._id} value={car._id}>
                {car.name} ({car.brand}) - ${car.pricePerDay}/day
              </option>
            ))}
          </select>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="pickupDate"
              type="date"
              value={form.pickupDate}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              name="returnDate"
              type="date"
              value={form.returnDate}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>

          {success === true && (
            <p className="text-green-600 text-sm mt-2">Booking submitted successfully!</p>
          )}
          {success === false && (
            <p className="text-red-600 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </main>
    </div>
  )
}
