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
        // div.innerText = category.category_name
        div.innerHTML = `
        <p onclick="loadNewsDetails('${category.category_id}')">${category.category_name}</p>
        `

        loadCategory.appendChild(div)

    });


}

const loadNewsDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))

}

const displayNewsDetails = categories => {

    const showDetail = document.getElementById('show-details');
    categories.forEach(category => {

        const detailsdiv = document.createElement('div')
        detailsdiv.classList.add('row')

        detailsdiv.innerHTML = `
    <div class="col-md-4">
        <img src="${category.thumbnail_url}" class="img-fluid ms-5 mt-4 " alt="...">
        </div>
    
    <div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title">${category.title}</h5>
        <p class="card-text">${category.details.slice(0, 500) + '.....'}</p>
        <div class="  d-flex align-items-center  justify-content-evenly">
        <div class="d-flex align-items-center ">
            <img src="${category.author.img}" class="img-fluid rounded-circle pe-2  w-25"
                alt="">
            <div>
                <h6 class="header-color">${category.author ? category.author.name : 'No data found'}</h6>
                <p class="p-color ">${category.author ? category.author.published_date : 'No data found'}</p>
            </div>
        </div>
        <div class="d-flex pe-5 " >
        <div><i class="fa-regular fa-eye pe-2"></i></div>
        <div>${category.total_view ? category.total_view : 'No data found'}</div>
        </div>
        <div>
         <button onclick="displayDetails ('${category.category_id}') " class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#showModal">Details</button>
         </div>
    </div>
</div>
</div>
 </div>
   </div>
                    
        `
        showDetail.appendChild(detailsdiv)
    });

}


// const loadDetails = (id) => {
//     const url = `https://openapi.programming-hero.com/api/news/category/${id}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayDetails(data.data[0]))

// }
// const displayDetails = cat => {

//     const Details = document.getElementById('showModalLabel')
//     Details.innerText = cat.author.name
//     const modalBody = document.getElementById('show-details')
//     modalBody.innerHTML = `

// `

// }
// loadDetails()
// loadNewsDetails()

loadCategories()