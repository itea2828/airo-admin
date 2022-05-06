
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from 'axios';
// import BASE_URL from 'utils/baseUrl';
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


function NewsDetail() {
  
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [order, setOrder] = useState({})


    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [newImg, setNewImg] = useState(null)
    const [description, setDescription] = useState('')



  // Orders /////// //////////////////////
  const getOrder = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`https://airobike.unotaxi.xyz/api/v1/news/${params.id}/`, config)
        .then(res => {
            const o = res.data;
            // console.log(`orders =`, orders)
            setOrder(o)
            setTitle(o.title)
            setDescription(o.description)
            setImage(o.image)

            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setOrder({})
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  const [categories, setCategories] = useState([])
  const [fcategories, setFcategories] = useState([])



    useEffect(() => {
        getOrder();
    }, [])





    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        setNewImg(file)
        console.log('file', image)
    }

//   UPDATE 
  // Товары /////// //////////////////////
  const putProduct = async (e) => {
    e.preventDefault()
    try {

        let formData = new FormData();
        formData.append("user", 1);
        if(newImg != null) {
            formData.append("image", newImg);
        }

        formData.append("title", title);
        formData.append("description", description);
        
        

        const token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }

        setLoading(true)
        // console.log(`user`, user)
        const response = await axios.put(`https://airobike.unotaxi.xyz/api/v1/news/${params.id}/`, formData, config)
        .then(res => {
            const productUpdated = res.data;
            console.log(`productUpdated =`, productUpdated)
            
            setLoading(false)
           
            setErrors(null)
            navigate("/news");
            // navigate(ADMIN_PRODUCT_LIST)
        }).catch((err) => {
            setErrors(err.message)
            console.log(`err ===`, err.message)
        })
    } catch (error) {
        setLoading(false)
        // setErrors(error)
        console.log(`error data =`, error)
    }
    
    }

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem("token")
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
    
            setLoading(true)
            // console.log(`user`, user)
            const response = await axios.delete(`https://airobike.unotaxi.xyz/api/v1/news/${params.id}/`, config)
            .then(res => {
                // const productUpdated = res.data;
                console.log(`product Deleted !`)
                
                setLoading(false)
               
                setErrors(null)
                navigate("/news");
                // navigate(ADMIN_PRODUCT_LIST)
            }).catch((err) => {
                setErrors(err.message)
                console.log(`err ===`, err.message)
            })
        } catch (error) {
            setLoading(false)
            // setErrors(error)
            console.log(`error data =`, error)
        }
        
    }
    

    


    
    
    // console.log('categories', categories)




  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
                <div className="mmm">
                <SimpleBlogCard
                    
                    image={order.image}
                    title={order.title}
                    description={'Описание - ' + order.description}
                    action={{
                        type: "internal",
                        route: "#",
                        color: "info",
                        label: "Airobike"
                    }}
                />
                </div>
                <button style={{padding: '10px', width: '100%', backgroundColor: 'red', color: '#fff'}} onClick={() => deleteProduct()}>Удалить</button>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Form onSubmit={putProduct}>
                    
                    <Form.Group className="mb-3" controlId='title'>
                        <Form.Label>Название</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='text'
                            placeholder='Название'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='price'>
                        <Form.Label>Описание</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            // type='number'
                            placeholder='Описание'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='image'>
                        <Form.Label>Изображение категории</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='file'
                            placeholder='Изображение'
                            onChange={uploadFileHandler}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* { selectedCategory === null || selectedCategory === 'null' ? null :
                        <Form.Group className="mb-3" controlId='subcategory'>
                            <Form.Label>Суб Категория</Form.Label>
                            <br/>
                            <Form.Select style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}} defaultValue={null} name="myParameters" onChange={(e) => setSelectedSubCategory(e.target.value)} value={selectedSubCategory}>
                                <option value="null">Выбрать субкатегорию</option>
                                {findedCat?.sCategory?.map((i) => (
                                    <option value={i._id}>{i.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                    } */}


                    <p style={{color: 'red'}}>{errors === null ? null : <p style={{color: 'red'}}>{errors}</p> }</p>
                    <p style={{color: 'green'}}>{loading === false ? null : <p style={{color: 'green'}}>Загрузка ...</p> }</p>
                    <Button
                        style={{padding: '10px', backgroundColor: 'green', width: '100%', color: '#ffffff', borderRadius: '7px', marginTop: '30px'}}
                        type='submit' variant='primary'
                    >
                        Изменить
                    </Button>
                </Form>
            </Grid>
            
        </Grid>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default NewsDetail;
