const searchMobile =() =>{
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => findMobiles(data.data))
    searchInput.value = ''
}
const findMobiles= arr=>{
    const parentElement = document.getElementById('search-result');
    const details = document.getElementById('phoneDetails')
    const showNotFound = document.getElementById('show-noData')
    showNotFound.style.display='none';
    details.style.display='none';
    if(arr.length==0){
        showNotFound.style.display='block';
    }
    details.style.display='none';
    //remove previous content when search again
    parentElement.textContent=''
    arr.slice(0,21).forEach(phone => {
        // console.log(phone.slug);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card rounded" style="width: 18rem;height: 22rem;">
            <img src="${phone.image}" class="card-img-top w-50  p-3" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <p class="card-text">${phone.phone_name}.</p>
              <a onclick="getPhoneId('${phone.slug}')" class="btn      btn-primary">Details</a>
            </div>
        </div>
        `;
        parentElement.appendChild(div);
    });

    if(Object.keys(arr).length>20){
        const showDiv = document.createElement('div')
        showDiv.innerHTML=`<button id="showRemaining" class="btn btn-warning mb-4">Show more</button>`;
        parentElement.appendChild(showDiv)
    }
    
}
//get Phone Extra informations to show as window
const getPhoneId = id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = id =>{
    console.log(id);
    const details = document.getElementById('phoneDetails')
    details.textContent=''
    details.style.display='block'
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mx-auto w-40 " style="width: 18rem;">
        <img src="${id.image}" class="card-img-top w-50  p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${id.name}</h5>
          <p class="card-text">${id.releaseDate ? id.releaseDate: 'No release date found'}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> Storage : ${id.mainFeatures.storage}</li>
          <li class="list-group-item">displaySize : ${id.mainFeatures.displaySize}</li>
          <li class="list-group-item">chipSet : ${id.mainFeatures.chipSet}</li>
          <li class="list-group-item">chipSet : ${id.mainFeatures.chipSet}</li>
          <li class="list-group-item">chipSet : ${id.mainFeatures.chipSet}</li>
        </ul>
      </div>
    `
    details.appendChild(div);
}