const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))

}
const displayCategories = categories => {

    const loadCategory = document.getElementById('load-category')
    categories.forEach(category => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerText = category.category_name
        loadCategory.appendChild(div)
        console.log(category.category_name)
    });
}
loadCategories()