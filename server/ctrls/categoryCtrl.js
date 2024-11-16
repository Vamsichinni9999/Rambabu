const Category = require('../model/categorymodel.js'); 

const categoryCtrl = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find(); 
            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const existingCategory = await Category.findOne({ name }); 
            if (existingCategory) return res.status(400).json({ msg: "Category already exists" });
            const newCategory = new Category({ name });
            await newCategory.save();
            res.json({ msg: "Category created successfully", newCategory });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory:async (req,res)=>{
        try{
            const category=await Category.findByIdAndDelete(req.params.id);
            if(!category) return res.status(404).json({msg:"Category not found"})
            res.json({msg:"Category deleted successfully"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateCategory:async (req,res)=>{
        try{
            const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
            if(!category) return res.status(404).json({msg:"Category not found"})
            res.json({msg:"Category updated successfully",category})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }    
 
    }
};

module.exports = categoryCtrl;
