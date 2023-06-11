const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "35448334-21883769263356d661c71e8ae"
const QUERY_PROPERTIES = "image_type=photo&orientation=horizontal&per_page=12"

export default function fetchImagesByName(query, page) {
    return fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${QUERY_PROPERTIES}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(new Error(`По вашему запросу, ${this.props.query}, ничего не найдено`))
                })
}


