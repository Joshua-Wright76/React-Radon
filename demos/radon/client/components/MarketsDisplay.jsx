import React from 'react';
import MarketDisplay from './MarketDisplay.jsx';
import {bindToSilo} from 'react-radon';

const MarketsDisplay = (props) => {

  return(
    <div className="displayBox">
      <h4>Markets</h4>
      <MarketDisplay />
    </div>
  );
};

export default bindToSilo(MarketsDisplay);