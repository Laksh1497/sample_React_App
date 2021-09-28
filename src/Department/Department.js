import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AddDepModal from '../Modals/DepartmentModals/AddDepModal';
import EditDepModal from '../Modals/DepartmentModals/EditDepModal';

class Department extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            deps:[],
            addDepModal:false,
            editDepModal:false
        }
    }


    //Loads up the Department
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
            .then(response =>
                response.json())
            .then(data => {
                this.setState({deps:data});
            });
    }


    //Fires the Loading
    componentDidMount(){
        this.refreshList();
    }

    //Fires on each updates
    componentDidUpdate(){
        this.refreshList();
    }

    //Fires on Delete
    deleteDep(depid){
        if(window.confirm("Are you sure?")){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    
    render(){
 
        const {deps,depid,depname} = this.state;

        //Changes state to activate "ADD" Modal
        let addDepModalClose = () => {
            this.setState({addDepModal:false});
        }

        //Changes state to activate "EDIT" Modal
        let editDepModalClose = () => {
            this.setState({editDepModal:false});
        }
        


        return(
            <div className = "mt-5 justify-content-left">
                <Table className = "mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className="text-center">Department ID</th>
                            <th className="text-center">Department Name</th>
                            <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td className="text-center">{dep.DepartmentId}</td>
                                <td className="text-center">{dep.DepartmentName}</td>
                                <td className="text-center">
                                    <ButtonToolbar className="text-center">
                                        <Button className = "m-2" 
                                            variant="info"
                                            onClick = {() => this.setState({editDepModal:true,
                                                    depid:dep.DepartmentId,
                                                    depname:dep.DepartmentName})}>
                                        Edit
                                        </Button>
                                        <Button className = "m-2" 
                                            variant="danger"
                                            onClick = {() => this.deleteDep(dep.DepartmentId)}>
                                        Delete
                                        </Button>

                                        {/* Edit Modal */}
                                        <EditDepModal
                                            show = {this.state.editDepModal}
                                            onHide = {editDepModalClose}
                                            depid = {depid}
                                            depname = {depname}>
                                        </EditDepModal>


                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>

                {/* Add Button */}
                <ButtonToolbar>
                    <Button variant="primary" className = "text-center"
                        onClick = {() => this.setState({addDepModal:true})}>
                            Add Department
                    </Button>
                    
                    {/* Add Modal */}
                    <AddDepModal show = {this.state.addDepModal}
                        onHide = {addDepModalClose}/>

                </ButtonToolbar>


            </div>
        )
    }
}

export default Department;