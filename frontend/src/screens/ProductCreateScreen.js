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
import { updateProduct, updateProductReset } from '../store/updateProduct-actions'
import { listCategories } from '../store/category-actions'
import { createProduct, productReset } from '../store/createProduct-actions'

function ProductCreateScreen( ) {

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
    const navigate = useNavigate();

    const categoryList = useSelector(state => state.categoryList)
    const { loading: categoryLoading, categories , allcategories, error: categoryError } = categoryList

    useEffect(() => {
        
        dispatch(listCategories())  

    }, [dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct({
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
        }, image))
        navigate('/admin/productlist')
        console.log('Ovde treba da ide na product list')
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }

    const uploadFileHandler = async (e) => {

         const file = e.target.files[0]
        
         const formData = new FormData()

         formData.append('image', file)

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
                {categoryLoading && <Loader />}
                {categoryError && <Message variant='danger'>{categoryError}</Message>} 

                {categoryLoading ? <Loader /> : categoryError ? <Message variant='danger'>{categoryError}</Message>
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
                                    
                                    onChange={(e) =>  setImage(e.target.files[0])}
                                > 

                                </Form.Control>  
                                {uploading && <Loader />}

                            </Form.Group>


                            <Form.Group controlId='color'>
                                <Form.Label><strong>Boja</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setColor(e.target.value)}>
                                    <option>Odaberite boju cveca...</option>
                                    {allcategories?.color?.map(col => (
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

                            <Form.Group controlId='category'>
                                <Form.Label><strong>Kategorija</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setCategory(e.target.value)}>
                                    <option>Odaberi kategoriju cveca...</option>
                                    {categories?.map(cat => (
                                        <option value={cat.name}>{cat.name}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='flow'>
                                <Form.Label><strong>Vreme cvetanja</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setFlow(e.target.value)}>
                                    <option>Odaberi vreme cvetanja...</option>
                                    {allcategories?.flowering_time?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='place'>
                                <Form.Label><strong>Mesto sadnje</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setPlace(e.target.value)}>
                                    <option>Odaberi mesto sadnje...</option>
                                    {allcategories?.place_of_planting?.map(cat => (
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
                                    <option>Visina biljke...</option>
                                    {allcategories?.high?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='type_plant'>
                                <Form.Label><strong>Tip biljke</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setType(e.target.value)}>
                                    <option>Tip biljke...</option>
                                    {allcategories?.type_of_plant?.map(cat => (
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
                                Create Product
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductCreateScreen