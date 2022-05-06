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

function ProductListScreen() {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products,page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

 

    const navigate = useNavigate()

    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            navigate('/login')
        }
       

    }, [dispatch, navigate, userInfo ])

    const deleteHandler = (id) => {

        // if(window.confirm("Are you sure you want to delete this user?")){

        //     dispatch(deleteUser(id))

        // } 
    
    }

    const createProductHandler = (product) => {


    }
  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Proizvodi</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Kreiraj Proizvod
                </Button>
            </Col>

        </Row>


        
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
                                    <th>Price</th>
                                    <th>Category</th>
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
                                                <Button  className='btn-sm' onClick={deleteHandler(product._id)}>
                                                     <i className='fas fa-trash'></i>
                                                </Button>
                                    </tr>

                                ))}
                            </tbody>
                    </Table>

                )}

    </div>
  )
}

export default ProductListScreen