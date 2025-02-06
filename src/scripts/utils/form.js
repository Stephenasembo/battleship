import { dom, cacheFormInputs } from '../dom';
import { testP1UserInput, testP2UserInput } from '../driver';

function cancelInput(event) {
  event.preventDefault();
  dom.p1Dialog.close();
}

function openP1Form() {
  dom.p1Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p1SubmitBtn.addEventListener('click', testP1UserInput);
  formControls.p1CancelBtn.addEventListener('click', cancelInput);
}

function openP2Form() {
  dom.p2Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p2SubmitBtn.addEventListener('click', testP2UserInput);
  formControls.p2CancelBtn.addEventListener('click', cancelInput);
}

const testInput = {
  size4: '0,0 1,0 2,0 3,0',
  size3a: '5,0 6,0 7,0',
  size3b: '1,1 2,1 3,1',
  size2a: '5,1 6,1',
  size2b: '8,1 9,1',
  size2c: '1,2 2,2',
  size1a: '4,2',
  size1b: '5,3',
  size1c: '6,4',
  size1d: '7,4',
};

// function getUserInput(event) {
//   event.preventDefault();
//   dom.p1Dialog.close();
//   let results;
//   const inputs = cacheFormInputs();
//   if (event.target.id === 'p1Submit') {
//     results = {
//       size4: inputs.p1size4.value,
//       size3a: inputs.p1size3a.value,
//       size3b: inputs.p1size3b.value,
//       size2a: inputs.p1size2a.value,
//       size2b: inputs.p1size2b.value,
//       size2c: inputs.p1size2c.value,
//       size1a: inputs.p1size1a.value,
//       size1b: inputs.p1size1b.value,
//       size1c: inputs.p1size1c.value,
//       size1d: inputs.p1size1d.value,
//     };
//     Object.assign(p1Results, results);
//     manualShipPlacement(player1, p1Results);
//   } else if (event.targe.id === 'p2Submit') {
//     results = {
//       size4: inputs.p2size4.value,
//       size3a: inputs.p2size3a.value,
//       size3b: inputs.p2size3b.value,
//       size2a: inputs.p2size2a.value,
//       size2b: inputs.p2size2b.value,
//       size2c: inputs.p2size2c.value,
//       size1a: inputs.p2size1a.value,
//       size1b: inputs.p2size1b.value,
//       size1c: inputs.p2size1c.value,
//       size1d: inputs.p2size1d.value,
//     };
//     Object.assign(p2Results, results);
//   }
// }

export { openP1Form, openP2Form, testInput };
