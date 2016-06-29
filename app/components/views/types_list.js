import React from 'react'
import {CHANGE} from '../constants'
import store from '../store'

var _getStateFromStore = function() {
  var storeData = store.getData()
  console.log("TypesList # _getStateFromStore allTypes",  storeData.get('allTypes'))
  return {
    allTypes:storeData.get('allTypes'),
    loading:storeData.getIn(['loadings', 'allTypes'])
  }
}

export default class TypesList extends React.Component {

  constructor () {
    super()
    console.log("TypesList # constructor")
    this.state = _getStateFromStore()

    var _this = this;
    store.on(CHANGE, function() {
      console.log("TypesList # on data store change")
      _this.setState(_getStateFromStore())
    })
  }

  componentWillUnmount () {
    console.log("componentWillUnmount !")
  }

  render () {
    var items = [],
        _this = this;

    if (this.state.loading) {
      items.push(<li>loading lists...</li>)
    } else {
      items.push(<li className="types-list-subheader">All types</li>)

      items.push(Object.keys(_this.state.allTypes).map(function(oneType, index){
          return <li key={index}>{oneType}</li>
        })
      )
    }

    return (
      <ul className="types-list">
        {items}
      </ul>
    )
  }
}
