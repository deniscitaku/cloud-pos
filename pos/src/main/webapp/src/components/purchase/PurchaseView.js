import React, {useEffect, useRef, useState} from 'react';
import PurchaseHeader from "./PurchaseHeader";
import PurchaseTable from "./PurchaseTable";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProgressButton from "../common/ProgressButton";
import {useDispatch, useSelector} from "react-redux";
import {AxiosInventoryMovementClient, MovementKind, Status} from "../../client/Client";
import {resetInventoryMovement, setInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import Summary from "../sale/Summary";
import store from "../../store"
import {useMutation, useQuery, useQueryClient} from "react-query";
import OpenExistingDialog from "./open-existing/OpenExistingDialog";

const inventoryMovementService = new AxiosInventoryMovementClient();
const movementKind = MovementKind.PURCHASE;

const lineColumns = [
    {title: 'Code', field: "product.code"},
    {title: 'Name', field: "product.name"},
    {title: 'Price buy', field: "priceBuy"},
    {title: 'Qty', field: "quantity"},
];

export default function PurchaseView() {

    console.log("Inside PurchaseView!");

    const [open, setOpen] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [isDisabledPurchaseButton, setDisableCloseButton] = useState(false);
    const searchProductRef = useRef();
    const queryClient = useQueryClient();

    const purchase = useSelector(x => x.inventoryMovement.get(movementKind));
    const dispatch = useDispatch();

    const {data: openedInventoryMovement, isLoading} = useQuery(["INVENTORY_MOVEMENT", Status.OPENED], () => inventoryMovementService
            .findByKindAndStatus(movementKind, Status.OPENED)
            .then(x => x.data), {
            onSuccess: (data) => {
                if (data && data.length) {
                    setOpen(true)
                }
            }
        });

    const {mutate: openInventoryMovement, status: openPurchaseStatus} = useMutation(() => inventoryMovementService
        .openInventoryMovement('1', movementKind)
        .then(x => x.data), {
        onSuccess: (data) => setInventoryMovement(data, dispatch),
    });

    const {mutate: closeInventoryMovement, status: closeInventoryMovementStatus, reset} = useMutation(() => inventoryMovementService
        .closeInventoryMovement(store.getState().inventoryMovement.get(movementKind))
        .then(x => x.data), {
        onSuccess: () => {
            resetInventoryMovement(movementKind, dispatch);
            openInventoryMovement();
            setTimeout(reset, 1000);
        },
    });

    const {mutate: deleteInventoryMovement, isLoading: deleteIsLoading} = useMutation(id => inventoryMovementService.deleteById(id), {
        onSuccess: (data, variables) => queryClient.setQueryData(["INVENTORY_MOVEMENT", Status.OPENED], x => x.filter(x => x.id !== variables))
    });

    useEffect(() => {
        openInventoryMovement()
    }, []);

    return (
        <>
            {openPurchaseStatus === 'success' &&
            (
                <>
                    <PurchaseHeader searchProductRef={searchProductRef}
                                    sequenceNumber={purchase.sequence}
                                    setTableLoading={setTableLoading}
                                    openedInventoryMovementSize={openedInventoryMovement.length}
                                    setOpen={setOpen}
                    />
                    <PurchaseTable searchProductRef={searchProductRef}
                                   tableLoading={tableLoading}
                                   setTableLoading={setTableLoading}
                                   setDisableCloseButton={setDisableCloseButton}
                    />
                    <Summary total={purchase.inventoryMovementLines.map(x => x.amount).reduce((a, b) => a + b, 0)}/>
                    <ProgressButton size="large"
                                    icon={<ShoppingBasketIcon style={{fontSize: "4em"}}/>}
                                    disabled={!purchase.inventoryMovementLines.length || !purchase.supplier || isDisabledPurchaseButton || tableLoading}
                                    success={closeInventoryMovementStatus === 'success'}
                                    loading={closeInventoryMovementStatus === 'loading'}
                                    onClick={closeInventoryMovement}/>
                    {!isLoading && <OpenExistingDialog open={open}
                                                       setOpen={setOpen}
                                                       dialogTitle="Opened purchases"
                                                       icon={<ShoppingBasketIcon/>}
                                                       data={openedInventoryMovement}
                                                       linesField='inventoryMovementLines'
                                                       titleField='supplier.name'
                                                       lineColumns={lineColumns}
                                                       isLoading={deleteIsLoading}
                                                       onTileClick={x => setInventoryMovement(x, dispatch)}
                                                       onCloseClick={x => deleteInventoryMovement(x.id)}
                    />}
                </>
            )
            }
        </>
    );
};