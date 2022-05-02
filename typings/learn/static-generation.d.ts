declare namespace SSGType {
  interface Date {
    show: string
  }

  export interface Prop {
    data: Date
    str: string
    staticParams: string
  }
}

export = SSGType
