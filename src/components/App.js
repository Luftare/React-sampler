import React, { Component } from 'react';
import Pads from './pads/Pads';
import Controls from './Controls/Controls';
import Sampler from './../utils/Sampler';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.sampler = new Sampler();
  }
  
  componentDidMount() {

  }
  
  triggerPad = i => {
    this.sampler.trigger(i);
    console.log(i)
  }
  
  tapHandler = e => {
    e.preventDefault();
  }
    
    
  render() {
    return (
      <div className="machine" onMouseDown={this.tapHandler}>
        <Controls />
        <Pads triggerPad={this.triggerPad} />
      </div>
    );
  }
}

export default App;
