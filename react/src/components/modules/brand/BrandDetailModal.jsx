import React from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const BrandDetailModal = (props) => {
     return (
          <>
          <Modal
          {...props}
          size="lg"
          aria-labelledby="category-detail-modal"
          centered
     >
          <Modal.Header closeButton>
     <Modal.Title id="category-detail-modal">
     {props.brand.name} {props.title}
     </Modal.Title>
     </Modal.Header>
     <Modal.Body>
     
     <div className="row">
          <div className="col-lg-12">
               <table className="table table-reponsive table-stripe">
                    <tbody>
                         <tr>
                              <th>Name</th>
                              <td>{props.brand.name}</td>
                         </tr>
                         <tr>
                              <th>Slug</th>
                              <td>{props.brand.slug}</td>
                         </tr>
                         <tr>
                              <th>Created At</th>
                              <td>{props.brand.created_at}</td>
                         </tr>
                         <tr>
                              <th>Updated At</th>
                              <td>{props.brand.updated_at}</td>
                         </tr>
                         <tr>
                              <th>Status</th>
                              <td>{props.brand.status}</td>
                         </tr>
                         <tr>
                              <th>Created By</th>
                              <td>{props.brand.created_by}</td>
                         </tr>
                         <tr>
                              <th>Description</th>
                              <td>{props.brand.description}</td>
                         </tr>
                         <tr>
                              <th>Logo</th>
                              <td>
                                   <img src={props.brand.logo} alt={props.brand.name} className="w-100"/>
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </div>
     </Modal.Body>
     <Modal.Footer>
     <Button onClick={props.onHide}>Close</Button>
     </Modal.Footer>
</Modal>
          </>
     )
}
export default BrandDetailModal