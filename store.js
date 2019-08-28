
import {observable ,action} from 'mobx'

export class Store{
  @observable phone='';
  @observable name='';
  @observable isAuth= false ;
  @observable firstLaunch = true;
  @observable expotoken = '';
  constructor(rootStore){
    this.rootStore=rootStore
  }
   authIt(e){
    this.isAuth = e
    // console.log('hi')
  }
  user(e){
    this.phone = e
  }
  enter(e){
    this.name=e;
  }
  firsttime(e){
    this.firstLaunch = e;
  }
  entertoken(e){
    this.expotoken = e;
  }
}
var store = new Store();
export default store;

