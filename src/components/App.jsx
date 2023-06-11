import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";


export default function App() {
  const [query, setQuery] = useState('')

    function handleFormSubmit(query){
    setQuery(query)
  };
  
  return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery query={query} />
        <ToastContainer/>
      </>
    )
}
  
