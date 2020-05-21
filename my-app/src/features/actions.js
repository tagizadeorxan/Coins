import * as actions from './actionTypes';



export const login = (body) => {
  return function (dispatch) {
    dispatch(loading());
    fetch('http://localhost:3000/token', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => { if (res.status === 200 ) {
          
        return res.json();
      } else {
        dispatch(loginFailed())
  
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      dispatch(adminLogin(data.login, data.token))
      window.location.href = '/admin/panel'
    })
    .catch((error) => {
      console.log(error)
    });




    }
        
  }     
        
        
        
        



export const tokenCheckingBegin = () => ({
  type: actions.CHECK_TOKEN
})


export const tokenSuccess = () => ({
  type: actions.TOKEN_SUCCESS
})

export const tokenFailure = () => ({
  type: actions.TOKEN_FAILURE
})



export const checkToken = (token) => {
  return function (dispatch) {
         console.log(token);
        dispatch(tokenCheckingBegin());
        if(token === null) {
          dispatch(tokenFailure());
        } else {
          console.log("bura"+token)
            fetch('http://localhost:3000/check', {
          method: 'POST',
          body: JSON.stringify({token}),
          headers: { 'Content-type': 'application/json' }
        }).then(res=> {
          if(res.status === 200) {
            console.log(res);
            console.log('bu bas verdi')
            dispatch(tokenSuccess());
            return true;
          } else {
            dispatch(tokenFailure());
            return false;
          }
        })
        }
      
  }
}


export const adminLogin = (login, token) => ({
  type: actions.ADMIN_LOGIN,
  payload: {
    login, token
  }
})

export const adminLogout = () => ({
  type: actions.ADMIN_LOGOUT
})


export const loading = () => ({
  type: actions.LOADING
});

export const loginFailed = () => ({
  type: actions.LOGIN_FAILED
});




export const updateCoin = (id,coin,token) => {
  console.log(id,coin,token)
  return  async function (dispatch){
    let result = false;
    let options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        data: coin,
        token
      })

    }
    await fetch(`http://localhost:3000/coins/${id}`, options).then((res) => {
      if (res.status ===200) {
        return res.json();
      } else {
        dispatch(fetchCoinsFailure)
        alert("Update operation couldn't be completed")
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      result = true;
      dispatch(fetchCoinsSuccess(data));
    })
    .catch((error) => {
      console.log(error)
    });
    return result;
  }
 
  }






export const addCoin = (coin, token) => {
  return async function (dispatch) {
    let result = false;
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        data: coin,
        token
      })

    }
    await fetch(`http://localhost:3000/coins/add`, options).then((res) => {
      if (res.status ===200) {
        return res.json();
      } else {
        alert("Add operation couldn't be completed")
        dispatch(fetchCoinsFailure)
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      result = true;
      dispatch(fetchCoinsSuccess(data))
    })
    .catch((error) => {
      console.log(error)
    });
    return result;
  }
}

export const deleteCoin = (id) => {
  return async function (dispatch) {
    let result = false;
    await fetch(`http://localhost:3000/coins/${id}`, {
      method: 'DELETE'
    }).then((res) => {
  if (res.status ===200) {
    return res.json();
  } else {
    alert("Delete operation couldn't be completed");
    dispatch(fetchCoinsFailure)
    throw new Error('Something went wrong!');
  }
})
.then((data) => {
 result = true;
  dispatch(fetchCoinsSuccess(data))
})
.catch((error) => {
  console.log(error)
});
return result;
  }
}



export const fetchCoinsBegin = () => ({
  type: actions.FETCH_COINS_BEGIN
});

export const fetchCoins = () => {
  return function (dispatch) {

    dispatch(fetchCoinsBegin());
    fetch(`http://localhost:3000/coins`).then(res => res.status === 200 ? res.json() : dispatch(fetchCoinsFailure))
      .then(data => dispatch(fetchCoinsSuccess(data)))
      .catch(() => dispatch(fetchCoinsFailure))
  }
}

export const fetchCoinsSuccess = coins => ({
  type: actions.FETCH_COINS_SUCCESS,
  payload: coins
});

export const fetchCoinsFailure = error => ({
  type: actions.FETCH_COINS_FAILURE,
  payload: error
});




















