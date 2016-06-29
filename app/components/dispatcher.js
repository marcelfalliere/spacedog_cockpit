import {Dispatcher} from 'flux'

class SpaceDogDispatcher extends Dispatcher {

  register (f) {
    this.lastRegisterId = super.register(f)
  }

  unRegisterAll () {
    console.log("Dispatcher # unRegisterAll ", this.lastRegisterId)
    if (this.lastRegisterId) {
      super.unregister(this.lastRegisterId)
    }
  }
}



export default new SpaceDogDispatcher();
