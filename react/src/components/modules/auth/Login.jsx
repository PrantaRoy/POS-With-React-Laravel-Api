import React, { useEffect, useState } from "react";
import axios from 'axios';
import Constants from "../../../Constant";


const Login = () => {
     const [input,setInput] = useState({});
     const [isLoading,setIsLoading] = useState(false);
     const [errors,setErrors] = useState([]);
     const handleInput = (e) => {
          setInput(prevState => ({...prevState,
               [e.target.name] : e.target.value
          }))
     }

     const handleLogin = () => {
          setIsLoading(true)
          axios.post(`${Constants.Base_Url}/login`,input).then(res=>{
              console.log(res.data); 
              localStorage.email = res.data.email
              localStorage.name = res.data.name
              localStorage.role_id = res.data.role_id
              localStorage.photo = res.data.photo
              localStorage.token = res.data.token
              setIsLoading(false)
              window.location.reload()
          }).catch(errors =>{
               setIsLoading(false)
               if(errors.response.status == 422){
                    setErrors(errors.response.data.errors)
               }
          })
     }

     

     return (
         
          <div className="container-fluid" id="{'login'}">
               <div className="row">
                    <div className="col-md-6">
                         <div className="card">
                              <div className="card-header">
                                   <h2>Login</h2>
                              </div>
                              <div className="card-body">
                                   {/* <form> */}
                                        <div className="form-group">
                                        <label>Email</label>
                                        <input 
                                             className={errors.email != undefined ? 'form-control is-invalid' : 'form-control' } type="{'email}" 
                                             name={'email'} value={input.email}  
                                             onChange={handleInput} 
                                             placeholder="Your Login Email" 
                                        />
                                        <p className={'login-error'}> <small className="text-danger"> {errors.email != undefined ? errors.email[0]  : null}</small></p>
                                        </div>
                                        <div className="form-group mt-4">
                                        <label className="{'w-100 mt-5}">Password</label>
                                        <input 
                                             className={errors.password != undefined ? 'form-control is-invalid' : 'form-control' } 
                                             type={'password'} 
                                             name={'password'} 
                                             value={input.password} 
                                             onChange={handleInput} 
                                             placeholder="Your Login Password"
                                        />
                                         <p className={'login-error'}> <small className="text-danger"> {errors.password != undefined ? errors.password[0]  : null}</small></p>
                                        </div>

                                        <div className="d-grid mt-5">
                                             <button onClick={handleLogin}  className="btn btn-outline-success" dangerouslySetInnerHTML={{__html : isLoading  ? '<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading' : 'Login'}} />
                                        </div>
                                   {/* </form> */}
                              </div>
                         </div>
                    </div>
               </div>

          </div>
          
     );
};

export default Login;