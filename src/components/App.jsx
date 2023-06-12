import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ProgressBar } from 'react-loader-spinner'
import fetchImagesByName from '../services/fetchImages'
import Button from "components/Button/Button";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

const statuses = {
  IDLE: "idle",
  PENDING: "pending",
  REJECTET: "rejected",
  RESOLVED: "resolved"}

export default function App() {
  const [query, setQuery] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState(statuses.IDLE);

  useEffect(() => {
    if (!query) {
        return;
    }
    setTimeout(() => {
      fetchImagesByName(query, page)
        .then(({ hits, totalHits }) => {
          setImagesList(v => [...v, ...hits]);
          setTotalHits(totalHits);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(setStatus(statuses.RESOLVED));
    }, 250);
    },[page, query]);

  function handleFormSubmit(query) {
    setImagesList([]);
    setStatus(statuses.PENDING);
    setQuery(query)
    setPage(1);
  };

  function handleLoadMore() {
        setPage(v => v + 1);
    };

  const totalPages = Math.floor(totalHits / 12);
  
  if (status === statuses.IDLE) {
    return <Searchbar onSubmit={handleFormSubmit} />
  };

  if (status === statuses.PENDING) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ProgressBar height="100" width="160" wrapperStyle={{ display: 'block', margin: '0 auto', }} />
      </>);
  };

  

  if (status === statuses.RESOLVED) {
      return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {totalHits !==0 && <ImageGallery imagesList={imagesList} />}
      {page < totalPages && <Button loadMore={handleLoadMore} />}
      <ToastContainer />
    </>
    )
  }
}
  
