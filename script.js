// const btn_elem = document.querySelector('.btn');
// const p_elem = document.querySelector('.text')

// btn_elem.addEventListener('click' , ()=>console.log('hello'));
// p_elem.addEventListener('click', ()=>console.log('hi from paragraf'));

/////////////////////////////////////////

//Функция которая возвращает случайный свет

function rundomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

// btn_elem.addEventListener('click',
// ()=> btn_elem.style.backgroundColor = rundomColor());

/////////////////////////////////////////
//создать программу которая имитирует работу игральных костей при нажатии на кнопку в параграфе должны появится 2 случайных числа от 1 до 6

// btn_elem.addEventListener('click', rundomNumber);

// function rundomNumber() {
//     const num1 = Math.ceil(Math.random()*6);
//     const num2 = Math.ceil(Math.random()*6);
//     p_elem.textContent = num1 + " " + num2;
// };


let data = [];



const getLocalStorage = () => {
  return localStorage.getItem("products") 
  ? JSON.parse(localStorage.getItem("products"))
  : []  
}


const add_form = document.querySelector(".add_form");
const products = document.querySelector(".products");
const total = document.querySelector(".total");

add_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = add_form.title.value;
  const price = add_form.price.value;
  const count = add_form.count.value;
  const idN = Date.now();
  data.push({ title, price, count, idN });
  add_form.title.value = "";
  add_form.price.value = "";
  add_form.count.value = "";
  addToLocalStorage  (title, price, count, idN);
  rerender();
});

function deleteProduct(id) {
  data = data.filter((product) => product.idN !== id);
  removeFromLocalStorage(id);
  rerender();
}

function createProdCard(title, price, count, idN) {
  const container = document.createElement("div");
  const title_h2 = document.createElement("h2");
  const idN_p = document.createElement("p");
  const price_p = document.createElement("p");
  const count_p = document.createElement("p");
  const delete_button = document.createElement("button");

  title_h2.innerText = title;
  idN_p.innerText = "id: " + idN;
  price_p.innerText = "price: " + price + "$";
  count_p.innerText = "count: " + count;
  delete_button.innerText = "Delete";
  
  delete_button.addEventListener("click", () => {
    deleteProduct(idN);
    
  });

  delete_button.classList.add("delete_button");
  container.classList.add("product");

  container.addEventListener(
    "mousemove",
    () => (container.style.backgroundColor = rundomColor())
  );

  container.append(title_h2, idN_p, price_p, count_p, delete_button);

  return container;
}

function rerender() {
  products.innerText = "";
  total.innerText = "";
  data = getLocalStorage();
  if (data.length === 0) {
    const no_products = document.createElement("p");
    no_products.innerText = "Товаров нет";
    products.append(no_products);
  } else {
    data.forEach(({ title, price, count, idN }) => {
      const container = createProdCard(title, price, count, idN);
      products.append(container);
      
    });
    totalAll();
  }
}

function totalAll() {
  const priceTotal = data.reduce(
    (acc, { price, count }) => acc + price * count,
    0
  );
  const countTotal = data.reduce((acc, { count }) => acc + count * 1, 0);
  const container = document.createElement("div");
  const total_price_p = document.createElement("p");
  const total_count_p = document.createElement("p");
  total_price_p.innerText = "Total price: " + priceTotal + "$";
  total_count_p.innerText = "Total count: " + countTotal;
  container.append(total_price_p, total_count_p);
  total.append(container);
  return total;
}

rerender();


function addToLocalStorage  (title, price, count, idN) {
  const products = getLocalStorage()
  const newProduct = { title, price, count, idN } 
  products.push(newProduct)
  localStorage.setItem('products', JSON.stringify(products))
}


const removeFromLocalStorage = (id) => {
 
  const products = getLocalStorage()

  const newProducts = products.filter(product => product.idN !== id)
  localStorage.setItem("products", JSON.stringify(newProducts))
  
}

