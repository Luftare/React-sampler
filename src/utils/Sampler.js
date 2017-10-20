import technoKit from './../assets/audio/techno_kit.wav';
import {Howl} from 'howler';

export default class Sampler {
  constructor() {
    this.spriteAtlas = ['kick1','kick2','snare1','snare2','hihat1', 'hihat2','hihat3','hihat4','tom1','tom2','crash1','crash2','bass1', 'bass2', 'chord1','fx','klik1','klik2','clap'];
    this.sampleMap = [
      'bass1', 'bass2', 'chord1','fx',
      'tom1','tom2','crash1','crash2',
      'hihat1', 'hihat2','hihat3','hihat4',
      'kick1','kick2','snare1','snare2',
    ];
    this.bank = this.createBank();
  }
  
  createBank() {
    return new Howl({
      src: technoKit,
      sprite: this.createSprite()
    });
  }
  
  triggerMetronome(isFirst) {
    this.bank.play(isFirst? 'klik1' : 'klik2');
  }
  
  trigger(i) {
    this.bank.play(this.sampleMap[i]);
  }
  
  createSprite() {
    const sprite = {};
    this.spriteAtlas.forEach((s, i) => {
      sprite[s] = [i * 500, 450];
    });
    return sprite;
  }
}