"use strict";

export var toSortedList = (structure, sortProperty, sortOrder) => {
  let list = [];
  let order = sortOrder === 'asc' ? -1 : 1;

  for (let [id, obj] of structure.entries()) {
    list.push(obj.toJS());
  }

  list.sort((a, b) => a[sortProperty] < b[sortProperty] ? order : order * -1);

  return list;
};
