
const main = require('../main')

const productsList = document.querySelector("#products");
let products = [];

function renderProducts(tasks) {
    productsList.innerHTML = ''
    productsList.innerHTML += `
    <table class="table">
  <thead>
  <tr>
  <th style="width:55px;">Index</th>
        <th style="width:55px;">Customer Name</th>
        <th style="width:100px;">Sales Date</th>
        <th style="width:55px;">Products</th>
        <th style="width:55px;">Product Varient</th>
        <th style="width:55px;">Quantity</th>
        <th style="width:55px;">Price</th>
        <th style="width:55px;">Description</th>
        <th style="width:55px;">Amount</th>
        <th style="width:55px;">Gst</th>
        <th style="width:55px;">Total Amount</th>
    </tr>
  </thead>
  </table>`
    tasks[0].forEach(function (t) {
      productsList.innerHTML += `
      <table class="table">
      <tbody>
         <tr>
          <td style="width:50px;">${t.id}</td>
          <td style="width:55px;">${t.customer_name}</td>
          <td style="width:55px;word-break: break-word;">${t.sales_date}</td>
          <td style="width:55px;">${t.product}</td>
          <td style="width:55px;">${t.product_varient_id}</td>
          <td style="width:55px;">${t.quantity}</td>
          <td style="width:55px;">${t.price}</td>
          <td style="width:55px;">${t.description}</td>
          <td style="width:55px;">${t.amount}</td>
          <td style="width:55px;">${t.gst}</td>
          <td style="width:55px;">${t.total_amount}</td></br>
      </tr>
      </tbody>
    </table>
             `;
    })
}

const getProducts = async()=>{
    products = await main.getProducts();
    console.log('3333333',products);
    await renderProducts(products)
    
     
}

async function init(){
   getProducts()
}
init();