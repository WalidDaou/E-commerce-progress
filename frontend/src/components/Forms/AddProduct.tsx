import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"
import { Link, HashRouter as Router } from 'react-router-dom'

function AddProduct() {

    const clothes = 'clothes'
    const arts = 'arts'
    const Furniture = 'Furniture'
    const paintings = 'paintings'
    const vases = 'vases'

    const {
        token,
        forHiding
    } = useCommerceStore()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(10)
    const [productCategory, setProductCategory] = useState(arts)
    const [productDescription, setProductDescription] = useState('')
    const [notes, setNotes] = useState(false)



    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }

    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevents the form from submitting in case you are using a form element

        // Check if any of the required fields are empty
        if (!productName || !productPrice || !productCategory || !productDescription) {
            // Handle the case where one or more fields are empty
            alert('Please fill in all the required fields.');
            return;
        }
        // localhost:5000/api/v1/products/create
        fetch(homeURL + '/products/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    window.location.href = '#home';
                } else {
                    // Handle the case where the server responds with an error
                    console.error('Error:', response.statusText);
                    setNotes(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                setNotes(true)
            });




    }

    return (
        <>
            <form style={formStyle}>
                <h2 className='text-red-600 '>
                    {notes && (
                        <>
                            Your store is still pending{forHiding ? <a className='text-green-200' href='#sell'>CREATE YOUR OWN STORE</a> : null}

                        </>
                    )}
                </h2>

                <span>
                    <label htmlFor="product-name">product-name</label>
                    <input type="text" name="product-name" id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </span>
                <span>
                    <label htmlFor="product-price">product-price</label>
                    <input type="number" name="product-price" id="product-price" value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))} />
                </span>
                <span>
                    <label htmlFor="product-category">product-category</label>

                    <label htmlFor="clothes">clothes</label>
                    <input type="radio" name="productCategory" id="clothes" value={clothes} onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="Furniture">Furniture</label>
                    <input type="radio" name="productCategory" id="Furniture" value={Furniture} onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="arts ">arts </label>
                    <input type="radio" name="productCategory" id="Beaut " value={arts} onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="vases">vases</label>
                    <input type="radio" name="productCategory" id="vases" value={vases} onChange={(e) => setProductCategory(e.target.value)} />
                    <label htmlFor="paintings">paintings</label>
                    <input type="radio" name="productCategory" id="paintings" value={paintings} onChange={(e) => setProductCategory(e.target.value)} />



                </span>
                <span>
                    <label htmlFor="product-description">product-description</label>
                    <input type="text" name="product-description" id="product-description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                </span>
                <button onClick={handleSubmit} type="button">Add Product</button>
            </form>
            {forHiding ? <a className='text-green-200' href='#sell'>CREATE YOUR OWN STORE</a> : null}

        </>
    )
}

export default AddProduct