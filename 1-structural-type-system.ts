interface Action {
  type: string;
}

class MyAction {
  type: string;
}

function handleAction(action: Action) {
  console.log(`handling action: ${action}`);
}

handleAction(new MyAction());





















let a1 = { a: 'a1' };
let a2 = { a: 'a2' };
let a3 = { a: 'a3', b: 'b' };
let b = { b: 'b' };

a1 = a2;
a1 = a3;
a1 = b;
















// https://www.typescriptlang.org/docs/handbook/type-compatibility.html
