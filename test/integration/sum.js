//! this is just for testing
// this is a function
const test123 = 'a';
const testasd = 1;

function sum(a, b, c) {
  function asd1(params) {
    function name1(params) {
      function name2(params) {
        return test123.filter(el => el === 'a');
      }
      return null;
    }
    return 1 + 1;
  }
  return a + b + c;
}

function foo(a, b) {
  return a + b;
}

const multi = (a, b) => {
  const test = null;
  return a * b;
};

function name1(params) {
  return sum(1, 2, 3);
}

function foo1() {
  const promise = new Promise((resolve, reject) => {
    const random = Math.random();

    if (random >= 0.5) {
      resolve('ok');
    }
    else
    {
      reject('error');
    }
  });

  return promise;
}

const asd = '123';
