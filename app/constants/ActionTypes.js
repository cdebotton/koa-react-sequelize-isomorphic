'use strict';

import keyMirror from "react/lib/keyMirror";

export var ServerActionTypes = keyMirror({
  REQUEST_RESOURCE: null,
  REQUEST_RESOURCE_SUCCESS: null,
  REQUEST_RESOURCE_ERROR: null
});

export var ViewActionTypes = keyMirror({
  TOGGLE: null,
  ACTIVATE: null,
  DEACTIVATE: null
});
