import React from 'react'

function Order({ order }: any) {
    return (
        <div className="border-black border-2" >
            {order.products.map((product:any) => {
                return <div className="flex justify-between items-center rounded-xl overflow-clip bg-gray-700">
                    <div className="w-[25%]">
                        <img src="/pexels-photo-90946.webp" alt="" />
                    </div>
                    <div className="w-[50%]">
                        some description {product._id}
                    </div>
                    <div className="w-[220px] px-10 flex items-center justify-between">
                        <p className="text-2xl">{product.quantity}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Order