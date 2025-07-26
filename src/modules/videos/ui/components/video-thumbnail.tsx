import Image from "next/image";

export const VideoThumbnail = () => {
  return (
    <div className="relative">
      {/* Thubnail wrapper*/}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image src="/placeholder.svg" alt="Thumbnail" fill className="size-full object-cover" />
      </div>

      {/* Video duraiton box */}
      {/* TODO: Add video duration box */}
    </div>
  );
};
