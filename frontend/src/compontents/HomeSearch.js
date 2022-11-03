import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import { useDispatch , useSelector } from 'react-redux'
import { listProducts, listFilterProducts } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'
import Search from '../compontents/Search'


function HomeSearch() {

  const dispatch = useDispatch()
  const prod = useSelector(state => state.productList)
  const { error, loading, products } = prod
  const cat = useSelector(state => state.categoryList)
  const { error: catError, loading: carLoading, categories: catProducts } = cat
  const [search, setSearch] = useSearchParams();
  const { id } = useParams();

  const location = useLocation();
  
  return (
    <Col key={category._id} sm={12} md={6} lg={4} xl={3} xs={12} className="d-flex">
                              <Kategorija category={category} />
    </Col>
  )
}

export default HomeSearch