import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';

class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state = {deps:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }


    

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    //Setting up the department list in dropdown
    componentDidMount(){
       fetch(process.env.REACT_APP_API+"department")
        .then(response => response.json())
        .then(data =>{
            this.setState({deps:data});
            
        }) 
    }

    //Handles data submission of changes to employees
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"employee",{
            method:"PUT",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                EmployeeFName:event.target.EmployeeFName.value,
                EmployeeLName:event.target.EmployeeLName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename
            })
        
        })
        .then(response => response.json())
        .then(result =>{
            alert(result);
        },
        (error) => {
            alert("Failed");
        })
    }

    //Handles image file submission 
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );


        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:"POST",
            body:formData
        })
            .then(response => response.json())
            .then(result => {
                this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
            },
            (error) => {
                alert("Failed");
            })
    }

    render(){
        return(
            <div className = "container">
                <Modal 
                   {...this.props}
                   size = "lg"
                   aria-labelledby = "contained-modal-title-vcenter"
                   centered>

                       <Modal.Header closeButton>
                           <Modal.Title id="contained-modal-title-vcenter">
                               Edit Employee
                           </Modal.Title>
                       </Modal.Header>

                       <Modal.Body>
                           <Row>
                               <Col sm={6}>
                                   <Form onSubmit = {this.handleSubmit}>
                                   <Form.Group controlId = "EmployeeId">
                                           <Form.Label>Employee Id</Form.Label>
                                           <Form.Control type="text" 
                                                name="EmployeeId" 
                                                required 
                                                disabled
                                                defaultValue = {this.props.empid}/> 
                                       </Form.Group>
                                       
                                       
                                       <Form.Group controlId = "EmployeeFName">
                                           <Form.Label>Employee First Name</Form.Label>
                                           <Form.Control type="text" 
                                                name="EmployeeFName" 
                                                required 
                                                placeholder="Enter Employee First Name"
                                                defaultValue = {this.props.empfname}/>
                                       </Form.Group>

                                       <Form.Group controlId = "EmployeeLName">
                                           <Form.Label>Employee Last Name</Form.Label>
                                           <Form.Control type="text" 
                                                name="EmployeeLName"  
                                                placeholder="Enter Employee Last Name"
                                                defaultValue = {this.props.emplname}/>
                                       </Form.Group>

                                       <Form.Group controlId = "Department">
                                           <Form.Label>Department</Form.Label>
                                           <Form.Control as="select"
                                                defaultValue = {this.props.empdepart}>
                                               {this.state.deps.map(dep=>
                                                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                                )}

                                           </Form.Control>
                                       </Form.Group>

                                       <Form.Group controlId = "DateOfJoining">
                                           <Form.Label>Date Of Joining</Form.Label>
                                           <Form.Control 
                                            type="date"
                                            name="DateOfJoining"
                                            required
                                            placeholder="Date of Joining"
                                            defaultValue = {this.props.dateofjoining}
                                           />
                                       </Form.Group>


                                       <Form.Group>
                                           <Button variant="primary" type="submit">
                                               Update Employee
                                           </Button>
                                       </Form.Group>
                                   </Form>
                               </Col>


                               <Col sm={6}>
                                        <Image width="200px" height="200px" 
                                        src={this.imagesrc}/>
                                        <input onChange = {this.handleFileSelected} type="File"/>
                               </Col>
                           </Row>
                       </Modal.Body>

                       <Modal.Footer>
                           <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                       </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default EditEmpModal;