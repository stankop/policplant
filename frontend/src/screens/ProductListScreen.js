import React, { useState, useEffect} from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import Paginate from '../compontents/Paginate'
import  FormContainer  from '../compontents/FormContainer'
import { userActions } from "../store/user_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { listUsers } from '../store/userList-actions' 
import { listProducts } from '../store/product-actions'
import { deleteProduct, deleteProductReset } from '../store/deleteProduct-actions'
import { createProduct, productReset } from '../store/createProduct-actions'

function ProductListScreen() {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products,page, pages} = productList

    const deleteProd = useSelector(state => state.deleteProduct)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = deleteProd

    const crProd = useSelector(state => state.createProduct)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = crProd

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

 

    const navigate = useNavigate()

    useEffect(() => {

         if(!userInfo.isAdmin){
             navigate('/login')
            
         }

         if(successCreate){

            dispatch(productReset())
            navigate(`/admin/product/${createdProduct._id}/edit`)
              
          }else{
            dispatch(listProducts())
          }
       

     }, [dispatch, navigate, userInfo, successDelete, successCreate , createdProduct])

    const deleteHandler = (id) => {
        
        if(window.confirm("Are you sure you want to delete this user?")){

            dispatch(deleteProduct(id))
            dispatch(deleteProductReset())
            console.log('odstampaj ovo!!!')
            dispatch(listProducts())
        }
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }
  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Biljke</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={(e) => createProductHandler()}>
                    <i className='fas fa-plus'></i> Kreiraj Proizvod
                </Button>
            </Col>

        </Row>

        { loadingDelete && <Loader></Loader>}
        { errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        
        { loadingCreate && <Loader></Loader>}
        { errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading 
                ? (
                    <Loader>

                    </Loader>
                ) 
                : error ? (
                            <Message variant='danger'>
                                    {error}
                            </Message>)
                        : (

                    <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>Cena</th>
                                    <th>Kategorija</th>
                                    <th>Brand</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (

                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} din</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td><LinkContainer to={`/admin/product/${product._id}/edit`}>

                                                <Button variant = 'light' className='btn-sm'>
                                                     <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer></td>
                                        <td>
                                                <Button  className='btn-sm' onClick={(e) => deleteHandler(product._id)}>
                                                     <i className='fas fa-trash'></i>
                                                </Button></td>
                                        </tr>

                                ))}
                            </tbody>
                    </Table>

                )}

    </div>
  )
}

export default ProductListScreen