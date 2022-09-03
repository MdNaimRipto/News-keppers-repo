const loadCategory = () => {
    url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (titles) => {
    console.log(titles)
    const categoryContainer = document.getElementById("category-container");
    titles.forEach(title => {
        const newList = document.createElement("li");
        newList.classList.add("category-li");
        newList.innerHTML = `
            <span class="px-3 pt-4">${title.category_name}</span>
        `
        categoryContainer.appendChild(newList);
    });
}
loadCategory();