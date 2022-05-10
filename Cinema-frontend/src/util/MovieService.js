import axios from 'axios';
import { API_BASE_URL } from '../constants';

class MovieService {

    getAllMovies(){
        return axios.get(API_BASE_URL + '/movies');
    }

    getMovieById(movieId){
        return axios.get(API_BASE_URL + '/movies/' + movieId);
    }

    updateMovie(movie, movieId){
        return axios.put(API_BASE_URL + '/movies/' + movieId, movie);
    }

    deleteMovie(movieId){
        return axios.delete(API_BASE_URL + '/movies/' + movieId);
    }
}

export default new MovieService()