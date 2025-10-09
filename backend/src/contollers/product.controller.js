import uploadOnCloudinary from "../config/cloudinary.config.js";
import Product from "../models/product.model.js";


export const addProduct = async (req, res) => {
  try {

    let { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    let image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    let image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    let image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    let image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestSeller: bestSeller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    return res.status(201).json(product);

  } catch (error) {
    console.log("add product error", error);
    return res.status(500).json({ message: `AddProduct error ${error.message}` });
  }
};


export const listProduct=async(req,res)=>{
  try {
    const products=await Product.find();
    return res.status(201).json(products)
  } catch (error) {
    console.log("get listProduct error", error);
    return res.status(500).json({ message: `get ListProduct error ${error.message}` });
  }
}

export const removeProduct=async(req,res)=>{
  try {
    let {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    return res.status(200).json(product)
  } catch (error) {
    console.log("removeProduct error", error);
    return res.status(500).json({ message: `removeProduct error ${error.message}` })
  }
}