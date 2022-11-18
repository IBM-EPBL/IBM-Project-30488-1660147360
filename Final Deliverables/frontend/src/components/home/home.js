//default imports
import React,{useState} from 'react' 
import {Card,CardImg,Jumbotron,Container} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';  
import Fab from '@material-ui/core/Fab'; 
// import { Scrollbars } from 'react-custom-scrollbars';

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
//custom imports
import "./style.css";
import NavBar from '../navbar/Navbar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const RenderCategories = ({category}) =>{
    if(category!=null){
        return(
            <div key={category.id}>
                <Card className="img-quick border-none" style={{height:'200px',border:'none',width:'150px'}}>
                    <Link to={'/products'}>
                        <CardImg className="img-q" width="150" height="160" top src={category.img} alt="Card image cap" />
                        
                    </Link>
                </Card>
            </div>
        )
    }
}


export default function Home(props) {
 
    const [isFlipped,setIsFlipped] = useState(false);

    const handleFlip = (e) =>{
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }
    const categories = props.categories?.map((category)=>{
        return ( 
            <div key={category.id} className="col-12 col-md-3 m-0 p-0">
                <Slide left>
                    <RenderCategories category = {category} />
                </Slide>
            </div>
        )
    });

    const history = useHistory();
    const handleClicked = (itemSelected) =>{
        if(itemSelected==0){
            history.push('/products/fashions');
            
        }
        else if(itemSelected==1){
            history.push('/')
        }
    }
    return (
        <div> 
            <NavBar /> 
            <Jumbotron style={{marginTop:'100px'}} className="row">
                <div className='col-sm-8'>
                    <Fade left>
                        <img src="./assets/home.png" width="100%" height="600px"/>
                    </Fade>
                </div>
                <div className='col-sm-4' style={{color:'black',marginTop:'100px'}}>
                    <Fade right>
                    <h1 style={{fontSize:'50px'}}>Inventory<br/> Management</h1>
                    <div style={{width:'150px',borderBottom:"8px solid #2156FA",marginTop:'15px'}}></div>
                    <div style={{marginTop:'20px'}}>
                    IT Inventory Management is the process of identifying, managing and maintaining the hardware and software assets of an organization. Manual compilation and reconciliation of IT assets is effort-intensive and error-prone.                    </div>
                    <div>
                        <a href="/login">
                            <button style={{borderRadius:'10px',backgroundColor:'#2156FA',padding:'10px 30px',outline:'none',border:'none'}} className='text-white'>Get Started</button>
                        </a>
                    </div>
                    </Fade>
                </div>
            </Jumbotron>             
            <Container className="position-relative">
                {/* <div className="row">
                    <div className="col-12 mt-4" id="goToNewProducts">
                        <Fade clear>
                            dsd
                        <h2 className="text-center m-2 mt-3" style={{fontWeight:'bold'}}>Top Categories</h2>
                        </Fade>
                    </div> 
                </div> */}
                <div>
                  <a style={{zIndex:'10',position:'fixed',bottom:'8px',right:'19px',margin:'0',padding:'5px 3px'}} href="#"> 
                        <Fab aria-label="like" color="primary" className="go_back">
                            <ExpandLessIcon />
                        </Fab> 
                  </a>
                </div>
            </Container>
        </div>
    )
}
