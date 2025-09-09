import type { Klines } from "./types";

// calculations should be actually done with float precision in mind, that is 
// every number should be artificially converted to Int so that there are no rounding errors 
// this would also require wrapping numbers into some objects and I didn't do that strictly for the case of brevity
export const calculateDeltaChange = (klines: Klines[]): number => {
  const firstClose = klines[0]?.close;
  const lastClose = klines[klines.length - 1]?.close;

  // should probably skip missing data points
  if(!firstClose || !lastClose) {
		console.warn('Missing data points');
    return 0
  }

  return (lastClose - firstClose) / firstClose;
}