import {useState } from "react";
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css'
import css from './searchbar.module.css'

export default function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('');

    function handleChange(e) {
        setQuery(e.currentTarget.value.toLowerCase())
    };

    function handleSubmit(e){
        e.preventDefault();
        if (query.trim() === '') {
            return toast.error('Заполните поле поиска');
        }
        onSubmit(query);
        setQuery('')
    }

    return(
        <header className={css.searchbar}>
            <form className={css.searchform} onSubmit={handleSubmit}>
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
                    value={query}
                    onChange={handleChange}
                    />
                
            </form>
        </header> )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}
