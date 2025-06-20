import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.createdAt
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>

      <div className='font-bold  text-3xl'>
        <Title text1={'My Orders'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 rounded shadow border' src={item.image} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <span className="line-through text-gray-400">{item.price?.mrp && `${currency}${item.price.mrp}`}</span>
                    <span className="text-green-600 font-semibold">{currency}{item.price?.offer ?? item.price?.mrp}</span>
                    {/* {item.price?.discountNote && <span className="text-xs text-red-500 ml-2">{item.price.discountNote}</span>} */}
                    <span className="ml-3">Qty: <b>{item.quantity}</b></span>
                    <span className="inline-block bg-green-50 border border-green-200 rounded px-3 py-1 ml-2 text-xs">Size: {item.size}</span>
                  </div>
                  <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex flex-col gap-2 items-end justify-between'>
                <div className='flex items-center gap-2'>
                  <span className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                  <span className='text-sm md:text-base'>{item.status}</span>
                </div>
                <div className='text-right mt-2'>
                  <span className='text-xs text-gray-500'>Subtotal: </span>
                  <span className='font-bold text-base text-[--primary-color]'>
                    {currency}
                    {(item.price?.offer ?? item.price?.mrp) * item.quantity}
                  </span>
                </div>
                {/* <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm mt-2'>Track Order</button> */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
