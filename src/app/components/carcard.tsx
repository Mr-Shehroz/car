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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 2xl:p-4 p-3 flex flex-col">
      {/* Image container */}
      <div className="relative w-full 2xl:h-96 lg:h-52 h-36 overflow-hidden rounded-xl mb-4 bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
        <span
          className={`absolute top-2 right-2 px-3 py-1 lg:text-xs text-[9px] font-semibold rounded-full ${
            car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {car.available ? 'Available' : 'Not Available'}
        </span>
      </div>

      {/* Car Info */}
      <h2 className="2xl:text-lg lg:text-[16px] text-[14px] font-semibold text-gray-800">{car.name}</h2>
      <p className="text-gray-500 2xl:text-[16px] lg:text-[14px] text-[12px]">
        Brand: <span className="text-gray-700">{car.brand}</span>
      </p>
      <p className="text-gray-500 2xl:text-[16px] lg:text-[14px] text-[12px]">
        Price/Day: <span className="text-purple-700 font-medium">${car.pricePerDay}</span>
      </p>
    </div>
  )
}
