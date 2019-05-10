import React, {Component} from 'react';
import axios from 'axios';

class QuestionGenerator extends Component{
    state= {
        instructions:'',
        question: '',
        choices: [],
        answer:'',
        difficulty:''
    }

    handleQuestionPost = () => {
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
            difficulty
        })
     })
     .catch(err => console.log(err))
    }
    handleConvert= (arr) => {
        let temp= arr.split('</mn><mn>').join('</sup>&frasl;<sub>');
        let temp2= temp.split('<mfrac><mn>').join('<mfrac><sup>');
        return temp2.split('</mn></mfrac>').join('</sub><mfrac>');
    }
// <math><sup>1</sup>&frasl;<sub>10</sub></math>
    render(){
        let choices= this.state.choices.map((x,i) => <div className= "form-check" key={i}><input className= "form-check-input" type= 'radio' name= 'choicesRadio' value={i}/><label className= "form-check-label" htmlFor=  {'choicesRadio'+ i} dangerouslySetInnerHTML={{__html: this.handleConvert(x)}}></label></div>)
        let question = `<math>${this.handleConvert(this.state.question)}</math>`;
        console.log(question)
 
        return(
            <div>            
                <button onClick= {this.handleQuestionPost}>Get a question</button>
                <h1>{this.state.instructions}</h1>
                <h3 dangerouslySetInnerHTML={{__html: question}}></h3>
                {choices}
                <button onClick= {console.log(this.state.answer)}>Submit</button>
           
            </div>
        )
    }
}

export default QuestionGenerator;