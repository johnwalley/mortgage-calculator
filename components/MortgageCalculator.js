import React, { PropTypes } from 'react';

import Chart from './Chart';

const calculateRepayments = (principal, rate, term) => {
  const monthly = rate / (12 * 100) * principal * Math.pow(1 + rate / (12 * 100), term * 12) / (Math.pow(1 + rate / (12 * 100), term * 12) - 1);

  const repayments = [];
  let outstanding = principal;

  for (let i = 0; i < term * 12; i++) {
    const interest = outstanding * rate / (12 * 100);
    const capital = monthly - interest;

    repayments.push({ month: i, interest: interest, capital: capital });
    outstanding -= capital;
  }

  return { monthly: monthly, repayments: repayments };
};

const MortgageCalculator = ({ principal, rate, term, onPrincipalChange, onRateChange, onTermChange }) => {
  const { monthly, repayments } = calculateRepayments(+principal, +rate, +term);

  return (
    <div className="container" role="main">
      <div className="c1">
        <p>Total: {(monthly * 12 * term).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</p>
        <p>Monthly: {monthly.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</p>
        <form>
          <div className="form-group">
            <label>Principal</label>
            <input
              type="number"
              min="0"
              step="1000"
              value={principal}
              className="form-control"
              onChange={(e) => onPrincipalChange(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={rate}
              className="form-control"
              onChange={(e) => onRateChange(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label>Term</label>
            <input
              type="number"
              min="1"
              value={term}
              className="form-control"
              onChange={(e) => onTermChange(e.target.value)}
              />
          </div>
        </form>
      </div>
      <div className="c2">
        <Chart monthly={monthly} repayments={repayments} width="400" height="220" />
      </div>
    </div>
  );
};

MortgageCalculator.propTypes = {
  principal: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  onPrincipalChange: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired
}

export default MortgageCalculator;