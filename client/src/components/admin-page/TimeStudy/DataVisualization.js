import NavBar from "../utilities/navbar";
import axios from "axios";
import {useState, UseEffect, useEffect} from 'react';
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import ProductionGraph from "./ProductionEfficiency";

export default function DataVisualization(props) {
    const [data, setData] = useState([]);

    useEffect(()=> {
        getData();

    },[])

    async function getData() {
        await axios.get('/api/v1/timer/users').then(res => {
            setData(res.data);
        }).catch(err => console.log(err));
    

    }

    function tableToCSV() {
 
        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            var csvrow = [];
            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                csvrow.push(cols[j].innerHTML);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }

        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file 
        downloadCSVFile(csv_data);

    }

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        var CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "time-study-data.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    }
    const list = data.map((object, item) => {
        return (
         <tr>
            <td>{new Date(object.dateCompleted).toLocaleDateString()+ " "  + new Date(object.dateCompleted).toLocaleTimeString()}</td>
            <td>{object.title}</td>
            <td>{object.user}</td>
            <td>{object.actualTotalTime/1000}</td>
            <td>{object.performedTotalTime/1000}</td>
            <td>{Math.round(object.performedTotalTime/object.actualTotalTime * 10000000)/100000}</td>
            <td>{object.standardWork}</td>
            <td>{Math.round(object.performedTotalTime/object.standardWork * 1000)/10000}</td>

        </tr>);
    });
    return(<div className="container">
        <NavBar/>
        <h2>Data Visualization</h2>
        <table className="table table-secondary table-striped">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Product</th>
                    <th>User</th>
                    <th>Actual Time</th>
                    <th>Total Time</th>
                    <th>% Labor Efficiency</th>
                    <th>Standard Work</th>
                    <th>% Production Efficiency</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
        <button onClick={tableToCSV} className="btn btn-warning">download</button>
        <br></br>
        <BarGraph data = {data}/>
        <LineGraph data = {data}/>
        <ProductionGraph data = {data}/>


    </div>)

}