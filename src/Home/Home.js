import React,{Component} from 'react';
import axios from "axios"


const fetchRandomData  = () => {
    
  return axios.get('https://randomuser.me/api/').then (res => {

    console.log(res);
    return res;
  }

    
  ).catch (err => {
    console.error(err);
  })


}

class Home extends Component{
    render(){
        return(
            <div className = "mt-5 d-flex justify-content-left">
                This is Home page.
            
            
             <button onClick = {()=> {fetchRandomData();}}> Fetch data </button>
            </div>
        )
    }
}

export default Home;
