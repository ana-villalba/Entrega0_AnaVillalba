const CATEGORIES_URL = "http://localhost:3000/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish";
const PRODUCTS_URL = "http://localhost:3000/cats_products";
const PRODUCT_INFO_URL = "http://localhost:3000/products";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments";
const CART_INFO_URL = "http://localhost:3000/user_cart/25801";
const CART_BUY_URL = "http://localhost:3000/cart/buy";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    const token = localStorage.getItem("token")
    let result = {};
    showSpinner();
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}