const router=require('express').Router();
const auth=require('../middleware/auth.js');
const authAdmin=require('../middleware/authAdmin.js');
const categoryCtrl=require('../ctrls/categoryCtrl.js');
router.route('/category')
.get(categoryCtrl.getCategory)
.post(auth,authAdmin,categoryCtrl.createCategory);
router.route('/category/:id')
.delete(auth,authAdmin,categoryCtrl.deleteCategory)
.put(auth,authAdmin,categoryCtrl.updateCategory);
module.exports=router