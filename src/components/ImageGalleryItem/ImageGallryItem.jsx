import css from "./imageGalleryItem.module.css"

export default function ImageGalleryItem({ imagesList, onImageClick }) {
    return (
    <>
        {imagesList.map(({id, webformatURL, tags }) => <li key={id} className={css.imageGallery__item}>
            <img id={id} onClick={onImageClick} src={webformatURL} alt={tags} className={css.imageGalleryItem__image} />
        </li>
        )}
    </>
    )
};

