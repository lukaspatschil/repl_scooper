
const test123 = "a";
const testasd = 1;

function asd1(params) {
  function name1(params) {
    function name2(params) {
      return test123;
    }
    return null;
  }
  return 1 + 1;
}
Promise.resolve(asd1("asd")).then(data => console.log(data)).catch(error => console.log(error));
