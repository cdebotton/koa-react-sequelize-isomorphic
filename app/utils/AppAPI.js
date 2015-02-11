import {getAPI} from "./APIUtils";
import {AppServerActionCreators} from "../actions/AppServerActionCreators";

export var getPages = () => {
  return getAPI('pages')
    .then(data => AppServerActionCreators.requestPagesSuccess(data))
    .catch(err => AppServerActionCreators.requestPagesError(err));
};
