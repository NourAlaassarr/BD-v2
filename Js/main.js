navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
    const audioContext = new AudioContext();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    microphone.connect(analyser);
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      
      if (volume > 100) { // Threshold for detecting a blow
        turnOffCandle();
      }
      requestAnimationFrame(detectBlow);
    }
    
    detectBlow();
  });

  function turnOffCandle() {
    // Hide the flame when candle is blown
    document.getElementById('flame').style.display = 'none';
     // Play the happy birthday song
     const birthdaySong = document.getElementById('birthdaySong');
     birthdaySong.play();
    // Show the birthday message
    document.getElementById('message').style.display = 'block';
    const duration = 2 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 100, ticks: 20, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
  }

  