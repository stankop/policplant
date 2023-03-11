import React, { useState, useEffect, useRef, useMemo  } from 'react'
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
import { updateProduct, updateProductReset, updateProductDetails } from '../store/updateProduct-actions'
import { listCategories } from '../store/category-actions'
import Select from 'react-select';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from "react-photo-gallery";
import { arrayMove } from 'react-sortable-hoc';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "../compontents/Photo";
import {arrayMoveImmutable} from 'array-move';
toast.configure()


function ProductEditScreen( ) {

    const { id } = useParams();
    const productId = id;

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
    const [category, setCategory] = useState([])
    const [items, setItems] = useState([]);
    const [flick, setFlick] = useState(false);

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const categoryList = useSelector(state => state.categoryList)
    const { loading: categoryLoading, categories , allcategories, error: categoryError } = categoryList

    const productUpd = useSelector(state => state.updateProduct)
    const { error, loading, success, product } = productUpd

    const prod = useSelector(state => state.product)
    const { product: prodProduct,  success : prodSuccess} = prod

    const ukupno = useRef([])

    const SortablePhoto = SortableElement(item => <Photo {...item} />);
    const SortableGallery = SortableContainer(({ items }) => (
            <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
        
        ));

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
        const newItems = items?.map(image => {
            return {
                src:image.src,
                width:1,
                height:1
            }
        })
        setItems([...newItems, ...photos])
    }

    useEffect(() => {
        
        dispatch(listCategories()) 
        
    }, [dispatch])

    useEffect(() => {
        console.log('Renderovanje')
        if(success){
            const prvaSlika =  Array.from(product?.images).findLast(x => x.order === 0)
           
            const targetFilesObject= Array.from([...product?.images])?.sort((x, y) => x.order - y.order).map(image => {
                return {
                    image: image?.image,
                    id: image?.id
                }
            })
            const targetFilesObjectWithoutLast = targetFilesObject?.filter(x => x?.id !== prvaSlika?.id)
            if(prvaSlika){
                targetFilesObjectWithoutLast.unshift({image: prvaSlika?.image, id: prvaSlika?.id})
            }

        const photos = [...new Set(targetFilesObjectWithoutLast)]?.map(image => {
              return {
                  src:image.image,
                  id:image.id,
                  width:1,
                  height:1
              }
        })
        setItems(photos) 
        }   
    }, [success,product?.name, product?.images])

    useEffect(() => {
        
        dispatch(updateProductDetails(id))

        
        if(success){
            console.log('Flicking')
            //dispatch(updateProductReset())
            //navigate(`/admin/productlist`)
            setName(product.name)
            setHesteg(product.hesteg)
            setPrice(product.price)
            setImage(product.images)
            setColor(product.color)
            setPlace(product.place_of_planting)
            setMestoSadnje(product.mesto_sadnje)
            setCategory(product.category?.map(x => x.name))
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setHigh(product.high)
            setType(product.type_of_plant)
            setVremeCvetanja(product.vre_cve)
            setOrezivanje(product.orezivanje)
            setPrivlaciInsekte(product.privlaci_insekte)
            setBrzinaRasta(product.brzina_rasta)
            setPrezimljava(product.prezimljava)
            setBotanickiNaziv(product.botanicki_naziv)
            setVelicinaSlanja(product.velicina_slanja)
            setSirinaBiljke(product.sirina_biljke)
        }  
        
    }, [dispatch, navigate, product?.name, success, prodSuccess])

    const notify = ()=>{
 
        toast.success('Uspesno editovanje Biljke',
           {position: toast.POSITION.TOP_RIGHT, autoClose:3000})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        ukupno.current = items
        dispatch(updateProduct({
            _id:id,
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
            category
        },images))
        setItems(ukupno.current)
        // setImage(ukupno.current.map((index,item) => {
        //     return {
        //         id:item.id,
        //         image:item.src,
        //         order: index,
        //         product:id
        //     }
        // }))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          })
        notify()
        setImage([])
    }


    const uploadFileHandler = async (e) => {
         const file = e.target.files[0]
         
         const formData = new FormData()

         formData.append('image', file)
         formData.append('product_id', id)

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

    const handleChange_mesto_sadnje = (e) => {
        
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

    const data_mesto_sadnje = allcategories?.mesto_sadnje?.map(x => {
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


    const onSortEnd = ({ oldIndex, newIndex},e) => {

        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setImage(arrayMoveImmutable(Array.from(items?.map((item, index) => {
            return {
                id: item.id,
                image: item.src,
                order:index,
                product: id
            }
        })), oldIndex, newIndex));
        console.log('Items sort order', items);
        console.log('Image sort order', images);
    };

    const memoizedImageCard = useMemo(() => {
        return (
            <Row>
                <SortableGallery items={items}   onSortEnd={onSortEnd} axis={"xy"} />
            </Row>
        )
    },[items]);

    return (
        <div className="ProductEditScreen"
            onContextMenu={(e) => {
            e.preventDefault(); // prevent the default behaviour when right clicked
            const image = JSON.stringify(e.target.src)
            const newItems = items.filter(item => JSON.stringify(item.src) !== image)
            setItems(newItems)
            console.log('Items:', newItems)
            const newImages= newItems.map((item, index) => {
                return {
                    image: item.src,
                    order: index,
                    product: id,
                    id: item.id
                }
            })
            console.log('Images:', newImages)
            setImage(newImages)
            setFlick(true)
            // const slanje= []
            // newImages.forEach(x => {
            //     var file = new File(["hello"], x.image
            //     , {type:"image/png", lastModified: new Date().getTime()})
            //     slanje.append(file)
            // })
            // console.log('Za slanje:', slanje)
        }}>
        <Link to={-1}> 
            Nazad
        </Link>

        <FormContainer>
            <h1>Edituj Biljku</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>} 

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>

                            <Form.Group controlId='id'>
                                <Form.Label><strong>ID</strong></Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder=''
                                    defaultValue={id}
                                    disabled
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='name'>
                                <Form.Label><strong>NAME</strong></Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder=''
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                >
                                </Form.Control>
                            </Form.Group>

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
                                {memoizedImageCard} 
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
                                    defaultValue={price}
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
                                    defaultValue={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='color'>
                                <Form.Label><strong>BOJA</strong></Form.Label>
                                <Form.Control
                                             
                                             type='text'
                                             placeholder=''
                                             defaultValue={color}
                                             onChange={(e) => setColor(e.target.value)}>
                                    
 
                                </Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='mesto_sadnje'>
                                <Form.Label><strong>MESTO SADNJE</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={mesto_sadnje}
                                             onChange={(e) => setMestoSadnje(e.target.value)}>
                                    <option>{mesto_sadnje}</option>
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
                                             closeMenuOnSelect={false}
                                             minMenuHeight={5}
                                             openMenuOnFocus={true}
                                             value={data_mesto_sadnje?.filter(obj => mesto_sadnje?.includes(obj.value))}
                                             options={data_mesto_sadnje}
                                             onChange={handleChange_mesto_sadnje}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>

                            {/* <Form.Group controlId='type_plant'>
                                <Form.Label><strong>TIP BILJKE</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={type}
                                             onChange={(e) => setType(e.target.value)}>
                                    <option>{type}</option>
                                    {!allcategories ? [...Array.from(...allcategories?.type_of_plant), ""]?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    )) : []}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='type_plant'>
                                <Form.Label><strong>TIP BILJKE</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={type}
                                             onChange={(e) => setType(e.target.value)}>
                                    <option key={0}>{type}</option>
                                    {allcategories?.type_of_plant?.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='vreme_cvetanja'>
                                <Form.Label><strong>VREME CVETANJA</strong></Form.Label>
                                <Select aria-label="Default select example"
                                             isMulti
                                             
                                             isClearable
                                             className="dropdown"
                                             placeholder="Select Option"
                                             closeMenuOnSelect={false}
                                             minMenuHeight={5}
                                             openMenuOnFocus={true}
                                             value={data?.filter(obj => vre_cve?.includes(obj.value))}
                                             options={data}
                                             onChange={handleChange}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>


                            {/* <Form.Group controlId='orezivanje'>
                                <Form.Label><strong>OREZIVANJE:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={orezivanje}
                                             onChange={(e) => setOrezivanje(e.target.value)}>
                                    <option>{orezivanje}</option> 
                                    {!allcategories ? [...Array.from(allcategories?.orezivanje), ""]?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    )) : []}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='orezivanje'>
                                <Form.Label><strong>OREZIVANJE:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={orezivanje}
                                             onChange={(e) => setOrezivanje(e.target.value)}>
                                    <option key={0}>{orezivanje}</option> 
                                    {allcategories?.orezivanje?.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>   

                            {/* <Form.Group controlId='privlaci_insekte'>
                                <Form.Label><strong>MEDONOSNA:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={privlaci_insekte}
                                             onChange={(e) => setPrivlaciInsekte(e.target.value)}>
                                    <option>{privlaci_insekte}</option> 
                                    {!allcategories ? [...Array.from(allcategories?.privlaci_insekte), ""]?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    )): []}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='privlaci_insekte'>
                                <Form.Label><strong>MEDONOSNA:</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={privlaci_insekte}
                                             onChange={(e) => setPrivlaciInsekte(e.target.value)}>
                                    <option key={0}>{privlaci_insekte}</option> 
                                    {allcategories?.privlaci_insekte?.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
 
                                </Form.Select>
                            </Form.Group>

                            {/* <Form.Group controlId='brzina_rasta'>
                                <Form.Label><strong>BRZINA RASTA</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={brzina_rasta}
                                             onChange={(e) => setBrzinaRasta(e.target.value)}>
                                    <option>{brzina_rasta}</option>
                                    {!allcategories ? [...Array.from(allcategories?.brzina_rasta),""]?.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    )): []}
 
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group controlId='brzina_rasta'>
                                <Form.Label><strong>BRZINA RASTA</strong></Form.Label>
                                <Form.Select aria-label="Default select example"
                                             defaultValue={brzina_rasta}
                                             onChange={(e) => setBrzinaRasta(e.target.value)}>
                                    <option key={0}>{brzina_rasta}</option>
                                    {allcategories?.brzina_rasta?.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
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
                                             minMenuHeight={5}
                                             openMenuOnFocus={true}
                                             options={data2}
                                             onChange={handleChange2}>
                                             {/* onChange={(e) => setVremeCvetanja(e.target.value)}> */}
                                    {/* <option>Tip biljke...</option> */}
                                    {/* {allcategories?.vre_cve?.map((cat, i) => (
                                        <option value={cat}>{cat}</option>
                                    ))} */}
 
                                </Select>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Edituj Biljku
                        </Button>

                        </Form>
                )}

        </FormContainer >
        </div>

    )
}

export default ProductEditScreen