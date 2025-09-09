import axios from "axios";

type Interval = 
  | '1s'
  | '1m' | '3m' | '5m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '6h' | '8h' | '12h'
  | '1d' | '3d'
  | '1w'
  | '1M';


  // changes -> price change -> first half's avergae price vs second half's average price?
  // 


type Metrics = {
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume: number | string;
  closeTime: number | string;
}

export type KlinesResponse = Array<Array<number | string>>;

// only assuming that this data is always correct. Realistically should verify data coming from endpoint with zod for instance.
export const mapArrayToMetric = (tradingData: (number | string)[]): Metrics => {

  const [open,high,low,close,volume,closeTime] = tradingData;
  return {
    open,
    high,
    low,
    close,
    volume,
    closeTime
  } as Metrics // this can be a lie, look coment above the funciton
}

export const calculatePriceChange = (marketPriceData: KlinesResponse) => {
  const metrics = marketPriceData.map(mapArrayToMetric);
  return metrics;
}
export class BinanceAPI {
	private readonly URL = "https://api.binance.com"

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

}

	// const tradeSchema = new mongoose.Schema({
	// 	id: { type: Number, required: true, unique: true },
	// 	price: { type: String, required: true },
	// 	qty: { type: String, required: true },
	// 	quoteQty: { type: String, required: true },
	// 	time: { type: Number, required: true },
	// 	isBuyerMaker: { type: Boolean, required: true },
	// 	isBestMatch: { type: Boolean, required: true }
	// });

	// const myTradeSchema = new mongoose.Schema({
	// 	id: { type: Number, required: true, unique: true },
	// 	price: { type: String, required: true },
	// 	qty: { type: String, required: true },
	// 	quoteQty: { type: String, required: true },
	// 	time: { type: Number, required: true },
	// 	isBuyerMaker: { type: Boolean, required: true },
	// 	isBestMatch: { type: Boolean, required: true },
	// 	owner: { type: String, required: true, enum: ["me"] }
	// });

	// const TradeModel = mongo.model<Trade>("Trade", tradeSchema);
	// const MyTradeModel = mongo.model<MyTrade>("MyTrade", myTradeSchema);
	// const binanceAPI = new BinanceAPI();




