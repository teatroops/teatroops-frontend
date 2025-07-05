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
          if (order.payment) {
            order.items.map((item) => {
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.createdAt
              allOrdersItem.push(item)
            })
          }
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
    <div className='border-t pt-16 3xl:pt-20 4xl:pt-24'>

      <div className='font-bold text-3xl 3xl:text-4xl 4xl:text-5xl'>
        <Title text1={'My Orders'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 3xl:py-6 4xl:py-8'>
              <div className='flex items-start gap-6 text-sm 3xl:text-base 4xl:text-lg'>
                <img className='w-16 sm:w-20 rounded shadow border 3xl:w-24 4xl:w-28' src={item.image} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium 3xl:text-xl 4xl:text-2xl'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700 3xl:text-lg 4xl:text-xl'>
                    <span className="line-through text-gray-400">{item.price?.mrp && `${currency}${item.price.mrp}`}</span>
                    <span className="text-[--primary-color] font-semibold">{currency}{item.price?.offer ?? item.price?.mrp}</span>
                    {/* {item.price?.discountNote && <span className="text-xs text-red-500 ml-2">{item.price.discountNote}</span>} */}
                    <span className="ml-3">Qty: <b>{item.quantity}</b></span>
                    <span className="inline-block bg-green-50 border border-green-200 rounded px-3 py-1 ml-2 text-xs 3xl:text-sm 4xl:text-base">Size: {item.size}</span>
                  </div>
                  <p className='mt-1 3xl:text-lg 4xl:text-xl'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1 3xl:text-lg 4xl:text-xl'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex flex-col gap-2 items-end justify-between'>
                <div className='flex items-center gap-2'>
                  <span className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-[--primary-color]' : 'bg-yellow-400'} 3xl:min-w-3 3xl:h-3 4xl:min-w-4 4xl:h-4`}></span>
                  <span className='text-sm md:text-base 3xl:text-lg 4xl:text-xl'>{item.status}</span>
                </div>
                <div className='text-right mt-2'>
                  <span className='text-xs text-gray-500 3xl:text-sm 4xl:text-base'>Subtotal: </span>
                  <span className='font-bold text-base text-[--primary-color] 3xl:text-lg 4xl:text-xl'>
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
