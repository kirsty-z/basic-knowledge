let promise = new Promise((resolve, rejcet) => {
  if (true) {
    resolve(value);
  } else {
    reject(value);
  }
});
promise().then(() => {});
