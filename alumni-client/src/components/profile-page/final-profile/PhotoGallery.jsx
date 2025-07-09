export default function PhotoGallery() {
    const photos = [
        "https://images.pexels.com/photos/193821/pexels-photo-193821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/30554496/pexels-photo-30554496/free-photo-of-sparrow-perched-on-bare-winter-branches.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/460295/pexels-photo-460295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Photos</h3>
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
