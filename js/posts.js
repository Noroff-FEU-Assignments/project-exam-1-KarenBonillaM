//DISPLAYING THE BLOGS
const apiBase = "https://wordpress.karenbonilla.se";
const wordpressBase = "/wp-json/wp/v2";
const blogsBase = "/posts?_embed";

const fullBlogsURL = apiBase + wordpressBase + blogsBase;
const blogsURL = "https://wordpress.karenbonilla.se/wp-json/wp/v2/posts?_embed";



const morePosts = "&page=2";
const morePostsURL = apiBase + wordpressBase + blogsBase + morePosts;

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

  const btn = document.querySelector("#button-posts");
  let currentPost = 10;

  btn.addEventListener('click', function(){
    for(let i = currentPost; i< currentPost+2; i++) {
      if(postContainer[i]) {
        postContainer[i].style.display = "block";
      }
    }  
  })

  currentPost += 2;
  

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

async function morePostSection () {
  const posts = await getMoreBlogs();
  createPostsHTML(posts);
}

morePostSection()



/*By default Wordpress fetches 10 per page. I found it easiest to fetch page 2 so I only get the ones that are missing from the first fetch. My url looks like so /posts?per_page=10?page=2
So I just added page 2 to the button activated fetch and ran that data through the renderPosts (or whatever you’ve named yours)*/
