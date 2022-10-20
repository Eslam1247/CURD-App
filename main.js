let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;


// console.log(title, price, taxes, ads, discount, total, count, category, submit)

// get total

function getTotal() {
// add plus to convert string to number 
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{ 
        total.innerHTML = " ";
        total.style.background = 'rgb(153, 33, 33)';

    }

}

// create
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () { 
// create object 
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }


    if (mood === "create") {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);

        }
    } else { 
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
   
    
    localStorage.setItem('product', JSON.stringify(dataPro))

    clearData()
    readData()
}

// clear inputs for data
function clearData() { 
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""

}

//read data
function readData() {
    getTotal();
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table +=` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button  onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                </tr>`
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
    <button onclick="clearAll()"> Clear All (${dataPro.length})</button>
        `
    } else { 
        btnDelete.innerHTML = ""

    }
}

readData()

//delete

function deleteData(i) { 
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    readData()
}

function clearAll() { 
    localStorage.clear();
    dataPro.splice(0)
    readData()

}

function updateData(i) { 
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category
    submit.innerHTML = 'update'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })

}

let searchmood = "title";

function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchmood = "title";
        search.placeholder = "search by title";
    } else { 
        searchmood = "category";
        search.placeholder = "search by category";

    }
    search.focus()
    search.value = "";
    readData();

 }

function searchData(value) {

    let table = '';
    if (searchmood == 'title') { 

        for (let i = 0; i < dataPro.length; i++){
            if (dataPro[i].title.includes(value.toLowerCase())) { 
                table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button  onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += ` <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button  onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
 }