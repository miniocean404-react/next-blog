declare namespace Script12306HomeType {
  interface Date {
    show: string
  }

  export interface Prop {
    className: string
    data: Date
    str: string
    staticParams: string
    products: string | string[]
    stationsList: object[]
  }
}

export = Script12306HomeType
