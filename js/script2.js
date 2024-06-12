document.addEventListener('DOMContentLoaded', function() {
    const addFactButton = document.getElementById('addFactButton');
    const factList = document.getElementById('factList');
    const factModal = document.getElementById('factModal');
    const closeModal = document.querySelector('.close');
    const editFactText = document.getElementById('editFactText');
    const saveFactButton = document.getElementById('saveFactButton');
    const deleteFactButton = document.getElementById('deleteFactButton');

    let currentFactElement = null;

    addFactButton.addEventListener('click', function() {
        fetch('https://meowfacts.herokuapp.com/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching cat fact!');
                }
                return response.json();
            })
            .then(data => {
                const fact = data.data;
                const factElement = document.createElement('p');
                factElement.textContent = fact;
                
                const factContainer = document.createElement('div');
                factContainer.classList.add('fact-container');
                factContainer.appendChild(factElement);

                factContainer.addEventListener('click', function() {
                    currentFactElement = factElement;
                    editFactText.value = factElement.textContent;
                    factModal.style.display = 'block';
                });

                if (factList.firstChild) {
                    factList.insertBefore(factContainer, factList.firstChild);
                } else {
                    factList.appendChild(factContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching cat fact:', error);
                alert('Error fetching cat fact. Please try again later!');
            });
    });

    closeModal.addEventListener('click', function() {
        factModal.style.display = 'none';
    });

    saveFactButton.addEventListener('click', function() {
        if (currentFactElement) {
            currentFactElement.textContent = editFactText.value;
            factModal.style.display = 'none';
        }
    });

    deleteFactButton.addEventListener('click', function() {
        if (currentFactElement) {
            currentFactElement.parentElement.remove();
            factModal.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target === factModal) {
            factModal.style.display = 'none';
        }
    });
});
