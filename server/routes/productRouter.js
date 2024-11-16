const router=require('express').Router();
const auth=require('../middleware/auth.js');
const authAdmin=require('../middleware/authAdmin.js');
const productCtrl=require('../ctrls/productCtrl.js');

router.route('/products')
.get(productCtrl.getproducts)
.post(auth,authAdmin,productCtrl.createproducts);

router.route('/products/:id')
.get(productCtrl.getProductById)
.delete(auth,authAdmin,productCtrl.deleteproducts)
.put(auth,authAdmin,productCtrl.updateproducts);

module.exports=router