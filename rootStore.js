import {Store} from './store';
import {UserStore} from './userStore'
import store from './store'
import userstore from './userStore'

class RootStore{
  constructor(){
    this.store=new Store(this);
    this.userstore = new UserStore(this);
  }
}

 const rootstore = new RootStore();
 export default rootstore;