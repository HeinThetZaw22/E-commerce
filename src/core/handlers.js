import { productRender } from "../app/product";
import { products } from "./data";
import { cartBox, searchBar, searchBarInput, searchBtn } from "./selectors";

export const cartBtnHandler = () => {
    //console.log(cartBox);
    cartBox.classList.toggle('translate-x-full');
    cartBox.classList.add('duration-300');
}

export const searchBtnHandler = () => {
    searchBtn.classList.toggle('bg-neutral-600');
    searchBtn.classList.toggle('text-white');
    searchBar.classList.toggle('opacity-0');
    searchBar.classList.toggle('scale-75');
    searchBar.classList.add('duration-300');
    searchBarInput.focus();
}

export const searchBarInputHandler = (event ) => {
    const keyword = searchBarInput.value;
    productRender(products.filter(
        (product) => 
         product.title.toLowerCase().search(keyword) != -1 ||
         product.description.toLowerCase().search(keyword) != -1
        ));
}

export const clearInputHandler = () => {
    searchBarInput.value = null;
    productRender(products);
}