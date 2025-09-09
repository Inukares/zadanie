import { BinanceAPI } from "./api/binance";
import { calculateDeltaChange } from "./api/calculations";
import { mapResponseToKlines } from "./api/mappers";

console.log("Hello via Bun!");


const app = async () => {

	const binanceAPI = new BinanceAPI();
	const klines = await binanceAPI.getKlines({ symbol: "BTCUSDT", interval: "1m", timeRange: { startTime: 1715328000000, endTime: 1415328000000 }, limit: 20 });

	const metrics = klines.map(mapResponseToKlines)
	console.log('metrics', metrics)

	const deltaChange = calculateDeltaChange(metrics)
	console.log(deltaChange)

}

app();