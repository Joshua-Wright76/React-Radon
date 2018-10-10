import React from 'react';
import {bindToSilo} from 'react-radon';

class TotalsDisplay extends React.Component{
  render() {
    return (<div className="innerbox" id="totals">
      <span id="totalCards"><label htmlFor="totalCards">Total Cards:</label>{this.props.totalCards}</span>
      <p>
        <label htmlFor="totalMarkets">Total Markets:</label>
        <span id="totalCards">{this.props.totalMarkets}</span>
      </p>
    </div>);
  }
}
export default bindToSilo(TotalsDisplay);