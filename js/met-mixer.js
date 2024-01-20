// The MET API 
const metLink = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
   
// FUNCTION
async function fetchRandomArtwork() {
  try {
    const response = await fetch(metLink);
    const data = await response.json();
    const randomObjectID = getRandomObjectID(data.objectIDs);
//   const objectIDs = data.objectIDs.filter(async (objectID) => {
//     const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
//    const artworkData = await artworkResponse.json();
//      return artworkData.primaryImage !== undefined; // Filter out objects without a valid image
//    });

  //  const randomObjectID = getRandomObjectID(objectIDs); Uncomment to test filter
   
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
  infoContainer.appendChild(createInfoElement('Culture', artwork.culture));
  infoContainer.appendChild(createInfoElement('Time Period', artwork.period));
}
//    if (artwork.title) {
//   const title = document.createElement('p');
//   title.textContent = `<strong>Title:</strong> ${artwork.title}`;
//   infoContainer.appendChild(title);
//   }  else {
//  If no title, display a default message.
//    const noTitleMessage = document.createElement('p');
//    noTitleMessage.textContent = 'This artwork does not have a title.';
//    infoContainer.appendChild(noTitleMessage);
//    return;
//      }


//    if (artwork.artistDisplayName) {
//   const artist = document.createElement('p');
//  artist.textContent = `<strong>Artist</strong>: ${artwork.artistDisplayName}`;
//   infoContainer.appendChild(artist);
//   } else {
//  If no artist name, display a default message.
//    const noArtistMessage = document.createElement('p');
//    noArtistMessage.textContent = 'This artwork does not have an artist name.';
//    infoContainer.appendChild(noArtistMessage);
//    return;
//      }


//   if (artwork.medium) {
//   const medium = document.createElement('p');
//   medium.textContent = `<strong>Medium</strong>: ${artwork.medium}`;
//   infoContainer.appendChild(medium);
//   }  else {
//  If no medium, display a default message.
//    const noMediumMessage = document.createElement('p');
//    noMediumMessage.textContent = 'This artwork does not have medium information.';
//    infoContainer.appendChild(noMediumMessage);
//    return;
//      }

//   if (artwork.culture) {
//   const culture = document.createElement('p');
//   culture.textContent = `<strong>Culture</strong>: ${artwork.culture}`;
//   infoContainer.appendChild(culture);
//   }  else {
//  If no culture, display a default message.
//    const noCultureMessage = document.createElement('p');
//    noCultureMessage.textContent = 'This artwork does not have culture information.';
//    infoContainer.appendChild(noCultureMessage);
//    return;
//      }

//   if (artwork.period) {
//   const period = document.createElement('p');
//   period.textContent = `<strong>Time Period</strong>: ${artwork.period}`;
//   infoContainer.appendChild(period);
//   }  else {
//  If no period, display a default message.
//    const noPeriodMessage = document.createElement('p');
//    noPeriodMessage.textContent = 'This artwork does not have time period information..';
//    infoContainer.appendChild(noPeriodMessage);
//    return;
//      }

//   if (artwork.objectEndDate) {
//   const date = document.createElement('p');
//   date.textContent = `<strong>Date</strong>: ${artwork.objectEndDate}`;
//   infoContainer.appendChild(date);
//   }  else {
//  If no period, display a default message.
//    const noObjectEndDate = document.createElement('p');
//    noObjectEndDate.textContent = 'This artwork does not have an end date.';
//    infoContainer.appendChild(noObjectEndDateMessage);
//    return;
//     }

}

document.getElementById('generateArtButton').addEventListener('click', async () => {
try {
const randomArtwork = await fetchRandomArtwork();
displayArtwork(randomArtwork);
} catch (error) {
console.error('Error fetching or displaying artwork:', error);
}
}); 
