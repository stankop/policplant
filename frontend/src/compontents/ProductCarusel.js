import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { caruselTop } from '../store/carusel-actions'

function ProductCarusel() {

    const dispatch = useDispatch()
    const productTop = useSelector(state => state.carusel)
    const { loading, error, products} = productTop

    useEffect(() => {
        dispatch(caruselTop())
    }, [dispatch])
  return (
    
    loading ? <Loader></Loader> 
            : error ? <Message variant='danger'>

            </Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid>

                                </Image>
                                <Carousel.Caption className='carusel.caption'>
                                    <h4>{product.name} ({product.price} din)</h4>
                                </Carousel.Caption>

                            </Link>

                        </Carousel.Item>
                    ))}
                </Carousel>
            )
  )
}

export default ProductCarusel