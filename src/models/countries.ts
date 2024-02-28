export interface Country {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: {
      ell: {
        official: string
        common: string
      }
      tur: {
        official: string
        common: string
      }
    }
  }
  region: Region
  area: number
  population: number
  unMember: boolean
  independent: boolean
}

export enum Region {
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Africa = 'Africa',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}
