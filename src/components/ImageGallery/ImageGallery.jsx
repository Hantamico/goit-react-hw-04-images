import { Component } from "react";
import { ProgressBar } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import fetchImagesByName from '../../services/fetchImages'
import ImageGalleryItem from "components/ImageGalleryItem/ImageGallryItem";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import css from './imageGallery.module.css'


export default class ImageGallery extends Component {
    state = {
        imagesList: null,
        error: null,
        status: 'idle',
        page: 1,
        totalHits: null,
        showModal: false,
        largeImage: null
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.query !== this.props.query) {
            
            this.setState({ page: 1, status: "pending", })

            setTimeout(() => {
                fetchImagesByName(this.props.query, this.state.page)
                .then(imagesList => this.setState(prevState => {
                    return{ page: prevState.page + 1, imagesList: imagesList.hits, totalHits: imagesList.totalHits, status: "resolved" }
                }))
                .catch(error => this.setState({ error, status: "rejected" }))
            }, 250);
            
        };
    };
    
    handleLoadMore = () => {
        fetchImagesByName(this.props.query, this.state.page)
            .then(imagesList => this.setState(prevState => {
                return ({page: prevState.page + 1, imagesList: [...prevState.imagesList, ...imagesList.hits] })
            }))
            .catch(error => this.setState({ error, status: "rejected" }))
            
    };

    toggleModal = (e) => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
    }

    onImageClick = e => {
        this.toggleModal();
        console.log(e.target.id);
        this.setState({largeImage: this.state.imagesList.filter(image => Number(image.id) === Number(e.target.id))})
    }

    render() {
        const { imagesList, status, page, totalHits, showModal, largeImage } = this.state;

        if (status === "idle") {
            return;
        }

        if (status === "pending") {
            return <ProgressBar height="100" width="160" wrapperStyle={{ display: 'block', margin: '0 auto', }} />
        }

        if (imagesList.totalHits === 0) {
            return toast.error(`По вашему запросу, ${this.props.query}, ничего не найдено`)
        }

        if (status === "resolved") {
            const totalPages = Math.floor(totalHits / 12)
        
            return (<div>
                {showModal && <Modal onClose={this.toggleModal}>
                    <img  src={largeImage[0].largeImageURL} alt={largeImage[0].tags } />
                            </Modal>
                }
                <ul className={css.imageGallery} >
                    <ImageGalleryItem imagesList={imagesList} onImageClick={this.onImageClick} />
                </ul>
                {page < totalPages && <Button loadMore={this.handleLoadMore} />}
            </div>
            )
        }    
    };
};