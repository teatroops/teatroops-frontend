import React from 'react'

const ShippingPolicy = () => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-[--primary-color] mb-6">Shipping Policy</h1>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Shipping Guidelines and Times</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>For every order, we provide regular delivery services.</li>
                <li>Orders are shipped out in one to two business days after processing.</li>
                <li>Within India, the estimated delivery time is five to seven business days.</li>
                <li>After your order is placed, the Tea Troops customer service number will send you a confirmation message.</li>
                <li>Shipping Address: To prevent any delivery problems, please make sure the shipping address you enter at checkout is correct.</li>
                <li>Shipments that cannot be delivered or have the wrong shipping address are not our responsibility.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Assistance with Shipping</h2>
            <p className="text-gray-700 mb-6">
                Please email our customer support staff at <a href="mailto:teatroopsindia@gmail.com" className="text-[--primary-color] hover:underline">teatroopsindia@gmail.com</a> or message at Tea Troops customer care number if you have any questions or need assistance with your order or shipment.
            </p>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Shipping Rates</h2>
            <p className="text-gray-700 mb-6">
                The weight of your order and your location are used to determine the shipping rates, and orders over a specific amount qualify for free shipping.
            </p>
        </div>
    )
}

export default ShippingPolicy