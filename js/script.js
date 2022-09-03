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
    const totalItems = document.getElementById("item-number");
    if (allNews.length === 0) {
        totalItems.innerText = `0 Items found`
    }
    else {
        totalItems.innerText = `${allNews.length} Items found`
    }
    const noNews = document.getElementById("no-news");
    if (allNews.length === 0) {
        noNews.classList.remove("d-none")
    }
    else {
        noNews.classList.add("d-none")
    }
    allNews.forEach(news => {
        const { thumbnail_url, title, details, total_view } = news;
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("col")
        newsDiv.innerHTML = `
        <div class="card mb-3 mt-5">
            <div class="row g-0">
                <div class="col-md-4 news-thumbnail">
                    <img src="${thumbnail_url}" class="p-0 img-thumbnail" alt="...">
                </div>
                <div class="col-md-8 mt-3">
                    <div class="card-body">
                        <h5 class="card-title mb-4">${title}</h5>
                        <p class="card-text">${details.slice(0, 300) + '...'}</p>
                </div >
                <div class="container text-center mt-2">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex align-items-center">
                                <div class="category-image me-3 author-img">
                                    <img src="${news.author.img}" class="w-100">
                                </div>
                            <div class="author-details">
                                <h6 class="author-name">${news.author.name}</h6>
                                <p class="mb-0 publishing-date">${news.author.published_date}</p>
                            </div>
                        </div>
                    </div>
                <div class="col">
                    <div class="pt-2 text-size">
                        <i class="fa-regular fa-eye"></i> <span>${total_view}</span>
                    </div>
                </div>
                <div class="col">
                    <div class="pt-2 text-size">
                        <p>Rating:${news.rating.number}</p>
                    </div>
                </div>
                    <div class="col">
                        <button class="full-news-btn text-size pt-2">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
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