import {useState, useEffect} from 'react';
import "./form.css";
import axios from "axios";
export default function AddQuestion(props) {
    const [answers, setAnswer] = useState(["","","",""]);
    const [question, setQues] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    function onClick(e) {
        props.setBlankQuestion(<div className="add-user-container">
        <h5 className="circle-label">Add a new question</h5>
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
        console.log(props.getResponse());
        props.setBlankQuestion(<div className="add-user-container">
        <h1>Question Added!</h1>
        <h5 className="circle-label">Add a new question</h5>
        <i onClick={props.addQuestion} class="fa-solid fa-circle-plus fa-xl"></i>
    </div>);
    }
    let answerList = answers.map((val,index) => <Answer setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer} name={index} onChange={onChange}/>);
    console.log(answerList);
    return(
    <div className='container'>
          <i onClick={onClick} className="fa-solid fa-trash questionDeletion"></i>
        <h1>Add Question</h1>
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <textarea className='form-control' onChange={setQuestion} ></textarea>
            </div>
        <h6>Select the correct answer: </h6>
    <div>{answerList}</div>
    <button className='btn btn-dark' type="submit">Add</button>
    </form>
    </div>
)}

function Answer(props) {
    const [style, setStyle] = useState("form-control ")
    const [clicked, setClick] = useState(false);
    function setCorrectAnswer() {
        
        if (props.selectedAnswer === props.name) {
            setStyle("form-control ");
            setClick(true);
            props.setSelectedAnswer(-1);
            //remove class
            console.log("selected");
        } else if(props.selectedAnswer === -1) {
            setClick(true);
            props.setSelectedAnswer(props.name);
            setStyle("form-control select");

        }
    }
console.log(props.selectedAnswer)
    useEffect(() => {
        if (props.selectedAnswer === props.index  && !clicked) {
            setStyle(style + "select");
        } 

    },[props.selectedAnswer])
    return(
    <div className="mb-1 row">
        <div className="col-lg-6">
            <input className={style} name={props.name} onClick={setCorrectAnswer} onChange={props.onChange} type="text"></input>
        </div>
    </div>
)

}