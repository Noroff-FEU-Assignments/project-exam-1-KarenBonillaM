//DISPLAYING THE BLOGS
const apiBase = "https://wordpress.karenbonilla.se";
const wordpressBase = "/wp-json/wp/v2";
const blogsBase = "/posts?_embed";

const fullBlogsURL = apiBase + wordpressBase + blogsBase;
const blogsURL = "https://wordpress.karenbonilla.se/wp-json/wp/v2/posts?_embed";



const morePosts = "&page=2";
const morePostsURL = apiBase + wordpressBase + blogsBase + morePosts;
const btn = document.querySelector("#button-posts");

//GETTING DATA FROM API
async function getBlogs() {
  const response = await fetch (fullBlogsURL);

  const posts = await response.json();

  return posts;
}


async function getMoreBlogs() {
  const response = await fetch (morePostsURL);

  const posts = await response.json();

  return posts;
}


function createPostHTML (post) {
  const container = document.querySelector(".posts-container");

  const postContainer = document.createElement("a");
  postContainer.href = "posts/details.html?id=" + post.id;
  postContainer.classList.add("post");
  postContainer.classList.add("thumbnail-posts-page");
  

  //IMAGES

  const featuredImages = post._embedded["wp:featuredmedia"];

  for(let i = 0; i < featuredImages.length; i++) {
    const imgData = featuredImages[i];
    const img = document.createElement("img");
    img.classList.add("thumbnail")
    img.src = imgData.source_url;
    postContainer.append(img);
  }

  //TITLE
  const title = document.createElement("h3");
  title.classList.add("post-title")
  title.innerText = post.title.rendered;
  postContainer.append(title);

  container.append(postContainer);

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

btn.addEventListener("click", async function morePostSection() {
  const posts = await getMoreBlogs();
  createPostsHTML(posts);
}, {once : true},);


