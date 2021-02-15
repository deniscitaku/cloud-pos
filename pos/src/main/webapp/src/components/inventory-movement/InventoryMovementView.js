import React, {useContext, useEffect, useRef, useState} from 'react';
import InventoryMovementHeader from "./InventoryMovementHeader";
import InventoryMovementTable from "./InventoryMovementTable";
import ProgressButton from "../common/ProgressButton";
import {useDispatch, useSelector} from "react-redux";
import {AxiosInventoryMovementClient, MovementKind, QueryKeys, Status} from "../../client/Client";
import {resetInventoryMovement, setInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import Summary from "../sale/Summary";
import store from "../../store"
import {useIsFetching, useMutation, useQuery} from "react-query";
import CustomBackdrop from "../common/CustomBackdrop";
import ReturnSupplierContext from "./return-supplier/ReturnSupplierContext";

const inventoryMovementService = new AxiosInventoryMovementClient();

export default function InventoryMovementView({movementKind, Icon}) {

    console.log("Inside InventoryMovementView: ", movementKind);

    const returnSupplierContext = useContext(ReturnSupplierContext);

    const [tableLoading, setTableLoading] = useState(false);
    const [isDisableCloseButton, setDisableCloseButton] = useState(false);
    const searchProductRef = useRef();
    const qtyRef = useRef();

    const inventoryMovement = useSelector(x => x.inventoryMovement.get(movementKind));
    const dispatch = useDispatch();

    const isFetching = useIsFetching([QueryKeys.INVENTORY_MOVEMENT, movementKind, Status.OPENED]);
    const {data: openedInventoryMovement, status: openedInventoryMovementStatus} = useQuery([QueryKeys.INVENTORY_MOVEMENT, movementKind, Status.OPENED], () => inventoryMovementService
        .findByKindAndStatus(movementKind, Status.OPENED, {include: 'stock'})
        .then(x => x.data), {
        refetchOnMount: true,
    });

    const {mutate: openInventoryMovement, isLoading: openInventoryMovementLoading} = useMutation(() => inventoryMovementService
        .openInventoryMovement('1', movementKind)
        .then(x => x.data), {
        onSuccess: (data) => setInventoryMovement(data, dispatch)
    });

    const {mutate: closeInventoryMovement, status: closeInventoryMovementStatus, reset} = useMutation(() => inventoryMovementService
        .closeInventoryMovement(store.getState().inventoryMovement.get(movementKind))
        .then(x => x.data), {
        onSuccess: () => {
            if (movementKind === MovementKind.RETURN_SUPPLIER) {
                resetInventoryMovement(movementKind, dispatch);
                returnSupplierContext.onCloseSuccess();
            } else {
                resetInventoryMovement(movementKind, dispatch);
                openInventoryMovement();
                setTimeout(reset, 1000);
            }
        },
    });

    useEffect(() => {
        if (openedInventoryMovementStatus === 'success') {
            if (openedInventoryMovement) {
                setInventoryMovement(openedInventoryMovement, dispatch);
            } else {
                openInventoryMovement();
            }
        }
    }, [isFetching]);

    return (
        <>
            {openInventoryMovementLoading || isFetching ?
                <CustomBackdrop/> :
                (
                    <>
                        <InventoryMovementHeader movementKind={movementKind}
                                                 searchProductRef={searchProductRef}
                                                 sequenceNumber={inventoryMovement.sequence}
                                                 setTableLoading={setTableLoading}
                        />
                        <InventoryMovementTable movementKind={movementKind}
                                                searchProductRef={searchProductRef}
                                                tableLoading={tableLoading}
                                                setTableLoading={setTableLoading}
                                                setDisableCloseButton={setDisableCloseButton}
                        />
                        {movementKind === MovementKind.PURCHASE &&
                        <Summary total={inventoryMovement.inventoryMovementLines.map(x => x.amount).reduce((a, b) => a + b, 0)}/>}
                        <ProgressButton size="large"
                                        Icon={Icon}
                                        disabled={!inventoryMovement.inventoryMovementLines.length || isDisableCloseButton || tableLoading || ((movementKind === MovementKind.PURCHASE || movementKind === MovementKind.RETURN_SUPPLIER) && !inventoryMovement.supplier?.id)}
                                        success={closeInventoryMovementStatus === 'success'}
                                        loading={closeInventoryMovementStatus === 'loading'}
                                        onClick={closeInventoryMovement}/>
                    </>
                )
            }
        </>
    );
};