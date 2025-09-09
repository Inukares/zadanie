import { describe, it, expect } from "bun:test";
import { BinanceAPI, calculatePriceChange } from "./binance";

describe("Binance API", () => {
	it.skip("should get klines", async () => {
		const binanceAPI = new BinanceAPI();
		const klines = await binanceAPI.getKlines({ symbol: "BTCUSDT", interval: "1m", timeRange: { startTime: 1715328000000, endTime: 1715328000000 } });
		console.log(klines)
		expect(klines).toBeDefined();
	});

	it('should map the data to useful format', async () => {

		const binanceAPI = new BinanceAPI();

		const mockKlines =   [[
			1715328000000, "63078.01000000", "63092.38000000", "63052.47000000", "63085.74000000",
			"37.76846000", 1715328059999, "2382167.52949290", 1222, "15.14137000", "955015.62605350",
			"0"
		]]
		const metrics = calculatePriceChange(mockKlines);
		console.log(metrics)

		const expectedMetrics = [
			{
				open: 1715328000000,
				high: "63078.01000000",
				low: "63092.38000000",
				close: "63052.47000000",
				volume: "63085.74000000",
				closeTime: "37.76846000",
			}
		]

		expect(metrics).toEqual(expectedMetrics)
	})

});