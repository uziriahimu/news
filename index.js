const loadCategories = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayCategories(data.data.news_category)
    }
    catch (error) {
        alert('Something Went Wrong')
    }

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
const loadNewsDetails = async (id) => {
    loadSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetails(data.data)
    }
    catch (error) {
        alert('Something wrong')
    }
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
        <button onclick="detailModal('${category._id}')" data-bs-toggle="modal"data-bs-target="#exampleModal" class="btn btn-primary" type="submit" >Details</button>
        </div>
    </div>
</div>
</div>
 </div>
   </div>
                    
        `
        showDetail.appendChild(detailsdiv)
    });
    loadSpinner(false)
}



// modal 

const detailModal = async (dataId) => {
    const url = `https://openapi.programming-hero.com/api/news/${dataId}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayModal(data.data)
    }
    catch (error) {
        alert('Something went wrong')
    }


}
const displayModal = id => {

    id.forEach(newsId => {
        console.log(newsId)
        const modalTitle = document.getElementById('exampleModalLabel')
        modalTitle.innerText = newsId.title;
        const modalBody = document.getElementById('modal-body')
        modalBody.innerHTML = ` 
      <img class="img-fluid" src="${newsId.author.img}" alt="">
      <P>${newsId.author.name ? newsId.author.name : 'No found name'} </br> ${newsId.author.published_date}
      <hr>
      <p><i class="fa-solid fa-eye"></i> ${newsId.total_view ? newsId.total_view : 'No data available'} </p>
      <p>${newsId.title}</p>
      <img class="img-fluid" src="${newsId.image_url}" alt="">
      `
    })
}

const loadSpinner = isLoading => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}


loadNewsDetails()


loadCategories()