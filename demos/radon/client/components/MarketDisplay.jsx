import React from 'react';
import {bindToSilo} from 'react-radon';

const MarketDisplay = (props) => (
  <div>
    <h3>Markets</h3>
    {props.marketList}
  </div>
);

export default bindToSilo(MarketDisplay);