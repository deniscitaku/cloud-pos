import React, {lazy, useEffect, useState} from "react";
import ReturnSupplierHeader from "./ReturnSupplierHeader";
import {
    AxiosInventoryMovementClient,
    InventoryMovementPayload,
    MovementKind,
    QueryKeys,
    Status
} from "../../../client/Client";
import {useMutation, useQuery, useQueryClient} from "react-query";
import ReturnSupplierGridList from "./ReturnSupplierGridList";
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import CustomBackdrop from "../../common/CustomBackdrop";
import ReturnSupplierContext from "./ReturnSupplierContext";

const InventoryMovementView = lazy(() => import("../InventoryMovementView"));

const movementKind = MovementKind.RETURN_SUPPLIER;
const inventoryMovementService = new AxiosInventoryMovementClient();

export default function ReturnSupplierView({}) {

    // Sets initial date 10 days before from now
    const [fromDate, setFromDate] = useState(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [supplierId, setSupplierId] = useState();
    const [isPurchasePicked, setIsPurchasePicked] = useState(false);

    const queryClient = useQueryClient();

    const {data: openedReturnSupplier, status: openedReturnSupplierStatus} = useQuery([QueryKeys.INVENTORY_MOVEMENT, movementKind, Status.OPENED], () => inventoryMovementService
        .findByKindAndStatus(movementKind, Status.OPENED, {include: 'stock'})
        .then(x => x.data));

    const {mutate: findPurchases, data, isLoading} = useMutation((queryParams) =>
        inventoryMovementService
            .findAllPagedByKind(MovementKind.PURCHASE, queryParams)
            .then(x => x.data.data));

    const {mutate: saveReturnSupplier, isLoading: saveReturnSupplierLoading} = useMutation(x =>
            inventoryMovementService.create(x, {include: 'stock'})
                .then(x => x.data),
        {
            onSuccess: (data) => {
                queryClient.setQueryData([QueryKeys.INVENTORY_MOVEMENT, movementKind, Status.OPENED], () => data);
                setIsPurchasePicked(true);
            }
        }
    );

    const {mutate: deleteOpenedReturnSupplier, isLoading: deleteLoading} = useMutation(id => inventoryMovementService.deleteById(id), {
        onSuccess: () => {
            queryClient.setQueryData([QueryKeys.INVENTORY_MOVEMENT, movementKind, Status.OPENED], () => undefined);
            setIsPurchasePicked(false);
        }
    });

    useEffect(() => {
        findPurchases({from: fromDate, to: toDate, supplierId: supplierId});
    }, [fromDate, toDate, supplierId]);

    useEffect(() => {
        openedReturnSupplier && setIsPurchasePicked(true);
    }, [openedReturnSupplier]);

    function handlePurchaseClick(purchase) {
        saveReturnSupplier(new InventoryMovementPayload({
            kind: movementKind,
            supplier: purchase.supplier,
            inventoryMovementLines: purchase.inventoryMovementLines.map(x => ({...x, id: null})),
            status: Status.OPENED,
            location: purchase.location // TODO get user location
        }))
    }

    return (
        <>
            {openedReturnSupplierStatus !== 'success' || saveReturnSupplierLoading || deleteLoading ?
                <CustomBackdrop/>
                :
                isPurchasePicked ?
                    <ReturnSupplierContext.Provider value={{onCloseSuccess: () => setIsPurchasePicked(false), backToSearch: () => deleteOpenedReturnSupplier(openedReturnSupplier.id)}}>
                        <InventoryMovementView movementKind={movementKind}
                                               Icon={AssignmentReturnIcon}
                        />
                    </ReturnSupplierContext.Provider>
                    :
                    <>
                        <ReturnSupplierHeader fromDate={fromDate}
                                              toDate={toDate}
                                              setFromDate={setFromDate}
                                              setToDate={setToDate}
                                              setSupplierId={setSupplierId}
                        />
                        <ReturnSupplierGridList data={data} loading={isLoading} onPurchaseClick={handlePurchaseClick}/>
                    </>
            }
        </>
    );
}