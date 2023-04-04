import React, {useEffect, useMemo} from 'react'

interface StockInfoData {
  symbol: string
  price: string
  open: string
  high: string
  low: string
  change: string
  changePercent: string
  volume: string
  latestTradingDay: string
}

export function StockInfo({symbol}: {symbol: string}) {
  const [stockInfo, setStockInfo] = React.useState<StockInfoData | null>(null)

  useEffect(() => {
    const fetchStockInfo = () => {
      if (symbol && symbol.length >= 2) {
        //temp use of process.env key until we put it in sanity secrets
        //eslint-disable-next-line no-process-env
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
        fetch(url)
          .then((response) => response.json())
          .then((data) => data['Global Quote'])
          .then((rawStockInfo) => {
            if (rawStockInfo) {
              setStockInfo({
                symbol: rawStockInfo['01. symbol'],
                price: rawStockInfo['05. price'],
                open: rawStockInfo['02. open'],
                high: rawStockInfo['03. high'],
                low: rawStockInfo['04. low'],
                change: rawStockInfo['09. change'],
                changePercent: rawStockInfo['10. change percent'],
                volume: rawStockInfo['06. volume'],
                latestTradingDay: rawStockInfo['07. latest trading day'],
              })
            }
          })
      }
    }
    fetchStockInfo()
  }, [symbol])

  const stockInfoRows = useMemo(() => {
    const rows: Array<Array<[string, number]>> = []
    if (stockInfo) {
      const {latestTradingDay, open, high, low, change, volume} = stockInfo
      return [
        [
          ['Open', open],
          ['Change', change],
        ],
        [
          ['High', high],
          ['Volume', volume],
        ],
        [
          ['Low', low],
          ['Latest Trading Day', latestTradingDay],
        ],
      ]
    }
    return rows
  }, [stockInfo])

  if (!stockInfo) {
    return <div>Loading...</div>
  }

  return (
    <div
      className="w-full overflow-hidden rounded font-sans md:flex"
      style={{maxWidth: '900px'}}
    >
      <div className="flex w-full items-center bg-gray-100 p-10 text-gray-600">
        <div className="w-full">
          <h3
            className="text-lg font-semibold leading-tight text-gray-800"
            // x-text="stockTicker.stockFullName"
          />
          <h6 className="mb-2 text-sm leading-tight">
            <span>{symbol}</span>
            &nbsp;&nbsp;-&nbsp;&nbsp;Feb 2nd 4:00pm AEST
          </h6>
          <div className="mb-6 flex w-full items-end">
            <span className="block text-3xl leading-none text-gray-800">
              {stockInfo?.price ?? 0}
            </span>
            <span className="ml-4 block text-sm leading-5 text-green-500">
              {stockInfo?.changePercent && stockInfo.changePercent[0] === '-'
                ? '▼'
                : '▲'}{' '}
              {stockInfo.changePercent}
            </span>
          </div>
          {stockInfoRows.map((row) => {
            const [firstColumn, secondColumn] = row
            return (
              <div
                className="flex w-full text-xs"
                key={`${firstColumn[0]}-${secondColumn[0]}`}
              >
                <div className="flex w-5/12">
                  <div className="flex-1 pr-3 text-left font-semibold">
                    {firstColumn[0]}
                  </div>
                  <div className="flex-1 px-3 text-right">{firstColumn[1]}</div>
                </div>
                <div className="flex w-7/12">
                  <div className="flex-1 px-3 text-left font-semibold">
                    {secondColumn[0]}
                  </div>
                  <div className="flex-1 pl-3 text-right">
                    {secondColumn[1]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
