export default function PhotoGallery({ photos = [] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Photos
      </h3>
      {photos.length === 0 ? (
        <p className="text-gray-500">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-sm">
              <img
                src={src}
                alt={`Photo ${index + 1}`}
                className="object-cover w-full h-40 hover:scale-108 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
