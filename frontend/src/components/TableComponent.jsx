import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {useSelector} from "react-redux";
import {dataColumn} from "../data/data";
import App from "../TableComp";

function TableComponent({ history }) {
    const [columns, setColumns] = useState(dataColumn || []);

    const [data, setData] = useState([]);

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
    }, [userInfo])

    return (
        // <MaterialTable
        //     title="Таблиця навантаження викладачів К21"
        //     columns={columns}
        //     data={data}
        //     editable={{
        //         onRowAdd: newData =>
        //             new Promise((resolve, reject) => {
        //                 setTimeout(() => {
        //                     setData([...data, newData]);
        //
        //                     resolve();
        //                 }, 1000)
        //             }),
        //         onRowUpdate: (newData, oldData) =>
        //             new Promise((resolve, reject) => {
        //                 setTimeout(() => {
        //                     const dataUpdate = [...data];
        //                     const index = oldData.tableData.id;
        //                     dataUpdate[index] = newData;
        //                     setData([...dataUpdate]);
        //
        //                     resolve();
        //                 }, 1000)
        //             }),
        //         onRowDelete: oldData =>
        //             new Promise((resolve, reject) => {
        //                 setTimeout(() => {
        //                     const dataDelete = [...data];
        //                     const index = oldData.tableData.id;
        //                     dataDelete.splice(index, 1);
        //                     setData([...dataDelete]);
        //
        //                     resolve()
        //                 }, 1000)
        //             }),
        //     }}
        // />
        <App/>
    )
}

export default TableComponent
