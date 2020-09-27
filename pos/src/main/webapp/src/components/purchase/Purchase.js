import React, {useRef} from 'react';
import PurchaseHeader from "./PurchaseHeader";
import PurchaseTable from "./PurchaseTable";


const Purchase = () => {

    return (
        <React.Fragment>
            <PurchaseHeader />
            <PurchaseTable/>
        </React.Fragment>
    );
}

export default Purchase;