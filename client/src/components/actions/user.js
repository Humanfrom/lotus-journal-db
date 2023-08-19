import axios from 'axios';

export const registration = async (login, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', 
        {
            login,
            password
        })
        alert(response.data.message)
        console.log('response', response)
    } catch (e) {
        alert(e);
    }
}


export const login = async (login, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', 
            {
                login,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token);
            console.log('response', response)
        } catch (e) {
            alert(e);
        }
    }
}