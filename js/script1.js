document.addEventListener('DOMContentLoaded', function() {
    const catSearchForm = document.getElementById('catSearchForm');
    const catImagesContainer = document.getElementById('catImages');

    catSearchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTag = document.getElementById('searchTag').value.trim();
        if (searchTag === '') {
            alert('Por favor, insira uma tag para pesquisar!');
            return;
        }

        fetch(`https://cataas.com/cat/${searchTag}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar imagem do gato!');
                }
                return response.blob();
            })
            .then(blob => {
                const imgUrl = URL.createObjectURL(blob);
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = `Gato com a tag ${searchTag}`;
                
                catImagesContainer.insertBefore(imgElement, catImagesContainer.firstChild);
            })
            .catch(error => {
                console.error('Erro ao buscar imagem:', error);
                alert('Erro ao buscar imagem do gato. Tente novamente mais tarde!');
            });

        document.getElementById('searchTag').value = '';
    });
});
