const calculateButton = document.getElementById('calculate-button');
const dobInput = document.getElementById('dob-input');
const result = document.getElementById('result');

calculateButton.addEventListener('click', () => {
  const dob = new Date(dobInput.value);
  if (isValidDate(dob)) {
    const age = calculateAge(dob);
    result.innerHTML = `
      <strong>Your age is:</strong><br>
      ${age.years} years<br>
      ${age.months} months<br>
      ${age.days} days<br>
      ${age.minutes} minutes<br>
    `;
  } else {
    result.textContent = 'Please enter a valid date of birth.';
  }
});

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function calculateAge(date) {
  const today = new Date();
  let years = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();
  let days = today.getDate() - date.getDate();
  let minutes = Math.floor((today - date) / (1000 * 60));

  if (months < 0 || (months === 0 && today.getDate() < date.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, date.getDate());
    days = Math.floor((today - prevMonthDate) / (1000 * 60 * 60 * 24));
  }

  return {
    years,
    months,
    days,
    minutes
  };
}