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
  const getInvoiceId = async () => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT invoice_no FROM sales ORDER BY id DESC LIMIT 1");
    console.log('2222222222',results);
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return products;
  };

  const getProducts = async () => {

    const products = [];
    const conn = await getConnection();
    const results = conn.query("SELECT * FROM sales ORDER BY id DESC");
    data = await results.then((result) => {
      products.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    // console.log('data',results._rejectionHandler0);
    // console.log('data',products);
    return products;
  };

  async function init() {
    getProducts();
  }
  
  init(); 

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


  //  const conn = getConnection();

   module.exports = {
    createWindow,
    createSales,
    getProducts,
    getInvoiceId
  };   