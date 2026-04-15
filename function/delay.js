function delay(ms) {
  return new Promise((resolve) => {
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 5000;
      console.log(`Đã chờ: ${elapsed / 1000}s`);
    }, 5000);

    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, ms);
  });
}
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    delay,
    randomDelay
    
}
