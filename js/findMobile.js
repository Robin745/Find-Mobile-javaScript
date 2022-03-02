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
    const parentElement = document.getElementById('search-result');
    console.log(arr);
    //remove previous content when search again
    parentElement.textContent=''
    arr.slice(0,20).forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card rounded" style="width: 18rem;height: 22rem;">
            <img src="${phone.image}" class="card-img-top w-50  p-3" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.slug}.</p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
        `;
        parentElement.appendChild(div);
    });
}
