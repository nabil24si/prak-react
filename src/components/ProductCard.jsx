import Card from "./Card";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card>
      <div className="overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-1">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mb-3 font-medium">
          {category}
        </span>

        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-blue-600">
            {price}
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Detail
          </button>
        </div>
      </div>
    </Card>
  );
}