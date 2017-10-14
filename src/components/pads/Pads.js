import React, { Component } from 'react';
import PadRow from './PadRow'
import './Pads.css'

class Pads extends Component {
  
  tapHandler = e => {
    e.preventDefault();
  }
  
  render() {
    const pads = [];
    const rows = 4;
    const cols = 4;
    for (var i = 0; i < rows; i++) {
      let row = pads[i] = [];
      for (var j = 0; j < cols; j++) {
        row[j] = null;
      }
    }
    
    return (
      <div className="pads" onTouchMove={this.tapHandler}>
        {pads.map((row, i) => {
          return <PadRow key={i} cols={row} index={i} triggerPad={this.props.triggerPad} />
        })}
      </div>
    );
  }
}

export default Pads;
