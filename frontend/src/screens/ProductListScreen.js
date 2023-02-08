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
import { Link } from 'react-router-dom';

function ProductListScreen() {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const deleteProd = useSelector(state => state.deleteProduct)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = deleteProd

    const createProd = useSelector(state => state.createProduct)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = createProd

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate()

    
    useEffect(() => {

         if(!userInfo.isAdmin){
             navigate('/login')
            
         }
         window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          })
         if(successCreate){

            // const productId = createdProduct._id
            // dispatch(productReset())
            // navigate(`/admin/product/${productId}/edit`)
              
          }else{
            dispatch(listProducts())
          }
       

     }, [dispatch, navigate, userInfo, successDelete, successCreate])
     

    const deleteHandler = (id) => {
        
        if(window.confirm("Are you sure you want to delete this user?")){

            dispatch(deleteProduct(id))
            dispatch(deleteProductReset())
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
                <LinkContainer to={`/admin/createproduct`}>
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i> Kreiraj Proizvod
                    </Button>
                </LinkContainer>     
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
                                    <th>Name</th>
                                    <th>Cena</th>
                                    <th>Kategorija</th>
                                    <th>Boja</th>
                                    <th>Stanje</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (

                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} din</td>
                                        <td>{product.category.map(x => x.name).join(', ')}</td>
                                        <td>{product.color}</td>
                                        <td style={{whiteSpace: "nowrap"}}>{product.countInStock}</td>
                                        <td><Link to={`/admin/product/${product._id}/edit`}>

                                                <Button variant = 'light' className='btn-sm'>
                                                     <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link></td>
                                        <td>
                                                <Button  className='btn-sm' onClick={(e) => deleteHandler(product._id)}>
                                                     <i className='fas fa-trash'></i>
                                                </Button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                    </Table>

                )}

    </div>
  )
}

export default ProductListScreen