import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partial/Breadcumb";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Constants from "../../../Constant";
import axios from "axios";
import BrandDetailModal from "./BrandDetailModal";
import Pagination from 'react-js-pagination';
import Loader from "../../partial/Loader";
import NoData from "../../partial/NoData";
import { Link } from "react-router-dom";

const AllBrand = () => {
     const [input , setInput] = useState({
          search: '',
          order_by : 'id',
          sort_by : 'asc',
          per_page : 10
          
     });
     const [isLoading , setIsLoading] = useState(false);
     const [brands , setBrands] = useState([]);
     const [brand , setBrand] = useState([]);
     const [itemsCountPerPage , setItemsCountPerPage] = useState(0)
     const [totalItemsCount , setTotalItemsCount] = useState(1)
     const [startFrom , setStartFrom] = useState(1)
     const [activePage , setActivePage] = useState(1)
     const handleInput = (e) => {
          setInput(prevState => ({...prevState,
               [e.target.name] : e.target.value
          }))
     }

     const getAllBrand = (pageNumber =1) =>{
          setIsLoading(true)
          axios.get(`${Constants.Base_Url}/brand?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&sort_by=${input.sort_by}`).then(res=>{
               setBrands(res.data.data)
               setItemsCountPerPage(res.data.meta.per_page);
               setTotalItemsCount(res.data.meta.total);
               setStartFrom(res.data.meta.from);
               setActivePage(res.data.meta.current_page)
               setIsLoading(false)
          })
          
     }

     const handelBrandDelete = (id) => {
          Swal.fire({
               title: "Are you sure want to delete?",
               text: "Brand will be deleted ",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Delete It"
             }).then((result) => {
               if (result.isConfirmed) {
                    axios.delete(`${Constants.Base_Url}/brand/delete/${id}`).then(res=>{
                         getAllBrand();
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
          getAllBrand();
     }, [])

     const [modalShow, setModalShow] = React.useState(false);

     const handelBrandDetailModal = (brand) => {
          setBrand(brand)
          setModalShow(true)
     }



     return (
          <>
               <Breadcrumb titile={'All Brands'}></Breadcrumb>
               <Helmet title={'All Brand'}></Helmet>
               <div className="row">
                    <div className="col-md-12">
                         <div className="card">
                              <div className="card-header">
                                   <h4 className="card-title">All Brand</h4>
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
                                                  <button className={'btn btn-primary'} onClick={() =>getAllBrand(1)}>Search</button>
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
                                                            <th>Slug</th>
                                                            <th>Logo</th>
                                                            <th>Status</th>
                                                            <th>Created By</th>
                                                            <th>Date</th>
                                                            <th>Action</th>
                                                       </tr>

                                                  </thead>
                                                  {isLoading ? <Loader/> : 
                                                  <tbody>
                                                       { Object.keys(brands).length > 0 ? brands.map((brand, index)=>(
                                                           <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>{brand.name}</td>
                                                            <td>{brand.slug}</td>
                                                            <td>
                                                                 <img src={brand.logo} alt={brand.name} className="img-thumbnail tw-20"/>
                                                            </td>
                                                            <td>
                                                                 <span className={brand.status == 'Active' ? 'btn btn-success' : 'btn btn-danger'}>{brand.status}</span>
                                                            </td>
                                                            <td>{brand.created_by}</td>
                                                            <td>{brand.created_at}</td>
                                                            <td>
                                                                 <button onClick={()=> handelBrandDetailModal(brand)} className="btn btn-sm btn-info my-1"><i className="fa-solid fa-eye"></i></button>
                                                                 <Link to={`/brand/edit/${brand.id}`} className="btn btn-sm btn-primary my-1 mx-1"><i className="fa-solid fa-pencil"></i></Link>
                                                                 <button onClick={()=> handelBrandDelete(brand.id)} className="btn btn-sm btn-danger my-1"><i className="fa-solid fa-trash"></i></button>
                                                            </td>
                                                            </tr>
                                                       )): <NoData/>}

                                                  </tbody>
                                                  }
                                             </table>

                                             <BrandDetailModal
                                                  show={modalShow}
                                                  title={'Brand Detail'}
                                                  onHide={() => setModalShow(false)}
                                                  brand={brand}
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
                                             onChange={getAllBrand}
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

export default AllBrand