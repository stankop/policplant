import React, { useState, useEffect} from "react";
import { Link } from 'next/link'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { userActions } from "../store/user_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { listUsers } from '../store/userList-actions' 
import { deleteUser, deleteUserReset } from '../store/userDelete-actions'
import {  userDetailsReset } from '../store/userDetails-actions'

function UserListScreen() {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const uDelete = useSelector(state => state.userDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = uDelete

    const navigate = useNavigate()

    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
            dispatch(userDetailsReset())
        }else{
            navigate('/login')
        }
       

    }, [dispatch, navigate ])

    const deleteHandler = (id) => {

        if(window.confirm("Are you sure you want to delete this user?")){

            dispatch(deleteUser(id))
            dispatch(deleteUserReset())
            dispatch(listUsers())
        }    
    }

  return (
    <div>
        <h1>Users</h1>
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
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map(user => (

                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green'}}></i>
                                        ) : <i className='fas fa-check' style={{ color: 'red'}}></i>}</td>
                                        <td><Link href={`/admin/user/${user._id}/edit`}>

                                                <Button variant = 'light' className='btn'>
                                                     <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button  className='btn' onClick={(e) => deleteHandler(user._id)}>
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

export default UserListScreen