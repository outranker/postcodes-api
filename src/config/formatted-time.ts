exports.formattedTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
exports.formattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay}`;
};
exports.formattedTimeAndDate = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getFullYear()}-${date.getMonth()}-${
    date.getDay
  }`;
};
