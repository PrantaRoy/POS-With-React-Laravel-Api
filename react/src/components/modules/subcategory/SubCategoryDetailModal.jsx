import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const SubCategoryDetailModal = (props) => {
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
     {props.category.name} {props.title}
     </Modal.Title>
     </Modal.Header>
     <Modal.Body>
     
     <div className="row">
          <div className="col-lg-12">
               <table className="table table-reponsive table-stripe">
                    <tbody>
                         <tr>
                              <th>Name</th>
                              <td>{props.category.name}</td>
                         </tr>
                         <tr>
                              <th>Slug</th>
                              <td>{props.category.slug}</td>
                         </tr>
                         <tr>
                              <th>Parent Category</th>
                              <td>{props.category.category}</td>
                         </tr>
                         <tr>
                              <th>Created At</th>
                              <td>{props.category.created_at}</td>
                         </tr>
                         <tr>
                              <th>Updated At</th>
                              <td>{props.category.updated_at}</td>
                         </tr>
                         <tr>
                              <th>Status</th>
                              <td>{props.category.status}</td>
                         </tr>
                         <tr>
                              <th>Created By</th>
                              <td>{props.category.created_by}</td>
                         </tr>
                         <tr>
                              <th>Description</th>
                              <td>{props.category.description}</td>
                         </tr>
                         <tr>
                              <th>Photo</th>
                              <td>
                                   <img src={props.category.main_photo} alt={props.category.name} className="w-100"/>
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
     );
};

export default SubCategoryDetailModal;