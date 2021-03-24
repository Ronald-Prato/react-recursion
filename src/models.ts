export interface ISingleChild {
  id: number
  name: string
  childs: ISingleChild[] | null
  childIndex?: number,
  counter?: number
}