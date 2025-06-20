import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, user } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    zipcode: '',
    phone: ''
  });

  // List of Indian states and Union Territories
  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZipcode = (zipcode) => {
    const zipRegex = /^\d{6}$/; // Assuming Indian zip codes (6 digits)
    return zipRegex.test(zipcode);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Assuming Indian phone numbers (10 digits)
    return phoneRegex.test(phone);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));

    // Automatically set country to "India" when a state is selected
    if (name === 'state') {
      setFormData(data => ({ ...data, country: 'India' }));
    }

    // Validate fields on change
    if (name === 'email') {
      setErrors(errors => ({ ...errors, email: validateEmail(value) ? '' : 'Invalid email address' }));
    } else if (name === 'zipcode') {
      setErrors(errors => ({ ...errors, zipcode: validateZipcode(value) ? '' : 'Invalid zip code (must be 6 digits)' }));
    } else if (name === 'phone') {
      setErrors(errors => ({ ...errors, phone: validatePhone(value) ? '' : 'Invalid phone number (must be 10 digits)' }));
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    // Validate all fields before submission
    const emailValid = validateEmail(formData.email);
    const zipValid = validateZipcode(formData.zipcode);
    const phoneValid = validatePhone(formData.phone);

    if (!emailValid || !zipValid || !phoneValid) {
      setErrors({
        email: emailValid ? '' : 'Invalid email address',
        zipcode: zipValid ? '' : 'Invalid zip code (must be 6 digits)',
        phone: phoneValid ? '' : 'Invalid phone number (must be 10 digits)'
      });
      return; // Stop submission if validation fails
    }

    try {

      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            orderItems.push({
              productId,
              size,
              quantity: cartItems[productId][size],
              image: (products.find(p => p._id === productId)?.image?.[0]) || ''
            });
          }
        }
      }

      // Calculate discounted total (same logic as cart summary)
      function parseDiscountNote(note) {
        const regex = /Buy\s*(\d+):?\s*Get Flat (\d+)% off/i;
        const match = note && note.match(regex);
        if (match) {
          return {
            minQty: parseInt(match[1], 10),
            percent: parseFloat(match[2])
          };
        }
        return null;
      }
      let subtotal = 0;
      let discountTotal = 0;
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (!product) continue;
            const priceObj = product.price || {};
            const price = priceObj.offer ?? priceObj.mrp ?? 0;
            const note = priceObj.discountNote || product.discountNote;
            const discountInfo = parseDiscountNote(note);
            let itemSubtotal = price * quantity;
            let itemDiscount = 0;
            if (discountInfo && quantity >= discountInfo.minQty) {
              const eligibleSets = Math.floor(quantity / discountInfo.minQty);
              const discountedQty = eligibleSets * discountInfo.minQty;
              itemDiscount = (discountedQty * price * discountInfo.percent) / 100;
            }
            subtotal += itemSubtotal;
            discountTotal += itemDiscount;
          }
        }
      }
      const finalTotal = subtotal - discountTotal + (subtotal > 0 ? delivery_fee : 0);
      const userId = user?._id;
      let orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: finalTotal // discounted total
      }
      switch (method) {
        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':
          // 1. Place order and create Razorpay order in backend
          const placeOrderRes = await axios.post(
            backendUrl + '/api/order/razorpay',
            orderData,
            { headers: { token } }
          );
          if (!placeOrderRes.data.success) {
            toast.error(placeOrderRes.data.message || 'Order failed.');
            break;
          }
          const razorpayOrder = placeOrderRes.data.order;
          // 2. Open Razorpay modal
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: razorpayOrder.id,
            handler: async function (response) {
              try {
                // 3. Verify payment
                const verifyRes = await axios.post(
                  backendUrl + '/api/order/verifyRazorpay',
                  {
                    userId: orderData.userId,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  },
                  { headers: { token } }
                );
                if (verifyRes.data.success) {
                  setCartItems({});
                  navigate('/orders');
                } else {
                  toast.error(verifyRes.data.message || 'Payment verification failed.');
                }
              } catch (err) {
                toast.error('Payment verification failed.');
              }
            },
            prefill: {
              name: formData.firstName + ' ' + formData.lastName,
              email: formData.email,
              contact: formData.phone
            },
            theme: { color: '#3399cc' }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------- Left Side ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl font-bold sm:text-2xl my-3'>
          <Title text1={'Delivery Information'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="email"
          placeholder='Email address'
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <select
            required
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          >
            <option value="">Select State</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="number"
            placeholder='Zipcode'
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='Country'
            readOnly // Make the country field read-only
          />
        </div>

        {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="number"
          placeholder='Phone'
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-[--primary-color]">Order Summary</h3>
            <div className="flex flex-col gap-4 divide-y">
              {Object.keys(cartItems).length === 0 && (
                <div className="text-gray-500 text-center py-6">Your cart is empty.</div>
              )}
              {Object.entries(cartItems).map(([productId, sizes]) => (
                Object.entries(sizes).map(([size, quantity], idx) => {
                  if (!quantity || quantity < 1) return null;
                  const product = products.find(p => p._id === productId);
                  if (!product) return null;
                  const priceObj = product.price || {};
                  const priceToUse = priceObj.offer ?? priceObj.mrp;
                  const subtotal = priceToUse * quantity;
                  return (
                    <div key={productId + size} className="flex items-center gap-4 py-2">
                      <img src={product.image[0]} alt={product.name} className="w-14 h-14 object-cover rounded border" />
                      <div className="flex-1">
                        <div className="font-medium text-base text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">Size: <b>{size}</b></div>
                        <div className="text-xs text-gray-500">Qty: <b>{quantity}</b></div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm line-through text-gray-400">{priceObj.mrp && `₹${priceObj.mrp}`}</span>
                          <span className="text-base font-semibold text-green-600">₹{priceToUse}</span>
                          {/* {priceObj.discountNote && <span className="ml-2 text-xs text-red-500">{priceObj.discountNote}</span>} */}
                        </div>
                      </div>
                      <div className="font-bold text-lg text-gray-700 min-w-[60px] text-right">₹{subtotal}</div>
                    </div>
                  );
                })
              ))}
            </div>
            <div className="border-t pt-4 mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Total Items:</span>
                <span>{Object.entries(cartItems).reduce((acc, [_, sizes]) => acc + Object.values(sizes).reduce((a, b) => a + b, 0), 0)}</span>
              </div>
              {(() => {
                // Helper: Parse discount note of format 'Buy X: Get Flat Y% off'
                function parseDiscountNote(note) {
                  const regex = /Buy\s*(\d+):?\s*Get Flat (\d+)% off/i;
                  const match = note && note.match(regex);
                  if (match) {
                    return {
                      minQty: parseInt(match[1], 10),
                      percent: parseFloat(match[2])
                    };
                  }
                  return null;
                }
                let subtotal = 0;
                let discountTotal = 0;
                for (const productId in cartItems) {
                  for (const size in cartItems[productId]) {
                    const quantity = cartItems[productId][size];
                    if (quantity > 0) {
                      const product = products.find((p) => p._id === productId);
                      if (!product) continue;
                      const priceObj = product.price || {};
                      const price = priceObj.offer ?? priceObj.mrp ?? 0;
                      const note = priceObj.discountNote || product.discountNote;
                      const discountInfo = parseDiscountNote(note);
                      let itemSubtotal = price * quantity;
                      let itemDiscount = 0;
                      if (discountInfo && quantity >= discountInfo.minQty) {
                        const eligibleSets = Math.floor(quantity / discountInfo.minQty);
                        const discountedQty = eligibleSets * discountInfo.minQty;
                        itemDiscount = (discountedQty * price * discountInfo.percent) / 100;
                      }
                      subtotal += itemSubtotal;
                      discountTotal += itemDiscount;
                    }
                  }
                }
                const finalTotal = subtotal - discountTotal + (subtotal > 0 ? delivery_fee : 0);
                return (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discountTotal > 0 && (
                      <div className="flex justify-between text-green-700 text-sm">
                        <span>Discount:</span>
                        <span>-₹{discountTotal.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span>₹{delivery_fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-[--primary-color]">
                      <span>Total:</span>
                      <span>₹{finalTotal > 0 ? finalTotal.toFixed(2) : '0.00'}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* --------------- Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            {/* <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div> */}
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
