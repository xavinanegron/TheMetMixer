// The MET API 
const metLink = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
   
// FUNCTION
async function fetchRandomArtwork() {
  try {
    const response = await fetch(metLink);
    const data = await response.json();
    const randomObjectID = getRandomObjectID(data.objectIDs);

    const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`);
    const artworkData = await artworkResponse.json();



    return artworkData;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return null;
  }
}


// FUNCTION to get random objectID from API
function getRandomObjectID(objectIDs) {
  return objectIDs[Math.floor(Math.random() * objectIDs.length)];
}



// FUNCTION to display artwork
function displayArtwork(artwork) {
  const artContainer = document.getElementById('artContainer');
  artContainer.innerHTML = '';

  const infoContainer = document.getElementById('infoContainer');
  infoContainer.innerHTML = '';



//   If artwork not available it will display a error message.
  if (!artwork) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Failed to fetch artwork.';
    artContainer.appendChild(errorMessage);
    return;
  }


// Adding if statements to only create element if found on API endpoint.
    if (artwork.primaryImage) {
    const image = document.createElement('img');
    image.src = artwork.primaryImage;
    artContainer.appendChild(image);
    }  else {
      // //  If artwork image not available or there is no image from API, display message and do nothing.
      const noImageMessage = document.createElement('p');
    noImageMessage.textContent = "Generated artwork not displayed because it has no image. Please, click on the 'Get Art' button to generate new art.";
    artContainer.appendChild(noImageMessage);
    }


// Artwork Info
function createInfoElement(label, value) {
    const element = document.createElement('p');
    element.innerHTML = `<strong>${label}:</strong> ${value || 'This artwork does not have ' + label.toLowerCase() + ' information.'}`;
    return element;
  }

  infoContainer.appendChild(createInfoElement('Title', artwork.title));
  infoContainer.appendChild(createInfoElement('Artist', artwork.artistDisplayName));
  infoContainer.appendChild(createInfoElement('Medium', artwork.medium));
  infoContainer.appendChild(createInfoElement('Date', artwork.objectEndDate));
  infoContainer.appendChild(createInfoElement('Culture', artwork.culture));
  infoContainer.appendChild(createInfoElement('Time Period', artwork.period));
  
}

document.getElementById('generateArtButton').addEventListener('click', async () => {
try {
const randomArtwork = await fetchRandomArtwork();
displayArtwork(randomArtwork);
} catch (error) {
console.error('Error fetching or displaying artwork:', error);
}
}); 
