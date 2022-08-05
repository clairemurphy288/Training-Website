import react from 'react';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import "./edit.css";
import Form from './form-edit.js'
import Query from './query.js'
import AddQuestion from './AddQuestion';
import NavBar from "./utilities/navbar";

export function Questions (props) {
     useEffect(() => {
      if(props.search === "" ) {
        props.setQuestions([])
        props.setList(props.quiz[0].questions);
      } 
    },[props.search]);
    useEffect(() => {
      if(props.search !== "" ) {
        let questions= [];
        for(let i =0; i < props.searchedQuestions.length; i++) {
          questions.push(props.searchedQuestions[i].questions);
        }
        props.setList(questions);
      } 

    },[props.searchedQuestions])

    console.log(props.list)
let subList = props.list.slice(props.range[0], props.range[1]);

let listItems;

listItems = subList.map((question, index) =>  <Form setQuestions = {props.setQuestions} search={props.search} indexOfAnswer={question.indexOfAnswer} setQuiz={props.setQuiz} quizId = {props.quiz[0]._id} id={question._id} key={question._id} question = {question.question} answerChoices = {question.answerChoices}/>)
 
return (
  <div>
    <div>{listItems}</div>
    <hr></hr>
    <div className= "mb-3 px-3 d-flex justify-content-between">
      <i onClick={props.decrementPage} class="fa-solid fa-arrow-left-long fa-xl arrow-icon"></i>
      <i onClick={props.incrementPage} class="fa-solid fa-arrow-right-long fa-xl arrow-icon"></i>
    </div>

  </div>
)


}

export default function Edit (props) {
    const [quiz, setQuiz] = useState([{
      name: "",
      questions: [{question: "", answerChoices: ["", ""], indexOfAnswer: -1}],
      _id: ""
    }]);
    const [count, setCount] = useState(0);
    const [range, setRange] = useState(count,count + 10);
    const [search, setSearch] = useState("");
    const [searchedQuestions, setQuestions] = useState([]);
    const {query} = useParams();
    const [list, setList] = useState(quiz[0].questions)
    const [blankQuestion, setBlankQuestion] = useState(<div className="add-user-container">
    <h5 className="circle-label">Add a new </h5>
    <i onClick={addQuestion} class="fa-solid fa-circle-plus fa-xl"></i>
</div>)
    useEffect(() => {
      if (quiz[0].name === "") {
        getResponse();
      }});

useEffect(() => {
  if(search === "" ) {
    setList(quiz[0].questions)
  } 
},[quiz]);

const numberOfPages = Math.round(list.length/10);

function incrementPage() {
  if (count < numberOfPages - 1) {
    setCount(count + 1);
  }
}
function decrementPage() {
  if (count > 0) {
  setCount(count - 1);

  }
}
useEffect(() => {
  setRange([count*10, count*10 + 10]);
}, [count]);

     const getResponse = async ()=> {
      await axios.post("http://localhost:5000/admin/edit", {query: query}).then( async (response) => {
          let ResData = await response.data;
          setQuiz(ResData)
          })
          .catch(function (error) {
    });
     }
    function addQuestion(e) {
      console.log("add");
      setBlankQuestion(<AddQuestion getResponse={getResponse} addQuestion={addQuestion} _id={query} setBlankQuestion={setBlankQuestion}/>)

    }

      return(
      <div>
        <NavBar/>
        <div className='container'>
          <h1>{quiz[0].name}</h1>
          <Query  setQuestions = {setQuestions} quizId ={query} setSearch = {setSearch} search={search}/>
          {blankQuestion}
        </div>
        <div className= "mb-3 px-3 d-flex justify-content-between">
          <i onClick={decrementPage} class="fa-solid fa-arrow-left-long fa-xl arrow-icon"></i>
          <i onClick={incrementPage} class="fa-solid fa-arrow-right-long fa-xl arrow-icon"></i>
        </div>
          <hr></hr>
          <Questions incrementPage={incrementPage} decrementPage={decrementPage} list={list}  range={range} setList={setList} setQuestions = {setQuestions} search = {search} searchedQuestions = {searchedQuestions} setQuiz={setQuiz} quiz = {quiz}/>
      </div>)
      
     
      

}