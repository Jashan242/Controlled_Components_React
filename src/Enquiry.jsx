import React, { useState } from 'react'
import {Col, Row, Table, Form} from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Enquiry() {

    let [formData, setFormData]=useState({
        name:'',
        email:'',
        phone:'',
        message:'',
        index:''
    })

    let getValue=(event)=>{
        let oldData={...formData}
        let inputName=event.target.name;
        let inputValue=event.target.value;
        oldData[inputName]=inputValue;
        setFormData(oldData)
        
    }

    let [userData, setUserData]=useState([]);
    let handleForm=(event)=>{

        let currentData={
            name:formData.name,
            email:formData.email,
            phone:formData.phone, 
            message:formData.message
        }

        if(formData.index===""){
            let checkFilter=userData.filter((v)=>v.email==formData.email || v.phone==formData.phone)

            if(checkFilter.length==1){
                toast.error("Email or phone already exists...")
            }
            else{
                let userDetail=[...userData,currentData]
    
                setUserData(userDetail)
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:'',
                    index:''
                }
               )
            }
        }

        else{
            let editIndex=formData.index;
            let oldUserData=userData;

            let checkFilter=userData.filter((v,i)=>(v.email==formData.email || v.phone==formData.phone) && i!=editIndex)

            if(checkFilter.length==0){
                oldUserData[editIndex]['name']=formData.name;
            oldUserData[editIndex]['email']=formData.email;
            oldUserData[editIndex]['phone']=formData.phone;
            oldUserData[editIndex]['message']=formData.message;

            setUserData(oldUserData)
            setFormData({
                name:'',
                email:'',
                phone:'',
                message:'',
                index:''
            })
            }
            else{
                toast.error("Email or phone already exists...")
            }
        }

        event.preventDefault();
    }

    let deleteRow=(indexNum)=>{
        // alert(indexNum)
        let filterDelete=userData.filter((v,i)=>i!=indexNum)
        // console.log(filterDelete)
        setUserData(filterDelete)
        toast.success("Data deleted successfully !!!")
    }

    let editRow=(indexNum)=>{
        let editData=userData.filter((v,i)=>i==indexNum)[0]
        console.log(editData)
        editData['index']=indexNum
        setFormData(editData)
    }

    return (
        <div className='container'>
          <ToastContainer />
          <Row>
            <Col className='text-center py-5'>
              <h1>Any Enquiry</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <form onSubmit={handleForm} className='form-content'>
                {/* {userData.length} */}
                <div className='text-center my-3'>
                  <label className='form-label'>Name</label>
                  <input type='text' onChange={getValue} value={formData.name} className='form-control' name='name' />
                </div>
                <div className='text-center my-3'>
                  <label className='form-label'>Phone</label>
                  <input type='text' onChange={getValue} value={formData.phone} className='form-control' name='phone' />
                </div>
                <div className='text-center my-3'>
                  <label className='form-label'>Email</label>
                  <input type='email' onChange={getValue} value={formData.email} className='form-control' name='email' />
                </div>
                <div className='text-center my-3'>
                  <label className='form-label'>Message</label>
                  <textarea className='form-control' onChange={getValue} value={formData.message} name='message' />
                </div>
    
                <button className='btn btn-primary'>{formData.index !== '' ? 'Update' : 'Save'}</button>
              </form>
              <br></br>
            </Col>
    
            <Col lg={7}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length >= 1 ? (
                    userData.map((obj, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{obj.name}</td>
                          <td>{obj.phone}</td>
                          <td>{obj.email}</td>
                          <td>{obj.message}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => deleteRow(i)}>Delete</button>
                            <button className="btn btn-success" onClick={() => editRow(i)}>Update</button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6}>No record found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      );
    }
