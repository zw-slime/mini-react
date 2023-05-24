export type Source = {
  fileName: string,
  lineNumber: number
}

export type ReactElement = {
  $$typeof: any,
  type: any,
  key: any,
  ref: any,
  props:any,
  _owner:any,

  // __DEV__
  _store: {validated: boolean},
  _self: ReactElement,
  _shadowChildren: any,
  _source: Source,
}
