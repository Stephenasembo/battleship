import { dom, cacheFormInputs } from '../dom';
import { readP1UserInput, readP2UserInput } from '../driver';

function cancelInput(event) {
  event.preventDefault();
  dom.p1Dialog.close();
}

function openP1Form() {
  dom.p1Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p1SubmitBtn.addEventListener('click', readP1UserInput);
  formControls.p1CancelBtn.addEventListener('click', cancelInput);
}

function openP2Form() {
  dom.p2Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p2SubmitBtn.addEventListener('click', readP2UserInput);
  formControls.p2CancelBtn.addEventListener('click', cancelInput);
}

function getUserInput(player) {
  const inputs = cacheFormInputs();
  let results;
  if (player.type === 'human') {
    dom.p1Dialog.close();
    // Unpack player1 input into an object
    results = {
      size4: inputs.p1size4.value,
      size3a: inputs.p1size3a.value,
      size3b: inputs.p1size3b.value,
      size2a: inputs.p1size2a.value,
      size2b: inputs.p1size2b.value,
      size2c: inputs.p1size2c.value,
      size1a: inputs.p1size1a.value,
      size1b: inputs.p1size1b.value,
      size1c: inputs.p1size1c.value,
      size1d: inputs.p1size1d.value,
    };
  } else if (player.type === 'computer') {
    dom.p2Dialog.close();
    // Unpack player2 input into an object
    results = {
      size4: inputs.p2size4.value,
      size3a: inputs.p2size3a.value,
      size3b: inputs.p2size3b.value,
      size2a: inputs.p2size2a.value,
      size2b: inputs.p2size2b.value,
      size2c: inputs.p2size2c.value,
      size1a: inputs.p2size1a.value,
      size1b: inputs.p2size1b.value,
      size1c: inputs.p2size1c.value,
      size1d: inputs.p2size1d.value,
    };
  }
  return results;
}

export {
  openP1Form,
  openP2Form,
  getUserInput,
};
