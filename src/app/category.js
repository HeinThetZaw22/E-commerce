import { products } from "../core/data";
import { categoryBtn, categoryList } from "../core/selectors"
import { productRender } from "./product";

export const createCategory = (title) => {

    // const category = document.createElement('div');
    // category.innerHTML = `
    // <button class="category-btn">${title}</button>
    // `;

    const clone = categoryBtn.content.cloneNode(true);
    const category = clone.querySelector('button');
    category.innerText = title;
    return category;
}

export const categoryRender = (arr) => {
    arr.forEach((el) => categoryList.append(createCategory(el)))
}

export const categoryListHandler = (event) => {
    if(event.target.classList.contains('category-btn')){
        //console.log(event.target.innerText);
        categoryList.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
        const currentCategory = event.target.innerText;
        const currentProduct = products
        .filter(product => product.category === currentCategory || currentCategory === "All");
        //console.log(currentProduct);
        productRender(currentProduct);

    }
}