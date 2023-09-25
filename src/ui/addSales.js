const main = require('../main')

const salesForm = document.querySelector("#salesForm");
const customer_name = document.querySelector("#customer_name");
const address = document.querySelector("#address");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const contact_no = document.querySelector("#contact_no");
const invoice_no = document.querySelector("#invoice_no");
const sales_date = document.querySelector("#sales_date");
const order_no = document.querySelector("#order_no");
// const prod = document.querySelector("#prod");
// const provarients = document.querySelector("#provarients");
// const qnt = document.querySelector("#qnt");
// const price = document.querySelector("#price");
// const prodesc = document.querySelector("#prodesc");
// const grossamount = document.querySelector("#grossamount");
// const gst = document.querySelector("#gst");
// const totalamount = document.querySelector("#totalamount");
const productsList = document.querySelector("#products");

const custId = document.querySelector("#custId");



salesForm.addEventListener('submit', async(e) =>{
    
    try{
        e.preventDefault();
        const product ={
            customer_name:customer_name.value,
            address:address.value,
            country:country.value,
            state:state.value,
            city:city.value,
            contact_no:contact_no.value,
            invoice_no:invoice_no.value,
            sales_date:sales_date.value,
            order_no:order_no.value,
        }
        
        const savedProduct = await main.createSales(product);
    
        const productItem ={
            custId:custId.value,
        }
         
        console.log('555555555',custId);
        const prod = [];
        
        for(let i = 1; i <= custId.value ; i++) {
            console.log('3333333',custId.value);
            var ddl_product_id = 'prod'+custId.value;
            console.log('77777777777',ddl_product_id);
            var ddl_product_varient_id = 'provarients'+custId.value;
            console.log('888888888888',ddl_product_varient_id);
            var qnt = 'qnt'+custId.value;
            console.log('888888888888',qnt);

            const ddl_product_value = document.getElementById(ddl_product_id).value;
            const ddl_product_varient_value = document.getElementById(ddl_product_varient_id).value;
            const qnt = document.getElementById(qnt).value;
            
            let myrecord = {
                invoice_no:invoice_no.value,
                product_id: ddl_product_value,
                product_varients_id: ddl_product_varient_value,
                quantity: qnt,
            };
            prod.push(myrecord);
            {
            }
            const savedProductItem = await main.createProductSalesItem(prod);
            
        }
        console.log(prod);
          
        //   salesForm.reset()
        //   customer_name.focus()
        //   location.href='sales.html'

    }catch(error){
        console.log(error);
    }
})
