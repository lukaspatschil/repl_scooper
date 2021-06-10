
const test123 = "a";
const testasd = 1;

function name2(params) {
  return test123.filter(el => el === 'a');
}
Promise.resolve(name2(1)).then(data => console.log(data)).catch(error => console.log(error));
