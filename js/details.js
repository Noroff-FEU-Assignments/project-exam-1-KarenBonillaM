const detailsContainer = document.querySelector(".details-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const titleDetails = document.querySelector(".title-details");
const id = params.get("id");

console.log(id);

const urlDetails =  "https://wordpress.karenbonilla.se/wp-json/wp/v2/posts/" + id + "?_embed";

console.log(urlDetails);

async function fetchPost() {
  const response = await fetch(urlDetails);
  const details = await response.json();

  console.log(details);

 titleDetails.innerHTML = `Swexican Blog | ${details.title.rendered}`;

 console.log(titleDetails)
 //TITLE
const titlePost =  document.createElement("h2"); 
titlePost.classList.add("title-details-post")
titlePost.innerHTML = details.title.rendered;
detailsContainer.append(titlePost);

//IMG
const detailsImage = details._embedded["wp:featuredmedia"][0];

const img = document.createElement("img");
  img.classList.add("post-img")
  img.src = detailsImage.source_url;
  detailsContainer.append(img);

  const popUpContainer = document.querySelector(".popup-container");
  const closeIcon = document.querySelector(".close-icon");

  const popUpImg = document.createElement("img");
  popUpImg.src = img.src;
  popUpImg.classList.add("popUp-img");
  popUpContainer.append(popUpImg);

  img.addEventListener("click", function() {
    popUpContainer.style.display = "block";
  });

  closeIcon.addEventListener("click", function(){
    popUpContainer.style.display = "none"
  })
  console.log(detailsImage)

  const content = document.createElement("div");
  content.classList.add("content-container");
  content.innerHTML = details.content.rendered;
  detailsContainer.append(content);
  return img;

}

fetchPost();


