
export interface MapLike<T> {
   [index: string]: T
}

export type Overwrite<Base, Overrides> = Omit<Base, keyof Overrides> & Overrides
