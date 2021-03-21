import React, { Fragment, useEffect, useState } from 'react';
import { GetGameSheet } from '../../service/GameService';
import { DataTable, Column } from 'primereact/datatable';
import Papa from 'papaparse';

// const public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_zs17cHr44850qFQ0CESNMn9rhhDtll1hWfOmLYhNlvF1S6JyQ-D9zS4lSp0KYHGd7bWtlYUrO9yj/pubhtml';

export const Reviews = () => {

    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);


    const reviewTemplate = (data) => {
        return data.review
    }

    useEffect(() => {
        //     Papa.parse(public_spreadsheet_url, {
        //         download: true,
        //         header: true,
        //         complete: showInfo
        //     })

        GetGameSheet().then(result => setData(result.Reviews.elements));
        var temp = data.sort(function (a, b) {
            return a.title - b.title
        })
        console.log(temp)

    }, [])

    // const showInfo = (results) => {
    //     console.log(results);
    //     setData(results.data)
    // }

    const scoreTemplate = (data) => {
        return <div style={{ backgroundColor: `rgb(${200 - data.score * 15},${data.score * 20},0)`, textAlign: 'center', padding: '7px', width: '50px', fontWeight: 'bold', fontSize: '20px' }}>{data.score}</div>
    }

    const deviationTemplate = (data) => {
        return <div style={{ backgroundColor: `rgb(${100 - data.deviation * 15},${data.deviation * 30},0)`, textAlign: 'center', padding: '7px', width: '90px', fontWeight: 'bold', fontSize: '20px' }}>{data.deviation}</div>
    }

    return (
        <DataTable value={data} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={reviewTemplate} dataKey="complete">
            <Column expander style={{ width: '10px' }} />
            <Column field='end' header='End' sortable style={{ width: '90px' }} />
            <Column field='complete' header='Title' sortable />
            <Column field='date' header='Date' sortable style={{ width: '110px' }} />
            <Column field='score' header='Score' body={scoreTemplate} sortable style={{ width: '110px' }} />
            <Column field='deviation' header='Deviation' body={deviationTemplate} sortable style={{ width: '140px' }} />
            <Column field='time' header='Time Played (m)' sortable style={{ width: '200px' }} />
        </DataTable>
    );
}
