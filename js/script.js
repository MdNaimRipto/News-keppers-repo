/* Catagory display section */
const loadCategory = () => {
    url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategory = (titles) => {
    const categoryContainer = document.getElementById("category-container");
    titles.forEach(title => {
        const newList = document.createElement("li");
        newList.classList.add("category-li");
        newList.innerHTML = `
            <span class="px-3 pt-4" onclick="loadNewsContent('${title.category_id}')">${title.category_name}</span>
        `
        categoryContainer.appendChild(newList);
    });
}

/* News load function */
const loadNewsContent = (category_id) => {
    toogleLoader(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsContent(data.data))
        .catch(error => console.log(error))
}
const displayNewsContent = (allNews) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;
    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const totalItems = document.getElementById("item-number");
    if (allNews.length === 0) {
        totalItems.innerText = `0 News found`
    }
    else {
        totalItems.innerText = `${allNews.length} News found`
    }
    const noNews = document.getElementById("no-news");
    if (allNews.length === 0) {
        noNews.classList.remove("d-none")
        toogleLoader(false)
    }
    else {
        noNews.classList.add("d-none")
    }
    allNews.forEach(news => {
        console.log(news)
        const { thumbnail_url, title, details, total_view, category_id } = news;
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
                                <h6 class="author-name">${news.author.name ? news.author.name : "No Name Found"}</h6>
                                <p class="mb-0 publishing-date">${news.author.published_date ? news.author.published_date : "Date Not Found"}</p>
                            </div>
                        </div>
                    </div>
                <div class="col">
                    <div class="pt-2 text-size">
                        <i class="fa-regular fa-eye"></i> <span>${total_view ? total_view : "No Views found"}</span>
                    </div>
                </div>
                <div class="col">
                    <div class="pt-2 text-size">
                        <p>Rating:${news.rating.number}</p>
                    </div>
                </div>
                    <div class="col">
                        <button type="button" onclick="loadModal('${news._id}')" class="btn full-news-btn text-size pt-2" 
                            data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `
        newsContainer.appendChild(newsDiv)
        toogleLoader(false)
    })
}

/* Modals section */
const loadModal = (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => console.log(error))
}
const displayModal = (news) => {
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerHTML = `
        <h5>${news.title}</h5>
    `
    const newsDetail = document.getElementById("news-detail")
    newsDetail.innerHTML = ``;
    const detailDiv = document.createElement("div");
    detailDiv.innerHTML = `
        <p>${news.details}</p>
    `
    newsDetail.appendChild(detailDiv);
}


/* Spinner function */
const toogleLoader = (isLoading) => {
    const loader = document.getElementById("loader")
    if (isLoading) {
        loader.classList.remove("d-none")
    }
    else {
        loader.classList.add("d-none")
    }
}

/* function calls */
loadCategory();
loadNewsContent("01");