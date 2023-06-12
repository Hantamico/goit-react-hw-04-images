import {useState,} from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGallryItem";
import Modal from "components/Modal/Modal";
import css from './imageGallery.module.css';


export default function ImageGallery({ imagesList }) {
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState(null);

    function toggleModal(e){
        setShowModal(!showModal);
    }

    function onImageClick(e){
        toggleModal();
        setLargeImage(imagesList.filter(image => Number(image.id) === Number(e.target.id)))
    }

    return (
        <ul className={css.imageGallery}>
            <ImageGalleryItem imagesList={imagesList} onImageClick={onImageClick} /> 
            {showModal && <Modal onClose={toggleModal}>
                <img src={largeImage[0].largeImageURL} alt={largeImage[0].tags} width="800px"/>
            </Modal>}
       </ul>
    )
};