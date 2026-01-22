import { PRICE_MAP, type PriceLevel } from "../types/price";

const getPriceSymbol = (endRange: number): PriceLevel => {
  const found = Object.entries(PRICE_MAP).find(
    ([, range]) => endRange >= range.min && endRange <= range.max,
  );

  return found ? (found[0] as PriceLevel) : "$";
};

export { getPriceSymbol };
