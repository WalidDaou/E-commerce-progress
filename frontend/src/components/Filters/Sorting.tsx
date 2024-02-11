import React from 'react'
import { useCommerceStore } from "../../store"

function Sorting() {
    const { setProductSorting } = useCommerceStore()

    const sortingOptions = {
        "ASC": 1,
        "DESC": -1
    };

    return (
        <div className="flex gap-4">
            {Object.entries(sortingOptions).map(([key, value]) => (
                <p key={key} onClick={() => setProductSorting(value)} className="cursor-pointer">{key}</p>
            ))}
            {/* <div onClick={()=>setProductSorting(-1)} className="cursor-pointer" >asc</div>
            <div onClick={()=>setProductSorting(1)} className="cursor-pointer" >desc</div> */}
        </div>
    )
}

export default Sorting;
