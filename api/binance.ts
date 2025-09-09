import axios from "axios";
import { formatPrice, mapResponseToKlines } from "./mappers";

// TODO: add binance api key and env.ts file with throwing if error is not present.
// normally would have to ensure data is correct, add missing points for instance

type Interval = 
  | '1s'
  | '1m' | '3m' | '5m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '6h' | '8h' | '12h'
  | '1d' | '3d'
  | '1w'
  | '1M';

export type KlinesResponse = Array<Array<number | string>>;

export type ExchangeInfoResponse = { 
  symbol: string;
  baseAsset: string;      // e.g., "BTC"
  quoteAsset: string;     // e.g., "USDT"
  quotePrecision: number;  // Decimal places for quote asset
  baseAssetPrecision: number;  // Decimal places for base asset
  filters: Array<{
    filterType: string;
    minPrice?: string;
    maxPrice?: string;
    tickSize?: string;    // Minimum price movement
  }>;
}

// format -> and it handles the formatting?

// 

export class BinanceAPI {
	private readonly URL = "https://api.binance.com"

  // could have a method that return a formatted values for the UI
  // async getKlines({symbol, interval='1m', timeRange, limit = 20, timeZone} : {symbol: string, interval: Interval, timeRange?: { startTime: number, endTime: number }, limit?: number, timeZone?: string}): Promise<KlinesResponse> {
  //   const rawData = await this.fetchRawKlinesData({symbol, interval, timeRange, limit, timeZone});
  //   const klines = rawData.map(mapResponseToKlines);
  //   // const exchangeInfo = await this.getExchangeInfo({baseAsset: symbol, quoteAsset: 'USDC'});

  //   // const formattedKlines = klines.map(kline => ({
  //   //   ...kline,
  //   //   open: formatPrice(kline.open, exchangeInfo.quotePrecision),
  //   //   low: formatPrice(kline.low, exchangeInfo.quotePrecision),
  //   //   high: formatPrice(kline.high, exchangeInfo.quotePrecision),
  //   //   close: formatPrice(kline.close, exchangeInfo.quotePrecision),
  //   // }));

  //   return formattedKlines;
  // }

	async getKlines({symbol, interval='1m', timeRange, limit = 20, timeZone} : {symbol: string, interval: Interval, timeRange?: { startTime: number, endTime: number }, limit?: number, timeZone?: string}): Promise<KlinesResponse> {
		const { startTime, endTime } = timeRange || {};

		// actual handling would depend on ap architecture
		if(!symbol) {
			throw new Error("Symbol is required");
		}

		const baseUrl = `${this.URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

		if(startTime && endTime) {
			const response = await axios.get(`${baseUrl}&startTime=${startTime}&endTime=${endTime}`);
      return response.data as Array<Array<number>>;
		}

		const response = await axios.get(`${baseUrl}`);
		return response.data as Array<Array<number>>;
	}

  async getExchangeInfo({baseAsset, quoteAsset = 'USDC'}: {baseAsset: string, quoteAsset: string}): Promise<ExchangeInfoResponse> {
    const response = await axios.get<ExchangeInfoResponse>(`${this.URL}/api/v3/exchangeInfo?symbol=${baseAsset}${quoteAsset}`);
    return response.data;
  }
}



