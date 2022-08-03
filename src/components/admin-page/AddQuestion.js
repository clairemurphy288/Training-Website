import {useState, useEffect} from 'react';
import "./form.css";
import axios from "axios";
export default function AddQuestion(props) {
    const [answers, setAnswer] = useState(["","","",""]);
    const [question, setQues] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    function onClick(e) {
        props.setBlankQuestion(<div className="add-user-container">
        <h5 className="circle-label">Add a new user</h5>
        <i onClick={props.addQuestion} class="fa-solid fa-circle-plus fa-xl"></i>
    </div>)
    }
    function onChange(e) {
        const copy = [];
        for(let i = 0; i < answers.length; i++) {
            copy.push(answers[i])
        }
        console.log(e.target);
        copy[e.target.name] = e.target.value;
        setAnswer(copy);
    }
    function setQuestion(e) {
        setQues(e.target.value);

    }
    async function onSubmit(e) {
        e.preventDefault();
        const newQuestion = {
            question: question,
            answerChoices:answers,
            indexOfAnswer:selectedAnswer
        }
        await axios.post('http://localhost:5000/admin/add', {question: newQuestion, _id: props._id}).then(async res => {
            console.log(res.data);

           }).catch(err => console.log(err));
    }
    let answerList = answers.map((val,index) => <Answer setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer} name={index} onChange={onChange}/>);
    console.log(answerList);
    return(
    <div>
        <h1>Add Question</h1>
        <form onSubmit={onSubmit}>
             <textarea onChange={setQuestion} cols="50" rows="10"></textarea>
  <i onClick={onClick} className="fa-solid fa-trash-can questionDeletion"></i>
        <h6>Select the correct answer: </h6>
    <div>{answerList}</div>
    <button type="submit">Add</button>
    <hr></hr>
    </form>
    </div>)
}

function Answer(props) {
    const [style, setStyle] = useState("")
    const [clicked, setClick] = useState(false);
    function setCorrectAnswer() {
        
        if (props.selectedAnswer === props.name) {
            setStyle("");
            setClick(true);
            props.setSelectedAnswer(-1);
            //remove class
            console.log("selected");
        } else if(props.selectedAnswer === -1) {
            setClick(true);
            props.setSelectedAnswer(props.name);
            setStyle("select");

        }
    }

    useEffect(() => {
        if (props.selectedAnswer === props.index  && !clicked) {
            setStyle(style + "select");
        } 

    },[props.selectedAnswer])
    return(<input className={style} name={props.name} onClick={setCorrectAnswer} onChange={props.onChange} type="text"></input>)

}