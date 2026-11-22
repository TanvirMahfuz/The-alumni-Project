const ImageOverlayMore = ({ count, src }) => (
  <div className="group relative">
    <button className="absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
      <span className="text-xl font-medium text-white">+{count}</span>
    </button>
    <img src={src} className="rounded-lg" />
  </div>
);
export default ImageOverlayMore;
