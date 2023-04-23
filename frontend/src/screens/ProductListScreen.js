import React, { useState,useRef,  useEffect} from "react";
import { Link } from 'next/link'
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
import { createProduct,changeStanjeValue, productReset } from '../store/createProduct-actions'

import { MDBInput } from 'mdb-react-ui-kit'
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

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

    const [val, setVal] = useState(null)
    const order_set = useRef(0)

    
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
     
    useEffect(() => {

        setVal(products?.slice().sort((a,b) => a._id - b._id))

    }, [products])

    const deleteHandler = (id) => {
        
        if(window.confirm("Are you sure you want to delete this product?")){

            dispatch(deleteProduct(id))
            dispatch(deleteProductReset())
            dispatch(listProducts())
        }
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }

    const changingValueHandler = async (id, value) => {
        dispatch(changeStanjeValue(id, value))
    }

    const values = products?.slice().sort((a,b) => a._id - b._id)

    const filter = (sort) => {
        
        switch(sort) {
            case 'id':
                
                if(order_set.current){
                    setVal(products?.slice().sort((a,b) => a._id - b._id))
                    order_set.current = !order_set.current
                }else{
                    
                    setVal(products?.slice().reverse((a,b) => a._id - b._id))
                    order_set.current = !order_set.current
                }
              
              break;
            case 'name':
                if(order_set.current){
                    setVal(products?.slice().sort((a,b) => a.name - b.name))
                    order_set.current = !order_set.current
                }else{
                    
                    setVal(products?.slice().reverse((a,b) => a.name - b.name))
                    order_set.current = !order_set.current
                }
                
              break;
            case 'cena':
                if(order_set.current){
                    setVal(products?.slice().sort((a,b) => a.price - b.price))
                    order_set.current = !order_set.current
                }else{
                    
                    setVal(products?.slice().reverse((a,b) => a.price - b.price))
                    order_set.current = !order_set.current
                }
                break;
            case 'stanje':
                if(order_set.current){
                    setVal(products?.slice().sort((a,b) => a.countInStock - b.countInStock))
                    order_set.current = !order_set.current
                }else{
                    
                    setVal(products?.slice().reverse((a,b) => a.countInStock - b.countInStock))
                    order_set.current = !order_set.current
                }
                break;
                
            default:
                setVal(products?.slice().sort((a,b) => a._id - b._id))
          }

    }

    const pretraga = (e) => {
        console.log('Pretraga:', e.target.value)
        let temp = products?.filter(x => x.name?.toLowerCase().includes(e.target.value.toLowerCase()))
        setVal(temp)
    }
    
  return (
    <div>
        <Row className='align-items-center'>
            <Col >
                <h1 style={{color:'green', padding:'2rem'}}>Biljke</h1>
            </Col>
            <Col className='text-right'>
                <Link href={`/admin/createproduct`}>
                    <Button className='btn-success my-3'>
                        <i className='fas fa-plus'></i> Kreiraj Proizvod
                    </Button>
                </Link>     
            </Col>
            <Col className='text-right'>
                {/* <MDBCol md="8">
                    <form className="form-inline mt-4 mb-4">
                        <MDBIcon icon="search" />
                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Pretraga biljaka..." aria-label="Search" onChange={pretraga} />
                    </form>
                </MDBCol> */}
                <MDBCol md="6">
                    <input style={{ border:'1px solid green'}} className="form-control" type="text" placeholder="Pretraga biljaka..." aria-label="Search" onChange={pretraga} />
                </MDBCol>
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
                                    <th>RB</th>
                                    <th onClick={() => filter('id')}>ID</th>
                                    <th onClick={() => filter('name')}>Name</th>
                                    <th onClick={() => filter('cena')}>Cena</th>
                                    <th>Kategorija</th>
                                    <th>Novo</th>
                                    <th>Popust</th>
                                    <th>Boja</th>
                                    <th onClick={() => filter('stanje')}>Stanje</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(val ? val : values)?.map((product, index) => (

                                    <tr key={product._id}>
                                        <td style={{width:'4rem'}}>{index + 1}</td>
                                        <td style={{width:'4rem'}}>{product._id}</td>
                                        <td style={{width:'15rem'}}><strong>{product.name}</strong></td>
                                        <td style={{width:'5rem'}}>{product.price} din</td>
                                        <td style={{width:'20rem'}}>{product.category.map(x => x.name).join(', ')}</td>
                                        <td style={{width:'4rem'}}>{product.novo ?? product.novo ? 'Yes' : 'No'}</td>
                                        <td style={{width:'4rem'}}>{product.popust ?? product.popust ? product.popust : 'No'}</td>
                                        <td style={{width:'20rem'}}>{product.color}</td>
                                        <td style={{ width:'6rem'}}>
                                            {
                                                <MDBInput  id='form1' type='text' defaultValue={product.countInStock} onChange={(e ) => changingValueHandler(product._id, e.target.value)} />
                                                
                                            }</td>
                                        <td style={{width:'5rem'}}><Link href={`/admin/product/${product._id}/edit`}>

                                                <Button variant = 'light' className='btn-sm'>
                                                     <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link></td>
                                        <td style={{width:'5rem'}}>
                                                <Button  className='btn-sm' variant="danger" onClick={(e) => deleteHandler(product._id)}>
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