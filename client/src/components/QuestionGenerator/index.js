import React, {Component} from 'react';
import axios from 'axios';
import './questionStyle.css';
import Confetti from 'react-confetti'
   
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
        bonus: 0,
        warn: '',
        isSubmitted: false
    }
    
    handleQuestionPost = () => {
        let ans =  document.getElementById(this.state.answer)
        let sel= document.getElementById(this.state.selected)
        if(ans && sel){
            for(let i=0; i<5; i++){
                if(document.getElementById(i).classList[1]==='correct' || document.getElementById(i).classList[1]==='wrong'){  
                   document.getElementById(i).classList.remove('correct');
                   document.getElementById(i).classList.remove('wrong');
                }
            }
            document.getElementById('Radio'+this.state.selected).checked=false
                  
            axios.post('/auth/grades', {
                difficulty: this.state.difficulty,
                result: this.state.result
            }).then(result => console.log('successfully posted'))
            .catch(err => console.log(err));   
        }
        if(this.state.isSubmitted===true){
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
                    result: '',
                    bonus: 0,
                    warn: '',
                    selected: ''
                })
            })
            .catch(err => console.log(err));
            this.setState({isSubmitted: false})
        }else{
            this.setState({warn: "Can't skip the question"})
        }
        
        document.getElementById('bonus').style.display= 'none'
    }
    handleStart = (e) => {
        document.getElementById('question').setAttribute('style', display);
        e.target.style.display = 'none'
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
                result: '',
                bonus: 0
            })
        }).catch(err => console.log(err));
        document.getElementById('bonus').style.display= 'none'
    }
    handleConvert= (arr) => {
        let temp= arr.split('</mn><mn>').join('</sup>&frasl;<sub>');
        let temp2= temp.split('<mfrac><mn>').join('<mfrac><sup>');
        return temp2.split('</mn></mfrac>').join('</sub><mfrac>');
    }
    handleConffetiStop = () => {
        document.getElementById('confetti').style.display= 'none'
    }
    handleSubmit = () => {
        if(this.state.result=== ''){
            if(this.state.answer === this.state.selected){
                this.setState({result:'CORRECT!', warn: '', isSubmitted: true})
                const random= Math.floor(Math.random()*10)+1
                document.getElementById('confetti').style.display= 'block'
                setTimeout(this.handleConffetiStop, 3000);
                if(this.state.inRow%3===0 && this.state.inRow !==0){
                    this.setState({total: this.state.total + random, bonus: random, inRow: this.state.inRow + 1})
                    document.getElementById('bonus').style.display= 'block'
                }else{
                    this.setState({ total: this.state.total + 1, inRow: this.state.inRow + 1})
                }
                document.getElementById(this.state.answer).classList.add('correct')
                
            }else if(this.state.selected=== ''){
                this.setState({ warn: 'You must select one of the choices'})
            }else{
                this.setState({result:'Try again...', inRow: 0,warn: '', isSubmitted: true});
                document.getElementById(this.state.answer).classList.add('correct')
                document.getElementById(this.state.selected).classList.add('wrong');
            }
        } else this.setState({ warn: 'CHEATER!', result: ''})
       
    }
    render(){
        let choices= this.state.choices.map((x,i) => <div className= "form-check" id={i} key={i}><input className= "form-check-input"  id= {`Radio${i}`}type= 'radio' name= 'choicesRadio' data= 'select' onClick= {() => this.setState({ selected: i })} /><label className= "form-check-label"  htmlFor=  {'choicesRadio'+ i} dangerouslySetInnerHTML={{__html: this.handleConvert(x)}}></label></div>)
        let question = `<math>${this.handleConvert(this.state.question)}</math>`;
 
        return(
            
            <div id="buttons">    
                <Confetti id= 'confetti'/>        
                <button id ='start' className="btn animated bounce infinite" style= {display} onClick= {this.handleStart}>Let's Play!</button>
                <div id= 'question' style = {noDisplay}>
                    <h1 id="Evaluate">{this.state.instructions} Earthling</h1>
                    <h4 dangerouslySetInnerHTML={{__html: question}}></h4>
                    {choices}
                    <div className="question-buttons">
                        <button id="question-submit" className=" btn btn-info" onClick= {this.handleSubmit}>Submit</button> <button id="question-next" className=" btn btn-info" onClick= {this.handleQuestionPost}>Next</button>
                    </div>
                    <div ><h5 id="score">Score: {this.state.total}</h5></div>
                    <div id= 'bonus'><div id= 'bonus-p'>{this.state.bonus} BONUS POINTS</div></div>
                    <h3>{this.state.warn}</h3>
                    <h3>{this.state.result}</h3>
                </div>
            </div>
        )
    }
}

export default QuestionGenerator;