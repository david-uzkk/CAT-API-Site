document.addEventListener('DOMContentLoaded', function() {
    const catSearchForm = document.getElementById('catSearchForm');
    const catImagesContainer = document.getElementById('catImages');

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
                
                catImagesContainer.insertBefore(imgElement, catImagesContainer.firstChild);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                alert('Error fetching cat image. Please try again later!');
            });

        document.getElementById('searchTag').value = '';
    });
});
