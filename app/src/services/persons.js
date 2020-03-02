import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons/'

/**
 * 電話帳データを取得する
 * @returns {Promise<AxiosResponse<T> | never>}
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * 電話帳データを追加する
 * @param newPerson
 * @returns {Promise<AxiosResponse<T> | never>}
 */
const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

/**
 * 電話帳データを変更する
 * @param id
 * @param newPerson
 * @returns {Promise<AxiosResponse<T> | never>}
 */
const update = (id, newPerson) => {
  const request = axios.put(baseUrl + id, newPerson)
  return request.then(response => response.data)
}

/**
 * 指定idのPersonを削除した後、データを取得しなおして返却する
 * @param id
 * @returns {Promise<any | never>}
 */
const deletePerson = (id) => {
  const request = axios.delete(baseUrl + id)
  return request.then(() => getAll())
}

export default {getAll, create, deletePerson, update}