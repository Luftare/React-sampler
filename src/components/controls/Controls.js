import React, {Component} from 'react';
import './Controls.css';
import './range.css';

class Controls extends Component {
  render() {
    return (
      <div className="container">
        <span className="button" onClick={this.props.togglePlayback}><i className={this.props.looping? 'fa fa-stop' : 'fa fa-play'} aria-hidden="true"></i></span>
        <span className="button" onClick={this.props.toggleMetronome}><i className={this.props.metronome? 'fa fa-bell' : 'fa fa-bell-slash'} aria-hidden="true"></i></span>
        <span className="button" onClick={this.props.undo}><i className='fa fa-undo' aria-hidden="true"></i></span>
        <span className="button" onClick={this.props.reset}><i className='fa fa-trash' aria-hidden="true"></i></span>
        
        <input 
          type="range"
          onChange={e => this.props.setTempo(parseInt(e.target.value, 10))} 
          min={40} 
          max={180}
          value={this.props.tempo} />
      </div>
    );
  }
}

export default Controls;