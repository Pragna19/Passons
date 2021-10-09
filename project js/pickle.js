
let globalProductData=[];

const addProduct=()=>{
    const newProductDetails={
        id: `${Date.now()}`,
        url: document.getElementById("ImageURL").value,
        name: document.getElementById("p-name").value,
        price: document.getElementById("p-price").value,
    };

    productContents=document.getElementById("productContents");
    productContents.insertAdjacentHTML('beforeEnd',generateNewProduct(newProductDetails));

    globalProductData.push(newProductDetails);
    saveToLocalStorage();
}

const generateNewProduct=({id,url,name,price})=>{
    return`<div class="col-md-6 col-lg-4 mt-3 id=${id} key=${id}">
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-info" name=${id} onclick="editData(this)">
                    <i class="fas fa-pencil-alt" name=${id} onclick="editData(this)"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteData(this)">
                    <i class="fas fa-trash-alt" name=${id} onclick="deleteData(this)"></i>
                </button>
            </div> 
        </div>
        <img src=${url} class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${price}</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-secondary float-end">view</button>
        </div>
      </div>  
  </div>`
}

const saveToLocalStorage=()=>{
    localStorage.setItem("info", JSON.stringify({data: globalProductData}));
}

const reloadProductData=()=>{
    const localStorageCopy=JSON.parse(localStorage.getItem("info"));
    if(localStorageCopy){
        globalProductData=localStorageCopy["data"];
    }
    globalProductData.map((productData)=>{
        productContents.insertAdjacentHTML('beforeEnd',generateNewProduct(productData));
    })
}

const deleteData=(e)=>{
    const targetID=e.getAttribute("name");
    globalProductData=globalProductData.filter((productData)=> productData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editData=(e)=>{
    const targetID=e.getAttribute("name");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="Save Changes"
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditData(this)")
    
}

const saveEditData=(e)=>{
    globalProductData.push(editData(e));
    saveToLocalStorage();
    window.location.reload();
}