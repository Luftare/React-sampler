import React, { Component } from 'react';
import Pad from './Pad';
import './PadRow.css';

class PadRow extends Component {
  render() {
    const index = this.props.index * 4;
    return (
      <div className="row">
        {this.props.cols.map((c, i) => {
         return <Pad key={i} name={c} index={index + i} triggerPad={this.props.triggerPad} />
        })}
      </div>
    );
  }
}

export default PadRow;