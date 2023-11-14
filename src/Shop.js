import { cartBodyHandler, cartObserver } from "./app/cart";
import { categoryListHandler, categoryRender } from "./app/category";
import { productListHandler, productRender } from "./app/product";
import { categories, products } from "./core/data";
import { cartBtnHandler, clearInputHandler, searchBarInputHandler, searchBtnHandler } from "./core/handlers";
import { cartBody, cartBtn, cartCloseBtn, categoryList, clearInput, productList, searchBarInput, searchBtn } from "./core/selectors";

class Shop {
    observer(){
        cartObserver();
    }

    initialRender(){
        categoryRender(categories)
        productRender(products);
    }
    
    listener(){
        searchBtn.addEventListener('click', searchBtnHandler);
        searchBarInput.addEventListener('keyup', searchBarInputHandler);
        clearInput.addEventListener('click', clearInputHandler);
        cartBtn.addEventListener('click', cartBtnHandler);
        cartCloseBtn.addEventListener('click', cartBtnHandler)
        productList.addEventListener('click', productListHandler);
        cartBody.addEventListener('click', cartBodyHandler);
        categoryList.addEventListener('click', categoryListHandler);
    }

    init(){
        console.log("shop app start");
        this.observer();
        this.initialRender();
        this.listener();
    }
}

export default Shop;
    

