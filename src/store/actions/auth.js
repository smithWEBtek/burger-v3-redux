import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: authData
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		payload: error
	}
}


export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		console.log('[auth.js][auth][email, password]: ', email, password);
		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2zOFXIivxut360JgLehkoBf8PinQCjtE', authData)
			.then(response => {
				console.log((response));
				dispatch(authSuccess(response.data))
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err))
			})
	}
}

// apiKey: "AIzaSyA2zOFXIivxut360JgLehkoBf8PinQCjtE"