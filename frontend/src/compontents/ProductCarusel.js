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

    const slike = [
        { 
            id: 1,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/ogrod-angielski-sciezka.png',
            name: 'amazonska suma'
        },
        {
            id:2,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/jesenji+izgled.jpg',
            name: 'borova suma'
        }]
    useEffect(() => {
        //dispatch(caruselTop())
    }, [dispatch])
  return (
    
    loading ? <Loader></Loader> 
            : error ? <Message variant='danger'>

            </Message>
            : (
                <Carousel pause='hover'  wrap >
                    {slike.map(product => (
                        <Carousel.Item key={product.id} style={{objectFit: 'cover'}}>
                            <div>
                                <Image src={product.src} className="d-block w-100" roundedCircle={false} ></Image>
                            </div>
                             

                        </Carousel.Item>
                    ))}
                </Carousel>
            )
  )
}

export default ProductCarusel