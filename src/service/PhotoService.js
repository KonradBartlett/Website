import axios from 'axios';

export default class PhotoService {

    getPhotos() {
        return axios.get('assets/demo/data/photos.json').then((res) => res.data.data);
    }
}