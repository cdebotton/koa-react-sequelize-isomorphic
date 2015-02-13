'use strict';

import keyMirror from "react/lib/keyMirror";

export var ServerActionTypes = keyMirror({
  REQUEST_RESOURCE_SUCCESS: null,
  REQUEST_RESOURCE_ERROR: null,

  GET_USERS_SUCCESS: null,
  GET_USERS_ERROR: null,

  POST_USER_SUCCESS: null,
  POST_USER_ERROR: null
});

export var ViewActionTypes = keyMirror({
  TOGGLE: null,
  ACTIVATE: null,
  DEACTIVATE: null,

  CREATE_USER: null
});
