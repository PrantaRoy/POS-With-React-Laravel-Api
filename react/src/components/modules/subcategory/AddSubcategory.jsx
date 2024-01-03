import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partial/Breadcumb";
import { Helmet } from "react-helmet";
import Constants from "../../../Constant";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () =>{
     const navigate = useNavigate();
     const [input,setInput] = useState({status : 1});
     const [isLoading,setIsLoading] = useState(false);
     const [categories,setCategories] = useState([]);
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
     const handleImagePreview = (e) => {
          let file = e.target.files[0];
          let reader = new FileReader();
          reader.onloadend = () =>{
               setInput(prevState => ({...prevState,
                    image : reader.result
               }))
          }
          reader.readAsDataURL(file)
     }
     const handleSubCategory = () => {
          console.log(input)
          setIsLoading(true)
          axios.post(`${Constants.Base_Url}/sub-category/store`,input).then(res=>{
              console.log(res.data); 
              setIsLoading(false)
              Swal.fire({
               position: "top-end",
               icon: res.data.cls,
               title: res.data.msg,
               showConfirmButton: false,
               timer: 1500
             });
             navigate('/sub-category/index');
          //     window.location.reload()
          }).catch(errors =>{
               setIsLoading(false)
               if(errors.response.status == 422){
                    setErrors(errors.response.data.errors)
               }
          })
     }

     const getCategories = () =>{
          axios.get(`${Constants.Base_Url}/all-category`).then(res=>{
             
               setCategories(res.data.categories);
               
              });
     }
     useEffect( ()=>{
          getCategories();
         
     }, [])

     return (
          <>
               <Helmet><title>My Dasboard</title></Helmet>
               <Breadcrumb title={'Add New Sub Category'}/>
               <div className="row">
                    <div className="col-md-8">
                         <div className="card">
                              <div className="card-header">
                                   <h4 className="card-title">Add New Sub Category</h4>
                              </div>
                              <div className="card-body">
                                   <div className="row">
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label>Category</label>
                                                  <select className={errors.category_id != undefined ? 'form-control is-invalid' : 'form-control' }
                                                       name={'category_id'}
                                                       value={input.category_id}
                                                       onChange={handleInput}
                                                       placeholder={'Select Category'}
                                                  >
                                                        <option >Select Category</option>
                                                        {categories.map((category, index) => (
                                                            <option key={index} value={category.id}>{category.name}</option>
                                                       ))}

                                                  </select>
                                                  <p className={'category-error'}> <small className="text-danger"> {errors.category_id != undefined ? errors.category_id[0]  : null}</small></p>
                                             </div>
                                        </div>

                                        <div className="col-lg-5">
                                             <div className="form-group">
                                                  <label>Name</label>
                                                  <input 
                                                       className={errors.name != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                       type={'text'} 
                                                       name={'name'} value={input.name}  
                                                       onChange={handleInput} 
                                                       placeholder="Sub Category Name" 
                                                  />
                                                  <p className={'category-error'}> <small className="text-danger"> {errors.name != undefined ? errors.name[0]  : null}</small></p>
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label>Slug</label>
                                                  <input 
                                                       className={errors.slug != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                       type={'text'} 
                                                       name={'slug'} value={input.slug}  
                                                       onChange={handleInput} 
                                                       placeholder="Sub Category Slug" 
                                                  />
                                                  <p className={'category-error'}> <small className="text-danger"> {errors.slug != undefined ? errors.slug[0]  : null}</small></p>
                                             </div>
                                        </div>
                                        <div className="col-lg-6">
                                             <div className="form-group">
                                                  <label>Status</label>
                                                  <select className={errors.status != undefined ? 'form-control is-invalid' : 'form-control' }
                                                       name={'status'}
                                                       value={input.status}
                                                       onChange={handleInput}
                                                       placeholder={'Select Status'}
                                                  >
                                                       <option disabled={true}>Select Status</option>
                                                       <option value={1}>Active</option>
                                                       <option value={0}>Inacive</option>

                                                  </select>
                                                  <p className={'category-error'}> <small className="text-danger"> {errors.status != undefined ? errors.status[0]  : null}</small></p>
                                             </div>
                                        </div>
                                        <div className="col-lg-6">
                                             <label>Feature Image</label>
                                             <input 
                                                       className={errors.image != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                       type={'file'} 
                                                       name={'image'}  
                                                       onChange={handleImagePreview} 
                                                       
                                                  />  

                                                  <div className="photo-preview">
                                                       <img src={input.image} className="image-thum w-100"/>                                                  </div>
                                              <p className={'category-error'}> <small className="text-danger"> {errors.image != undefined ? errors.image[0]  : null}</small></p>                                     
                                             </div>

                                        <div className="col-lg-12">
                                             <div className="form-group">
                                                  <label>Description</label>
                                                  <textarea 
                                                       className={errors.description != undefined ? 'form-control is-invalid' : 'form-control' } 
                                                       name={'description'} value={input.description}  
                                                       onChange={handleInput} 
                                                       placeholder="Sub Category description" 
                                                  />
                                                  <p className={'category-error'}> <small className="text-danger"> {errors.description != undefined ? errors.description[0]  : null}</small></p>
                                             </div>
                                        </div>

                                   </div>
                              </div>
                              <div className="card-footer">
                                   <div className="row">
                                        <div className="d-grid">
                                             <button className="btn btn-primary" onClick={handleSubCategory} dangerouslySetInnerHTML={{__html : isLoading  ? '<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading' : 'Submit'}} />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default AddSubCategory;