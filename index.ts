import { BinanceAPI } from "./api/binance/binance";
import { calculateDeltaChange } from "./api/binance/calculations";
import { formatPrice, mapResponseToKlines } from "./api/binance/mappers";

console.log("Hello via Bun!");


const app = async () => {

	const binanceAPI = new BinanceAPI();
	const klines = await binanceAPI.getKlines({ symbol: "BTCUSDT", interval: "1m", timeRange: { startTime: 1757412019000, endTime: 1757412319000 }, limit: 20 });

	const metrics = klines.map(mapResponseToKlines)
	console.log('metrics', metrics)

	const deltaChange = calculateDeltaChange(metrics)
	console.log(deltaChange)

	const formattedKlines = metrics.map(kline => ({
		...kline,
		low: formatPrice(kline.low, 2),
		high: formatPrice(kline.high, 2),
		close: formatPrice(kline.close, 2),
	}))
	console.log('formattedKlines', formattedKlines)

}

app();