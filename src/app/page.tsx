import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-6 text-center">
        <h1 className="text-4xl font-bold text-purple-800">Welcome to Rent-a-Car</h1>
        <p className="mt-4 text-lg">Book your ride easily and quickly</p>
      </main>
    </div>
  )
}
