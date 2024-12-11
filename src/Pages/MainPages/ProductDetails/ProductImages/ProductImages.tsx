import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import gallery styles

interface images {
    original: string;
    thumbnail: string;
    description: string;
}
const ProductImages = ({images}:{images:images[]}) => {
    return (
        <>
              <Gallery items={images} thumbnailPosition={"left"}/>
        </>
    );
};

export default ProductImages;