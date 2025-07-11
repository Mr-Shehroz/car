"use client"
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import CarCard from '../components/carcard'
import { client } from '@/sanity/lib/client'

type Car = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  pricePerDay: number;
  available: boolean;
};

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    const fetchCars = async () => {
      const data = await client.fetch(`*[_type == "car"]{
        _id,
        name,
        brand,
        "image": image.asset->url,
        pricePerDay,
        available
      }`)
      setCars(data)
    }

    fetchCars()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="p-6 grid md:grid-cols-2 gap-6">
        {cars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </main>
    </div>
  )
}
