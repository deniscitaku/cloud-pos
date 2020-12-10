import React, {useState} from "react";
import {useDeleteAll} from "../../hooks/useFetch";
import {fetchPromise} from "../../services/fetch";
import MaterialTable from "material-table";
import GradientButton from "./GradientButton";
import ConfirmationDialog from "./ConfirmationDialog";

function Table({title, addNewLabel, addNewIcon, onAddNew, tableRef, errorsRef, service, findAllPagedExtraArgs, columns}) {
    console.log("Table rendered!");

    const [yesNoDialog, setYesNoDialog] = useState({open: false, itemsToRemove: []});
    const [deleteAll, loading] = useDeleteAll(data => service.deleteAll(data));

    function data(query) {
        console.log("Query: ", query);
        const queryParams = {
            page: query.page,
            size: query.pageSize
        };
        if (query.orderBy) {
            queryParams.sortBy = query.orderBy.field;
            queryParams.direction = query.orderDirection;
        }
        if (query.search) {
            queryParams.search = query.search;
        }
        return service.findAllPaged({...queryParams, ...findAllPagedExtraArgs}).then(x => x.data)
    }

    function deleteSelectedOnAction(evt, data) {
        setYesNoDialog({open: true, itemsToRemove: data});
    }

    function handleDeleteSelected() {
        deleteAll(yesNoDialog.itemsToRemove)
            .then(() => {
                setYesNoDialog(prevState => ({...prevState, open: false}));
                refreshTable();
            });
    }

    function onRowUpdate(newValue) {
        return fetchPromise(service.update(newValue), e => {
            errorsRef.current = e;
            return Promise.reject();
        }).then(x => {
            errorsRef.current = [];
            return x;
        });
    }

    function onUpdateCancelled() {
        errorsRef.current = [];
    }

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <MaterialTable
                localization={{
                    header: {
                        actions: ''
                    }
                }}
                tableRef={tableRef}
                style={{
                    height: "100%"
                }}
                title={title}
                columns={columns()}
                data={data}
                options={{
                    searchFieldStyle: {
                        marginRight: "2em"
                    },
                    paginationType: "stepped",
                    debounceInterval: 500,
                    grouping: true,
                    pageSize: 10,
                    actionsColumnIndex: -1,
                    selection: true,
                    draggable: true,
                    maxBodyHeight: "100%",
                    rowStyle: {
                        padding: 10,
                    },
                    headerStyle: {
                        padding: 10,
                    }
                }}
                actions={[
                    {
                        icon: () => <GradientButton startIcon={addNewIcon()}>{addNewLabel}</GradientButton>,
                        isFreeAction: true,
                        onClick: onAddNew,
                    },
                    {
                        tooltip: 'Remove selected rows',
                        icon: 'delete',
                        onClick: deleteSelectedOnAction
                    }
                ]}
                editable={{
                    onRowUpdate: onRowUpdate,
                    onRowUpdateCancelled: onUpdateCancelled
                }}
            />
            <ConfirmationDialog title={"Are you sure want do delete all selected records?"}
                                content={`There are (${yesNoDialog.itemsToRemove.length}) records to be deleted`}
                                open={yesNoDialog.open}
                                handleClose={() => setYesNoDialog(prevState => ({...prevState, open: false}))}
                                handleConfirmation={handleDeleteSelected}
                                loading={loading}
            />
        </>
    );
}

export default React.memo(Table);