import axios from 'axios';

export const FETCH_LIST = 'fetch_list';
export const LOC_CHANGE = 'loc_change';
export const USER_LOCATION = 'user_location';


export function fetchList(loc) {
    console.log(loc);
    const key = 'vxyggluME1oprfiGl6AQ8NSZLvUut8g2NG55seakwY4hsB0r4tU5gG7wOmBbRF5Sphz2FnGuyBnIJBqN5AU5sC5pSWqw2W3YaFXaSjGFJvX19zT4d8qqjwgwywqSW3Yx';
    const request = axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events', { 
        headers: {Authorization: `Bearer ${key}`},
        params: { limit: 50, location: loc }
    });

    return {
        type: FETCH_LIST,
        payload: request
    };
}

export function locationChange(value) {
    // console.log('action creator value = ', value);
    return {
        type: LOC_CHANGE,
        payload: value
    }
}

// export function fetchpost(id) {
//     const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

//     return {
//         type: FETCH_POST,
//         payload: request
//     }
// }

export function locationUpdate(lat,long) {
    const userLoc = {
        lat,
        long
    }

    return {
        type: USER_LOCATION,
        payload: userLoc
    }
}