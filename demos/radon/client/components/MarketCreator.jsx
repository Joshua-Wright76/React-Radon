import React from 'react';
import {bindToSilo} from 'react-radon';

class MarketCreator extends React.Component {
  render() { 
    return (<div>
      <div>
        <h3>Create New Market</h3>
        <form>
          <span>Location: </span>
          <input type='text' id='inputTag'/>
          <button onClick={this.props.onClick}>Add Market</button>
        </form>
      </div>
    </div>);
  }
}

export default bindToSilo(MarketCreator);