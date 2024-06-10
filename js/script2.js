document.addEventListener('DOMContentLoaded', function() {
    const addFactButton = document.getElementById('addFactButton');
    const factList = document.getElementById('factList');

    addFactButton.addEventListener('click', function() {
        fetch('https://meowfacts.herokuapp.com/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o fato de gato!');
                }
                return response.json();
            })
            .then(data => {
                const fact = data.data;
                const factElement = document.createElement('p');
                factElement.textContent = fact;
                
                // Criar um contêiner para cada fato de gato
                const factContainer = document.createElement('div');
                factContainer.classList.add('fact-container');
                factContainer.appendChild(factElement);

                // Adicionar o contêiner do fato à lista de fatos
                if (factList.firstChild) {
                    factList.insertBefore(factContainer, factList.firstChild);
                } else {
                    factList.appendChild(factContainer);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar fato de gato:', error);
                alert('Erro ao buscar fato de gato. Tente novamente mais tarde!');
            });
    });
});
