import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-900 leading-tight">
            Welcome to <span className="text-purple-700">Rent-a-Car</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700">
            Book your ride easily, quickly, and affordably with just a few clicks.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="/cars"
              className="bg-purple-700 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-purple-800 transition"
            >
              Browse Cars
            </a>
            <a
              href="/book"
              className="border border-purple-700 text-purple-700 px-6 py-3 rounded-md text-sm font-semibold hover:bg-purple-700 hover:text-white transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
