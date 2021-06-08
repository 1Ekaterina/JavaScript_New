const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise! Дальше НЕ ИСПОЛЬЗОВАТЬ!!!
// let getRequest = (url) => {
//   return new Promise((resolve, reject)=>{
//     let xhr = new XMLHttpRequest();
//       xhr.open('GET', url, true);
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//           if (xhr.status !== 200) {
//             reject('Error');
//           } else {
//             resolve(xhr.responseText);
//           }
//         }
//       };
//       xhr.send();
//   })
// };

// –--------------------------------

// Базовые классы

class List{
  constructor(url, container, list : {Cart: CartItem, ProductList: ProductItem} = listContext){
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = [];
    this._init();
  }
  /**
   * Получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */

  getJson(url){
    return fetch (input: url & url : `${API + this.url}`) Promise<Response>
    .then(result => result.json()) Promise<any>
    .catch(error => {
      console.log(error);
    })
  }
  /**
   * Обработка полученных данных
   * @param data
   */
  handleData(data){
    this.goods = [...data];
    this.render();
  }

  /**
   * подсчет стоимости всех товаров
   * @returns {*|number}
   */
  calcSum(){
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }
  render(){
    const block = document.querySelector(this.container);
    for (let product of this.goods){
      console.log(this.constructor.name);
      const productObj = new this.list[this.constructor.name](product);
      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML(where: 'beforeend', productObj.render());
    }
  }

  /**
   * Метод поиска товаров
   * @param value - поисковый запрос
   */
  filter (value){
    const regexp = new RegExp(value, flags:'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    !!!!this.allProducts.forEach
  }

}

class Item{
  constructor(el,  img:string ='https://via.placeholder.com/200x150'){
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render(){
    return ``;
  }
}

// Наследуемые классы

class ProductList extends List {
  constructor(cart, container:string = '.products', url:string = "/catalogData.json"){
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }
  _init(){
    document.querySelector(this.container).addEventListener('click', e =>{
      if (e.target.classList.contains('buy-btn')){
        this.cart.addProduct(e.target);
      }
    });
    document.querySelector(selectors: '.search-form').addEventListener(type: 'submit', listener: e =>{
      this.filter(document.querySelector(selectors: 'search-field').value)
    })
  }
}


class ProductItem extends Item {
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" data-id="${this.id_product}"
                  data-name="${this.product_name}"
                  data-prise="${this.price}">Купить</button>
              </div>
          </div>`;
  }
}

class Cart extends List{
  constructor(container:string = ".cart-block", url:string = "/getBasket.json"){
    super (url, container);
    this.getJson()
      .then(data =>{
        this.handleData(data.contents);
      });
  }
 /**
  * добавление товара
  * @param element
  */
 addProduct(element){
   this.getJson(url: `${API}/addBasket.json`)
    .then(data =>{
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = ![product];
            this.render();
          }
        } else{
          alert('Error');
        }
    })
 }

 /**
  * удаление товара
  * @param  element
  */

 removeProduct(elemrnt){
   this.getJson(url: `${API}/deleteFromBasket.json`)
    .then(data => {
      if(data.result === 1){
        let productId = +element.dataset['id'];
        let find = this.allProducts.find(product => product.id_product === productId);
        if (find.quantity >1){
          find.quantity--;
          this._updateCart(find);
        }else{
          this.allProducts.splice(this.allProducts.indexOf(find), deleteCount:1);
          document.querySelector(selectors: `.cart-item[data-id="${productId}"]`).remove();
        }
      } else{
        alert ('Error');
      }
 })

 /**
  * Данные корзины
  * @param  product
  * @private 
  */
 _updateCart(product){
   let block = document.querySelector(selectors: `.cart-item[data-id="${product.id}"]`);
   block.querySelector(selectors:'.product-quantity').textContent = `Количество: ${product.quantity}`;
   block.querySelector(selectors: '.product-price').textContent = `${product.quantity * product.price} P`;
 }

 _init(){
   document.querySelector(selectors: '.btn-cart').addEventListener(type: 'click', listener() => {
     document.querySelector(this.container).classList.toggle(token: 'invisible');
   });
   document.querySelector(this.container).addEventListener('click', e =>{
    if(e.target.classList.contains('del.btn')){
      this.removeProduct(e.target);
    }
   })
 }

  }
}

class CartItem extends Item{
  constructor (el, img:string ='https://via.placeholder.com/200x150'){
    super (el, img);
    this.quantity = el.quantity;
  }
   render(){
     return `<div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
          <img src="${this.img}" alt="SomeImage">
          <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
          </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity* this.price} P</p>
            <button class="del-btn" data-id="${this.id_product}">x</button>
          </div>
     </div>`
   }
}

const listContext = {
  ProductList: ProductItem,
  Cart: CartItem
};

new ProductsList(new Cart());


// class ProductList {
//   constructor(container = '.products') {
//     this.container = container;
//     this._goods = [];
//     this._allProducts = [];
//
//     this._fetchGoods();
//     this._render();
//   }
//
//   _fetchGoods() {
//     this._goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   _render() {
//     const block = document.querySelector(this.container);
//
//     for (let product of this._goods) {
//       const productObject = new ProductItem(product);
//
//       this._allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
//
// class ProductItem {
//   constructor(product, img='https://via.placeholder.com/200x150') {
//     this.title = product.title;
//     this.price = product.price;
//     this.id = product.id;
//     this.img = img;
//   }
//
//   render() {
//     return `<div class="product-item" data-id="${this.id}">
//               <img src="${this.img}" alt="Some img">
//               <div class="desc">
//                   <h3>${this.title}</h3>
//                   <p>${this.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//   }
// }
//
// const catalog = new ProductList();
// catalog.fetchGoods();
// catalog.render();