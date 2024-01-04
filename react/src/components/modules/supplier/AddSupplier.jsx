import React, { useState } from "react";
import BreadCumb from "../../partial/Breadcumb"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Constants from "../../../Constant";

const AddSupplier = () =>{
     const navigate = useNavigate();
     const [input,setInput] = useState({status : 1});
     const [isLoading,setIsLoading] = useState(false);
     const [errors,setErrors] = useState([]);
     const handleInput = (e) => {
          if(e.target.name == 'name'){
               let slug = e.target.value 
               slug = slug.toLowerCase()
               slug = slug.replaceAll('','-')
          }

          setInput(prevState => ({...prevState,
               [e.target.name] : e.target.value
          }))
     }
     const handleSupplier = () => {
          setIsLoading(true)
          axios.post(`${Constants.Base_Url}/supplier/store`,input).then(res=>{
              setIsLoading(false)
              Swal.fire({
               position: "top-end",
               icon: res.data.cls,
               title: res.data.msg,
               showConfirmButton: false,
               timer: 1500
             });
            // navigate('/supplier/index');
          }).catch(errors =>{
               setIsLoading(false)
               if(errors.response.status == 422){
                    setErrors(errors.response.data.errors)
               }
          })
     }

     return (
          <>
               <BreadCumb title={'Add Supplier'}/>
               <div className="row">
                    <div className="col-lg-12">
                         <div className="card">
                              <div className="card-header">
                                   <h2 className="card-title">Add New Supplier</h2>
                              </div>
                              <div className="card-body">
                                   <div className="row">
                                        <div className="col-lg-6">
                                             <div className="card-body">
                                                  <div className="form-group">
                                                       <label>Supplier Name</label>
                                                       <input 
                                                            className={errors.name != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'name'} value={input.name}  
                                                            onChange={handleInput} 
                                                            placeholder="Supplier Name" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.name != undefined ? errors.name[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Supplier Email</label>
                                                       <input 
                                                            className={errors.name != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'email'} 
                                                            name={'email'} value={input.email}  
                                                            onChange={handleInput} 
                                                            placeholder="Supplier Email" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.email != undefined ? errors.name[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Owner Name</label>
                                                       <input 
                                                            className={errors.owner_name != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'owner_name'} value={input.owner_name}  
                                                            onChange={handleInput} 
                                                            placeholder="Owner Name" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.owner_name != undefined ? errors.owner_name[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Owner Mobile</label>
                                                       <input 
                                                            className={errors.owner_mobile != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'owner_name'} value={input.owner_mobile}  
                                                            onChange={handleInput} 
                                                            placeholder="Owner Mobile" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.owner_mobile != undefined ? errors.owner_mobile[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Business Type</label>
                                                       <input 
                                                            className={errors.business_type != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'owner_name'} value={input.business_type}  
                                                            onChange={handleInput} 
                                                            placeholder="Business Type" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.business_type != undefined ? errors.business_type[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Trade License</label>
                                                       <input 
                                                            className={errors.trade_license != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'owner_name'} value={input.trade_license}  
                                                            onChange={handleInput} 
                                                            placeholder="Owner Mobile" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.trade_license != undefined ? errors.trade_license[0]  : null}</small></p>
                                                  </div>


                                             </div>
                                        </div>
                                        <div className="col-lg-6">
                                             <div className="card-body">
                                                 
                                                  <div className="form-group">
                                                       <label>Division</label>
                                                       <select className={errors.division_id != undefined ? 'form-control is-invalid' : 'form-control' }
                                                            name={'division_id'}
                                                            value={input.division_id}
                                                            onChange={handleInput}
                                                            placeholder={'Select Division'}
                                                       >
                                                            <option disabled={true}>Select Division</option>
                                                            <option value={1}>Active</option>
                                                            <option value={0}>Inacive</option>

                                                       </select>
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.division_id != undefined ? errors.division_id[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>District</label>
                                                       <select className={errors.district_id != undefined ? 'form-control is-invalid' : 'form-control' }
                                                            name={'district_id'}
                                                            value={input.district_id}
                                                            onChange={handleInput}
                                                            placeholder={'Select District'}
                                                       >
                                                            <option disabled={true}>Select District</option>
                                                            <option value={1}>Active</option>
                                                            <option value={0}>Inacive</option>
                                                       </select>
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.district_id != undefined ? errors.district_id[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Area Zone</label>
                                                       <select className={errors.zone_id != undefined ? 'form-control is-invalid' : 'form-control' }
                                                            name={'zone_id'}
                                                            value={input.zone_id}
                                                            onChange={handleInput}
                                                            placeholder={'Select Zone'}
                                                       >
                                                            <option disabled={true}>Select Zone</option>
                                                            <option value={1}>Active</option>
                                                            <option value={0}>Inacive</option>
                                                       </select>
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.zone_id != undefined ? errors.zone_id[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Address</label>
                                                       <input 
                                                            className={errors.address != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'address'} value={input.address}  
                                                            onChange={handleInput} 
                                                            placeholder="Business Address" 
                                                       />
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.address != undefined ? errors.address[0]  : null}</small></p>
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Short Description</label>
                                                       <textarea 
                                                            className={errors.description != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                            type={'text'} 
                                                            name={'description'} value={input.description}  
                                                            onChange={handleInput} 
                                                            placeholder="Business Address" 
                                                       ></textarea>
                                                       <p className={'category-error'}> <small className="text-danger"> {errors.description != undefined ? errors.description[0]  : null}</small></p>
                                                  </div>

                                                  
                                             
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="card-footer">
                                   <div className="row">
                                        <div className="d-grid">
                                             <button className="btn btn-primary" onClick={handleSupplier} dangerouslySetInnerHTML={{__html : isLoading  ? '<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading' : 'Submit'}} />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default AddSupplier;
