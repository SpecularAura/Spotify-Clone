async function audioBufferToWaveBlob(audioBuffer) {
  return new Promise(function (resolve, reject) {
    var worker = new Worker("/waveWorker.js");

    worker.onmessage = function (e) {
      var blob = new Blob([e.data.buffer], { type: "audio/wav" });
      resolve(blob);
    };

    let pcmArrays = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      pcmArrays.push(audioBuffer.getChannelData(i));
    }

    worker.postMessage({
      pcmArrays,
      config: { sampleRate: audioBuffer.sampleRate },
    });
  });
}

export default audioBufferToWaveBlob;
