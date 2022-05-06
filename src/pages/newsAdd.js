
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
// // import BASE_URL from 'utils/baseUrl';
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


function NewsAdd() {
  
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [newImg, setNewImg] = useState(null)
   
    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        setNewImg(file)
        console.log('file', image)
    }

//   UPDATE 
  // Товары /////// //////////////////////
  const postProduct = async (e) => {
    e.preventDefault()
    try {

        let formData = new FormData();
        formData.append("user", 1);
        formData.append("image", newImg);
        formData.append("title", title);
        formData.append("description", description);


        // formData.append("category", findedCat?.id);
        
        

        const token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }

        setLoading(true)
        // console.log(`user`, user)
        const response = await axios.post(`https://airobike.unotaxi.xyz/api/v1/news/post/`, formData, config)
        .then(res => {
            const productUpdated = res.data;
            console.log(`productPosted =`, productUpdated)
            
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


  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
                <SimpleBlogCard
                image={newImg}
                title={title}
                description={'Описание - ' + description}
                action={{
                    type: "internal",
                    route: "#",
                    color: "info",
                    label: "Airobike"
                }}
                />
            </Grid>
            <Grid item xs={12} xl={6}>
                <Form onSubmit={postProduct}>
                    
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
                        <Form.Label>Изображение </Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='file'
                            placeholder='Изображение'
                            onChange={uploadFileHandler}
                        >
                        </Form.Control>
                    </Form.Group>



                    {/* <Form.Group className="mb-3" controlId='category'>
                        <Form.Label>Категория</Form.Label>
                        <br/>
                        <Form.Select style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}} defaultValue={null} name="myParameter" 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                        >
                            <option value="null">Выбрать категорию</option>
                            {categories.map((i) => (
                                <option key={i.id} value={i.title}>{i.title}</option>
                            ))}
                        </Form.Select>

                    </Form.Group> */}

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
                        Добавить
                    </Button>
                </Form>
            </Grid>
        </Grid>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default NewsAdd;
