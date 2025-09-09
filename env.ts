export const BINANCE_API_KEY = process.env.BINANCE_API_KEY;


// right now I'm not even using the key, but I set this file as an example of potential actual setup
if(!BINANCE_API_KEY) { 
	console.warn('BINANCE_API_KEY is not set in the environment variables!');
	// throw new Error('BINANCE_API_KEY is not set');
}