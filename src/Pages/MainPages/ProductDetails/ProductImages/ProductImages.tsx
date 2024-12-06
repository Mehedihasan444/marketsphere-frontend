import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import gallery styles
const ProductImages = ({images}) => {
    return (
        <>
              <Gallery items={images} thumbnailPosition={"left"}/>
        </>
    );
};

export default ProductImages;