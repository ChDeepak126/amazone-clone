import { renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage,cart} from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
describe('test suite:renderOrderSummary',()=>
{
    let product1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    let product2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeAll((done)=>
    {
        loadProducts(()=>
        {
           done();
        })
    })
    beforeEach(()=>
    {
        document.querySelector('.js-test-container').innerHTML=`
        <div class='js-order-summary'></div>
        <div class='js-payment-summary'></div>
        `;
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>
        {
            return JSON.stringify([
                {
                productId:product1,
                quantity:2,
                deliveryOptionId:'1'
                },
                {
                    productId:product2,
                    quantity:1,
                    deliveryOptionId:'2'
                }
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
    })
    it('displays the cart',()=>
    {
        expect(document.querySelectorAll('.js-cart-item').length).toEqual(2);
        expect(
        document.querySelector(`.js-product-quantity-${product1}`).innerText
        ).toContain('Quantity: 2');
        expect(
        document.querySelector(`.js-product-quantity-${product2}`).innerText
        ).toContain('Quantity: 1');
        document.querySelector('.js-test-container').innerHTML=``;
    });
    
    it('removes a product',()=>
    {
        document.querySelector(`.js-delete-link-${product1}`).click();
         expect(document.querySelectorAll('.js-cart-item').length).toEqual(1);
         expect(document.querySelector(`.js-cart-item-container-${product1}`)).toEqual(null);
         expect(document.querySelector(`.js-cart-item-container-${product2}`)).not.toEqual(null);
         expect(cart.length).toEqual(1);
         expect(cart[0].productId).toEqual(product2);
         document.querySelector('.js-test-container').innerHTML=``;
    })
});