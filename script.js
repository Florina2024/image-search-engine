const accessKey = "1zU-GIyo6FToX7548VhuXfyU-kPuG60RN5V_yrKtsrI";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value.trim(); // Trim whitespace from the input
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
    keyword
  )}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    if (page === 1) {
      searchResult.innerHTML = ""; // Clear search results only when page is 1
    }

    const results = data.results;

    if (results && Array.isArray(results)) {
      results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        image.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
      });
    } else {
      throw new Error("Results are undefined or not an array");
    }

    showMoreBtn.style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Handle errors
    alert("An error occurred while fetching data. Please try again later.");
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
