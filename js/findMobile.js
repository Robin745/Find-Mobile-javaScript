const searchMobile =() =>{
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    const url = ``
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(res => res.json())
    .then(data => findMobiles(data.data))
    searchInput.value = ''
}
const findMobiles= arr=>{
    const parentElement = document.getElementById('search-result')
    for(const phone of arr){
        console.log(phone);
        const div = document.createElement('div')
        div.innerHTML=`
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.slug}.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
        parentElement.appendChild(div);
    }
}
