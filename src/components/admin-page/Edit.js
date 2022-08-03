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
  const [count, setCount] = useState(0);
  const [range, setRange] = useState(count,count + 10);
  const [list, setList] = useState( props.quiz[0].questions)
    useEffect(() => {
      if(props.search === "" ) {
        setList(props.quiz[0].questions)
      } 
    },[props.quiz]);
     useEffect(() => {
      if(props.search === "" ) {
        props.setQuestions([])
        setList(props.quiz[0].questions);
      } 
    },[props.search]);
    useEffect(() => {
      if(props.search !== "" ) {
        let questions= [];
        for(let i =0; i < props.searchedQuestions.length; i++) {
          questions.push(props.searchedQuestions[i].questions);
        }
        setList(questions);
      } 

    },[props.searchedQuestions])

  // let list = props.quiz[0].questions; 
      const numberOfPages = Math.round(list.length/10);
      console.log(numberOfPages)
      console.log(range);
      
      // console.log("The total number of pages: " + numberOfPages);

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
console.log(range);
let subList = list.slice(range[0], range[1]);

let listItems;

listItems = subList.map((question, index) =>  <Form setQuestions = {props.setQuestions} search={props.search} indexOfAnswer={question.indexOfAnswer} setQuiz={props.setQuiz} quizId = {props.quiz[0]._id} id={question._id} key={question._id} question = {question.question} answerChoices = {question.answerChoices}/>)
 
return (
  <div>
    <div>{listItems}</div>
    <i onClick={decrementPage} class="fa-solid fa-arrow-left-long"></i>
  <i onClick={incrementPage} class="fa-solid fa-arrow-right-long"></i>
  </div>
)


}

export default function Edit (props) {
    const [quiz, setQuiz] = useState([{
      name: "",
      questions: [{question: "", answerChoices: ["", ""], indexOfAnswer: -1}],
      _id: ""
    }]);
    const [search, setSearch] = useState("");
    const [searchedQuestions, setQuestions] = useState([]);
    const {query} = useParams();
    const [blankQuestion, setBlankQuestion] = useState(<div className="add-user-container">
    <h5 className="circle-label">Add a new user</h5>
    <i onClick={addQuestion} class="fa-solid fa-circle-plus fa-xl"></i>
</div>)
    useEffect(() => {
      if (quiz[0].name === "") {
        getResponse();
      }});
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
      setBlankQuestion(<AddQuestion addQuestion={addQuestion} _id={quiz[0]._id} setBlankQuestion={setBlankQuestion}/>)

    }

      return(
      <div>
        <NavBar/>
        <h1>{quiz[0].name}</h1>
        <Query setQuestions = {setQuestions}quizId ={quiz[0]._id} setSearch = {setSearch} search={search}/>
         {blankQuestion}
          <i onClick={addQuestion} class="fa-solid fa-plus"></i>
          <Questions setQuestions = {setQuestions} search = {search} searchedQuestions = {searchedQuestions} setQuiz={setQuiz} quiz = {quiz}/>
      </div>)
      
     
      

}