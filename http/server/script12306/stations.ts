import { server } from '@/utils/request/server-request'

export const queryTickets = (type: string, leftDate: string, fromStation: string, arriveStation: string) => {
  return new Promise((resolve) => {
    // queryX queryZ
    server
      .get(`/otn/${type}`, {
        headers: {},
        params: {
          'leftTicketDTO.train_date': leftDate,
          'leftTicketDTO.from_station': fromStation,
          'leftTicketDTO.to_station': arriveStation,
          purpose_codes: 'ADULT',
        },
      })
      .then((res) => {
        resolve([undefined, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const initTicketsType = () => {
  return new Promise((resolve) => {
    server
      .get('/otn/leftTicket/init', {
        responseType: 'text',
      })
      .then((res) => {
        const reg = /var CLeftTicketUrl = '(.*?)';/gims
        const match = res.data.matchAll(reg)

        let apiType
        for (const item of match) apiType = item[1]

        resolve([null, apiType])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

// 获取加密后的浏览器特征 ID
export const getBrowserDeviceId = () => {
  return new Promise((resolve) => {
    server
      .get('https://12306-rail-id-v2.pjialin.com', {
        baseURL: '',
        headers: {},
        data: {},
      })
      .then((res) => {
        res = res.data.id
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const tempRequest = (url: string) => {
  return new Promise((resolve) => {
    server
      .get(url, {
        baseURL: '',
        headers: {},
      })
      .then((res) => {
        let data = res.data
        if (data.indexOf('callbackFunction') >= 0) {
          data = data.substring(18, data.length - 2)
          const object = JSON.parse(data)

          server.defaults.headers.common['RAIL_EXPIRATION'] = object['exp']
          server.defaults.headers.common['RAIL_DEVICEID'] = object['dfp']
        }

        resolve([null, data])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
