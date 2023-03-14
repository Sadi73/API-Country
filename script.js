const initialFetch = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => loadData(data))
}

const loadData = (data) => {
    const container = document.getElementById('country-container');
    data.forEach( item => {
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
            <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.name.common}</h5>
                        <button id="${item.cca2}" onclick="loadDetails('${item.cca2}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Details
                        </button>
                    </div>
                </div>
       `
       container.appendChild(div);
    })
}

const loadDetails = (code) =>{
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showdetails(data));

    
}

const showdetails = (country) =>{
    console.log(country[0].name);
    document.getElementById('exampleModalLabel').innerText = `${country[0].name.common}`;
    document.getElementById('modal-bodyId').innerHTML = `
        <img src="${country[0].flags.png}">
        <p>Official Name: ${country[0].name.official}</p>
        <p>Capital: ${country[0].capital? country[0].capital : 'No Capital'} </p>
    `

}


initialFetch('https://restcountries.com/v3.1/all');
