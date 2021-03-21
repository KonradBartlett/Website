import React, { Fragment, useEffect, useState } from 'react';
import { GetGameSheet } from '../../service/GameService';
import { DataTable, Column } from 'primereact/datatable';

export const MetaAnalysis = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        GetGameSheet().then(result => setData(result.MetaAnalysis.elements))
        console.log(data)

    }, [])

    return (
        <DataTable value={data}>
            <Column field='category' header='Meta Category' sortable />
            <Column field='count' header='Count' sortable />
            <Column field='average' header='Average' sortable />
        </DataTable>
    );
}
