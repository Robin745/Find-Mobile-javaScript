//search button will redirect to searchMobile() below.
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
    //get search value by getting it calling id 
    const parentElement = document.getElementById('search-result');
    //get hidden details section to work with it
    const details = document.getElementById('phoneDetails')
    //get show not found section for showing errors 
    const showNotFound = document.getElementById('show-noData')

    //remove previous results when search again
    showNotFound.style.display='none';
    details.style.display='none';

    //through error when nothing found
    if(arr.length==0){
        showNotFound.style.display='block';
    }
    //remove previous content when search again
    parentElement.textContent=''
    arr.slice(0,20).forEach(phone => {
        // console.log(phone.slug);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card rounded" style="width:18rem; height: 22rem;">
            <img src="${phone.image}" class="card-img-top w-50 img-fluid p-3" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <p class="card-text">${phone.phone_name}.</p>
              <a onclick="getPhoneId('${phone.slug}')" class="btn      btn-primary">Details</a>
            </div>
        </div>
        `;
        parentElement.appendChild(div);
    });

    // tryed to show extra phones to after clicking show More button
    if(Object.keys(arr).length>20){
        const showMore = document.getElementById('show-more')
        const showDiv = document.createElement('div')
        showDiv.innerHTML=`
        <button onclick=
        "showMore(${JSON.stringify(arr).split('"').join("&quot;")})" id="showRemaining" class="btn btn-warning my-4">Show more</button>
        `;
        showMore.appendChild(showDiv);
    }
    
}

//show remainning mobiles
const showMore = obj =>{
    const showMoreButton = document.getElementById('showRemaining')
    showMoreButton.style.display = 'none';
    obj.slice(21).forEach(phone => {
        //get search value by getting it calling id 
        const parentElement = document.getElementById('search-result');
        // console.log(phone.slug);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card rounded" style="width: 18rem;height: 22rem;">
            <img src="${phone.image}" class="card-img-top w-50 img-fluid p-3" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <p class="card-text">${phone.phone_name}.</p>
              <a onclick="getPhoneId('${phone.slug}')" class="btn      btn-primary">Details</a>
            </div>
        </div>
        `;
        parentElement.appendChild(div);
    });
}


//get Phone Extra informations to show as window
const getPhoneId = id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

//show details information containning ( Sensorc & others )
const displayDetails = id =>{
    console.log(id);
    const details = document.getElementById('phoneDetails')
    details.textContent=''
    details.style.display='block'
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mx-auto w-40 " style="width: 18rem;">
        <img src="${id.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${id.name}</h5>
          <p class="card-text"><span class="fw-bold">Release: </span>${id.releaseDate ? id.releaseDate: 'No release date found'}</p>
        </div>
        <ul class="list-group">
          <li class="list-group-item"> <span class="fw-bold">Storage: </span> ${id.mainFeatures.storage}</li>
          <li class="list-group-item"><span class="fw-bold">displaySize: </span> ${id.mainFeatures.displaySize}</li>
          <li class="list-group-item"><span class="fw-bold">Sensors: </span> ${id.mainFeatures.sensors}</li>
          <li class="list-group-item"><span class="fw-bold">chipSet:</span> ${id.mainFeatures.chipSet}</li>
          <li class="list-group-item"><span class="fw-bold">Bluetooth:</span> ${id.others.Bluetooth}</li>
          <li class="list-group-item"><span class="fw-bold">GPS:</span> ${id.others.GPS}</li>
          <li class="list-group-item"><span class="fw-bold">WLAN:</span> ${id.others.WLAN}</li>
          <li class="list-group-item"><span class="fw-bold">USB:</span> ${id.others.USB}</li>
        </ul>
      </div>
    `
    details.appendChild(div);
}