var monPanier = [];
var listProduits = [];
var content;
var listOfProductshtml = ""

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'produits.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var init = function () {

  // initialisation

  content = document.getElementById("content");
  panierSelect = document.getElementById("panier-count");

  var savedPanier = localStorage.getItem("panier");

  if (savedPanier && JSON.parse(savedPanier)) {
    monPanier = JSON.parse(savedPanier);
    panierSelect.innerHTML = monPanier.length;
  }

  loadJSON(function (response) {
    var actual_JSON = JSON.parse(response);
    listProduits = actual_JSON
  });

  setTimeout(() => {
    listProduits.forEach(prod =>
      listOfProductshtml += `
        <div class="produit">
          <div class="image__css">
           <img src=${prod.img_src}>
          </div>
          <div class="details">
          <div class="rating">
            <span>
              <svg>
                <use xlink:href="./images/svg/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/svg/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/svg/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/svg/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./images/svg/sprite.svg#icon-star-empty"></use>
              </svg>
            </span>
          </div>
          <h3>${prod.name}</h3>
          <p>${prod.description} </p>
          <h3>${prod.unit_price} €</h3>
          <button onclick="ajouter(${prod.id_sku})">Ajouter au panier</button>
        </div>
        </div>
        `
    )

    content.innerHTML = listOfProductshtml;
  }
    , 500)
}


window.addEventListener('load', init);


function ajouter(id) {

  var prod = isExist(id, monPanier);
  if (prod.length > 0) { alert("Le produit est déja das le panier !"); return }
  if (isExist(id, listProduits).length > 0 && !isExist(id, listProduits)[0].available) { alert("Le produit n'est pas disponible dans le stock ! "); return }
  if (monPanier.length >= 9) { alert("9 produits au maximum dans le panier !"); return }

  monPanier.push(...isExist(id, listProduits))
  panierSelect.innerHTML = monPanier.length;
  localStorage.setItem("panier", JSON.stringify(monPanier));
}


function isExist(id, liste) {
  var indexArticle = liste.filter((pr) => pr.id_sku == id)
  return indexArticle
}