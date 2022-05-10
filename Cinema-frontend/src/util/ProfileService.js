import axios from 'axios';
import { API_BASE_URL } from '../constants';

class ProfileService {

    getProfileByUsername(username){
        return axios.get(API_BASE_URL + '/users/' + username);
    }

    updateProfile(profile, username){
        return axios.put(API_BASE_URL + '/users/' + username, profile);
    }
}

export default new ProfileService()