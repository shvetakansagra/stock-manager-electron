const main = require('../main')

const salesForm = document.querySelector("#salesForm");
const customer_name = document.querySelector("#customer_name");
const address = document.querySelector("#address");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const contact_no = document.querySelector("#contact_no");
const payment_type = document.querySelector("#payment_type");
const invoice_no = document.querySelector("#invoice_no");
const sales_date = document.querySelector("#sales_date");
const order_no = document.querySelector("#order_no");
const productsList = document.querySelector("#products");

const custId = document.querySelector("#custId");



salesForm.addEventListener('submit', async(e) =>{
    
    try{
        e.preventDefault();
        const product ={
            customer_name:customer_name.value,
            address:address.value,
            payment_type:payment_type.value,
            country:country.value,
            state:state.value,
            city:city.value,
            contact_no:contact_no.value,
            invoice_no:invoice_no.value,
            sales_date:sales_date.value,
            order_no:order_no.value,
            total_amount:total_amount.value,
            total_gross:total_gross.value
        }
                const savedProduct = await main.createSales(product);
    
        const productItem ={
            custIds:custId.value,
        }
        const prod = [];
    
        for(let i = 1; i <= (custId.value--); i++) {
            var ddl_product_varient_id = 'provarients'+i;
            var ddl_product_name = 'name'+i;
            var unit_id = 'unit'+i;
            var qnt_id = 'qnt'+i;
            var price_id = 'price'+i;
            var total_id = 'totalamount'+i;
            var gst_id = 'gst'+i;
            var gross_id = 'grossamount'+i;

            // const ddl_product_value = document.getElementById(ddl_product_id).value;
            const ddl_product_varient_value = document.getElementById(ddl_product_varient_id).value;
            const ddl_product_value = document.getElementById(ddl_product_name).value;
            const qnt_value = document.getElementById(qnt_id).value;
            const unit_value = document.getElementById(unit_id).value;
            const price_value = document.getElementById(price_id).value;
            const total_value = document.getElementById(total_id).value;
            const gst_value = document.getElementById(gst_id).value;
            const gross_value = document.getElementById(gross_id).value;
       if(qnt_value!=''||qnt_value!=0||ddl_product_varient_value!=''||ddl_product_varient_value!=0){
            let myrecord = {
                invoice_no:invoice_no.value,
                product_varients_id: ddl_product_varient_value,
                qr_code: ddl_product_varient_value,
                name: ddl_product_value,
                unit: unit_value,
                quantity: qnt_value,
                price: price_value,
                gross: gross_value,
                gst: gst_value,
                total: total_value,
            };
            const savedProductItem = await main.createProductSalesItem(myrecord);
            }
        }
          salesForm.reset()
          customer_name.focus()
          location.href='sales.html'
    }catch(error){
        console.log(error);
    }
})
