const { BrowserWindow } = require('electron');
const { getConnection } = require('./database');


const createSales = async (product) => {
    try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO sales SET ?", product);
      product.id = result.insertId;
   
      // Notify the User
      new Notification({
        title: "Electron Mysql",
        body: "New Product Saved Successfully",
      }).show();
   
      // Return the created Product
      return product
    } catch (error) {
      console.log(error);
    }
  };
  const createProductSalesItem = async (product) => {
    try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO sales_items SET ?", product);
      product.id = result.insertId;
   
      // Notify the User
      new Notification({
        title: "Electron Mysql",
        body: "New Product Saved Successfully",
      }).show();
   
      // Return the created Product
      return product
    } catch (error) {
      console.log(error);
    }
  };
  const getInvoiceId = async () => {

    const ids = [];
    const conn = await getConnection();
    const results = conn.query("SELECT invoice_no FROM sales ORDER BY id DESC LIMIT 1");
    data = await results.then((result) => {
      ids.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return ids;
  }
  
 const getProducts = async () => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT * FROM sales ORDER BY id DESC");
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  };
  const getAllProducts = async () => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT id,name FROM products ORDER BY id DESC");
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  };
  const getDropDownProductVarientsData = async (productName) => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT id, name FROM products WHERE id =" + conn.escape(productName));
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  }
  const getAllProductVarients = async (productId) => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT id, name FROM varient_products WHERE product_id =" + conn.escape(productId));
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  }
  const getSalesPrice = async (productName) => {
    const productsPrice = [];
    const conn = await getConnection();
    const results = conn.query("SELECT sales_price,unit from varient_products WHERE id =" + conn.escape(productName));
    data = await results.then((result) => {
      productsPrice.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return productsPrice;
  }
  const getQrCodeDatas =async(productName)=>{
    const products=[];
    const conn = await getConnection();
    const results = conn.query("SELECT qr_code from varient_products WHERE id =" + conn.escape(productName));
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  }

  async function init() {
    getProducts();
  }
  
  init(); 

  //edit sales 
  async function editSalesInvoiceDatas(id){
    const conn = await getConnection();
    const results = await conn.query("SELECT * FROM sales WHERE id = ?", id);
    const salesDataEdit = JSON.parse(JSON.stringify(results));
    const salesDataEditArray = salesDataEdit.flat();
  
  let ids = [];
  let name = [];
  let invoice_no = [];
  let order_no = [];
  let product = [];
  let description = [];
  let quantity = [];
  let price = [];
  let phone = [];
  let address1 = [];
  let gst = [];
  let amount = [];
  let total_amount = [];
  
    salesDataEditArray.forEach( (element) => {
                ids.push(element.id);
                name.push(element.customer_name);
                invoice_no.push(element.invoice_no);
                order_no.push(element.order_no);
                product.push(element.product);
                description.push(element.description);
                quantity.push(element.quantity);
                price.push(element.price);
                phone.push(element.phone);
                address1.push(element.address1);
                gst.push(element.gst);
                amount.push(element.amount);
                total_amount.push(element.total_amount);
            });
    
     localStorage.setItem("ids", ids);
     localStorage.setItem("customer_name", name);
     localStorage.setItem("invoice_no", invoice_no);
     localStorage.setItem("order_no", order_no);
     localStorage.setItem("product", product);
     localStorage.setItem("description", description);
     localStorage.setItem("quantity", quantity);
     localStorage.setItem("price", price);
     localStorage.setItem("phone", phone);
     localStorage.setItem("address1", address1);
     localStorage.setItem("gst", gst);
     localStorage.setItem("amount", amount);
     localStorage.setItem("total_amount", total_amount);

     location.href='createSales.html';
  }

  function createWindow() {
    window = new BrowserWindow({
                       width:800,
                       height:600,
                       webPreferences: {
                       nodeIntegration: true,
                       contextIsolation: false //required flag
                     }
                   })
     window.loadFile("src/ui/index.html");
   }


   module.exports = {
    createWindow,
    createSales,
    getProducts,
    getInvoiceId,
    getAllProducts,
    getAllProductVarients,
    getQrCodeDatas,
    getSalesPrice,
    createProductSalesItem,
    getDropDownProductVarientsData
  };   