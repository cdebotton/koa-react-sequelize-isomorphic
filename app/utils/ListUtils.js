'use strict';

export var injectIntoList = (list, entities) => {
  let ids = list.map(item => item.id);
  let itemsToAdd = entities.filter(item => ids.indexOf(item.id) === -1);

  return list.concat(itemsToAdd);
};
