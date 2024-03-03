const apiKey = "6qhFLVXL6L1sIGRTyhbipRqC5331xxl6NJztvRZn";
const cardDetails = document.querySelector(".card-details");
const generateButton = document.getElementById("generate-img"); // Select the button by its ID
const anchorTag = document.getElementById("anchor");
const loadingContainer = document.getElementById("loading-container");

generateButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission if applicable
  generateButton.style.display = "none";
  loadingContainer.style.display = "flex";
  try {
    
    const apodData = await getAPOD_Data(); // this function fetches APOD data
    setTimeout(() => {
      // Data retrieved, hide the loading animation
      loadingContainer.style.display = "none";
  
      // Process the fetched data here
      get_data_and_display(apodData); // this function processes and displays data
    }, 2000);
  
    
  } catch (error) {
    // Handle errors gracefully, e.g., display an error message
    console.error("Error fetching data:", error);
  }
});

async function getAPOD_Data(){

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
      throw new Error("Could not fetch apod data");
    }

    // console.log(response.json());

    return await response.json();
}

// getAPOD_Data();

function get_data_and_display(data) {

    const {date, explanation, title, url, copyright} 
    = data;
    
    const title_el = document.createElement("h2");
    const date_el = document.createElement("p");
    const explanation_el = document.createElement("p");
    const img_el = document.createElement("img");
    const copyright_el = document.createElement("p");

    cardDetails.textContent = "";
    cardDetails.style.display = "flex";

    title_el.textContent = title;
    explanation_el.textContent = explanation;
    date_el.textContent = `(${date})`;
    img_el.src = url;
    copyright_el.textContent = `Image Credit & Copyright: ${copyright}`

    // cardDetails.querySelector("a").href = url;
    anchorTag.setAttribute("href", url);

    // title_el.classList.add('.title');
    explanation_el.classList.add("explanation");
    date_el.classList.add("date");
    copyright_el.classList.add('copyright');
    // img_el.classList.add('.apod-image');

    cardDetails.appendChild(title_el);
    cardDetails.appendChild(date_el);
    cardDetails.appendChild(img_el);
    cardDetails.appendChild(explanation_el);
    cardDetails.appendChild(copyright_el);

}
