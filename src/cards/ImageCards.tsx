import { ImageGallery } from "../Types/GlobalTypes";

interface ImageCards extends ImageGallery {
  className?: string;
  onClick?: (id: string | number) => void;
}

const ImageCards = ({
  id,
  isSelected,
  slug,
  onClick,
  className,
}: ImageCards) => {
  return (
    <div>
      <img src={slug} alt="" />
    </div>
  );
};

export default ImageCards;
