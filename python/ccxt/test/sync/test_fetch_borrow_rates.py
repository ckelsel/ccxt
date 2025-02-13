import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-


from ccxt.test.base import test_borrow_rate  # noqa E402


def test_fetch_borrow_rates(exchange):
    method = 'fetchBorrowRates'
    borrow_rates = exchange.fetch_borrow_rates()
    assert isinstance(borrow_rates, dict), exchange.id + ' ' + method + ' must return an object. ' + exchange.json(borrow_rates)
    values = list(borrow_rates.values())
    for i in range(0, len(values)):
        test_borrow_rate(exchange, method, values[i], None)
