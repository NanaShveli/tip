const btns = document.querySelectorAll('.btn');
const billInput = document.querySelector('.billInput');
const peopleInput = document.querySelector('#people');
const customInput = document.querySelector('.custom');
const tip = document.querySelector('#tip');
const totalTip = document.querySelector('#total');
const totalAmount = document.querySelector('#totalAmount');
const resetBtn = document.querySelector('.reset');

let numberOfPeople = 1;
let amount = null;
let percent = null;

// Adding active state to buttons
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btns.forEach((item) => {
      item.classList.remove('active');
    });
    e.target.classList.add('active');
    percent = btn.getAttribute('data-percent');
    customInput.value = '';
    customInput.classList.remove('active');

    calculateTip(numberOfPeople, percent, amount);
  });
});

billInput.addEventListener('input', (e) => {
  amount = e.target.value;
  calculateTip(numberOfPeople, percent, amount);
});

peopleInput.addEventListener('input', (e) => {
  numberOfPeople = e.target.value;
  calculateTip(numberOfPeople, percent, amount);
});

customInput.addEventListener('input', (e) => {
  btns.forEach((item) => {
    item.classList.remove('active');
  });
  percent = e.target.value;
  calculateTip(numberOfPeople, percent, amount);
});

customInput.addEventListener('blur', (e) => {
  if (e.target.value.length > 0) {
    customInput.classList.add('active');
  } else {
    customInput.classList.remove('active');
  }
});

// Calculate Tip
const calculateTip = (numberOfPeople, percent, amount) => {
  if (!numberOfPeople || !amount || !percent) return;
  const tipPerPerson = ((percent / 100) * amount).toFixed(2);
  const sumOfTip = (tipPerPerson * numberOfPeople).toFixed(2);
  const total = (Number(amount) + Number(sumOfTip)).toFixed(2);

  tip.textContent = `$${tipPerPerson}`;
  totalTip.textContent = `$${sumOfTip}`;
  totalAmount.textContent = `$${total}`;
};

// CHECKING FOR INVALID INPUT VALUES OR NULL
billInput.addEventListener('blur', (e) => {
  if (e.target.value.length === 0) {
    billInput.classList.add('invalid');
  } else {
    billInput.classList.remove('invalid');
    calculateTip(numberOfPeople, percent, amount);
  }
});

peopleInput.addEventListener('blur', (e) => {
  if (e.target.valueAsNumber === 0) {
    peopleInput.classList.add('invalid');
  } else {
    peopleInput.classList.remove('invalid');
    calculateTip(numberOfPeople, percent, amount);
  }
});

// Resetting calculator
resetBtn.addEventListener('click', () => {
  btns.forEach((item) => {
    item.classList.remove('active');
  });
  billInput.value = '';
  peopleInput.value = '';
  customInput.value = '';
  numberOfPeople = 1;
  amount = null;
  percent = null;
  tip.textContent = '$0.00';
  totalTip.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
});
