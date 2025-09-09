import { describe, it, expect } from "bun:test";
import { BinanceAPI } from "./binance";

describe("Binance API", () => {
	it("should get klines", async () => {
		const binanceAPI = new BinanceAPI();
		const klines = await binanceAPI.getKlines({ symbol: "BTCUSDT", interval: "1m", timeRange: { startTime: 1715328000000, endTime: 1715328000000 } });
		console.log(klines)
		expect(klines).toBeDefined();
	});
});