import * as actions from './actionTypes';


let initialState = {
  login: localStorage.getItem('login'),
  token: localStorage.getItem('token'),
  coins: [],
  loading: null,
  error: null,
  tokenloading: false
}

export default function newReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADMIN_LOGIN:
      localStorage.setItem('login', action.payload.login);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        login: action.payload.login,
        token: action.payload.token,
        loading: null
      }
    case actions.ADMIN_LOGOUT:

      const requestBody = {
        token: state.token
      };
      fetch(`http://localhost:3000/logout`, {
        method: 'DELETE',
        body: JSON.stringify(requestBody),
        headers: { 'Content-type': 'application/json' }
      })

      localStorage.removeItem('token');
      localStorage.removeItem('login');
      window.location.href = '/';

      return {
        ...state,
        login: '',
        token: ''
      }

    case actions.LOADING:
      return {
        ...state,
        loading: true
      }


    case actions.LOGIN_FAILED:
      return {
        ...state,
        loading: false
      }

    case actions.FETCH_COINS_BEGIN:

      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.FETCH_COINS_SUCCESS:

      return {
        ...state,
        loading: null,
        coins: action.payload
      };

    case actions.FETCH_COINS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };


    case actions.CHECK_TOKEN:
      console.log("newreducer check token")
      return {
        ...state,
        tokenloading: true
      };

    case actions.TOKEN_SUCCESS:
      console.log("success")
      return {
        ...state,
        tokenloading: false
      };
    case actions.TOKEN_FAILURE:
      return {
        ...state,
        tokenloading: null
      }

    default:
      return state;
  }
}