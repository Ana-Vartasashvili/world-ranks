import type { Region } from './countries'

export interface RegionOption {
  value: Region
  isSelected: boolean
}

export enum SortByOption {
  Population,
  Alphabetical,
  Area,
}

export enum CountryStatus {
  Member = 'member',
  Independent = 'independent',
}

export type CountryStatusData = {
  [key in CountryStatus]: boolean
}
