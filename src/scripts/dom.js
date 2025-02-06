const dom = (function cacheDom() {
  const p1Dialog = document.querySelector('#p1Dialog');
  const p2Dialog = document.querySelector('#p2Dialog');
  const p1ManualBtn = document.querySelector('#p1Manual');
  const p1AutoBtn = document.querySelector('#p1Auto');
  const p2ManualBtn = document.querySelector('#p2Manual');
  const p2AutoBtn = document.querySelector('#p2Auto');

  const player1Board = document.querySelector('.one');
  const player2Board = document.querySelector('.two');

  return {
    p1Dialog,
    p2Dialog,
    p1ManualBtn,
    p1AutoBtn,
    p2ManualBtn,
    p2AutoBtn,
    player1Board,
    player2Board,
  };
}());

function cacheFormInputs() {
  const p1SubmitBtn = document.querySelector('#p1Submit');
  const p1CancelBtn = document.querySelector('#p1Cancel');
  const p2SubmitBtn = document.querySelector('#p2Submit');
  const p2CancelBtn = document.querySelector('#p2Cancel');

  const p1size4 = document.querySelector('#p1size4');
  const p1size3a = document.querySelector('#p1size3a');
  const p1size3b = document.querySelector('#p1size3b');
  const p1size2a = document.querySelector('#p1size2a');
  const p1size2b = document.querySelector('#p1size2b');
  const p1size2c = document.querySelector('#p1size2c');
  const p1size1a = document.querySelector('#p1size1a');
  const p1size1b = document.querySelector('#p1size1b');
  const p1size1c = document.querySelector('#p1size1c');
  const p1size1d = document.querySelector('#p1size1d');

  const p2size4 = document.querySelector('#p2size4');
  const p2size3a = document.querySelector('#p2size3a');
  const p2size3b = document.querySelector('#p2size3b');
  const p2size2a = document.querySelector('#p2size2a');
  const p2size2b = document.querySelector('#p2size2b');
  const p2size2c = document.querySelector('#p2size2c');
  const p2size1a = document.querySelector('#p2size1a');
  const p2size1b = document.querySelector('#p2size1b');
  const p2size1c = document.querySelector('#p2size1c');
  const p2size1d = document.querySelector('#p2size1d');

  return {
    p1SubmitBtn,
    p1CancelBtn,
    p2SubmitBtn,
    p2CancelBtn,

    p1size4,
    p1size3a,
    p1size3b,
    p1size2a,
    p1size2b,
    p1size2c,
    p1size1a,
    p1size1b,
    p1size1c,
    p1size1d,

    p2size4,
    p2size3a,
    p2size3b,
    p2size2a,
    p2size2b,
    p2size2c,
    p2size1a,
    p2size1b,
    p2size1c,
    p2size1d,
  };
}

export { dom, cacheFormInputs };
