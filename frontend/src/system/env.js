// pages
export const ROOT_URL = '/';
export const CHAMBER_URL = 'chamber/';
export const FAVOURITES_URL = 'favourites';
export const SETTINGS_URL = 'settings';
export const PROFILE_PAGE = {
    "URL": 'profile/',
    "CHALLENGES": {
        "URL": 'challenges',
        "TYPE": "challenges-profile"
    },
    "CASUAL": {
        "URL": 'casual',
        "TYPE": {
            "ME": "casual-profile-me",
            "NOT_ME": "casual-profile"
        }
    }
};

export const CASUAL_URL = 'casual';
export const CHALLENGES_URL = 'challenges';
export const COLLABORATIONS_URL = 'collaborations';
export const PEOPLE_URL = 'people';
export const LOGIN_URL = 'login';
export const NOT_FOUND_URL = '*';

// api
export const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
export const MEDIA_SERVER_HOST = process.env.REACT_APP_MEDIA_SERVER_HOST;
export const AUTH_URL = process.env.REACT_APP_AUTH_URL;
export const JSONRPC_URL = process.env.REACT_APP_JSONRPC_URL
