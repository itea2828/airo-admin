
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
import Bill from "layouts/billing/components/Bill/PartnerBill";


function PartnerDetail() {
  
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [order, setOrder] = useState({})

    console.log('order', order)




  // Orders /////// //////////////////////
  const getOrder = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`https://airobike.unotaxi.xyz/api/v1/partners/${params.id}/`, config)
        .then(res => {
            const o = res.data;
            // console.log(`orders =`, orders)
            setOrder(o)
           

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



  useEffect(() => {
    getOrder();
  }, [])

    

//   UPDATE 
    // Товары /////// //////////////////////
    const activatePartner = async () => {
        // e.preventDefault()
        try {

            let formData = new FormData();
            formData.append("user", 1);

            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            }

            setLoading(true)
            // console.log(`user`, user)
            const response = await axios.put(`https://airobike.unotaxi.xyz/api/v1/partners/${params.id}/activate/`, formData, config)
            .then(res => {
                const productUpdated = res.data;
                console.log(`productUpdated =`, productUpdated)
                
                setLoading(false)
            
                setErrors(null)
                navigate("/partners");
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

    const deactivatePartner = async () => {
        // e.preventDefault()
        try {

            let formData = new FormData();
            formData.append("user", 1);

            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            }

            setLoading(true)
            // console.log(`user`, user)
            const response = await axios.put(`https://airobike.unotaxi.xyz/api/v1/partners/${params.id}/deactivate/`, formData, config)
            .then(res => {
                const productUpdated = res.data;
                console.log(`productUpdated =`, productUpdated)
                
                setLoading(false)
            
                setErrors(null)
                navigate("/partners");
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
            const response = await axios.delete(`https://airobike.unotaxi.xyz/api/v1/partners/${params.id}/`, config)
            .then(res => {
                // const productUpdated = res.data;
                console.log(`product Deleted !`)
                
                setLoading(false)
               
                setErrors(null)
                navigate("/partners");
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
    
    // console.log('order', order)
    console.log('order.isConfirmed', order.isConfirmed)

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
                <Card id="delete-account">
                <MDBox pt={3} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                    Информация о партнере
                    </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        <Bill
                            name={order.name}
                            email={order.email}
                            tel={order.phone}
                            company={order.title}
                            vat={order.address}
                        />
                    
                    {order.isConfirmed?
                    <MDTypography style={{fontSize: '14px', color: 'green'}}>Статус: Подтвержден</MDTypography>
                    :
                    <MDTypography style={{fontSize: '14px', color: 'red'}}>Статус: Не подтвержден</MDTypography>
                    }
                    </MDBox>
                </MDBox>
                </Card>
                <button style={{padding: '10px', width: '100%', backgroundColor: 'red', color: '#fff'}} onClick={() => deleteProduct()}>Удалить</button>
            </Grid>
            <Grid item xs={12} xl={6}>
                {order.isConfirmed === false?
                    <div>
                   
                        <Button
                            onClick={() => activatePartner()}
                            style={{padding: '5px', backgroundColor: 'green', width: '100%', color: '#ffffff', borderRadius: '7px', marginTop: '10px', marginBottom: '20px'}}
                            variant='primary'
                        >
                            Подтвердить
                        </Button>
                        <p style={{color: 'red'}}>{errors === null ? null : <p style={{color: 'red'}}>{errors}</p> }</p>
                        <p style={{color: 'green'}}>{loading === false ? null : <p style={{color: 'green'}}>Загрузка ...</p> }</p>
                    </div>
                :
                    <div>
                    
                        <Button
                            onClick={() => deactivatePartner()}
                            style={{padding: '5px', backgroundColor: 'red', width: '100%', color: '#ffffff', borderRadius: '7px', marginTop: '10px', marginBottom: '20px'}}
                            variant='primary'
                        >
                            Деактивировать
                        </Button>
                        <p style={{color: 'red'}}>{errors === null ? null : <p style={{color: 'red'}}>{errors}</p> }</p>
                        <p style={{color: 'green'}}>{loading === false ? null : <p style={{color: 'green'}}>Загрузка ...</p> }</p>
                    </div>
                }
            </Grid>
            
        </Grid>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default PartnerDetail;
