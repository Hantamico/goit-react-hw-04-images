import css from "./imageGalleryItem.module.css"
import PropTypes from 'prop-types';

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


ImageGalleryItem.propTypes = {
    imagesList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
    }),
    ),
    onImageClick: PropTypes.func,
}
