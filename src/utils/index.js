import _ from 'lodash'
import mongoose from 'mongoose'

const getInfoData = (field = [], object = {}) => {
  return _.pick(object, field)
}

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((s) => [s, 1]))
}

const getSelectDataWithValue = (select = []) => {
  return Object.fromEntries(
    select.map((s) => [s.split(':')[0], s.split(':')[1]])
  )
}

const unselectData = (unselect = []) => {
  return Object.fromEntries(unselect.map((u) => [u, 0]))
}

const splitQueryString = (queryString = '') => {
  if (queryString === '') return []
  const result = queryString.split(',')
  return result
}

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null) {
      delete obj[k]
    }
  })
  return obj
}

const updateNestedObjectParser = (originalObj) => {
  const result = {}
  const obj = removeUndefinedObject(originalObj)
  Object.keys(obj).map((k) => {
    if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      const res = updateNestedObjectParser(obj[k])
      Object.keys(res).map((kk) => {
        result[`${k}.${kk}`] = res[kk]
      })
    } else {
      result[k] = obj[k]
    }
  })
  return result
}

const convertStringToObjectId = (string) => {
  return new mongoose.Types.ObjectId(string)
}

export {
  getInfoData,
  getSelectData,
  unselectData,
  splitQueryString,
  getSelectDataWithValue,
  removeUndefinedObject,
  updateNestedObjectParser,
  convertStringToObjectId
}
