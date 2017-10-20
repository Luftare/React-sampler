import React, { Component } from 'react';
import Pads from './pads/Pads';
import Controls from './controls/Controls';
import Sampler from './../utils/Sampler';
import './App.css';
import PreciseLoop from './../utils/PreciseLoop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 60,
      metronome: true,
      looping: false,
      step: 0,
      sequences: (new Array(16)).fill([]),//2D array
    };
    this.sampler = new Sampler();
    this.oldSequences = [];
    this.loop = new PreciseLoop({
      onTick: this.onTick,
      skipMissed: true,
      dt: this.BPMToDt(this.state.tempo),
    });
    this.lastTickTime = Date.now();
  }
  
  componentDidMount() {
    
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
  
  BPMToDt(tempo) {
    return 60 * 1000 / tempo / 4;
  }
  
  setTempo = tempo => {
    this.loop.dt = this.BPMToDt(tempo);
    this.setState({tempo})
  }
  
  togglePlayback = () => {
    this.loop.active = !this.loop.active;
    this.setState({
      looping: this.loop.active
    })
  }
  
  toggleMetronome = () => {
    this.setState({
      metronome: !this.state.metronome,
    })
  }
  
  undoNote = () => {
    if(this.oldSequences.length === 0) return;
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
   if(this.state.metronome && step % 2 === 0) {
     this.sampler.triggerMetronome(((step + 6) % 8) === 0);
   }
  }
  
  triggerPad = i => {
    if(!this.addNote(i)) this.sampler.trigger(i);
  }
    
  render() {
    return (
      <div className="machine">
        <Controls 
          undo={this.undoNote} 
          reset={this.resetSequences} 
          setTempo={this.setTempo} 
          togglePlayback={this.togglePlayback} 
          looping={this.state.looping} 
          tempo={this.state.tempo} 
          metronome={this.state.metronome}
          toggleMetronome={this.toggleMetronome}/>
        <Pads triggerPad={this.triggerPad} />
      </div>
    );
  }
}

export default App;
