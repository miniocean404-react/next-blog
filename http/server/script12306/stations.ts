import { server } from '@/utils/request/server-request'

export const queryTickets = ({ leftDate, fromStation, arriveStation }: any) => {
  return new Promise((resolve) => {
    // queryX queryZ
    server
      .get('/otn/leftTicket/queryZ', {
        headers: {},
        data: {
          'leftTicketDTO.train_date': leftDate,
          'leftTicketDTO.from_station': fromStation,
          'leftTicketDTO.to_station': arriveStation,
          purpose_codes: 'ADULT',
        },
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export const initTicketsType = () => {
  return new Promise((resolve) => {
    // queryX queryZ
    server
      .get('/otn/leftTicket/init', {
        headers: {},
        data: {},
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
