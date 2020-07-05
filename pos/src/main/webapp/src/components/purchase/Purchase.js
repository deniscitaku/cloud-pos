import React, {useEffect, useState} from 'react';
import SupplierDropdown from "./SupplierDropdown";
import {AxiosSupplierClient} from "../../client/Client";
import {fetch} from "../../services/fetch";

const Purchase = () => {

    return (
        <SupplierDropdown/>
    );
}

export default Purchase;