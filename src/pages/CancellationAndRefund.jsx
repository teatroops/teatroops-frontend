import React from 'react'

const CancellationAndRefund = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-[--primary-color] mb-6">Cancellation and Refund Policy</h1>
            <p className="text-gray-700 mb-6">
                We appreciate you selecting Tea Troops. You can contact our Customer Experience Team at <a href="mailto:teatroopsindia@gmail.com" className="text-[--primary-color] hover:underline">teatroopsindia@gmail.com</a> if you're not happy with your order, and they will get back to you right away.
            </p>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Cancellations</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>All cancellation requests must be initiated before the order is dispatched for shipping.</li>
                <li>All payments will be credited within 5-7 business days from cancellation.</li>
                <li>In case your order has already been shipped, it cannot be cancelled as our service partners charge us as soon as the pickup is completed.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Replacements</h2>
            <p className="text-gray-700 mb-6">
                A request for replacement must be initiated within a maximum of 5 days from the day of delivery. Product replacements typically take 5-7 business days to be delivered to you. We strive to ensure a smooth and timely process.
            </p>
            <p className="text-gray-700 mb-6">
                Please attach a picture of the delivered order along with the invoice and send a mail to <a href="mailto:teatroopsindia@gmail.com" className="text-[--primary-color] hover:underline">teatroopsindia@gmail.com</a>. Our Audit team will review and send you a replacement, if applicable, in the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Damaged/Incorrect Product Received</li>
                <li>Item missing from order</li>
                <li>Expired Product Received (Please attach a picture of the product showing the expiry date along with the invoice)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[--primary-color] mb-4">Returns</h2>
            <p className="text-gray-700 mb-6">
                Due to the perishable nature of Tea, we do not accept returns on any products. Instead, we can replace the same if applicable.
            </p>
        </div>
    )
}

export default CancellationAndRefund