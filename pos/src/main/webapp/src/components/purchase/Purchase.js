import React, {useCallback, useEffect, useRef} from 'react';
import PurchaseHeader from "./PurchaseHeader";
import PurchaseTable from "./PurchaseTable";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProgressButton from "../common/ProgressButton";
import {useDispatch, useSelector} from "react-redux";
import {AxiosInventoryMovementClient, MovementKind, Status} from "../../client/Client";
import {useSaveWithCallback} from "../../hooks/useFetch";
import {resetInventoryMovement, setInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Summary from "../sale/Summary";
import store from "../../store"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

const inventoryMovementService = new AxiosInventoryMovementClient();
const movementKind = MovementKind.PURCHASE;

export default function Purchase() {

    console.log("Inside Purchase!");

    const classes = useStyles();
    const searchProductRef = useRef();
    const purchase = useSelector(x => x.inventoryMovement.get(movementKind));
    const dispatch = useDispatch();
    const [savePurchase, {progress}, setState] = useSaveWithCallback((x) => inventoryMovementService.update(x));
    const [openPurchase, purchaseState] = useSaveWithCallback(() => inventoryMovementService.openInventoryMovement('1', MovementKind.PURCHASE), x => setInventoryMovement(x, dispatch));
    const icon = useRef(<ShoppingBasketIcon style={{fontSize: "4em"}}/>);

    useEffect(() => {
        openPurchase()
    }, []);

    const handleSaveButton = useCallback(() => {
        savePurchase({
            ...store.getState().inventoryMovement.get(movementKind),
            status: Status.CLOSED
        }).then(() => resetInventoryMovement(movementKind, dispatch))
            .then(openPurchase)
            .then(() => setTimeout(() => setState(x => ({...x, progress: 'idle'})), 1500));
    }, []);

    return (
        <>
            {purchaseState.progress !== 'done' ?
                (<Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress/>
                </Backdrop>) :
                (
                    <>
                        <PurchaseHeader searchProductRef={searchProductRef}
                                        sequenceNumber={purchaseState.data.sequence}/>
                        <PurchaseTable searchProductRef={searchProductRef}/>
                        <Summary total={purchase.inventoryMovementLines.map(x => x.amount).reduce((a, b) => a + b, 0)}/>
                        <ProgressButton size="large"
                                        icon={icon.current}
                                        disabled={!purchase.inventoryMovementLines.length || !purchase.supplier || !purchase.supplier.id}
                                        success={progress === 'done'}
                                        loading={progress === 'loading'}
                                        onClick={handleSaveButton}/>
                    </>
                )
            }
        </>
    );
};