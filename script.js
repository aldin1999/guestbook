function calculateTax() {
  const income = document.getElementById("income").value;
  const result = document.getElementById("result");

  // Simple tax calculation example (adjust for your needs)
  let taxAmount = 0;
  if (income <= 50000) {
    taxAmount = income * 0.1; // 10% tax for income <= 50k
  } else if (income <= 100000) {
    taxAmount = income * 0.2; // 20% tax for income <= 100k
  } else {
    taxAmount = income * 0.3; // 30% tax for income > 100k
  }

  // Show result with a message
  if (taxAmount < 0) {
    result.innerText = `You are owed a refund of $${Math.abs(taxAmount).toFixed(2)}.`;
    result.classList.add("positive");
    result.classList.remove("negative");
  } else {
    result.innerText = `You owe $${taxAmount.toFixed(2)} in taxes.`;
    result.classList.add("negative");
    result.classList.remove("positive");
  }
}