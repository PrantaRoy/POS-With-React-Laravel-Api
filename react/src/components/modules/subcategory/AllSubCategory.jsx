import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Breadcrumb from "../../partial/Breadcumb";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Constants from "../../../Constant";
import Loader from "../../partial/Loader";
import NoData from "../../partial/NoData";
import CategoryDetailModal from "../category/CategoryDetailModal";
import SubCategoryDetailModal from "./SubCategoryDetailModal";

const AllSubCategory = () =>{
     const [input , setInput] = useState({
          search: '',
          order_by : 'id',
          sort_by : 'asc',
          per_page : 10
     });
     const [isLoading , setIsLoading] = useState(false);
     const [sub_categories , setSubCategoires] = useState([]);
     const [sub_category , setSubCategory] = useState([]);
     const [itemsCountPerPage , setItemsCountPerPage] = useState(0)
     const [totalItemsCount , setTotalItemsCount] = useState(1)
     const [startFrom , setStartFrom] = useState(1)
     const [activePage , setActivePage] = useState(1)
     const handleInput = (e) => {
          setInput(prevState => ({...prevState,
               [e.target.name] : e.target.value
          }))
     }
     const getSubAllCategory = (pageNumber =1) =>{
          setIsLoading(true)
          axios.get(`${Constants.Base_Url}/sub-category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&sort_by=${input.sort_by}`).then(res=>{
               setSubCategoires(res.data.data)
               setItemsCountPerPage(res.data.meta.per_page);
               setTotalItemsCount(res.data.meta.total);
               setStartFrom(res.data.meta.from);
               setActivePage(res.data.meta.current_page)
               setIsLoading(false)
          })
     }

     const handelSubCategoryDelete = (id) => {
          Swal.fire({
               title: "Are you sure want to delete?",
               text: "Sub Category will be deleted ",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Delete It"
             }).then((result) => {
               if (result.isConfirmed) {
                    axios.delete(`${Constants.Base_Url}/sub-category/delete/${id}`).then(res=>{
                         getSubAllCategory();
                         Swal.fire({
                              position: "top-end",
                              icon: res.data.cls,
                              title: res.data.msg,
                              showConfirmButton: false,
                              timer: 1500
                            });
                   
                    }).catch(errors =>{
                         Swal.fire({
                              position: "top-end",
                              icon: 'danger',
                              title: 'Operation failed',
                              showConfirmButton: false,
                              timer: 1500
                            });
                    })
               }
             });
     }

     useEffect( ()=>{
          getSubAllCategory();
     }, [])

     const [modalShow, setModalShow] = React.useState(false);

     const handelCategoryDetailModal = (category) => {
          setSubCategory(category)
          setModalShow(true)
     }

     return (
          <> 
           <Breadcrumb title={'All Sub Category'}/>
           <div className="row">
                    <div className="col-md-12">
                         <div className="card">
                              <div className="card-header">
                                   <h4 className="card-title">All Sub Category</h4>
                              </div>
                              <div className="card-body">
                                   <div className="row mb-3">
                                        <div className="col-lg-3">
                                             <lable>Search</lable>
                                             <input className="form-control form-control-sm" name={'search'} value={input.search} onChange={handleInput} placeholder="Search"/>
                                        </div>

                                        <div className="col-lg-3">
                                             <lable>Sort By</lable>
                                             <select className="form-select form-control-sm" name={'sort_by'} value={input.sort_by} onChange={handleInput}>
                                                  <option value={'id'}>Id</option>
                                                  <option value={'name'}>Name</option>
                                                  <option value={'created_at'}>Created At</option>
                                                  <option value={'status'}>Status</option>
                                             </select>
                                        </div>
                                        <div className="col-lg-2">
                                             <lable>Order By</lable>
                                             <select className="form-select form-control-sm" name={'order_by'} value={input.order_by} onChange={handleInput}>
                                                  <option value={'asc'}>ASC</option>
                                                  <option value={'desc'}>DESC</option>
                                                 
                                             </select>
                                        </div>
                                        <div className="col-lg-2">
                                             <lable>Per Page</lable>
                                             <select className="form-select form-control-sm" name={'per_page'} value={input.per_page} onChange={handleInput}>
                                                  <option value={2}>2</option>
                                                  <option value={10}>10</option>
                                                  <option value={20}>20</option>
                                                  <option value={50}>50</option>
                                                  <option value={100}>100</option>
                                                 
                                             </select>
                                        </div>
                                        <div className="col-lg-2">
                                             <div className="d-grid mt-4">
                                                  <button className={'btn btn-primary'} onClick={() =>getSubAllCategory(1)}>Search</button>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="row">
                                        <div className="col-lg-12">
                                             <table className="table table-reponsive table-stripe">
                                                  <thead>
                                                       <tr>
                                                            <th>Si</th>
                                                            <th>Name</th>
                                                            <th>Category</th>
                                                            <th>Slug</th>
                                                            <th>Photo</th>
                                                            <th>Status</th>
                                                            <th>Created By</th>
                                                            <th>Date</th>
                                                            <th>Action</th>
                                                       </tr>

                                                  </thead>
                                                  {isLoading ? <Loader/> : 
                                                  <tbody>
                                                       { Object.keys(sub_categories).length > 0 ? sub_categories.map((category, index)=>(
                                                           <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>{category.name}</td>
                                                            <td>{category.category}</td>
                                                            <td>{category.slug}</td>
                                                            <td>
                                                                 <img src={category.photo} alt={category.name} className="img-thumbnail tw-50"/>
                                                            </td>
                                                            <td>
                                                                 <span className={category.status == 'Active' ? 'btn btn-success' : 'btn btn-danger'}>{category.status}</span>
                                                            </td>
                                                            <td>{category.created_by}</td>
                                                            <td>{category.created_at}</td>
                                                            <td>
                                                                 <button onClick={()=> handelCategoryDetailModal(category)} className="btn btn-sm btn-info my-1"><i className="fa-solid fa-eye"></i></button>
                                                                 <Link to={`/sub-category/edit/${category.id}`} className="btn btn-sm btn-primary my-1 mx-1"><i className="fa-solid fa-pencil"></i></Link>
                                                                 <button onClick={()=>handelSubCategoryDelete(category.id)} className="btn btn-sm btn-danger my-1"><i className="fa-solid fa-trash"></i></button>
                                                            </td>
                                                            </tr>
                                                       )): <NoData/>}

                                                  </tbody>
                                                  }
                                             </table>

                                             <SubCategoryDetailModal
                                                  show={modalShow}
                                                  title={'Sub Category Detail'}
                                                  onHide={() => setModalShow(false)}
                                                  category={sub_category}
                                                  />
                                        </div>
                                   </div>
                              </div>
                              <div className="card-footer">
                                   <nav className="pagination-sm">
                                        <Pagination
                                             activePage={activePage}
                                             itemsCountPerPage={itemsCountPerPage}
                                             totalItemsCount={totalItemsCount}
                                             pageRangeDisplayed={2}
                                             onChange={getSubAllCategory}
                                             firstPageText={'First'}
                                             nextPageText={'Next'}
                                             prevPageText={'Prev'}
                                             lastPageText={'Last'}
                                             itemClass={'page-item'}
                                             linkClass={'page-link'}
                                        />
                                   </nav>
                              </div>
                         </div>
                    </div>
               </div>
          
          </>
     )

}
export default AllSubCategory;