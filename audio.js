const fan = new Tone.Synth({
  volume: -3, // the oscillator volume set to -12dB
  oscillator: {
    type: 'triangle'
  },
  envelope: {
    attack: 5,
    decay: 2,
    sustain: 1,
    release: 1
  }
}).toMaster() // connect the synth's output to the filter

const noise = new Tone.Noise({
  type: 'pink',
  volume: -33,
  fadeIn: '+5'
})

// fan.connect(noise)

const autoFilter = new Tone.AutoFilter({
  frequency: '8m',
  min: 600,
  max: 700
}).toMaster()

noise.connect(autoFilter)

const start = () => {
  // fan.triggerAttack(24, '+0.5')
  fan.triggerAttack(4, '+0.5', 0.5)
  noise.start()
}

const stop = () => {
  fan.triggerRelease()
  noise.stop()
}

// filter the noise more on the middle frequencies
// put dedicated controls for volume and frequency and filters
