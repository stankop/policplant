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
import { plantCategories } from '../store/plantCategory-actions'
import { createProduct, productReset } from '../store/createProduct-actions'

function ProductCreateScreen( ) {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0.00)
    const [image, setImage] = useState('')
    const [color, setColor] = useState('')
    const [place, setPlace] = useState('')
    const [flow, setFlow] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [high, setHigh] = useState('')
    const [type_of_plant, setType] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoryList = useSelector(state => state.categoryList)
    const { loading: categoryLoading, categories , error: categoryError } = categoryList

    useEffect(() => {
        
        dispatch(plantCategories())  

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
            description
        }))

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
                                    placeholder='Enter image'
                                    defaultValue={image}
                                   
                                >
                                </Form.Control>

                                <Form.Control
                                    controlid="image-file"
                                    type='file'
                                    label="Izaberite sliku:"
                                    
                                    onChange={async (e) =>  uploadFileHandler(e)}
                                > 

                                </Form.Control>  
                                {uploading && <Loader />}

                            </Form.Group>


                            <Form.Group controlId='color'>
                                <Form.Label><strong>Boja</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setColor(e.target.value)}>
                                    <option>Odaberite boju cveca...</option>
                                    {categories?.color?.map(col => (
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
                                    {categories?.categories?.map(cat => (
                                        <option value={cat.name}>{cat.name}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='flow'>
                                <Form.Label><strong>Vreme cvetanja</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setFlow(e.target.value)}>
                                    <option>Odaberi vreme cvetanja...</option>
                                    {categories?.flowering_time?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='place'>
                                <Form.Label><strong>Mesto sadnje</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setPlace(e.target.value)}>
                                    <option>Odaberi mesto sadnje...</option>
                                    {categories?.place_of_planting?.map(cat => (
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
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductCreateScreen