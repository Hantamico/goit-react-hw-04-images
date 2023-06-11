import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";

export default class App extends Component{
  state = {
    query: '',
  }

  handleFormSubmit = query => {
    this.setState({query})
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer/>
      </>
    )
  }
}
  
