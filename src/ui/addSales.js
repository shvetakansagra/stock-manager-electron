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
const qnt = document.querySelector("#qnt");
const price = document.querySelector("#price");
const prodesc = document.querySelector("#prodesc");
const grossamount = document.querySelector("#grossamount");
const gst = document.querySelector("#gst");
const totalamount = document.querySelector("#totalamount");
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
            // product:prod.value,
            
            // product_varient_id:provarients.value,
            // quantity:qnt.value,
            // price:price.value,
            // description:prodesc.value,
            // amount:grossamount.value,
            // gst:gst.value,
            // total_amount:totalamount.value,
        }
        const productItem ={
            custId:custId.value,
        }
    
        const savedProduct = await main.createSales(product);
        
        const prod = [];
        
        for(let i = 1; i <= custId.value ; i++) {
            var ddl_product_id = `ddl-product-${i}`;
            var ddl_product_varient_id = `ddl-product-varient-${i}`;
            const ddl_product_value = document.querySelector("#"+ddl_product_id).value;
            const ddl_product_varient_value = document.querySelector("#"+ddl_product_varient_id).value;
            
            let myrecord = {
                ddl_product_id: ddl_product_value,
                ddl_product_varient_id: ddl_product_varient_value,
            };
            prod.push(myrecord);
            
            {
                
            }
            const savedProductItem = await main.createProductSalesItem(prod);
            
        }
        console.log(prod);
          
        //   salesForm.reset()
        //   name.focus()
        //   location.href='sales.html'

    }catch(error){
        console.log(error);
    }
})
