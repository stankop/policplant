import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../compontents/Loader";
import Message from "../compontents/Message";
import FormContainer from "../compontents/FormContainer";
import { userActions } from "../store/user_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { getUserDetails } from "../store/userDetails-actions";
import { updateUser, updateUserReset } from "../store/userUpdate-actions";

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams()
  const userId = id
    console.log('ovako:', userId)
    
  const userDetails = useSelector((state) => state.userDetails);
  const { user, error, loading } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: errorUpdate, loading: loadingUpdate , success: successUpdate} = userUpdate;

  console.log('ovo je user id:', user._id)
  console.log('ovo je user name:', user.name)
  useEffect(() => {


        if(successUpdate){
            dispatch(updateUserReset())
            navigate('/admin/userlist')
            
        }else{

            if(!user.name || user._id !== Number(userId)){
                console.log('********************')
                dispatch(getUserDetails(id))
            }else{
                console.log('++++++++++++++++++++++')
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        }
    
        

  }, [dispatch, user, userId, successUpdate, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({
        _id: user._id,
        name: name,
        email: email,
        isAdmin: isAdmin
    }))
    
  };

  return (
    <div>

        <Link to='/admin/userlist'>
        Go Back
        </Link>
      <FormContainer>
        <h1>Edit User</h1>
        { loadingUpdate && <Loader></Loader>}
        { errorUpdate && <Message variant= 'danger'>{errorUpdate}</Message>}
        { loading ?  <Loader></Loader> 
                  : error
                  ?  <Message variant= 'danger'>{error}</Message>
                  : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>Ime</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Unesite Ime..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
          
                    <Form.Group controlId="email">
                      <Form.Label>Email Adresa</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Unesite Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
          
                    <Form.Group controlId="isAdmin">
                      <Form.Check
                        type="checkbox"
                        label="IsAdmin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>
          
                    
          
                    <Button type="sumbit" varaiant="primary">
                      Update
                    </Button>
                  </Form>) }

        
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
