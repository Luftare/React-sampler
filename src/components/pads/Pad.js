import React, { Component } from 'react';
import './Pad.css';

class Pad extends Component {
  
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;     
  }
  
  triggerHandler(isMouse) {
    if(isMouse && this.isTouchDevice()) return;
    this.props.triggerPad(this.props.index)
  }
  
  render() {
    return (
      <span className="pad" 
        onMouseDown={e => this.triggerHandler(true)}
        onTouchStart={e => this.triggerHandler()}
      ></span>
    );
  }
}

export default Pad;