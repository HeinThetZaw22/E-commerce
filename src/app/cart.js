import Swal from "sweetalert2";
import { products } from "../core/data";
import { cartBody, cartCountBadge, cartItem, cartTotal } from "../core/selectors"

export const createCartItem = ({ id, title, price, image }) => {
    const cartItemUi = cartItem.content.cloneNode(true);
    const cartItemImg = cartItemUi.querySelector('.cart-item-img');
    const cartItemPrice = cartItemUi.querySelector('.cart-item-price');
    const cartItemCost = cartItemUi.querySelector('.cart-item-cost');
    const cartItemTitle = cartItemUi.querySelector('.cart-item-title');
    //const cartItemDelete = cartItemUi.querySelector('.cart-item-delete');

    cartItemImg.src = image;
    cartItemTitle.innerText = title;
    cartItemPrice.innerText = price;
    cartItemCost.innerText = price;


    cartItemUi.querySelector('.cart-item').setAttribute('cart-product-id', id);

    return cartItemUi;
}

export const removeCart = (id) => {
    const currentItem = cartBody.querySelector(`[cart-product-id = '${id}']`);
    const currentItemId = currentItem.getAttribute('cart-product-id');


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
    }).then((result) => {
        if (result.isConfirmed) {
            currentItem.classList.add('animate__animated', 'animate__hinge');
            currentItem.addEventListener('animationend', () => {
                currentItem.remove();
            });

            //const currentProductCard = event.target.closest('.product-card');
            const currentProductCard = app.querySelector(`[product-id = '${currentItemId}']`);
            const currentAddToCartBtn = currentProductCard.querySelector('.add-to-cart');

            currentAddToCartBtn.classList.remove('bg-neutral-600', 'text-white');
            currentAddToCartBtn.innerText = 'Add to Cart';
            currentAddToCartBtn.disabled = false;

            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
        }
    });

}

export const increaseQuantity = (id) => {
    const currentItem = cartBody.querySelector(`[cart-product-id = '${id}']`);
    const quantity = currentItem.querySelector('.cart-item-quantity');
    const cost = currentItem.querySelector('.cart-item-cost');
    const price = currentItem.querySelector('.cart-item-price');
    //front element of event clicked button 
    // const currentItemQuantity = event.target.previousElementSibling;
    quantity.innerText = parseInt(quantity.innerText) + 1;
    cost.innerText = quantity.innerText * price.innerText;
    //console.log(cost);
}

export const decreaseQuantity = (id) => {
    const currentItem = cartBody.querySelector(`[cart-product-id = '${id}']`);
    const quantity = currentItem.querySelector('.cart-item-quantity');
    const cost = currentItem.querySelector('.cart-item-cost');
    const price = currentItem.querySelector('.cart-item-price');
    //front element of event clicked button 
    // const currentItemQuantity = event.target.previousElementSibling;
    
    if (quantity.innerText > 1) {
        quantity.innerText = parseInt(quantity.innerText) - 1;
        cost.innerText = quantity.innerText * price.innerText;
        //console.log(cost);

    }
    

}

export const cartBodyHandler = (event) => {
    //console.log(event.target);
    if (event.target.classList.contains('cart-item-delete')) {
        // console.log('remove');
        const currentItem = event.target.closest('.cart-item');
        const currentItemId = currentItem.getAttribute('cart-product-id');
        // console.log(currentItem);
        // console.log(currentItemId);
        removeCart(currentItemId);
    } else if (event.target.classList.contains('cart-item-increase')) {
        //const currentItem = event.target.closest('.cart-item');
        const currentItem = event.target.closest('.cart-item');
        const currentItemId = currentItem.getAttribute('cart-product-id');
        increaseQuantity(currentItemId);

    } else if (event.target.classList.contains('cart-item-decrease')) {
        //console.log('decrease');
        //const currentItemQuantity = event.target.nextElementSibling;
        const currentItem = event.target.closest('.cart-item');
        const currentItemId = currentItem.getAttribute('cart-product-id');
        decreaseQuantity(currentItemId);

       
    }
}

export const addToCart = (productId) => {
    const currentProduct = products.find(el => el.id == productId)
    cartBody.append(createCartItem(currentProduct))
}

export const calculateTotal = () => {
    return [...cartBody.querySelectorAll('.cart-item-cost')]
        .reduce((a, i) => a + parseFloat(i.innerText), 0);

}
export const countItemInCart = () => {
    return cartBody.querySelectorAll('.cart-item').length;

}

export const cartObserver = () => {
    //callback function
    const process = () => {
        //console.log("new change in observer");
        cartTotal.innerText = calculateTotal().toFixed(2);
        cartCountBadge.innerText = countItemInCart();
        cartBodyCountBadge.innerText = countItemInCart();
    }

    const options = {
        childList: true,
        subtree: true,
    }

    //build observer
    const observer = new MutationObserver(process);

    observer.observe(cartBody, options)
}