// symbol	STRING	YES	
// interval	ENUM	YES	
// startTime	LONG	NO	
// endTime	LONG	NO	
// timeZone	STRING	NO	Default: 0 (UTC)
// limit	INT	NO	Default: 500; Maximum: 1000.
import axios from "axios";

type Interval = 
  | '1s'
  | '1m' | '3m' | '5m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '6h' | '8h' | '12h'
  | '1d' | '3d'
  | '1w'
  | '1M';


class BinanceAPI {
	private readonly URL = "https://api.binance.com"

	async getKlines({symbol, interval='1m', timeRange, limit = 20, timeZone="0"} : {symbol: string, interval: Interval, timeRange?: { startTime: number, endTime: number }, limit?: number, timeZone?: string}) {
		const { startTime, endTime } = timeRange || {};

		// actual handling would depend on ap architecture
		if(!symbol) {
			throw new Error("Symbol is required");
		}

		const baseUrl = `${this.URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

		if(startTime && endTime) {
			return await axios.get(`${baseUrl}&startTime=${startTime}&endTime=${endTime}`);
		}

		const response = await axios.get(`${baseUrl}`);
		return response.data;
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




