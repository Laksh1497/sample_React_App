import React,{Component} from 'react';
import { Table,Image } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AddEmpModal from '../Modals/EmployeeModals/AddEmpModal';
import EditEmpModal from '../Modals/EmployeeModals/EditEmpModal';

class Employee extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            emps:[],
            addEmpModal:false,
            editEmpModal:false
        }
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
            .then(response =>
                response.json())
            .then(data => {
                this.setState({emps:data});
            });
    }


    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm("Are you sure?")){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    
    render(){

         
        const {emps,empid,empfname,emplname,empdepart,dateofjoining,photofilename} = this.state;

        let addEmpModalClose = () => {
            this.setState({addEmpModal:false});
        }

        let editEmpModalClose = () => {
            this.setState({editEmpModal:false});
        }
        


        return(
            <div className = "mt-5 justify-content-left">
                <Table className = "mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className="text-center">Employee ID</th>
                            <th className="text-center">Employee FirstName</th>
                            <th className="text-center">Employee LastName</th>
                            <th className="text-center">Employee Department</th>
                            <th className="text-center">Date of Joining</th>
                            <th className="text-center">Photo</th>
                            <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td className="text-center">{emp.EmployeeId}</td>
                                <td className="text-center">{emp.EmployeeFName}</td>
                                <td className="text-center">{emp.EmployeeLName}</td>
                                <td className="text-center">{emp.Department}</td>
                                <td className="text-center">{emp.DateOfJoining}</td>
                                <td className="text-center"><Image 
                                    src={process.env.REACT_APP_PHOTOPATH+emp.PhotoFileName}
                                    roundedCircle 
                                    width="50px"
                                    height="50px"
                                    /></td>
                                <td className="text-center">
                                    <ButtonToolbar>
                                        <Button className = "m-2" 
                                            variant="info"
                                            onClick = {() => this.setState({editEmpModal:true,
                                                    empid:emp.EmployeeId,
                                                    empfname:emp.EmployeeFName,
                                                    emplname:emp.EmployeeLName,
                                                    empdepart:emp.Department,
                                                    dateofjoining:emp.DateOfJoining,
                                                    photofilename:emp.PhotoFileName   
                                                
                                                })}
                                        >
                                        Edit
                                        </Button>
                                        <Button className = "m-2" 
                                            variant="danger"
                                            onClick = {() => this.deleteEmp(emp.EmployeeId)}
                                        >
                                        Delete
                                        </Button>
                                        <EditEmpModal
                                            show = {this.state.editEmpModal}
                                            onHide = {editEmpModalClose}
                                            empid = {empid}
                                            empfname = {empfname}
                                            emplname = {emplname}
                                            empdepart = {empdepart}
                                            dateofjoining = {dateofjoining}
                                            photofilename = {photofilename}
                                            >

                                        </EditEmpModal>


                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary"
                        onClick = {() => this.setState({addEmpModal:true})}>
                            Add Employee
                    </Button>

                    <AddEmpModal show = {this.state.addEmpModal}
                        onHide = {addEmpModalClose}/>

                </ButtonToolbar>


            </div>
        )
    }
}

export default Employee;