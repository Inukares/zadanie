import type { Klines } from "./types";

// only assuming that this data is always correct. Realistically should verify data coming from endpoint with zod for instance.
export const mapResponseToKlines = (tradingData: (number | string)[]): Klines => {

	// realistially should improve calculations logic and not base the on just floats
  const formattedData = tradingData.map(item => Number(item));

  const [open,high,low,close,volume,closeTime] = formattedData;
  return {
    open,
    high,
    low,
    close,
    volume,
    closeTime
  } as Klines 
}

export function formatPrice(value: string | number, decimals: number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}