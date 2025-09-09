import type { Klines } from "./types";

export const calculateDeltaChange = (klines: Klines[]): number => {
  const firstClose = klines[0]?.close;
  const lastClose = klines[klines.length - 1]?.close;

  // should probably skip missing data points
  if(!firstClose || !lastClose) {
    return 0
  }

  return (lastClose - firstClose) / firstClose;
}