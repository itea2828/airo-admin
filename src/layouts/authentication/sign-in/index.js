import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Airobike React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import axios from "axios";
import { setIsAuthenticated } from "slices/persSlice";
import { useNavigate } from "react-router-dom";

function Basic() {

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)

  const doLogin = async () => {
    const response = await axios.post(`https://airobike.unotaxi.xyz/api/v1/users/login/`, {
       "email": email, 
       "password": password
     }).then(res => {
       console.log('res.data Login = ', res.data)
       localStorage.setItem("token", res.data.token)
       dispatch(setIsAuthenticated(true))
       navigate("/")
       setErrors(null)
     }).catch(err => {
        setErrors(err.message)
        console.log(`Login actions err ==`, err)
    })
  }

  console.log('email', email)
  console.log('password', password)


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Авторизация
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
           
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Эл. почта" onChange={(e) => setEmail(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Пароль" onChange={(e) => setPassword(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={() => doLogin()} fullWidth>
                Войти
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              {errors === null?
              <MDTypography variant="button" color="text">
              Введите данные администратора
             </MDTypography>
             :
             <MDTypography variant="button" color="text">
               {errors}
              </MDTypography>
              }
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
