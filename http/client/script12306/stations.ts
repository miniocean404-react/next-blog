import { client } from '@/utils/request/client-request'

export const getStations = (data?: any) => {
  return new Promise((resolve) => {
    client
      .get('/next/api/script12306', {
        headers: {},
        data,
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
