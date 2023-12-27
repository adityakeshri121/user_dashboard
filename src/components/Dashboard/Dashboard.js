import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './Dashboard.css'
import data from '../../data.json'
const Dashboard = () => {

    const userLoggedIn = useSelector(state => state.userSlice);

    const [userData] = useState(data.users);
    const [mean, setMean] = useState(null);
    const [median, setMedian] = useState(null);
    const [mode, setMode] = useState(null);

    const calculateMean = (columnName) => {
        const columnValues = userData.map((row) => row[columnName]);
        const sum = columnValues.reduce((acc, val) => acc + val, 0);
        const meanValue = sum / columnValues.length;
        setMean(meanValue);
    }

    const calculateMedian = (columnName) => {
        const columnValues = userData.map((row) => row[columnName]).sort((a, b) => a - b);
        const middle = Math.floor(columnValues.length / 2);
        const medianValue =
            columnValues.length % 2 === 0
                ? (columnValues[middle - 1] + columnValues[middle]) / 2
                : columnValues[middle];
        console.log(medianValue)
        setMedian(medianValue)
    }

    const calculateMode = (columnName) => {
        const columnValues = userData.map((row) => row[columnName]);
        const occurrences = {};
        let maxCount = 0;
        let modeValue;

        columnValues.forEach((value) => {
            occurrences[value] = (occurrences[value] || 0) + 1;
            if (occurrences[value] > maxCount) {
                maxCount = occurrences[value];
                modeValue = value;
            }
        });

        setMode(modeValue);
    };


    const handleHeaderClick = (columnName) => {
        calculateMean(columnName);
        calculateMedian(columnName);
        calculateMode(columnName);
    };
    return (
        <div>
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th className='cursor' onClick={() => handleHeaderClick('age')}>Age</th>
                            <th className='cursor' onClick={() => handleHeaderClick('score')}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user =>
                            <tr style={user.name.toLocaleLowerCase() === userLoggedIn.toLocaleLowerCase() ? { backgroundColor: 'green' }
                                : {}
                            } key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {
                mean !== null ?
                    (<div className='calculations'>
                        <h4>Mean: {mean}  </h4>
                        <h4>Median :{median} </h4>
                        <h4>Mode :{mode} </h4>
                    </div>) : (<h6 className='message'>*click on age/score column header to view Mean,Meadia,Mode.</h6>)
            }
        </div>

    )
}

export default Dashboard