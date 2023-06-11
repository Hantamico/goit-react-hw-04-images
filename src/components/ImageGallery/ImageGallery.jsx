/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect } from "react";
import { ProgressBar } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import fetchImagesByName from '../../services/fetchImages'
import ImageGalleryItem from "components/ImageGalleryItem/ImageGallryItem";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import css from './imageGallery.module.css'


export default function ImageGallery({ query }) {
    const [imagesList, setImagesList] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState(null);

    useEffect(() => {
        if (!query) {
            return;
        }

        setStatus('pending');
        setPage(v => v + 1);
        setTimeout(() => {
            fetchImagesByName(query, page)
                .then(({hits, totalHits}) => {
                    setPage(v => v + 1);
                    setImagesList(hits);
                    setTotalHits(totalHits);
                    setStatus("resolved");
                })
                .catch(error => {
                    setError(error);
                    setStatus("rejected");
                })
            }, 250);
    }, [query]);

    function handleLoadMore(){
        fetchImagesByName(query, page)
            .then(imagesList => {
                setPage(v => v + 1);
                setImagesList(v => [...v, ...imagesList.hits]);
            })
            .catch(error => {
                    setError(error);
                    setStatus("rejected");
            })
    };

    function toggleModal(e){
        setShowModal(!showModal);
    }

    function onImageClick(e){
        toggleModal();
        setLargeImage(imagesList.filter(image => Number(image.id) === Number(e.target.id)))
    }


    if (status === "idle") {
            return;
        }

        if (status === "pending") {
            return <ProgressBar height="100" width="160" wrapperStyle={{ display: 'block', margin: '0 auto', }} />
        }

        if (totalHits === 0) {
            return toast.error(`По вашему запросу, ${query}, ничего не найдено`)
        }

        if (status === "resolved") {
            const totalPages = Math.floor(totalHits / 12)
        
            return (<div>
                {showModal && <Modal onClose={toggleModal}>
                    <img  src={largeImage[0].largeImageURL} alt={largeImage[0].tags } />
                            </Modal>
                }
                <ul className={css.imageGallery} >
                    <ImageGalleryItem imagesList={imagesList} onImageClick={onImageClick} />
                </ul>
                {page < totalPages && <Button loadMore={handleLoadMore} />}
            </div>
            )
        }    
};