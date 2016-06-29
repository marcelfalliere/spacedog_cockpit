import {ActionTypes} from './constants'
import dispatcher from './dispatcher'

export default {

	startAppForUser (backendId, auth) {
		console.log("Actions # dispatching START_APP_FOR_USER ..")
		dispatcher.dispatch({
			type:ActionTypes.START_APP_FOR_USER,
			backendId:backendId,
			auth:auth
		})
	}

}
