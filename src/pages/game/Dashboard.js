import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { GetGameSheet } from '../../service/GameService';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './dashboard.scss';

export const Dashboard = () => {

    const [data, setData] = useState();
    const [remaining, setRemaining] = useState([]);
    const [best, setBest] = useState([]);
    const [worst, setWorst] = useState([]);
    const [randomLabel, setRandomLabel] = useState('Select a Random Game');

    useEffect(() => {

        GetGameSheet().then(result => {
            setData(result.Analytics.elements[0])
            setRemaining(result.Remaining.elements)
            let tempBest = [];
            result.Best.elements.map((item, i) => {
                tempBest.push(<div className="bestWorst" key={`best${i}`}>{item.best}</div>)
            })
            setBest(tempBest)

            let tempWorst = [];
            result.Worst.elements.map((item, i) => {
                tempWorst.push(<div className="bestWorst" key={`worst${i}`}>{item.worst}</div>)
            })
            setWorst(tempWorst)
        })

    }, [])

    const setRandom = () => {
        if (remaining.length > 0)
            setRandomLabel(remaining[Math.floor(Math.random() * remaining.length)].remaining)
    }

    return (
        <div className="dashboard">
            <div className="top">
                <div className="left">
                    <CircularProgressbar value={data ? data.Progress : 0} text={`${data ? data.Progress : 0}%`} />
                    <div>
                        <h3>GamesCompleted: {data && data.Complete}</h3>
                        <h3>Remaining: {data && data.Remaining}</h3>
                        <h3>Total Time Played (m): {data && data.TotalTime}</h3>
                        <h3>Last Game Played: {data && data.LastGame}</h3>
                    </div>
                </div>

                <div className="right">
                    <Button label={randomLabel} onClick={setRandom} />
                </div>

            </div>
            <div className="center">

                <div className="card">
                    <h3>Games Finished: {data && data.GamesFinished}</h3>
                    <h3>Games Quit: {data && data.GamesQuit}</h3>
                    <h3>Days Since Start: {data && data.DaysSinceStart}</h3>
                    <h3>Average Days per Game: {data && data.AverageDays}</h3>
                    <h3>Projected Days Remaining: {data && data.ProjectedDaysRemaining}</h3>
                    <h3>Projected End Date: {data && data.ProjectedEndDate}</h3>
                </div>
                <div className="card">
                    <h3>Average Time (m): {data && data.AverageTime}</h3>
                    <h3>Average Score: {data && data.AverageScore}</h3>
                    <h3>Median Score: {data && data.MedianScore}</h3>
                    <h3>Average Deviation: {data && data.AverageScoreDeviation}</h3>
                    <h3>Min Deviation: {data && data.MinScoreDeviation}</h3>
                    <h3>Max Deviation: {data && data.MaxScoreDeviation}</h3>
                </div>
                <div className="card">
                    <h3>Best Games:</h3>
                    {best}
                </div>
                <div className="card">
                    <h3>Worst Games:</h3>
                    {worst}
                </div>
            </div>
        </div>
    );
}
