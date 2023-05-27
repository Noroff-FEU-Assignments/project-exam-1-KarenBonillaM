//DISPLAYING THE BLOGS
const apiBase = "https://wordpress.karenbonilla.se";
const wordpressBase = "/wp-json/wp/v2";
const blogsBase = "/posts?_embed";

const fullBlogsURL = apiBase + wordpressBase + blogsBase;
const blogsURL = "https://wordpress.karenbonilla.se/wp-json/wp/v2/posts?_embed";

//GETTING DATA FROM API

async function getBlogs() {
  const response = await fetch (fullBlogsURL);

  const posts = await response.json();

  return posts;
}

function createPostHTML (post) {
  const container = document.querySelector(".thumbnails-container");

  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  //IMAGES

  const featuredImages = post._embedded["wp:featuredmedia"];

  for(let i = 0; i < featuredImages.length; i++) {
    const imgData = featuredImages[i];
    const img = document.createElement("img");
    img.classList.add("thumbnail")
    img.src = imgData.source_url;
    img.alt = imgData.alt_text;
    postContainer.append(img);
  }

  const title = document.createElement("a");
  title.href = "/posts.html?id" + post.id
  title.classList.add("post-title")
  title.innerText = post.title.rendered;
  postContainer.append(title);

  container.append(postContainer);


  //CAROUSEL
  const carousel = document.querySelector(".carousel-container")
  firstPost = carousel.querySelectorAll("div")[0];
  arrowIcons = document.querySelectorAll(".blogs-wrapper i");

  let firstPostWidth = firstPost.clientWidth + 14;
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  
  const showHideIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
  }

  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstPostWidth : firstPostWidth;
    setTimeout(() => showHideIcons(), 60); 
  });
});
}

function createPostsHTML (posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    createPostHTML(post)
  }
}

async function postSection () {
  const posts = await getBlogs();
  createPostsHTML(posts);
}

postSection()


