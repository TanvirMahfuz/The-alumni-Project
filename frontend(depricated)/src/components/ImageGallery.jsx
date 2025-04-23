import React, {useEffect} from "react";
export function ImageGallery({imageList}) {
  const [active, setActive] = React.useState(
    imageList.length > 0
      ? imageList[0].imagelink
      : "https://via.placeholder.com/300"
  );
  useEffect(() => {
    if (imageList.length > 0) {
      setActive(imageList[0].imagelink);
    }
  }, [imageList]);

  return (
    <div className="grid gap-4 rounded-tl-3xl rounded-tr-3xl">
      <div>
        <img
          className="h-auto bg-gray-900 w-full p-4 mb-0 max-w-full rounded-xl object-contain object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
      {imageList.length >1 && (<div className="flex justify-start gap-3 bg-gray-900 p-3 rounded-2xl overflow-x-auto shadow-3xl">
        {imageList.map(({imagelink}, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imagelink)}
              src={imagelink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>)}
      
    </div>
  );
}
