import React, { Component } from 'react';
import Pads from './pads/Pads';
import Controls from './controls/Controls';
import Sampler from './../utils/Sampler';
import './App.css';
import PreciseLoop from './../utils/PreciseLoop';

class App extends Component {
  constructor(props) {
    super(props);
    this.sampler = new Sampler();
    this.oldSequences = [];
    this.loop = new PreciseLoop({
      onTick: this.onTick,
      skipMissed: true,
      dt: 200,
    });
    this.state = {
      step: 0,
      sequences: (new Array(8)).fill([]),//2D array
    };
    this.lastTickTime = Date.now();
  }
  
  componentDidMount() {
    //this.loop.start();
  }
  
  addNote(note) {
    if(!this.loop.active) return false;
    const delta = Date.now() - this.lastTickTime;
    const progress = delta / this.loop.dt;
    const step = progress > 0.5? (this.state.step + 1) % this.state.sequences.length : this.state.step;
    this.oldSequences.push(this.state.sequences.concat());
    this.setState({
      sequences: this.state.sequences.map((s, j) => {
        if(step !== j) return s.concat();
        if(s.indexOf(note) === -1) {
          return s.concat(note);
        } else {
          return s.concat()
        }
      })
    })
    return progress > 0.5;
  }
  
  setTempo = val => {
    this.loop.dt = 60 * 1000 / val / 4;
  }
  
  togglePlayback = () => {
    this.loop.active = !this.loop.active;
    this.forceUpdate()
  }
  
  undoNote = () => {
    this.setState({
      sequences: this.oldSequences.pop()
    })
  }
  
  resetSequences = () => {
    this.oldSequences = [];
    this.setState({
      sequences: (new Array(8)).fill([]),//2D array
    })
  }
                                
  onTick = dt => {
   this.lastTickTime = Date.now();
   const step = (this.state.step + 1) % this.state.sequences.length;
   this.setState({
     step
   });
   this.state.sequences[this.state.step].forEach(i => {
     this.sampler.trigger(i);
   })
  }
  
  triggerPad = i => {
    if(!this.addNote(i)) this.sampler.trigger(i);
  }
    
  render() {
    return (
      <div className="machine">
        <Controls undo={this.undoNote} reset={this.resetSequences} setTempo={this.setTempo} togglePlayback={this.togglePlayback} looping={this.loop.active}/>
        <Pads triggerPad={this.triggerPad} />
      </div>
    );
  }
}

export default App;
