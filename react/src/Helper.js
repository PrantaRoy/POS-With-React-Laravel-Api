const Helper = {
     logOut(data){
          localStorage.removeItem('email')
          localStorage.removeItem('name')  
          localStorage.removeItem('role_id')  
          localStorage.removeItem('photo')  
          localStorage.removeItem('token')  
     }
}

export default Helper