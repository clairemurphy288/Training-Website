import axios from 'axios';
import {useState, useEffect} from 'react';


export default function Query(props) {
    const [search,setSearch] = useState("");
    useEffect(()=> {
        if (search.length === 0) {
            props.getUsers();
        }

    },[search])

    function onChange(e) {
        setSearch(e.target.value);
    }
    async function onSubmit(e) {
        await axios.post("/api/v1/query", {search: search}).then( async (response) => {
                if(response.data.length > 0) {
                    props.setUsers(response.data);
                }
            })
            .catch(function (error) {
      });
      props.setCount(0);
    }
    return(<div class="input-group">
      <input onChange={onChange} type="search" id="form1" class="form-control" />
    <button onClick={onSubmit} class="btn btn-warning">
      <i class="fas fa-search"></i>
    </button>
  </div>)
}