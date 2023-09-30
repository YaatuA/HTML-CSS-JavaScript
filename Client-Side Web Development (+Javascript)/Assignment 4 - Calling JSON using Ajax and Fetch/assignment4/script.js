// Get the container element by class name
var container = document.querySelector('.container');

// Create a new row element with the class name "row"
var row = document.createElement('div');
row.className = 'row';

// Create four new column elements with the class name "column"
for (var i = 0; i < 4; i++) {
    var column = document.createElement('div');
    column.className = 'column';
    column.id = 'column' + (i + 1);

    // Create eight new div elements with the class name "card" and puts a progress bar inside each one
    for (var j = 0; j < 2; j++) {
        var cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer';
        column.appendChild(cardContainer);

        var progress = document.createElement('div');
        progress.className = 'myProgress';
        cardContainer.appendChild(progress);

        var card = document.createElement('div');
        card.className = 'card';
        card.id = 'card' + (i * 2 + j + 1);
        cardContainer.appendChild(card);

        var myBar = document.createElement('div');
        myBar.className = 'myBar';
        myBar.id = 'bar' + (i * 2 + j + 1);
        progress.appendChild(myBar);
    }

    row.appendChild(column);
}

// Create a new div element with id "myModal" and class "modal"
const modal = document.createElement('div');
modal.id = 'myModal';
modal.classList.add('modal');

// Create a new div element with class "modal-content" and append it to the modal
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');
modal.appendChild(modalContent);

// Create a new span element with class "close" and add the close symbol
const closeBtn = document.createElement('span');
closeBtn.classList.add('close');
closeBtn.innerHTML = '&times;';
modalContent.appendChild(closeBtn);

// Create a new p element with no inner text and append it to the modal content
const modalText = document.createElement('p');
modalText.classList.add('modalMessage');
modalContent.appendChild(modalText);

// Add the modal to the end of the document body
document.body.appendChild(modal);

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// First, data is gathered from the products.json file using Ajax
var xhr = new XMLHttpRequest();
xhr.open('GET', 'products.json', true);
xhr.onload = function() {
  if (this.status == 200) {
    var products = JSON.parse(this.responseText);
    // Once we have the products, we can loop through each card div and add an img element to it
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const product = products[index];
        // Create the img element and set its src and alt attributes
        const img = document.createElement('img');
        img.src = product.src;
        img.alt = product.alt;
        // Add the img element to the card div
        card.appendChild(img);

        // Create the h1 element and set its text content to the product title
        const h1 = document.createElement('h1');
        h1.textContent = product.title;
        // Add the h1 element to the card div
        card.appendChild(h1);

        // Create the p element with class "price" and set its text content to the price
        const p = document.createElement('p');
        p.classList.add('price');
        p.textContent = "$" + product.price;
        // Add the p element to the card div
        card.appendChild(p);

        // Create the p element and set its text content to the product description
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = product.description;
        // Add the p element to the card div
        card.appendChild(description);

        // Create the p element for the button and set its text and style
        const actionLabel = product.actionLabel;
        const buttonP = document.createElement('p');
        const button = document.createElement('button');
        if (actionLabel) {
            button.textContent = actionLabel;
        } else {
            button.style.display = 'none';
        }

        // When the user clicks the button, the modal is opened with the corresponding message 
        button.onclick = function () {
            //Fetch the message from the respective .json file using fetch
            fetch(product.actionURL)
                .then(response => response.json())
                .then(message => {
                    const modalMessage = message;
                    modalText.innerHTML = modalMessage.message;
                    modalContent.appendChild(modalText);
                });

            modal.style.display = "block";
        }

        // Add the button to the p element, and the p element to the card div
        buttonP.appendChild(button);
        card.appendChild(buttonP);
    });
  }
};
xhr.send();

// Add the row element to the container element
container.appendChild(row);

// This function runs the progress bar and then displays the cards after 1000 ms
var i = 0;
window.addEventListener("load", loadCards);
function loadCards() {
    if (i == 0) {
        i = 1;
        var elem = document.querySelectorAll('.myBar');
        var index = 0;
        function animateBar() {
            var bar = elem[index];
            if (!bar) {
                i = 0;
                return;
            }
            var card = document.getElementById('card' + bar.id.slice(3));
            bar.style.display = 'block';
            card.style.display = 'none';
            var width = 1;
            var id = setInterval(frame, 1); //interval is set to 1ms as the function is run many times to continuously update progress bar, so the real-time delay before the card is displayed is approx. 1000ms
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    bar.style.display = 'none';
                    card.style.display = 'block';
                    index++;
                    animateBar();
                } else {
                    width++;
                    bar.style.width = width + "%";
                }
            }
        }
        animateBar();
    }
}
