import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {  Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import FormContainer from '../compontents/FormContainer'
import { listProducts, productDetails } from '../store/product-actions'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { updateProduct, updateProductReset, updateProductDetails } from '../store/updateProduct-actions'


function ProductEditScreen( ) {

    const { id } = useParams();
    const productId = id;

    console.log('ovo je product id:', productId)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0.00)
    const [image, setImage] = useState('')
    const [color, setColor] = useState('')
    const [place, setPlace] = useState('')
    const [flow, setFlow] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [high, setHigh] = useState('')
    const [type, setType] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productUpd = useSelector(state => state.updateProduct)
    const { error, loading, success, product } = productUpd

    
    useEffect(() => {
        console.log('pocetka useEffecta')

        dispatch(updateProductDetails(id))

        if(success){
            //dispatch(updateProductReset())
            //navigate(`/admin/productlist`)
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setColor(product.color)
            setPlace(product.place_of_planting)
            setFlow(product.flowering_time)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setHigh(product.high)
            setType(product.type_of_plant)
        }  

    }, [dispatch, navigate, success])

    console.log('drugo')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:id,
            name,
            price,
            image,
            color,
            place,
            flow,
            category,
            countInStock,
            description,
            brand,
            high,
            type
        }))

    }


    const uploadFileHandler = async (e) => {
         const file = e.target.files[0]
         
         const formData = new FormData()

         formData.append('image', file)
         formData.append('product_id', id)

         setUploading(true)

         try {
             const config = {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
             }

             const { data } = await axios.post('/api/products/upload/', formData, config)


             setImage(data)
             setUploading(false)

         } catch (error) {
            setUploading(false)
         }
     }


    return (
        <div>
        <Link to='/admin/productlist'>
            Go Back
        </Link>

        <FormContainer>
            <h1>Create Product</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>} 

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control

                                type='name'
                                placeholder='Enter name'
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label><strong>Cena</strong></Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter price'
                                defaultValue={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='image'>
                            <Form.Label><strong>Image</strong></Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter image...'
                                defaultValue={image}
                               
                            >
                            </Form.Control>

                            <Form.Control
                                controlid="image-file"
                                type='file'
                                label="Izaberite sliku:"
                                
                                onChange={(e) => uploadFileHandler(e)}
                            > 

                            </Form.Control>  
                            {uploading && <Loader />}

                        </Form.Group>


                        <Form.Group controlId='color'>
                            <Form.Label><strong>Boja</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setColor(e.target.value)}>
                                <option>{color}</option>
                                {product?.colorChoises?.map(col => (
                                    <option value={col}>{col}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label><strong>Stanje</strong></Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter stock'
                                defaultValue={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId='category'>
                            <Form.Label><strong>Kategorija</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setCategory(e.target.value)}>
                                <option>Odaberi kategoriju cveca...</option>
                                {product.category?.map(cat => (
                                    <option value={cat.name}>{cat.name}</option>
                                ))}

                            </Form.Select>
                        </Form.Group> */}

                        <Form.Group controlId='flow'>
                            <Form.Label><strong>Vreme cvetanja</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setFlow(e.target.value)}>
                                <option>{flow}</option>
                                {product.floweringChoises?.map(cat => (
                                    <option value={cat}>{cat}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='place'>
                            <Form.Label><strong>Mesto sadnje</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setPlace(e.target.value)}>
                                <option>{place}</option>
                                {product.placeChoises?.map(cat => (
                                    <option value={cat}>{cat}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label><strong>Brand</strong></Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter brand...'
                                defaultValue={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='high'>
                            <Form.Label><strong>Visina biljke</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setHigh(e.target.value)}>
                                <option>{high}</option>
                                {product.highChoises?.map(cat => (
                                    <option value={cat}>{cat}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='type_plant'>
                            <Form.Label><strong>Tip biljke</strong></Form.Label>
                            <Form.Select aria-label="Default select example"
                                         onChange={(e) => setType(e.target.value)}>
                                <option>{type}</option>
                                {product.type_of_plantChoises?.map(cat => (
                                    <option value={cat}>{cat}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter description'
                                defaultValue={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='primary'>
                            Update Product
                    </Button>

                    </Form>
                )}

        </FormContainer >
    </div>

    )
}

export default ProductEditScreen