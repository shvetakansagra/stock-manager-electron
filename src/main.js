const { BrowserWindow } = require('electron');
const { getConnection } = require('./database');

//sales 
const createSales = async (product) => {
    try {
     const conn = await getConnection();
     const result = await conn.query("INSERT INTO sales SET ?", product);
      product.id = result.insertId;
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
    const results = conn.query("SELECT name, sales_price,purchase_price, unit from varient_products WHERE qr_code =" + conn.escape(productName));
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
 const viewSalesInvoiceIdDatas= async(InvoiceId)=>{
    const salesProducts=[];
    const conn = await getConnection();
    const results = await conn.query("SELECT sales.id,sales.customer_name,sales.sales_date,sales.order_no,sales.address,sales.total_amount,sales.total_gross,sales.country,sales.contact_no,sales.city,sales.state,sales.payment_type,sales_items.unit,sales_items.qr_code,sales_items.id,sales_items.invoice_no,sales_items.name,sales_items.quantity,sales_items.price,sales_items.gst,sales_items.gross,sales_items.total FROM sales_items INNER JOIN sales ON sales_items.invoice_no=sales.invoice_no WHERE sales.invoice_no ="+ conn.escape(InvoiceId));
    const salesDataList = JSON.parse(JSON.stringify(results));
    console.log('salesDataListsalesDataListsalesDataListsalesDataList',salesDataList);
    window.localStorage.setItem('salesDataList',JSON.stringify(salesDataList));
    // exit();
  }

  //Purchase module
  const getPurchaseProducts = async () => {

    const perchaseProducts = [];
    const conn = await getConnection();
    const results = conn.query("SELECT * FROM purchases ORDER BY id DESC");
    data = await results.then((result) => {
      perchaseProducts.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return perchaseProducts;
  };

  const createPurchase = async (product) => {
    try {
        const conn = await getConnection();
        const result = await conn.query("INSERT INTO purchases SET ?", product);
      product.id = result.insertId;
   
      return product
    } catch (error) {
      console.log(error);
    }
  };
  const createProductPurchaseItem = async (product) => {
    try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO purchase_items SET ?", product);
      product.id = result.insertId;
      return product
    } catch (error) {
      console.log(error);
    }
  };
  const purchaseCompany = async()=>{
      const companys = [];
      const conn = await getConnection();
      const results = conn.query("SELECT * From companies ");
      data = await results.then((result) => {
        companys.push(...JSON.parse(JSON.stringify(result)))
      }).catch((err) => {
        console.log("err",err);
      });
      return companys;
  }
  const purchaseCompanyid = async(name)=>{
    const companysAddress = [];
    const conn = await getConnection();
    const results = conn.query("SELECT address1 From companies WHERE name =" + conn.escape(name));
    data = await results.then((result) => {
      companysAddress.push(...JSON.parse(JSON.stringify(result)))
    }).catch((err) => {
      console.log("err",err);
    });
    return companysAddress;
}
const viewPurchaseInvoiceIdDatas= async(InvoiceId)=>{
  const salesProducts=[];
  const conn = await getConnection();
  const results = await conn.query("SELECT purchases.id,purchases.company_name,purchases.purchase_date,purchases.order_no,purchases.address,purchases.gst,purchases.total_amount,purchases.total_gross,purchases.phone,purchases.payment_type,purchase_items.unit,purchase_items.qr_code,purchase_items.id,purchase_items.invoice_no,purchase_items.name,purchase_items.quantity,purchase_items.price,purchase_items.gst,purchase_items.gross,purchase_items.total FROM purchase_items INNER JOIN purchases ON purchase_items.invoice_no=purchases.invoice_no WHERE purchases.invoice_no ="+ conn.escape(InvoiceId));
  const purchaseDataList = JSON.parse(JSON.stringify(results));
  window.localStorage.setItem('purchaseDataList',JSON.stringify(purchaseDataList));
  // exit();
}
const getConfigrationFlag = async () => {
  const flag = [];
  const conn = await getConnection();
  const results = conn.query("SELECT value,gst FROM configration");
  data = await results.then((result) => {
    flag.push(...JSON.parse(JSON.stringify(result)))
  }).catch((err) => {
    console.log("err",err);
  });
  return flag;
};

  function createWindow() {
    window = new BrowserWindow({
                       width:800,
                       height:600,
                       webPreferences: {
                       nodeIntegration: true,
                       contextIsolation: false, //required flag
                       icon: `${__dirname}/assets/icons/win/icon.ico`
                     }
                   })
     window.loadFile("src/ui/index.html");
   }
   const electron = require ('electron')

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
    getDropDownProductVarientsData,
    purchaseCompany,
    purchaseCompanyid,
    createPurchase,
    createProductPurchaseItem,
    getPurchaseProducts,
    viewPurchaseInvoiceIdDatas,
    getConfigrationFlag
  };   