import Shop from "./src/Shop";
import { categoryBtn, categoryList } from "./src/core/selectors";
import "./style.css";

const shop = new Shop();
shop.init();



// const h1 = document.createElement('h1');
// h1.innerText = 'hello';
// const frg = document.createDocumentFragment();
// frg.append(h1)
// console.log(frg);

//document.body.append(frg)
// const cat1 = categoryBtn.content.cloneNode(true);
// cat1.querySelector('button').innerText = 'cat one'
// const cat3 = categoryBtn.content.cloneNode(true);
// cat3.querySelector('button').innerText = 'cat two'

// console.log(categoryBtn.content.cloneNode())
// console.log(cat1);
// console.log(cat3);
// categoryList.append(cat1, cat3)