
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
        <th style="width:30px;">Invoice No</th>
        <th style="width:100px;">Sales Date</th>
        <th style="width:55px;">Customer Name</th>
        <th style="width:55px;">Order No</th>
        <th style="width:55px;">Contact No</th>
        <th style="width:55px;">Total Amount</th>
        <th style="width:100px;">Action</th>
    </tr>
  </thead>
  </table>`
    tasks[0].forEach(function (t) {
      productsList.innerHTML += `
      <table class="table">
      <tbody>
         <tr>
          <td style="width:50px;">${t.id}</td>
          <td style="width:30px;">${t.invoice_no}</td>
          <td style="width:55px">${t.sales_date}</td>
          <td style="width:55px;">${t.customer_name}</td>
          <td style="width:55px;">${t.order_no}</td>
          <td style="width:55px;">${t.contact_no}</td>
          <td style="width:55px;">${t.total_amount}</td></br>
          <td style="width:100px;">
          <a class="btn btn-primary" onclick="editSalesInvoice('${t.id}')">Edit</a></td></br>
      </tr>
      </tbody>
    </table>
             `;
    })
}

const getProducts = async()=>{
    products = await main.getProducts();
    await renderProducts(products)
}

async function init(){
   getProducts()
}
init();