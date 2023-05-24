
// ---------------------------------------------------------------------------

import Exchange from './abstract/alpaca.js';
import { ExchangeError, BadRequest, PermissionDenied, BadSymbol, NotSupported, InsufficientFunds, InvalidOrder } from './base/errors.js';
import { TICK_SIZE } from './base/functions/number.js';
import { Int, OrderSide } from './base/types.js';
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

    async fetchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}) {
        return undefined;
    }

    async fetchMarkets (params = {}) {
        // /**
        //  * @method
        //  * @name ascendex#fetchMarkets
        //  * @description retrieves data on all markets for ascendex
        //  * @param {object} params extra parameters specific to the exchange api endpoint
        //  * @returns {[object]} an array of objects representing market data
        //  */
        // const products = await this.v1PublicGetProducts (params);
        // //
        // //     {
        // //         "code": 0,
        // //         "data": [
        // //             {
        // //                 "symbol": "LBA/BTC",
        // //                 "baseAsset": "LBA",
        // //                 "quoteAsset": "BTC",
        // //                 "status": "Normal",
        // //                 "minNotional": "0.000625",
        // //                 "maxNotional": "6.25",
        // //                 "marginTradable": false,
        // //                 "commissionType": "Quote",
        // //                 "commissionReserveRate": "0.001",
        // //                 "tickSize": "0.000000001",
        // //                 "lotSize": "1"
        // //             },
        // //         ]
        // //     }
        // //
        // const cash = await this.v1PublicGetCashProducts (params);
        // //
        // //     {
        // //         "code": 0,
        // //         "data": [
        // //             {
        // //                 "symbol": "QTUM/BTC",
        // //                 "displayName": "QTUM/BTC",
        // //                 "domain": "BTC",
        // //                 "tradingStartTime": 1569506400000,
        // //                 "collapseDecimals": "0.0001,0.000001,0.00000001",
        // //                 "minQty": "0.000000001",
        // //                 "maxQty": "1000000000",
        // //                 "minNotional": "0.000625",
        // //                 "maxNotional": "12.5",
        // //                 "statusCode": "Normal",
        // //                 "statusMessage": "",
        // //                 "tickSize": "0.00000001",
        // //                 "useTick": false,
        // //                 "lotSize": "0.1",
        // //                 "useLot": false,
        // //                 "commissionType": "Quote",
        // //                 "commissionReserveRate": "0.001",
        // //                 "qtyScale": 1,
        // //                 "priceScale": 8,
        // //                 "notionalScale": 4
        // //             }
        // //         ]
        // //     }
        // //
        // const perpetuals = await this.v2PublicGetFuturesContract (params);
        // //
        // //    {
        // //        "code": 0,
        // //        "data": [
        // //            {
        // //                "symbol": "BTC-PERP",
        // //                "status": "Normal",
        // //                "displayName": "BTCUSDT",
        // //                "settlementAsset": "USDT",
        // //                "underlying": "BTC/USDT",
        // //                "tradingStartTime": 1579701600000,
        // //                "priceFilter": {
        // //                    "minPrice": "1",
        // //                    "maxPrice": "1000000",
        // //                    "tickSize": "1"
        // //                },
        // //                "lotSizeFilter": {
        // //                    "minQty": "0.0001",
        // //                    "maxQty": "1000000000",
        // //                    "lotSize": "0.0001"
        // //                },
        // //                "commissionType": "Quote",
        // //                "commissionReserveRate": "0.001",
        // //                "marketOrderPriceMarkup": "0.03",
        // //                "marginRequirements": [
        // //                    {
        // //                        "positionNotionalLowerBound": "0",
        // //                        "positionNotionalUpperBound": "50000",
        // //                        "initialMarginRate": "0.01",
        // //                        "maintenanceMarginRate": "0.006"
        // //                    },
        // //                    ...
        // //                ]
        // //            }
        // //        ]
        // //    }
        // //
        // const productsData = this.safeValue (products, 'data', []);
        // const productsById = this.indexBy (productsData, 'symbol');
        // const cashData = this.safeValue (cash, 'data', []);
        // const perpetualsData = this.safeValue (perpetuals, 'data', []);
        // const cashAndPerpetualsData = this.arrayConcat (cashData, perpetualsData);
        // const cashAndPerpetualsById = this.indexBy (cashAndPerpetualsData, 'symbol');
        // const dataById = this.deepExtend (productsById, cashAndPerpetualsById);
        // const ids = Object.keys (dataById);
        // const result = [];
        // for (let i = 0; i < ids.length; i++) {
        //     const id = ids[i];
        //     const market = dataById[id];
        //     const settleId = this.safeValue (market, 'settlementAsset');
        //     const settle = this.safeCurrencyCode (settleId);
        //     const status = this.safeString (market, 'status');
        //     const domain = this.safeString (market, 'domain');
        //     let active = false;
        //     if (((status === 'Normal') || (status === 'InternalTrading')) && (domain !== 'LeveragedETF')) {
        //         active = true;
        //     }
        //     const spot = settle === undefined;
        //     const swap = !spot;
        //     const linear = swap ? true : undefined;
        //     let minQty = this.safeNumber (market, 'minQty');
        //     let maxQty = this.safeNumber (market, 'maxQty');
        //     let minPrice = this.safeNumber (market, 'tickSize');
        //     let maxPrice = undefined;
        //     const underlying = this.safeString2 (market, 'underlying', 'symbol');
        //     const parts = underlying.split ('/');
        //     const baseId = this.safeString (parts, 0);
        //     const quoteId = this.safeString (parts, 1);
        //     const base = this.safeCurrencyCode (baseId);
        //     const quote = this.safeCurrencyCode (quoteId);
        //     let symbol = base + '/' + quote;
        //     if (swap) {
        //         const lotSizeFilter = this.safeValue (market, 'lotSizeFilter');
        //         minQty = this.safeNumber (lotSizeFilter, 'minQty');
        //         maxQty = this.safeNumber (lotSizeFilter, 'maxQty');
        //         const priceFilter = this.safeValue (market, 'priceFilter');
        //         minPrice = this.safeNumber (priceFilter, 'minPrice');
        //         maxPrice = this.safeNumber (priceFilter, 'maxPrice');
        //         symbol = base + '/' + quote + ':' + settle;
        //     }
        //     const fee = this.safeNumber (market, 'commissionReserveRate');
        //     const marginTradable = this.safeValue (market, 'marginTradable', false);
        //     result.push ({
        //         'id': id,
        //         'symbol': symbol,
        //         'base': base,
        //         'quote': quote,
        //         'settle': settle,
        //         'baseId': baseId,
        //         'quoteId': quoteId,
        //         'settleId': settleId,
        //         'type': swap ? 'swap' : 'spot',
        //         'spot': spot,
        //         'margin': spot ? marginTradable : undefined,
        //         'swap': swap,
        //         'future': false,
        //         'option': false,
        //         'active': active,
        //         'contract': swap,
        //         'linear': linear,
        //         'inverse': swap ? !linear : undefined,
        //         'taker': fee,
        //         'maker': fee,
        //         'contractSize': swap ? this.parseNumber ('1') : undefined,
        //         'expiry': undefined,
        //         'expiryDatetime': undefined,
        //         'strike': undefined,
        //         'optionType': undefined,
        //         'precision': {
        //             'amount': this.safeNumber (market, 'lotSize'),
        //             'price': this.safeNumber (market, 'tickSize'),
        //         },
        //         'limits': {
        //             'leverage': {
        //                 'min': undefined,
        //                 'max': undefined,
        //             },
        //             'amount': {
        //                 'min': minQty,
        //                 'max': maxQty,
        //             },
        //             'price': {
        //                 'min': minPrice,
        //                 'max': maxPrice,
        //             },
        //             'cost': {
        //                 'min': this.safeNumber (market, 'minNotional'),
        //                 'max': this.safeNumber (market, 'maxNotional'),
        //             },
        //         },
        //         'info': market,
        //     });
        // }
        // return result;
        return undefined;
    }
}
