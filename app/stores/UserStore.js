import {ServerActionTypes, ViewActionTypes} from "../constants/ActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import {FluxStore} from "../utils/FluxUtils";
import Immutable from "immutable";

class UserStore extends FluxStore {
  constructor() {
    super(this);

    this.users = Immutable.List();

    this.listenTo({
      'CREATE_USER': 'onCreateUser',
      'CREATE_USER_SUCCESS': 'onCreateUserSuccess',
      'CREATE_USER_ERROR': 'onCreateUserError',

      'GET_USERS': 'onGetUsers',
      'GET_USERS_SUCCESS': 'onGetUsersSuccess',
      'GET_USERS_ERROR': 'onGetUsersError',

      'DESTROY_USER': 'onDestroyUser',
      'DESTROY_USER_SUCCESS': 'onDestroyUserSuccess',
      'DESTROY_USER_ERROR': 'onDestroyUserError'
    });
  }

  getState() {
    let users = this.users.toJS();

    return {users};
  }

  onGetUsers() {
    return false;
  }

  onCreateUser({email}) {
    let user = Immutable.fromJS({email});

    this.users = this.users.concat(user);
  }

  onCreateUserSuccess({user}) {
    return false;
  }

  onCreateUserError(err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return false;
  }

  onGetUsersSuccess({users}) {
    let ids = this.users.map(user => user.get('id'));
    let toAdd = users.filter(user => ids.indexOf(user.id) === -1);

   this.users = this.users.concat(Immutable.fromJS(toAdd));
  }

  onGetUsersError(err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return false;
  }

  onDestroyUser({id}) {
    let index = this.users.findIndex(user => user.get('id') === id);

    this.users = this.users.splice(index, 1);
  }

  onDestroyUserSuccess() {
    return false;
  }

  onDestroyUserError(err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return false;
  }
};

export default new UserStore();

