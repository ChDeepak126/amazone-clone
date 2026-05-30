import {cart,removeItem,updateDeliveryOption} from "../../data/cart.js";
import {products,getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions,getDeliveryOptions} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary()
{
let cartSummaryHtml='';
cart.forEach((cartItem)=>
{
    const productId=cartItem.productId;
    const  matchingItem=getProduct(productId)
    const deliveryOptionId=cartItem.deliveryOptionId
    const deliveryOption=getDeliveryOptions(deliveryOptionId);
    const today=dayjs();
    const deliveryDay=today.add(
    deliveryOption.deliveryDays,
    'days'
    );
    const dateString=deliveryDay.format('dddd, MMMM D');
    cartSummaryHtml+=
     `
    <div class="cart-item-container js-cart-item js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingItem.image}>

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                ${matchingItem.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingItem.id}">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingItem.id}" data-delete-id='${matchingItem.id}'>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingItem,cartItem)}
            </div>
        </div>
        </div>
    `;

});
function deliveryOptionsHtml(matchingItem,cartItem)
{
    let html='';
    deliveryOptions.forEach((deliveryOption)=>
    {
        const today=dayjs();
        const deliveryDay=today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString=deliveryDay.format('dddd, MMMM D');
        const priceString=deliveryOption.priceCents===0?
        'FREE':
        `$${formatCurrency(deliveryOption.priceCents)}`;
        const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
        html+=
        `
            <div class="delivery-option js-delivery-option"
            data-product-id=${matchingItem.id}
            data-delivery-option-id=${deliveryOption.id}>
                <input type="radio"
                ${isChecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
                </div>
            </div>
        `;
    })
    return html;

}
document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;
document.querySelectorAll('.js-delete-link')
 .forEach((link)=>
 {
link.addEventListener('click',()=>
{
  const productId=link.dataset.deleteId;
  removeItem(productId);
  const container=document.querySelector(`.js-cart-item-container-${productId}`)
  container.remove();
  renderPaymentSummary();
 });
 });
 document.querySelectorAll('.js-delivery-option')
   .forEach((element)=>
{
    element.addEventListener('click',()=>
    {
        const {productId,deliveryOptionId}=element.dataset
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    });
});
}
