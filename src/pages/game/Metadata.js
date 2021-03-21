import React, { Fragment, useEffect, useState } from 'react';
import { GetGameSheet } from '../../service/GameService';
import { DataTable, Column } from 'primereact/datatable';

export const Metadata = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        //     Papa.parse(public_spreadsheet_url, {
        //         download: true,
        //         header: true,
        //         complete: showInfo
        //     })

        GetGameSheet().then(result => setData(result.Metadata.elements.filter(x => x.title !== "")))
        console.log(data)

    }, [])

    return (
        <DataTable value={data}>
            <Column field='title' header='Title' sortable />
            <Column field='metacritic' header='Metacritic' sortable />
            <Column field='genre' header='Genre' sortable />
            <Column field='platform' header='Platform' sortable />
            <Column field='release' header='Release' sortable />
            <Column field='developer' header='Developer' sortable />
            <Column field='publisher' header='Publisher' sortable />
            <Column field='indie' header='Indie' sortable />
        </DataTable>
    );
}
