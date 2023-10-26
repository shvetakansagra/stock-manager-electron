const { BrowserWindow } = require('electron');
const { getConnection } = require('./database');


const createSales = async (product) => {
    try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO sales SET ?", product);
      product.id = result.insertId;
   
      // Notify the User
      // new Notification({
      //   title: "Electron Mysql",
      //   body: "New Product Saved Successfully",
      // }).show();
   
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
      // new Notification({
      //   title: "Electron Mysql",
      //   body: "New Product Saved Successfully",
      // }).show();
   
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
    const results = conn.query("SELECT name, sales_price, unit from varient_products WHERE qr_code =" + conn.escape(productName));
    // const results = conn.query("SELECT name, sales_price, unit from view_varient_products WHERE qr_code =" + conn.escape(productName));
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

  //view sales 
  async function viewSalesInvoiceIdDatas(id){
    const products=[];
    const conn = await getConnection();
    const results1 = await conn.query("SELECT * FROM sales WHERE id = ?", id);
    const inv =results1[0][0]['invoice_no'];
    const results = await conn.query("SELECT * FROM sales_items WHERE invoice_no =" + conn.escape(inv));
    console.log('333333333333333',results);
    // const results = await conn.query("SELECT * FROM sales INNER JOIN sales_items ON where invoice_no = 'invoice_no'");
    data = await results.then((result) => {
           products.push(...JSON.parse(JSON.stringify(result)))
           console.log('11111111111111',products);
          }).catch((err) => {
          console.log("err",err);
          });
    return products;
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
   const electron = require ('electron')

// const app = electron.app // electron module
// const BrowserWindow = electron.BrowserWindow //enables UI
// const Menu = electron.Menu // menu module

   module.exports = {
    createWindow,
    createSales,
    getProducts,
    getInvoiceId,
    getAllProducts,
    getAllProductVarients,
    viewSalesInvoiceIdDatas,
    getQrCodeDatas,
    getSalesPrice,
    createProductSalesItem,
    getDropDownProductVarientsData
  };   