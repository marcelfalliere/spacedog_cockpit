import apiUtils from './api_utils'

export default {

  allTypes (backendId, auth, successCallback, errorCallback) {
    apiUtils.get("/schema", null, backendId, auth, successCallback, errorCallback);
  }

}
