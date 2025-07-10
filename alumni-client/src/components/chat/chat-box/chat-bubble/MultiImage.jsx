import React from "react";
import Avatar from "./multi-image/Avatar.jsx";
import Header from "./multi-image/Header.jsx";
import ImageWithOverlay from "./multi-image/ImageWithOverlay.jsx";
import ImageOverlayMore from "./multi-image/ImageOverlayMore.jsx";
import Footer from "./multi-image/Footer.jsx";
import { useUserStore } from "../../../../store/useUserStore";
import { formatSmartDateTime } from "../../../../bin/DateTime.js";
function MultiImage({ message }) {
  const visibleImages = message.images.slice(0, 3);
  const remainingCount = message.images.length - 3;
  const hasMore = remainingCount > 0;
  const { authUser } = useUserStore();
  const [textOwner, setTextOwner] = React.useState();

  React.useEffect(() => {
    async function fetchUser(id) {
      try {
        const res = await fetch(`/api/user/info/${id}`);
        const data = await res.json();
        setTextOwner(data.user);
      } catch (err) {
        console.log(err);
      }
    }

    if (message.senderId === authUser._id) {
      setTextOwner(authUser);
    } else {
      fetchUser(message.senderId);
    }
  }, [message]);

  const isSender = message.senderId === authUser._id;
  return (
    <div
      className={`flex ${
        isSender ? "flex-row-reverse" : ""
      } items-start gap-2.5`}>
      <Avatar
        src={textOwner?.image || "./avatar.png"}
        alt={`${textOwner?.name || "john"}'s image`}
      />

      <div className="flex flex-col gap-2.5">
        <Header
          name={textOwner?.name || "john"}
          time={formatSmartDateTime(message.createdAt)}
        />

        <div className="leading-1.5 flex w-full max-w-[320px] flex-col">
          <p className="text-sm max-h-max text-wrap font-normal text-gray-900 dark:text-white">
            {message.text}
          </p>

          <div className="grid gap-4 grid-cols-2 mt-2">
            {visibleImages.map((img, index) => (
              <ImageWithOverlay
                key={index}
                src={img}
                tooltipId={`download-image-${index + 1}`}
              />
            ))}
            {hasMore && (
              <ImageOverlayMore
                src={message.images[3]}
                count={remainingCount}
              />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default MultiImage;
