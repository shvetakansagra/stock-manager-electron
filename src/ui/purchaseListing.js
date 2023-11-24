const { format } = require('mysql2');
const main = require('../main');
const productsList = document.querySelector("#products");
let purchaseProducts = [];

function renderProducts(tasks) {
    productsList.innerHTML = ''
    productsList.innerHTML += `
    <table class="table">
  <thead>
  <tr>
  <th style="width:60px;">Index</th>
        <th style="width:80px;">Invoice No</th>
        <th style="width:120px;">Purchase Date</th>
        <th style="width:100px;">Company Name</th>
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
          <td style="width:120px;">${t.purchase_date.split("T", 1)}</td>
          <td style="width:100px;">${t.company_name}</td>
          <td style="width:70px;">${t.order_no}</td>
          <td style="width:30px;">${t.phone}</td>
          <td style="width:75px;">${t.total_amount}</td>
          <td style="width:100px;">
          <a class="btn btn-primary" title="View" onclick="viewSalesInvoice('${t.invoice_no}')">View</a></td>
      </tr>
      </tbody>
    </table>`;
    })
}


const getPurchaseProducts = async()=>{
    purchaseProducts = await main.getPurchaseProducts();
    await renderProducts(purchaseProducts)
}

async function init(){
    getPurchaseProducts()
 }
 init();