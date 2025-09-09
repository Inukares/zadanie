# zadanie_testowe

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To run test:
```bash
bun test
```

Things I did on purpose:
- Omitted proper int-based calculations. Would require wrapping numbers into proper structs, so that the default precision is remembered but the value is alternated to an int for avoiding float rounding errors
- did API-based conversion of price for the formatted values. This could be done just like in this scenario and calls to exchangeInfo cached with redis or similar, but also could have hardcoded information about each asset. First apprgit oach is simpler, although fully relies on Binance's API in this case which is known to be troublesome.
- omitted more complex mocking logic. Strictly for the time reasons.
- calculation of the trades is done with net % change. It is one of the simpest things I could come up with, but still potentially useful.
- almost everyhting is placed in the binane folder, following locality of behaviour principle




This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
