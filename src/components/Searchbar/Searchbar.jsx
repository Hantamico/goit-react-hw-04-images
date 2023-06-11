import React, { Component } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import css from './searchbar.module.css'

export default class Searchbar extends Component{
    state = {
        query: ""
    }

    handleChange = e => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value.toLowerCase()})
    }

    handleSubmit = (e)=> {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            return toast.error('Заполните поле поиска');
        }
        this.props.onSubmit(this.state.query);
        this.setState({query: ''})
    }

    render() {
        return(
        <header className={css.searchbar}>
            <form className={css.searchform} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.searchform__button}>
                <span className={css.searchform__button__label}>Search</span>
                </button>
                <input
                    name='query'
                    className={css.searchform__input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"  
                    value={this.state.query}
                    onChange={this.handleChange}
                    />
                
            </form>
        </header> ) 
    };
};