const { format } = require('mysql2');
const main = require('../main');
const productsList = document.querySelector("#products");
let products = [];

function renderProducts(tasks) {
    productsList.innerHTML = ''
    productsList.innerHTML += `
    <table class="table">
  <thead>
  <tr>
  <th style="width:60px;">Index</th>
        <th style="width:80px;">Invoice No</th>
        <th style="width:120px;">Sales Date</th>
        <th style="width:100px;">Customer Name</th>
        <th style="width:70px;">Order No</th>
        <th style="width:27px;">Contact No</th>
        <th style="width:75px;">Total Amount</th>
        <th style="width:100px;">Action</th>
    </tr></thead></table>`;
    tasks[0].forEach(function (t) {
      productsList.innerHTML += `
      <table class="table">
      <tbody>
         <tr>
          <td style="width:60px;">${t.id}</td>
          <td style="width:100px;">${t.invoice_no}</td>
          <td style="width:120px;">${t.sales_date.split("T", 1)}</td>
          <td style="width:100px;">${t.customer_name}</td>
          <td style="width:70px;">${t.order_no}</td>
          <td style="width:30px;">${t.contact_no}</td>
          <td style="width:75px;">${t.total_amount}</td>
          <td style="width:100px;">
          <a class="btn btn-primary" title="View" onclick="viewSalesInvoice('${t.invoice_no}')" page.papersize = { format: 'a4', orientation: 'portrait', border: '1cm' };>View</a></td>
      </tr>
      </tbody>
    </table>`;
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