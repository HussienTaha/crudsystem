var productNameInput = document.getElementById("productname");
var productPriceInput = document.getElementById("productprice");
var productCategoryInput = document.getElementById("productcategory");
var productDescInput = document.getElementById("productdescription");
var productImgcInput = document.getElementById("productImg");
 var addbtn=document.getElementById("addproduct")
 var updatebtn=document.getElementById("updateproduct")
var productList = [];
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProduct(productList);
} else {
  var productList = [];
}

function Addproduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
    img:"./imges/"+productImgcInput.files[0].name
  };
  console.log(product);
  productList.push(product);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
}
function displayProduct(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += ` <div class=" col-md-3 col-lg-3 py-4 ">
          <div class="inner shadow rounded-2  bg-light">
          <div class="curd-head rounded-2">
            <img src="${list[i].img}" class="w-100 rounded-2" alt="">

       
          </div>
          <div class="bg-light  curd-body">
           ${list[i].name}
       
          <div class="d-flex justify-content-between">
            <span> ${list[i].price}$</span>
            <span> ${list[i].category}</span>
          </div>
          <p class="text-muted"> ${list[i].desc}</p>
            <div class="">
              <button onclick=" deleteProduct(${i})" class="btn btn-outline-danger "> <i class="fa-solid fa-trash"></i>Delete </button>
              <button onclick=" setUpFormToUpdate(${i})" class="btn btn-outline-info "> <i class="fa-solid fa-pen"></i> Update </button>
            </div>
            </div>
        </div>
      </div>`;
  }
  document.getElementById("datarow").innerHTML = cartona;
}
function deleteProduct(index) {
  console.log(index);

  productList.splice(index, 1);
  displayProduct(productList);
  localStorage.setItem("products", JSON.stringify(productList));
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = ""; 
  productImgcInput.img="" 
}
function upDateProduct(){
  // console.log(glopaLindex);
  //!! console.log("hussien");
  
  
  productList[glopaLindex].name = productNameInput.value;
  productList[glopaLindex].price=productPriceInput.value;
  productList[glopaLindex].category=productCategoryInput.value;
  productList[glopaLindex].desc=productDescInput.value;
  displayProduct(productList);
  localStorage.setItem("products", JSON.stringify(productList));
  addbtn.classList.remove("d-none");
updatebtn.classList.add("d-none");
clearForm();

}

var glopaLindex;


function setUpFormToUpdate(index)
{
   glopaLindex=index;
  var p=productList[index];
   productNameInput.value=p.name;
   productCategoryInput.value=p.category;
   productDescInput.value=p.desc;
   productPriceInput.value=p.price;
addbtn.classList.add("d-none");
updatebtn.classList.remove("d-none");
}

function filterProductByName(trem){
  var result=[];
  for (var i  = 0; i < productList.length; i++) {
  
    if (productList[i].name.toLowerCase().includes(trem.toLowerCase())) {
      result.push(productList[i])
      
    }
  }
  displayProduct(result);

}
function validate(elm)
{
  var regex={
    productname:/^[A-Z][a-z]{3,15}$/,
    productprice:/^[1-7][0-9]|80$/,
    productcategory:/^TV|tv|taplet|mopile|laptop|sscreen$/,
  }
  var matched=regex[elm.id].test(elm.value);
  if (matched) {
    elm.classList.remove("is-invalid")
    elm.classList.add("is-valid")
    elm.nextElementSibling.classList.add("d-none")

    
  }
  else{
    elm.classList.add("is-invalid")
    elm.classList.remove("is-valid")
    elm.nextElementSibling.classList.remove("d-none")
 
  }
}