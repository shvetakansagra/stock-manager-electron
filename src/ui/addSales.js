const main = require('../main')

const salesForm = document.querySelector("#salesForm");
const name = document.querySelector("#name");
const address = document.querySelector("#address");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const phone = document.querySelector("#phone");
const invoiceno = document.querySelector("#invoiceno");
const salesdate = document.querySelector("#salesdate");
const orderno = document.querySelector("#orderno");
const prod = document.querySelector("#prod");
const provarients = document.querySelector("#provarients");
const qnt = document.querySelector("#qnt");
const price = document.querySelector("#price");
const prodesc = document.querySelector("#prodesc");
const grossamount = document.querySelector("#grossamount");
const gst = document.querySelector("#gst");
const totalamount = document.querySelector("#totalamount");
const productsList = document.querySelector("#products");

const ids = localStorage.getItem("ids");
const customer_name = localStorage.getItem("customer_name");
const invoice_no = localStorage.getItem("invoice_no");
const order_no = localStorage.getItem("order_no");
const product = localStorage.getItem("product");
const description = localStorage.getItem("description");
const quantity   = localStorage.getItem("quantity");
const price1 = localStorage.getItem("price");
const phone1 = localStorage.getItem("phone");
const address1 = localStorage.getItem("address1");
const gst1 = localStorage.getItem("gst");
const amount = localStorage.getItem("amount");
const total_amount = localStorage.getItem("total_amount");


salesForm.addEventListener('submit', async(e) =>{
    try{
        e.preventDefault();
        const product ={
            customer_name:name.value,
            address1:address.value,
            country:country.value,
            state:state.value,
            city:city.value,
            phone:phone.value,
            invoice_no:invoiceno.value,
            sales_date:salesdate.value,
            order_no:orderno.value,
            product:prod.value,
            product_varient_id:provarients.value,
            quantity:qnt.value,
            price:price.value,
            description:prodesc.value,
            amount:grossamount.value,
            gst:gst.value,
            total_amount:totalamount.value,
            
        }
          const savedProduct = await main.createSales(product);
          console.log(savedProduct);
          
          salesForm.reset()
          name.focus()
          location.href='sales.html'

    }catch(error){
        console.log(error)
    }
})
