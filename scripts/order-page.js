import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { products,getProduct,loadProductsFetch } from "../data/products.js";
import { cart} from "../data/cart.js";
await loadProductsFetch();
function updateCart()
{
  let cartQuantity=0;
          cart.forEach((item)=>
          {
            cartQuantity+=item.quantity;
          })
          document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}
updateCart();
let allOrdersHtml='';
orders.forEach(orderItem=>
{
    let productsHtml='';
    orderItem.products.forEach((product)=>
    {
      const productId=product.productId;
      const  matchingItem=getProduct(productId);
      productsHtml+=
      `
        <div class="product-image-container">
              <img src=${matchingItem.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${matchingItem.id}&orderId=${orderItem.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
      `;
    });
    allOrdersHtml+=
    `
      <div class="orderId-${orderItem.id}">
      <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(orderItem.orderTime).format('dddd, MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
      </div>

      <div class="order-details-grid">
        ${productsHtml}
      </div>
    </div>

    `;
}
);

document.querySelector('.js-order-container').innerHTML=allOrdersHtml;