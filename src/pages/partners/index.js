
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
import DataTable from "examples/Tables/DataTable";
import axios from 'axios';
// import BASE_URL from 'utils/baseUrl';
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import MDAvatar from "components/MDAvatar";


function Partners() {
  
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [orders, setOrders] = useState([])

  // Orders /////// //////////////////////
  const getOrders = async () => {
    try {
        setLoading(true)
        const response = await axios.get(`https://airobike.unotaxi.xyz/api/v1/partners/list/`)
        .then(res => {
            const orders = res.data;
            // console.log(`orders =`, orders)
            setOrders(orders)
            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setOrders([])
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  useEffect(() => {
    getOrders();
  }, [])


  console.log('orders', orders)

  const { columns, rows } = authorsTableData();

  const DisplayData=orders.map(
    (o)=>{
        return(
            <tr>
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize:13}}>{o.id}</td>
                <td><MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                  {o.title}
                </MDTypography>
                </td>
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '13px'}}>{o.name}</td>
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '13px'}}>{o.phone}</td>
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '13px'}}>{o.address}</td>
                {o.isConfirmed?
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '13px', color:'green'}}>??????????????????????</td>
                :
                <td style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '13px', color: 'red'}}>???? ????????????????.</td>
                
                }
                <td style={{paddingLeft: '20px'}}>
                  <MDTypography component="a" href={'partners/' + o.id} variant="caption" style={{color: 'blue'}} fontWeight="medium">
                    ??????????????????????????
                  </MDTypography>
                </td>
            </tr>
        )
    }
)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  ????????????????
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />  */}
                <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
                  <table class="table table-striped">
                      <thead>
                          <tr>
                          <th style={{fontSize: '13px', paddingLeft: '10px', paddingRight: '10px'}}>???</th>
                          <th style={{width: '200px', textAlign: 'left', fontSize: '13px'}} >????????????????</th>
                          <th style={{fontSize: '13px', paddingLeft: '10px', paddingRight: '10px'}}>?????? ??????????????????????????</th>
                          <th style={{fontSize: '13px',textAlign: 'left', paddingLeft: '10px', paddingRight: '10px'}}>??????.</th>
                          <th style={{width: '200px', textAlign: 'left', fontSize: '13px', paddingLeft: '10px', paddingRight: '10px'}}>??????????</th>
                          <th style={{width: '100px', textAlign: 'left', fontSize: '13px', paddingLeft: '10px', paddingRight: '10px'}}>????????????</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px'}}>??????????????????????????/??????????????</th>
                        
                        </tr>
                      </thead>
                      <tbody>
                      
                          
                          {DisplayData}
                          
                      </tbody>
                  </table>
                  
                </div>
              </MDBox>
            </Card>
          </Grid>
          
          
        </Grid>
      </MDBox>
      {/* <Footer /> */}
      {/* <a style={{
                width: '30px',
                height: '30px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                borderRadius: '15px',
                position: 'absolute',
                top: '500px',
                left: '90%',
                zIndex: '111111111'
            }}
            href={'categories/add'}
            >
                <h3 style={{color: '#fff', textAlign: 'center', marginTop: '-5px'}}>+</h3>
            </a> */}
    </DashboardLayout>
  );
}

export default Partners;
