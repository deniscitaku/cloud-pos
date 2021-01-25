import React, {lazy, useRef, useState} from "react";
import {fetchPromise} from "../../services/fetch";
import MaterialTable from "material-table";
import GradientButton from "./GradientButton";
import {useMutation, useQueryClient} from "react-query";

const ConfirmationDialog = lazy(() => import("./ConfirmationDialog"));

function CustomTable({title, addNewLabel, addNewIcon, onAddNew, tableRef, errorsRef, service, findAllPagedExtraArgs, columns, queryKey}) {
    console.log("CustomTable rendered!");

    const [yesNoDialog, setYesNoDialog] = useState({open: false, itemsToRemove: []});
    const queryClient = useQueryClient();

    const pageSize = useRef(20);
    const {mutate: deleteAll, isLoading} = useMutation(data => service.deleteAll(data), {
        onSuccess: () => {
            setYesNoDialog({itemsToRemove: [], open: false});
            tableRef.current && tableRef.current.onQueryChange();
            queryClient.setQueryData(
                queryKey,
                old => (old || []).filter(x => !yesNoDialog.itemsToRemove.includes(x))
            );
        }
    });

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
        pageSize.current = query.pageSize;

        return service.findAllPaged({...queryParams, ...findAllPagedExtraArgs}).then(x => x.data)
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

    return (
        <div>
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
                    pageSize: pageSize.current,
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
                        icon: () => <GradientButton startIcon={addNewIcon.current}>{addNewLabel}</GradientButton>,
                        isFreeAction: true,
                        onClick: onAddNew,
                    },
                    {
                        tooltip: 'Remove selected rows',
                        icon: 'delete',
                        onClick: (evt, data) => setYesNoDialog({open: true, itemsToRemove: data})
                    }
                ]}
                editable={{
                    onRowUpdate: onRowUpdate,
                    onRowUpdateCancelled: () => errorsRef.current = []
                }}
            />
            {yesNoDialog.open && <ConfirmationDialog title={"Are you sure want do delete all selected records?"}
                                content={`There are (${yesNoDialog.itemsToRemove.length}) records to be deleted`}
                                open={yesNoDialog.open}
                                handleClose={() => setYesNoDialog(prevState => ({...prevState, open: false}))}
                                handleConfirmation={() => deleteAll(yesNoDialog.itemsToRemove)}
                                loading={isLoading}
            />}
        </div>
    );
}

export default React.memo(CustomTable);