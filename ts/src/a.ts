// ---------------------------------------------------------------------------

import Exchange from './abstract/a.js';
import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import { Int } from './base/types.js';

// ---------------------------------------------------------------------------

export default class a extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'a',
            'name': 'A',
            'countries': [ 'MT' ], // Malta
            'pro': false,
            'rateLimit': 10000,
            'version': '1',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/55248342-a75dfe00-525a-11e9-8aa2-05e9dca943c6.jpg',
                'api': {
                    'public': 'http://api.a.io',
                    'private': 'http://api.a.io',
                },
                'www': 'http://a.io',
                'doc': [
                    'http://api.a.io/',
                ],
                'fees': [
                    'http://a.io/fees-and-limits',
                ],
                'referral': 'http://a.io',
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '2h': '120',
                '4h': '240',
                '6h': '360',
                '12h': '720',
                '1d': '1d',
                '1w': '1w',
                '1M': '1m',
            },
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'cancelAllOrders': false,
                'cancelOrder': false,
                'createOrder': false,
                'createPostOnlyOrder': false,
                'createReduceOnlyOrder': false,
                'createStopLimitOrder': false,
                'createStopMarketOrder': false,
                'createStopOrder': false,
                'fetchAccounts': false,
                'fetchBalance': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': 'emulated',
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': false,
                'fetchMarginMode': false,
                'fetchMarketLeverageTiers': 'emulated',
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchOHLCV': true,
                'fetchOpenOrders': false,
                'fetchOrder': false,
                'fetchOrderBook': false,
                'fetchOrders': false,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': false,
                'fetchTickers': false,
                'fetchTime': false,
                'fetchTrades': false,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransactionFee': false,
                'fetchTransactionFees': false,
                'fetchTransactions': false,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': false,
                'reduceMargin': false,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'transfer': false,
            },
            'api': {
                'public': {
                    'get': [
                        'oapi/v2/list/tradePrice',
                        'oapi/v2/list/marketPair',
                        'oapi/v2/public/getOrderBook',
                        'oapi/v2/kline/getKline',
                    ],
                },
                'private': {
                    'post': [
                        'v2/coin/customerAccount',
                        'v2/order/order',
                        'v2/order/cancel',
                        'v2/order/getOrderList',
                        'v2/order/showOrderStatus',
                        'v2/order/showOrderHistory',
                        'v2/order/getTradeList',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber ('0.0002'),
                    'maker': this.parseNumber ('0.0002'),
                },
            },
        });
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     {
        //         "volume": 0,
        //         "closePrice": 101000.0,
        //         "lowPrice": 101000.0,
        //         "highPrice": 101000.0,
        //         "openPrice": 101000.0,
        //         "createTime": "2019-11-08 14:49:00"
        //     }
        //
        const dateTime = this.safeString (ohlcv, 'createTime');
        let timestamp = this.parse8601 (dateTime);
        if (timestamp !== undefined) {
            timestamp = timestamp - 28800000; // 8 hours
        }
        return [
            timestamp,
            this.safeNumber (ohlcv, 'openPrice'),
            this.safeNumber (ohlcv, 'highPrice'),
            this.safeNumber (ohlcv, 'lowPrice'),
            this.safeNumber (ohlcv, 'closePrice'),
            this.safeNumber (ohlcv, 'volume'),
        ];
    }

    async fetchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name ace#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---klinecandlestick-data
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the ace api endpoint
         * @returns {[[int]]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'duration': this.timeframes[timeframe],
            'quoteCurrencyId': market['quoteId'],
            'baseCurrencyId': market['baseId'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const response = await this.publicGetOapiV2KlineGetKline (this.extend (request, params));
        const data = this.safeValue (response, 'attachment', []);
        //
        //     {
        //         "attachment":[
        //                 {
        //                     "changeRate": 0,
        //                     "closePrice": 101000.0,
        //                     "volume": 0,
        //                     "lowPrice": 101000.0,
        //                     "highPrice": 101000.0,
        //                     "highPrice": 1573195740000L,
        //                     "openPrice": 101000.0,
        //                     "current": 101000.0,
        //                     "currentTime": "2019-11-08 14:49:00",
        //                     "createTime": "2019-11-08 14:49:00"
        //                 }
        //         ]
        //     }
        //
        return this.parseOHLCVs (data, market, timeframe, since, limit);
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name ace#fetchMarkets
         * @description retrieves data on all markets for ace
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#oapi-api---market-pair
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[object]} an array of objects representing market data
         */
        const response = await this.publicGetOapiV2ListMarketPair ();
        //
        //     [
        //         {
        //             "symbol":"BTC/USDT",
        //             "base":"btc",
        //             "baseCurrencyId": "122"
        //             "quote":"usdt",
        //             "basePrecision":"8",
        //             "quotePrecision":"5",
        //             "minLimitBaseAmount":"0.1",
        //             "maxLimitBaseAmount":"480286"
        //         }
        //     ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            const base = this.safeString (market, 'base');
            const baseCode = this.safeCurrencyCode (base);
            const quote = this.safeString (market, 'quote');
            const quoteCode = this.safeCurrencyCode (quote);
            const symbol = base + '/' + quote;
            result.push ({
                'id': this.safeString (market, 'symbol'),
                'uppercaseId': undefined,
                'symbol': symbol,
                'base': baseCode,
                'baseId': this.safeInteger (market, 'baseCurrencyId'),
                'quote': quoteCode,
                'quoteId': this.safeInteger (market, 'quoteCurrencyId'),
                'settle': undefined,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'derivative': false,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'limits': {
                    'amount': {
                        'min': this.safeNumber (market, 'minLimitBaseAmount'),
                        'max': this.safeNumber (market, 'maxLimitBaseAmount'),
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'precision': {
                    'price': this.parseNumber (this.parsePrecision (this.safeString (market, 'quotePrecision'))),
                    'amount': this.parseNumber (this.parsePrecision (this.safeString (market, 'basePrecision'))),
                },
                'active': undefined,
                'info': market,
            });
        }
        return result;
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = '/' + this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        if (headers === undefined) {
            headers = {};
        }
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const nonce = this.milliseconds ();
            let auth = 'ACE_SIGN' + this.secret;
            const data = this.extend ({
                'apiKey': this.apiKey,
                'timeStamp': nonce,
            }, params);
            const dataKeys = Object.keys (data);
            const sortedDataKeys = this.sortBy (dataKeys, 0);
            for (let i = 0; i < sortedDataKeys.length; i++) {
                const key = sortedDataKeys[i];
                auth += this.safeString (data, key);
            }
            const signature = this.hash (this.encode (auth), sha256, 'hex');
            data['signKey'] = signature;
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            if (method === 'POST') {
                const brokerId = this.safeString (this.options, 'brokerId');
                if (brokerId !== undefined) {
                    headers['Referer'] = brokerId;
                }
            }
            body = this.urlencode (data);
        } else if (api === 'public' && method === 'GET') {
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        }
        url = this.urls['api'][api] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined; // fallback to the default error handler
        }
        const feedback = this.id + ' ' + body;
        const status = this.safeNumber (response, 'status', 200);
        if (status > 200) {
            this.throwExactlyMatchedException (this.exceptions['exact'], status, feedback);
            this.throwBroadlyMatchedException (this.exceptions['broad'], status, feedback);
        }
        return undefined;
    }
}
