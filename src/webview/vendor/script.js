window.addEventListener('load', (e) => {
  const input = document.getElementById('in1');
  const text = document.getElementById('text');

  // addVariable();

  const var1 = {
    name: "test1"
  };
  const var2 = {
    name: "test2"
  };

  const coll = [var1, var2, {name: "x"}, {name: "x"}, {name: "x"}];

  createVariable(coll);
  
  input.onchange = e => {
    text.innerHTML = e.target.value;
  };
});

function createVariable(variables) {
  for(let variable of variables) {
    addVariable(variable);
  }
}

function addVariable(varvont) {
  const container = document.createElement("div");
  const borderBox1 = document.createElement("div");
  const borderBox2 = document.createElement("div");
  const lable = document.createElement("label");
  const input = document.createElement("input");
  const content = document.createTextNode(`${varvont.name}:`);

  container.className = "var-container";
  borderBox1.className = "border";
  borderBox2.className = "border";
  lable.className = "var-lable";
  lable.htmlFor = `${varvont.name}`;
  input.id = `${varvont.name}`;

  lable.appendChild(content);

  borderBox1.appendChild(lable);
  borderBox2.appendChild(input);

  container.appendChild(borderBox1);
  container.appendChild(borderBox2);

  const section = document.getElementById("var-container");
  section.appendChild(container);
}