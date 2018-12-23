// https://jsfiddle.net/xyjn4mao/

// const startButton = document.getElementById('startAC');
// const stopButton = document.getElementById('stopAC');

const fan = new Tone.Synth({
  // volume: -3, // the oscillator volume set to -12dB

  oscillator: {
    frequency: 22,
    type: 'triangle'
  },
  envelope: {
    attack: 2,
    decay: 2,
    sustain: 1,
    release: 1
  }
}); // connect the synth's output to the filter

const fanFader = new Tone.Volume(-6);
fan.chain(fanFader, Tone.Master);

const noise = new Tone.Noise({
  type: 'pink',
  // volume: -22,
  fadeIn: '5'
});

// fan.connect(noise)

const autoFilter = new Tone.AutoFilter({
  // frequency: '8m',
  frequency: '1',
  min: 400,
  max: 500
});

const noiseFader = new Tone.Volume(-8);
noise.chain(noiseFader, autoFilter, Tone.Master);

Tone.Master.volume.value = -9;
// noise.connect(autoFilter)

const start = () => {
  // fan.triggerAttack(24, '+0.5')
  fan.triggerAttack(22, '+0.5', 0.5);
  noise.start();
};

const stop = () => {
  fan.triggerRelease();
  noise.stop();
};

const setRotorVolume = val => {
  // fan.volume.value = val
  fanFader.volume.value = val;
  rotorVolume.value = val;
  rotorVolumeValue.value = val;
  console.log(fanFader.volume.value);
};
const setRotorFrequency = val => {
  // fan.volume.value = val
  fan.frequency.value = val;
  rotorFreq.value = val;
  rotorFreqValue.value = val;
  console.log(fan.frequency.value);
};

const setNoiseVolume = val => {
  // fan.volume.value = val
  noiseFader.volume.value = val;

  noiseVolume.value = val;
  noiseVolumeValue.value = val;
  console.log(noiseFader.volume.value);
};
const setMasterVolume = val => {
  // fan.volume.value = val
  Tone.Master.volume.value = val;
  console.log(Tone.Master.volume.value);
};

const setValues = (rotorVol, rotorFreq, noiseVol) => {
  console.log(`
    rotorVol: ${rotorVol}
    rotorFreq: ${rotorFreq}
    noiseVol: ${noiseVol}
  `);
  setRotorVolume(parseFloat(rotorVol));
  setRotorFrequency(parseFloat(rotorFreq));
  setNoiseVolume(parseFloat(noiseVol));
};

const slowSpeed = () => {
  setValues(-9, 20, -12);
};

const fastSpeed = () => {
  setValues(-3, 30, -6);
};

const fasterSpeed = () => {
  setValues(3, 40, 0);
};

// document.querySelectorAll('.ac-control').forEach(function(slider) {
//   slider.addEventListener('input', function(e) {
//     synth.envelope[e.target.id] = parseFloat(e.target.value)
//     document.getElementById(`${e.target.id}Value`).value = parseFloat(
//       e.target.value
//     )
//   })
// })

// document.querySelectorAll('.ac-speed').forEach(function(radio) {
//   radio.addEventListener('input', function(e) {
//     setValues(...e.target.value)
//   })
// })

// filter the noise more on the middle frequencies
// put dedicated controls for volume and frequency and filters

const log = () => {
  // console.log(fan.volume.value)
  console.log(`
  rotorVol: ${fanFader.volume.value}
  rotorFreq: ${fan.frequency.value}
  noiseVol: ${noiseFader.volume.value}
`);
  console.log(Tone.Master.volume.value);
};
// // https://jsfiddle.net/xyjn4mao/

// startButton.onclick = start();
// stopButton.onclick = stop();
