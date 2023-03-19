import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {  Button, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import FormContainer from '../compontents/FormContainer'
import { listProducts, productDetails } from '../store/product-actions'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { updateProduct, updateProductReset } from '../store/updateProduct-actions'
import { listCategories } from '../store/category-actions'
import { createProduct, productReset } from '../store/createProduct-actions'
import Select from 'react-select';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesGallery from '../compontents/UI/Image/ImageGallery'
import Gallery from "react-photo-gallery";
import { arrayMove } from 'react-sortable-hoc';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "../compontents/Photo";
import {arrayMoveImmutable} from 'array-move';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

toast.configure()

const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
        <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
    
    ));

function ProductCreateScreen( ) {

    const [name, setName] = useState('')
    const [hesteg, setHesteg] = useState('')
    const [images, setImage] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [color, setColor] = useState('')
    const [mesto_sadnje, setMestoSadnje] = useState([])
    const [place, setPlace] = useState('')
    const [vre_cve, setVremeCvetanja] = useState([])
    const [orezivanje, setOrezivanje] = useState('')
    const [privlaci_insekte, setPrivlaciInsekte] = useState('')
    const [brzina_rasta, setBrzinaRasta] = useState('')
    const [prezimljava, setPrezimljava] = useState('')
    const [botanicki_naziv, setBotanickiNaziv] = useState('')
    const [high, setHigh] = useState('')
    const [velicina_slanja, setVelicinaSlanja] = useState('')
    const [type, setType] = useState('')
    const [sirina_biljke, setSirinaBiljke] = useState('')
    const [category, setCategory] = useState('Četinari')
    const [items, setItems] = useState([]);
    const [prodajno_mesto, setProdajnoMesto] = useState(false)
    const [novo, setNovo] = useState(false)
    const [popust, setPopust] = useState(null)

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const categoryList = useSelector(state => state.categoryList)
    const { loading: categoryLoading, categories , allcategories, error: categoryError } = categoryList

    
    const inputName = useRef();
    const inputHesh = useRef();

    const handleMultipleImages =(evnt)=>{
        const selectedFIles =[];
        const targetFiles = evnt.target.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file)=>{
           return selectedFIles.push(URL.createObjectURL(file))
        })
        
        setImage(evnt.target.files)
        const photos = selectedFIles?.map(image => {
              return {
                  src:image,
                  width:1,
                  height:1
              }
        })
        
        setItems(photos)
    }

    function checkPress(e){
        
        if(e.key === 'Enter'){

            inputHesh.current.focus()
        }
    }

    useEffect(() => {
        
        dispatch(listCategories()) 
        
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct({
            name,
            botanicki_naziv,
            hesteg,
            vre_cve,
            orezivanje,
            privlaci_insekte,
            brzina_rasta,
            prezimljava,
            sirina_biljke,
            velicina_slanja,
            price,
            countInStock,
            description,
            color,
            mesto_sadnje,
            place,
            type,
            high,
            category,
            prodajno_mesto,
            novo,
            popust  
        }, images))
        navigate('/admin/productlist')
        notify()
    }

    const notify = ()=>{
 
        toast.success('Uspesno kreiranje Biljke',
           {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
    }

    const createProductHandler = () => {

        dispatch(createProduct())
    }

    const uploadFileHandler = async (e) => {

         const file = e.target.files[0]
        
         const formData = new FormData()

         formData.append('image', file)

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

    const handleChange = (e) => {
        
        setVremeCvetanja(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleChange_Mesto = (e) => {
        
        setMestoSadnje(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleChange2 = (e) => {
        
        setCategory(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    
    const data = allcategories?.vre_cve?.map(x => {
        return {
            value:x,
            label:x
        }
    })

    const data2 = categories?.map(x => {
        return {
            value:x.name,
            label:x.name
        }
    })

    const mesta_sadnje = allcategories?.mesto_sadnje?.map(x => {
        return {
            value:x,
            label:x
        }
    })

    // {prevImages && console.log('prevImages:', prevImages)}

    // const photos = prevImages?.map(image => {
    //      return {
    //         src:image,
    //          width:4,
    //         height:3
    //      }
    // })
    // {photos && console.log('photos:', photos)}

    const onSortEnd = ({ oldIndex, newIndex }) => {
        
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setImage(arrayMoveImmutable(images, oldIndex, newIndex));
  };

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-success my-3'>
                Nazad
            </Link>

            <FormContainer>
                <h1 style={{color:'green'}}>Kreiranje biljke</h1>
                {categoryLoading && <Loader />}
                {categoryError && <Message variant='danger'>{categoryError}</Message>} 

                {categoryLoading ? <Loader /> : categoryError ? <Message variant='danger'>{categoryError}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label><strong>NAME</strong></Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder=''
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyPress={(e) => checkPress(e)}
                                    ref={inputName}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='botanicki_naziv'>
                                <Form.Label><strong>BOTANICKI NAZIV</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={botanicki_naziv}
                                    onChange={(e) => setBotanickiNaziv(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='hesteg'>
                                <Form.Label><strong>HESTEG</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={hesteg}
                                    onChange={(e) => setHesteg(e.target.value)}
                                    ref={inputHesh}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='prodajno_mesto' className="mb-3">
                                <Form.Label><strong>NA PRODAJNOM MESTU</strong></Form.Label>
                                
                                <Form.Check 
                                    isValid
                                    type='checkbox'
                                    id='prodaja'
                                    onChange={(e) => setProdajnoMesto(e.target.checked)}
                                />
                               
                            </Form.Group>

                            <Form.Group controlId='novo' className="mb-3">
                                <Form.Label><strong>NOVO</strong></Form.Label>
                                
                                <Form.Check 
                                    isValid
                                    type='checkbox'
                                    id='novo'
                                    onChange={(e) => setNovo(e.target.checked)}
                                />
                               
                            </Form.Group>

                            <Form.Group controlId='popust' className="mb-3">
                                {/* <Form.Label><strong>NOVO</strong></Form.Label> */}
                                
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group" color='success'><strong>POPUST</strong></FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={popust}
                                        onChange={(e) => setPopust(e.target.value)}
                                        row
                                        color="success"
                                    >
                                        <FormControlLabel value="0" control={<Radio color="success"/>} label="0%" />
                                        <FormControlLabel value="10" control={<Radio color="success"/>} label="10%" />
                                        <FormControlLabel value="20" control={<Radio color="success"/>} label="20%" />
                                        <FormControlLabel value="30" control={<Radio color="success"/>} label="30%" />
                                    </RadioGroup>
                                </FormControl>
                               
                            </Form.Group>

                            

                            {/* <Form.Group controlId='popust'>
                                <Form.Label><strong>POPUST</strong></Form.Label>
                                
                                <div key='radio' className="mb-3">
                                    <Form.Check 
                                        inline
                                        label="10%"
                                        name="group1"
                                        type='radio'
                                        id='10'
                                        onChange={(e) => setPopust(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="20%"
                                        name="group1"
                                        type='radio'
                                        id='20'
                                        onChange={(e) => setPopust(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        name="group1"
                                        label="30%"
                                        type='radio'
                                        id='30'
                                        onChange={(e) => setPopust(e.target.value)}
                                    />
                                    </div>
                               
                            </Form.Group> */}

                            <Form.Group controlId='image'>
                                <Form.Label><strong>IMAGES</strong></Form.Label>
                                {/* <Form.Control

                                    type='text'
                                    placeholder='Enter image...'
                                    defaultValue={image}
                                   
                                >
                                </Form.Control> */}
                                
                                <Form.Control
                                    controlid="image-file"
                                    type='file'
                                    multiple="multiple"
                                    // onChange={(e) =>  setImage(e.target.files)}
                                    onChange={handleMultipleImages}
                                    style={{ marginBottom:'.5rem'}}
                                > 

                                </Form.Control>
                                
                                {/* <ImagesGallery  images={prevImages} /> */}
                                <Row>
                                    <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
                                </Row>
                                {uploading && <Loader />}

                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label><strong>DESCRIPTION</strong></Form.Label>
                                <Form.Control
                                    as="textarea" rows={5}
                                    type='textarea'
                                    placeholder=''
                                    defaultValue={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label><strong>CENA</strong></Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder=''
                                    defaultValue=''
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label><strong>STANJE</strong></Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder=''
                                    defaultValue=''
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='color'>
                                <Form.Label><strong>BOJA</strong></Form.Label>
                                <Form.Control
                                             
                                             type='text'
                                             placeholder=''
                                             defaultValue=''
                                             onChange={(e) => setColor(e.target.value)}>
                                    
 
                                </Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='mesto_sadnje'>
                                <Form.Label><strong>MESTO SADNJE</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setMestoSadnje(e.target.value)}>
                                    <option></option>
                                    {allcategories?.mesto_sadnje?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='mesto_sadnje'>
                                <Form.Label><strong>MESTO SADNJE</strong></Form.Label>
                                <Select aria-label="Default select example"
                                             isMulti
                                             
                                             isClearable
                                             className="dropdown"
                                             placeholder="Select Option"
                                             value={mesta_sadnje?.filter(obj => mesto_sadnje?.includes(obj.value))}
                                             closeMenuOnSelect={false}
                                             options={mesta_sadnje}
                                             onChange={handleChange_Mesto}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>

                            <Form.Group controlId='type_plant'>
                                <Form.Label><strong>TIP BILJKE</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setType(e.target.value)}>
                                    <option></option>
                                    {allcategories?.type_of_plant?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            {/* <Form.Group controlId='place'>
                                <Form.Label><strong>Mesto(2) sadnje</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setPlace(e.target.value)}>
                                    <option></option>
                                    {allcategories?.place_of_planting?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='vreme_cvetanja'>
                                <Form.Label><strong>VREME CVETANJA</strong></Form.Label>
                                <Select aria-label="Default select example"
                                             isMulti
                                             
                                             isClearable
                                             className="dropdown"
                                             placeholder="Select Option"
                                             value={data?.filter(obj => vre_cve?.includes(obj.value))}
                                             closeMenuOnSelect={false}
                                             options={data}
                                             onChange={handleChange}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>

                            <Form.Group controlId='orezivanje'>
                                <Form.Label><strong>OREZIVANJE:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setOrezivanje(e.target.value)}>
                                    <option></option>
                                    {allcategories?.orezivanje?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='privlaci_insekte'>
                                <Form.Label><strong>MEDONOSNA:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setPrivlaciInsekte(e.target.value)}>
                                    <option></option>
                                    {allcategories?.privlaci_insekte?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='brzina_rasta'>
                                <Form.Label><strong>BRZINA RASTA</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             onChange={(e) => setBrzinaRasta(e.target.value)}>
                                    <option></option>
                                    {allcategories?.brzina_rasta?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='prezimljava'>
                                <Form.Label><strong>PREZIMLJAVA</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={prezimljava}
                                    onChange={(e) => setPrezimljava(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='botanicki_naziv'>
                                <Form.Label><strong>BOTANICKI NAZIV</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={botanicki_naziv}
                                    onChange={(e) => setBotanickiNaziv(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group> */}

                            <Form.Group controlId='high'>
                                <Form.Label><strong>VISINA:</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={high}
                                    onChange={(e) => setHigh(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='sirina_biljke'>
                                <Form.Label><strong>SIRINA:</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={sirina_biljke}
                                    onChange={(e) => setSirinaBiljke(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='velicina_slanja'>
                                <Form.Label><strong>ISPORUKA:</strong></Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder=''
                                    defaultValue={velicina_slanja}
                                    onChange={(e) => setVelicinaSlanja(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            


                            <Form.Group controlId='category2'>
                                <Form.Label><strong>KATEGORIJA</strong></Form.Label>
                                <Select aria-label="Default select example"
                                             isMulti
                                             required
                                             isClearable
                                             className="dropdown"
                                             placeholder="Select Option"
                                             value={data2?.filter(obj => category?.includes(obj.value))}
                                             closeMenuOnSelect={false}
                                             options={data2}
                                             onChange={handleChange2}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>

                            <Button type='submit' variant='success' className='my-3'>
                                Kreiraj biljku
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductCreateScreen