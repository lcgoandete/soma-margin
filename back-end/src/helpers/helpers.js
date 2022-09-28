const delay = (seconds) => {
  return new Promise(function(resolve){
      setTimeout(resolve, seconds * 1000);
  });
}

module.exports = {
  delay,
}
