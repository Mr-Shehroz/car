import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-purple-900 text-white p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/cars">Cars</Link>
      <Link href="/book">Book Now</Link>
      <Link href="/reservations">Reservations</Link>
    </nav>
  )
}
