const loadCategory = () => {
    url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (titles) => {
    // console.log(titles)
    const categoryContainer = document.getElementById("category-container");
    titles.forEach(title => {
        const newList = document.createElement("li");
        newList.classList.add("category-li");
        newList.innerHTML = `
            <span class="px-3 pt-4" onclick="loadCategoryContent('${title.category_id}')">${title.category_name}</span>
        `
        categoryContainer.appendChild(newList);
    });
}

const loadCategoryContent = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryContent(data.data))
}
const displayCategoryContent = (allNews) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;
    const noNews = document.getElementById("no-news");
    if (allNews.length === 0) {
        noNews.classList.remove("d-none")
    }
    else {
        noNews.classList.add("d-none")
    }
    allNews.forEach(news => {
        const { thumbnail_url, title, details } = news;
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("col")
        newsDiv.innerHTML = `
        <div class="card mb-3 mt-5">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${thumbnail_url}" class="img-fluid" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 500)}</p>
              <div></div>
            </div>
          </div>
        </div>
      </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}


loadCategory();
loadCategoryContent("01");