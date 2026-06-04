import { orders } from "../data/orders.js";
import { products,getProduct,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
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
const url=new URL(window.location.href)
const orderId=url.searchParams.get(('orderId'));
const productId=url.searchParams.get('productId');
let trackingHtml='';
orders.forEach((order)=>
{
    if(order.id===orderId)
    {
    order.products.forEach((product)=>
    {
        const ProductId=product.productId;
        const  matchingItem=getProduct(ProductId);
        if(matchingItem.id===productId)
        {
 trackingHtml+=
`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
         ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src=${matchingItem.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
`;
        }
    });
  }
});
document.querySelector('.js-order-tracking').innerHTML=trackingHtml;