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

    render(){
        let choices= this.state.choices.map((x,i) => <div className= "form-check" key={i}><input className= "form-check-input" type= 'radio' name= 'choicesRadio' value={i}/><label className= "form-check-label" for=  {'choicesRadio'+ i} dangerouslySetInnerHTML={{__html: x}}></label></div>)
        let question = `<math>${this.state.question}</math>`
        return(
            <div>
                <button onClick= {this.handleQuestionPost}>Get a question</button>
                <h1>Instructions: {this.state.instructions}</h1>
                <h3 dangerouslySetInnerHTML={{__html: question}}></h3>
                {choices}
                <button onClick= {console.log(this.state.answer)}>Submit</button>
            </div>
        )
    }
}

export default QuestionGenerator;