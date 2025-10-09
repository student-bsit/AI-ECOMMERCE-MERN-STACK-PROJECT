import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title';
import Card from './Card'

const RelativeProduct = ({category,subCategory,currentProductId}) => {
    let {products}=useContext(shopDataContext);
    let [relatedProducts,setRelatedProducts]=useState([]);

    useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory)
        .filter((item) => item._id !== currentProductId)
        .slice(0, 4);

      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subCategory, currentProductId]);


  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>

        <div className='ml-[20px] lg:ml-[80px]'>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>

        </div>

        <div className='w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
                relatedProducts.map((item,index)=>(
                    <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                ))
            }

        </div>
      
    </div>
  )
}

export default RelativeProduct
