type Car = {
  image: string;
  name: string;
  brand: string;
  pricePerDay: number;
  available: boolean;
};

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col">
      {/* Image container */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl mb-4 bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <span
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
            car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {car.available ? 'Available' : 'Not Available'}
        </span>
      </div>

      {/* Car Info */}
      <h2 className="text-lg font-semibold text-gray-800">{car.name}</h2>
      <p className="text-gray-500">
        Brand: <span className="text-gray-700">{car.brand}</span>
      </p>
      <p className="text-gray-500">
        Price/Day: <span className="text-purple-700 font-medium">${car.pricePerDay}</span>
      </p>
    </div>
  )
}
