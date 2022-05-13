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


function ProductEditScreen( ) {

    const { id } = useParams();
    const productId = id;

        console.log('ovo je product id:', productId)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetail = useSelector(state => state.product)
    const { loading, product, error } = productDetail

    const productUpd = useSelector(state => state.updateProduct)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpd


    useEffect(() => {

        if(successUpdate){
            dispatch(updateProductReset())
            navigate(`/admin/productlist`)
        }else{

            if(!product.name || product._id !== Number(productId)){
                console.log('********************')
                dispatch(productDetails(productId))
            }else{
                console.log('++++++++++++++++++++++')
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

           

    }, [dispatch, product , productId,navigate,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description

        }))

    }

    const uploadFileHandler = async (e) => {
         const file = e.target.files[0]
         console.log('sta je ovo:', file)
         const formData = new FormData()

         formData.append('image', file)
         formData.append('product_id', productId)

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
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} 

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


                            <Form.Group controlId='brand'>
                                <Form.Label><strong>Boja</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    defaultValue={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
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
                                    <option value="Lekovito Bilje">Lekovito Bilje</option>
                                    <option value="Cvetnice">Cvetnice</option>
                                    <option value="Bobicasto Voce">Bobicasto Voce</option>
                                    <option value="Penjacice">Penjacice</option>
                                    <option value="Zelena Biljka">Zelena Biljka</option>
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

export default ProductEditScreen