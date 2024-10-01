function ShowComments(comments) {
    const CommentsList = document.getElementById('ProductsComments');
    CommentsList.innerHTML = ''; 
    comments.forEach(comentario => { 
        const listaItem = document.createElement('li');
        listaItem.innerHTML = 
            `<i class="fa-solid fa-user"></i>
            <strong>${comentario.product}:</strong> 
            ${comentario.description} 
            ${comentario.user} 
            ${comentario.dateTime} 
            <span>${comentario.score} <i class="fa-solid fa-star"></i></span>
        `;
  
        CommentsList.appendChild(listaItem); 
    });
  }
  document.addEventListener("DOMContentLoaded", function (e) {
    let producto= localStorage.getItem("product")
    getJSONData(PRODUCT_INFO_COMMENTS_URL+ producto + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            let comments = resultObj.data.comments; 
            ShowComments(comments);
        }
    }); 
  });