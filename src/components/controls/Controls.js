import React, {Component} from 'react';
import './Controls.css';

class Controls extends Component {
  render() {
    return (
      <div className="container">
        <span className="button" onClick={this.props.togglePlayback}>{this.props.looping? 'stop' : 'rec'}</span>
        <span className="button" onClick={this.props.reset}>reset</span>
        <span className="button" onClick={this.props.undo}>undo</span>
        <input type="range" onChange={e => this.props.setTempo(parseInt(e.target.value))} min={60} max={200}/>
      </div>
    );
  }
}

export default Controls;