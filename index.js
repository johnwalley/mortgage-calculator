import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import * as d3 from 'd3';

import MortgageCalculator from './components/MortgageCalculator';

// Action
const principalAction = (amount) => ({ type: 'principal', amount: amount });
const rateAction = (amount) => ({ type: 'rate', amount: amount });
const termAction = (amount) => ({ type: 'term', amount: amount });

// Reducer
const mortgageCalulator = (state = { principal: "300000", rate: "1.69", term: "25" }, action) => {
  switch (action.type) {
    case "principal":
      return Object.assign({}, state, { principal: action.amount });
    case "rate":
      return Object.assign({}, state, { rate: action.amount });
    case "term":
      return Object.assign({}, state, { term: action.amount });
    default:
      return state;
  }
};

// Store
const store = createStore(mortgageCalulator);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    principal: state.principal,
    rate: state.rate,
    term: state.term
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onPrincipalChange: (amount) => dispatch(principalAction(amount)),
    onRateChange: (amount) => dispatch(rateAction(amount)),
    onTermChange: (amount) => dispatch(termAction(amount))
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MortgageCalculator)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
