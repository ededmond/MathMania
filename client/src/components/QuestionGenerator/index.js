import React, {Component} from 'react';
import axios from 'axios';
import './questionStyle.css';
import { userInfo } from 'os';

   
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
        total: 0,
        inRow: 0,
    }
    handleQuestionPost = () => {
        let ans =  document.getElementById(this.state.answer)
        let sel= document.getElementById(this.state.selected)
        if(ans && sel){
            if(ans.classList[1]==='correct' || sel.classList[1]==='wrong'){  
                ans.classList.remove('correct');
                sel.classList.remove('wrong');
            }
            document.getElementById('Radio'+this.state.selected).checked=false
        }
        console.log(this.state.inRow)
    
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
            const random= Math.floor(Math.random()*10)+1
            this.state.inRow%3===0 && this.state.inRow !=0?  this.setState({total: this.state.total + random, inRow: this.state.inRow + 1}) : this.setState({ total: this.state.total + 1, inRow: this.state.inRow + 1})
            document.getElementById(this.state.answer).classList.add('correct')

        }else{
            this.setState({result:'Try again...', inRow: 0});
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
        let choices= this.state.choices.map((x,i) => <div className= "form-check" id={i} key={i}><input className= "form-check-input"  id= {`Radio${i}`}type= 'radio' name= 'choicesRadio' data= 'select' onClick= {() => this.setState({ selected: i })} /><label className= "form-check-label"  htmlFor=  {'choicesRadio'+ i} dangerouslySetInnerHTML={{__html: this.handleConvert(x)}}></label></div>)
        let question = `<math>${this.handleConvert(this.state.question)}</math>`;
 
        return(
            <div id="buttons">            
                <button id ='start' class="btn animated bounce infinite" style= {display} onClick= {this.handleStart}>Let's Play!</button>
                <div id= 'question' style = {noDisplay}>

                    <h1 id="Evaluate">{this.state.instructions}</h1>
                     <h5>Total: {this.state.total}</h5>
                    <h4 dangerouslySetInnerHTML={{__html: question}}></h4>
                    {choices}
                    <div class="question-buttons">
                        <button id="question-submit" class=" btn btn-info" onClick= {this.handleSubmit}>Submit</button> <button id="question-next" class=" btn btn-info" onClick= {this.handleQuestionPost}>Next</button>
                    </div>
                    
                    <h3>{this.state.result}</h3>
                </div>
            </div>
        )
    }
}

export default QuestionGenerator;