const PRICE_MAP = {
  $: { min: 0, max: 15 },
  $$: { min: 16, max: 40 },
  $$$: { min: 41, max: 80 },
  $$$$: { min: 81, max: 1000 },
};

type PriceLevel = keyof typeof PRICE_MAP;

export { PRICE_MAP, type PriceLevel };
