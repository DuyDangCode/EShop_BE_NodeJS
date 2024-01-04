import _ from 'lodash';

const getInfoData = (field = [], object = {}) => {
  return _.pick(object, field);
};

export { getInfoData };
