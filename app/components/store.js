import {EventEmitter} from 'events';
import Immutable from 'immutable';
import dispatcher from './dispatcher';
import {CHANGE, ActionTypes} from './constants'
import api from './services/api'

// Default store state
var _data = Immutable.fromJS({
  credentials: {
    backendId: undefined,
    auth: undefined,
    loggedIn: false
  },
  allTypes: {},
  loadings:{
    login:false,
    allTypes:false
  }
})

// The store class
class Store extends EventEmitter {

  constructor () {
    super()
    console.log("Store # constructor ")
    var _this = this;

    // Dispatcher main switch
    dispatcher.unRegisterAll()
    dispatcher.register(function (action) {

      switch(action.type) {
        case ActionTypes.START_APP_FOR_USER: {
          _this._startAppForUser(action.backendId, action.auth, function(){
            _this.emit(CHANGE)
          })
          break
        }
      }

    });
  }

  /*
   * Démarre, normalement juste après le login
   * @param backendId le backend id spacedog
   * @param auth la valeur pour le header Authorization
   */
  _startAppForUser (backendId, auth, callback) {
    console.log("Store # _startAppForUser")

    _data = _data.setIn(['credentials', 'backendId'], backendId );
    _data = _data.setIn(['credentials', 'auth'], auth );
    _data = _data.setIn(['credentials', 'loggedIn'], true );

    var successCallback = (result) => {
      _data = _data.set('allTypes', result)
      _data = _data.setIn(['loadings', 'allTypes'], false );
      console.log("Api # allTypes successCallback", result)
      callback()
    }
    var errorCallback = (e) => {
      console.log("Api # allTypes errorCallback", e)
      callback()
    }

    _data = _data.setIn(['loadings', 'allTypes'], true );

    callback()

    api.allTypes(backendId, auth, successCallback, errorCallback)

  }


  getData () {
    return _data
  }

}

export default new Store();
