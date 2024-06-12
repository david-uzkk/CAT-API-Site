document.addEventListener('DOMContentLoaded', function() {
    const catSearchForm = document.getElementById('catSearchForm');
    const catImagesContainer = document.getElementById('catImages');
    const modal = document.getElementById('myModal');
    const editFactText = document.getElementById('editFactText');
    const saveFactButton = document.getElementById('saveFactButton');
    const deleteFactButton = document.getElementById('deleteFactButton');
    let currentImageElement = null;

    catSearchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTag = document.getElementById('searchTag').value.trim();
        if (searchTag === '') {
            alert('Please enter a tag to search!');
            return;
        }

        fetch(`https://cataas.com/cat/${searchTag}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching cat image!');
                }
                return response.blob();
            })
            .then(blob => {
                const imgUrl = URL.createObjectURL(blob);
                
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = `Cat with the tag ${searchTag}`;

                const titleElement = document.createElement('p');
                titleElement.textContent = `${searchTag}`;
                titleElement.style.fontWeight = 'bold';

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('cat-image-container');
                imageContainer.appendChild(titleElement);
                imageContainer.appendChild(imgElement);

                imageContainer.addEventListener('click', function() {
                    currentImageElement = imgElement;
                    editFactText.value = searchTag; 
                    modal.style.display = 'block';
                });

                catImagesContainer.insertBefore(imageContainer, catImagesContainer.firstChild);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                alert('Error fetching cat image. Please try again later!');
            });

        document.getElementById('searchTag').value = '';
    });

    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveFactButton.addEventListener('click', function() {
        if (currentImageElement) {
            const newTag = editFactText.value.trim();
            currentImageElement.alt = `Cat with the tag ${newTag}`;
            currentImageElement.previousSibling.textContent = `${newTag}`;
            modal.style.display = 'none';
        }
    });

    deleteFactButton.addEventListener('click', function() {
        if (currentImageElement) {
            currentImageElement.parentElement.remove(); 
            modal.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
