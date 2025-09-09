import type { Klines } from "./types";

// only assuming that this data is always correct. Realistically should verify data coming from endpoint with zod for instance.
export const mapResponseToKlines = (tradingData: (number | string)[]): Klines => {

  // improve formatting logic
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