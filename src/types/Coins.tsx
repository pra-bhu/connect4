export enum Coins{
  Empty,
  Blue,
  Red
}

export type CoinsTypes = keyof typeof Coins
