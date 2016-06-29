import React from 'react'
import Header from './header'
import store from '../store'
import {CHANGE} from '../constants'
import actions from '../actions'
import TypesList from './types_list'

var _getStateFromStore = () => {
  var storeData = store.getData()
  console.log("App # _getStateFromStore loggedIn",  storeData.getIn(['credentials', 'loggedIn']))
  return {
    loggedIn : storeData.getIn(['credentials', 'loggedIn'])
  }
}

export default class App extends React.Component {

  constructor () {
    super()
    console.log("App # constructor")
    this.state = _getStateFromStore()

    var _this = this;
    store.on(CHANGE, function() {
      console.log("App # on data store change")
      _this.setState(_getStateFromStore())
    })
  }

  login () {
    // actions.startAppForUser('gdcadmin', 'Basic Z2RjYWRtaW46aGkgZ2RjYWRtaW4=')
    actions.startAppForUser('johorecette', 'Basic am9ob3JlY2V0dGU6aGkgam9ob3JlY2V0dGU=')
  }

  render () {
    console.log("App # render", (!this.state.loggedIn))
    var main

    if (!this.state.loggedIn) {
      main = <div className="main-content page-login">
              <div className="login-form">
                <h2>Please login</h2>
                <button onTouchTap={this.login}>Login</button>
              </div>
            </div>
    } else {
      main = <div>
              <div>
                <TypesList />
              </div>
              <div className="main-content types_list_opened">Welcome</div>
            </div>
    }


    return (
      <div>
        <Header />
        {main}
      </div>
    )
  }
}
