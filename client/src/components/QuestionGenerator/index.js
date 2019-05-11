import React, {Component} from 'react';
import axios from 'axios';
import './questionStyle.css';

   
const noDisplay = {
    display: 'none'
}
const display = {
    display: 'block'
}



class QuestionGenerator extends Component{
    state= {
        instructions:'',
        question: '',
        choices: [],
        answer:'',
        difficulty:'',
        selected: '',
        result: '', 
    }
 

    handleQuestionPost = () => {
        let ans =  document.getElementById(this.state.answer)
        let sel= document.getElementById(this.state.selected)
        if(ans && sel){
            if(ans.classList[1]==='correct' || sel.classList[1]==='wrong'){  
                ans.classList.remove('correct');
                sel.classList.remove('wrong');
            }
        }
      
     axios.post('/api/questions')
     .then(result =>{
        console.log(result.data)
        let instructions= result.data.instruction;
        let question = result.data.question;
        let choices = result.data.choices;
        let answer= result.data.correct_choice;
        let difficulty= result.data.difficulty;
        this.setState({
            instructions,
            question,
            choices,
            answer,
            difficulty, 
            result: ''
        })
     })
     .catch(err => console.log(err))

    }
    handleStart = (e) => {
       this.handleQuestionPost();
        document.getElementById('question').setAttribute('style', display);
        e.target.style.display = 'none'
    }
    handleConvert= (arr) => {
        let temp= arr.split('</mn><mn>').join('</sup>&frasl;<sub>');
        let temp2= temp.split('<mfrac><mn>').join('<mfrac><sup>');
        return temp2.split('</mn></mfrac>').join('</sub><mfrac>');
    }
    handleSubmit = () => {
        if(this.state.answer === this.state.selected){
            this.setState({result:'CORRECT!'})
            document.getElementById(this.state.answer).classList.add('correct')
        }else{
            this.setState({result:'Try again...'});
            document.getElementById(this.state.answer).classList.add('correct')
            document.getElementById(this.state.selected).classList.add('wrong');
        }
        axios.post('/auth/grades', {
            difficulty: this.state.difficulty,
            result: this.state.result
        }).then(result => console.log('successfully posted'))
        .catch(err => console.log(err));        
    }
    render(){
        let choices= this.state.choices.map((x,i) => <div className= "form-check" id={i} key={i}><input className= "form-check-input" type= 'radio' name= 'choicesRadio' data= 'select' onClick= {() => this.setState({ selected: i })} /><label className= "form-check-label"  htmlFor=  {'choicesRadio'+ i} dangerouslySetInnerHTML={{__html: this.handleConvert(x)}}></label></div>)
        let question = `<math>${this.handleConvert(this.state.question)}</math>`;
 
        return(
            <div>            
                <button id ='start' style= {display} onClick= {this.handleStart}>Start</button>
                <div id= 'question' style = {noDisplay}>
                    <h1>{this.state.instructions}</h1>
                    <h3 dangerouslySetInnerHTML={{__html: question}}></h3>
                    {choices}
                    <button onClick= {this.handleSubmit}>Submit</button> <button onClick= {this.handleQuestionPost}>Next</button>
                    <h3>{this.state.result}</h3>
                </div>
            </div>
        )
    }
}

export default QuestionGenerator;