import _ from 'lodash';

const getInfoData = (field = [], object = {}) => {
  return _.pick(object, field);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((s) => [s, 1]));
};

const getSelectDataWithValue = (select = []) => {
  return Object.fromEntries(
    select.map((s) => [s.split(':')[0], s.split(':')[1]])
  );
};

const unselectData = (unselect = []) => {
  return Object.fromEntries(unselect.map((u) => [u, 0]));
};

const splitQueryString = (queryString = '') => {
  if (queryString === '') return [];
  const result = queryString.split(',');
  return result;
};

export {
  getInfoData,
  getSelectData,
  unselectData,
  splitQueryString,
  getSelectDataWithValue,
};
