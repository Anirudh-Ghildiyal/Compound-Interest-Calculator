var accessKey = "Mi0M2I2TwvOpKHZtQoIZdPyuCVs0GajVwomRHrE1dvY";

function changeBackground() {
    fetch("https://api.unsplash.com/photos/random?query=finance,banking&client_id=" + accessKey)
        .then(response => response.json())
        .then(data => {
            var imageUrl = data.urls.regular;
            document.body.style.backgroundImage = "url('" + imageUrl + "')";
        })
        .catch(error => {
            console.log(error);
        });
}
setInterval(changeBackground, 10000);

function generatePaymentInputs(numPayments) {
    var paymentInputs = '';

    for (var i = 1; i <= numPayments; i++) {
        paymentInputs += `
        <div class="mb-3">
          <label for="payment-${i}" class="form-label">Payment ${i}</label>
          <input type="number" step="any" class="form-control payment-input" id="payment-${i}" placeholder="Enter payment ${i}">
        </div>
      `;
    }

    document.getElementById('payment-inputs').innerHTML = paymentInputs;
}

var informationForm = document.getElementById('information-form');

informationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var years = document.getElementById('years');
    var name = document.getElementById('name');
    var interestRate = document.getElementById('interest-rate');

    if (name.value.trim() === '') {
        alert('Please enter your name.');
        name.focus();
        return false;
    }

    if (interestRate.value.trim() === '' || interestRate.value <= 0) {
        alert('Please enter the interest rate.');
        interestRate.focus();
        return false;
    }

    if (years.value.trim() === '' || parseInt(years.value) <= 0) {
        alert('Please enter the number of years.');
        years.focus();
        return false;
    }
    generatePaymentInputs(parseInt(years.value));

    var informationContainer = document.getElementById("information-container");
    informationContainer.style.display = "none";
    var paymentContainer = document.getElementById("payment-container");
    paymentContainer.style.display = "block";
});

var paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var bool = true;

    var paymentInputs = document.getElementsByClassName('payment-input');
    for (var i = 0; i < paymentInputs.length; i++) {
        var payment = parseFloat(paymentInputs[i].value);
        if (isNaN(payment) || payment < 0) {
            alert('Please enter valid payment amount that is non-zero and non-negative');
            paymentInputs[i].focus();
            bool = false; break;
        }
    }

    if (bool) {
        var array = [];
        for (var i = 1; i <= years.value; ++i) {
            array.push(parseFloat(document.getElementById(`payment-${i}`).value));
        }
        console.log(array);
        compoundInterestCalculator(array);
    }
});

function compoundInterestCalculator(array) {
    var years = document.getElementById('years');
    var interestRate = document.getElementById('interest-rate');
    var sum = 0;
    for (var i = 0; i < years.value; ++i) {
        sum += array[i];
        var intAmount = sum * parseFloat(interestRate.value) * 1 / 100;
        sum += intAmount;
    }

    var paymentContainer = document.getElementById("payment-container");
    paymentContainer.style.display = "none";
    var resultContainer = document.getElementById("result-container");

    console.log(sum);
    document.getElementById('result').innerHTML = "Result: &#x20B9;" + sum;
    resultContainer.style.display = "block";

}