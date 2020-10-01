import React, {Component } from 'react';
import './CSS/Preference.css';
import axios from '../../../ApiServices/axiosUrl';
import CourseTitle from './CourseTitle';
import { Redirect } from 'react-router-dom';
class Preference extends Component {

    state = {
        interest:[],
        userId:localStorage.getItem('userId'),

        Courses: {
            "Web Development":{
                touched:false,
            },
            "Web Designing":{
                touched:false,
            },
             "React":{
                touched:false,
            },
             "ML":{
                touched:false,
            },
             "Photography":{
                touched:false,
            },
             "NodeJs":{
                touched:false,
            },
        },
        redirect:null,
    }


    categoryHandler=(CourseName)=>{

        
       
       
        
       

            if(this.state.Courses[CourseName].touched)

            {   
                this.state.Courses[CourseName].touched = false;
                const index =this.state.interest.indexOf(CourseName);
                if(index >-1) this.state.interest.splice(index,1);
            }

            else
            {this.state.Courses[CourseName].touched = true;
             this.state.interest.push(CourseName);}


        
        
        this.setState(prevState => 
            ({interest:prevState.interest, Courses:prevState.Courses}));

        console.log(this.state.interest)

       
       
    }

    sumbitHandler =()=> {
      
        const fd =new FormData();
        const formData = {"interest":this.state.interest, 'userId':this.state.userId};
        
        

       
        console.log(formData);

        fd.append("userId",this.state.userId);
        fd.append("interest",this.state.interest);

       // for(var value of fd.values())console.log(value)
        
        axios.post("/home/interests",formData)
        .then(response => {
            console.log("Preference",response);
            alert("Preferences added!")
            this.setState({redirect:'/home/preferences'})
            
           
          

        })
        .catch(error => {
            console.log(error);
        })


    }


    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
  

            var webdev ,webdesigning,react,ml,photo,nodejs;

            if(this.state.Courses["Web Development"].touched){
                webdev = ['touched']
            }
            else{
                webdev=['']
            }

            if(this.state.Courses["Web Designing"].touched){
                webdesigning = ['touched']
            }
            else{
                webdesigning=['']
            }
            if(this.state.Courses["React"].touched){
                react= ['touched']
            }
            else{
                react=['']
            }
            if(this.state.Courses["ML"].touched){
                ml = ['touched']
            }
            else{
                ml=['']
            }
            if(this.state.Courses["Photography"].touched){
               photo= ['touched']
            }
            else{
                photo=['']
            }
            if(this.state.Courses["NodeJs"].touched){
                nodejs = ['touched']
            }
            else{
                nodejs=['']
            }
        
        return(


         
            <div className="container">
                <div className="title">
                     <CourseTitle welcomeMessage ={"Choose Your interests,"}/>
                </div>
                <div className="Preference-buttons">

                    <button className={webdev.join(' ')} onClick={()=> this.categoryHandler("Web Development")}> Development</button>
                    <button className={webdesigning.join(' ')} onClick={()=> this.categoryHandler("Web Designing")}> Designing</button>
                    <button className={react.join(' ')} onClick={()=> this.categoryHandler("React")}> React</button>
                    <button className={ml.join(' ')} onClick={()=> this.categoryHandler("ML")}> ML</button>
                    <button className={photo.join(' ')} onClick={()=> this.categoryHandler("Photography")}> Photography</button>
                    <button className={nodejs.join(' ')} onClick={()=> this.categoryHandler("NodeJs")}> Node JS</button>
                   
                </div>


            <div className="SumbitBtn">
                    <button  onClick={this.sumbitHandler}>SUMBIT</button>
                </div>


            </div>

            
        );
    }



}

export default Preference;