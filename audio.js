const fan = new Tone.Synth({
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
  fadeIn: '5'
});

const autoFilter = new Tone.AutoFilter({
  frequency: '1',
  min: 400,
  max: 500
});

const noiseFader = new Tone.Volume(-8);
noise.chain(noiseFader, autoFilter, Tone.Master);

Tone.Master.volume.value = -9;

const start = () => {
  fan.triggerAttack(22, '+0.5', 0.5);
  noise.start();
};

const stop = () => {
  fan.triggerRelease();
  noise.stop();
};

const setRotorVolume = val => {
  fanFader.volume.value = val;
  rotorVolume.value = val;
  rotorVolumeValue.value = val;
  console.log(fanFader.volume.value);
};
const setRotorFrequency = val => {
  fan.frequency.value = val;
  rotorFreq.value = val;
  rotorFreqValue.value = val;
  console.log(fan.frequency.value);
};

const setNoiseVolume = val => {
  noiseFader.volume.value = val;
  noiseVolume.value = val;
  noiseVolumeValue.value = val;
  console.log(noiseFader.volume.value);
};
const setMasterVolume = val => {
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

// filter the noise more on the middle range frequencies
// put dedicated controls for volume and frequency and filters

const log = () => {
  console.log(`
  rotorVol: ${fanFader.volume.value}
  rotorFreq: ${fan.frequency.value}
  noiseVol: ${noiseFader.volume.value}
`);
  console.log(Tone.Master.volume.value);
};
