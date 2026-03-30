import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/razorpay.png'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Placeholder = () => {
  const [method, setmethod] = useState('cod');
  const { products, cartItem, setCartItem, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext)

  const navigate = useNavigate();

  let [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData(data => ({ ...data, [name]: value }))

  }

  const initPay = (order) => {
    const options = {
      // key:,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order._id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        const {data}=await axios.post(serverUrl+"/api/orders/verifyrazorpay",response,{withCredentials:true})
        if(data){
          navigate("/order")
          setCartItem({});
        }

        const rzp = new window.Razorpay(options)
        rzp.open();
      }
    }
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if (itemInfo) {
              itemInfo.size = item;
              console.log("item size", itemInfo.size)
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          console.log(result.data)

          if (result.data) {
            setCartItem("");
            navigate("/order")
          }
          break;

        case 'razorpay':
          const RazorpayResult = await axios.post(serverUrl + "/api/order/placeorderbyrazorpay", orderData, { withCredentials: true })
          initPay(result.data)

          if (RazorpayResult.data) {
            console.log(RazorpayResult.data)
          } else {
            console.log(result.data.message)
          }


        default:
          break;
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[rgb(20,20,20)] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative '>

      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>

        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>

          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='First Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='firstName' value={formData.firstName} />

            <input type="text" placeholder='Last Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='lastName' value={formData.lastName} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="email" placeholder='Email' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='email' value={formData.email} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='street' value={formData.street} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='city' value={formData.city} />

            <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='state' value={formData.state} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='pinCode' value={formData.pinCode} />

            <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='country' value={formData.country} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

            <input type="text" placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onchangeHandler} name='phone' value={formData.phone} />

          </div>

          <div>
            <button type='submit' className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'>PLACE ORDER</button>
          </div>

        </form>

      </div>

      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>

        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
          <CartTotal />

          <div className='py-[10px]'>
            <Title text1={'PAYMENT '} text2={'METHOD'} />
          </div>

          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:my-[0px] justify-center gap-[50px]'>

            <button className={`w-[150px] h-[50px] bg-white rounded-sm ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`} onClick={() => setmethod('razorpay')}><img src={razorpay} alt='' className='w-[100%] h-[100%] object-fill rounded-sm' /></button>

            <button className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`} onClick={() => setmethod('cod')}>CASH ON DELIVERY</button>



          </div>

        </div>

      </div>

    </div>
  )
}

export default Placeholder
