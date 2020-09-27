import React, {useEffect, useRef} from 'react';
import {AxiosProductClient, InventoryMovementLinePayload, MovementKind, ProductPayload} from "../../client/Client";
import SearchOrScanIcon from "../icons/SearchOrScanIcon";
import TaxDropdown from "./TaxDropdown";
import ValidTextField from "../common/ValidTextField";
import CategoryDropdown from "./CategoryDropdown";
import AutocompleteForm from "../common/AutocompleteForm";
import {fetchPromise} from "../../services/fetch";
import {useDispatch, useSelector} from "react-redux";
import {addRef} from "../../reducers/global/refReducer";
import {addInventoryMovementLine} from "../../reducers/global/inventoryMovementReducer";

const emptyProduct = new ProductPayload({
    name: '',
    code: '',
    priceBuy: 0,
    priceSell: 0,
    priceTax: 0,
    category: {},
    tax: {},
    uom: {},
    stock: {}
});

const productClient = new AxiosProductClient();

const ProductDropdown = (props) => {

    console.log("Inside ProductDropdown");

    const dispatch = useDispatch();

    const handleValueChange = (value) => {
        if (value) {
            addInventoryMovementLine(MovementKind.PURCHASE, new InventoryMovementLinePayload({
                lineNumber: 1,
                product: value,
                priceBuy: value.priceBuy,
                quantity: 1,
                amount: value.priceBuy
            }), dispatch);
        }
        // TODO focus qty on purchase table
    }
    return (
        <AutocompleteForm
            label='Search product'
            icon={<SearchOrScanIcon color={"action"}/>}
            required={false}
            dialogTitle={"Add product"}
            emptyValue={emptyProduct}
            focusFieldAfterDialogOpen={'code'}
            preDialogOpen={(code) => fetchPromise(productClient.findByCode(code))}
            onValueChange={val => handleValueChange(val)}
            findAll={() => productClient.findAll()}
            create={x => productClient.create(x)}
            formElements={(product, setProduct, errors) => [
                <ValidTextField
                    error={errors.code}
                    id="code"
                    value={product.code}
                    onChange={(event) => setProduct({...product, code: event.target.value})}
                    label="Code"

                />,
                <ValidTextField
                    autoFocus
                    error={errors.name}
                    id="name"
                    value={product.name}
                    onChange={(event) => setProduct({...product, name: event.target.value})}
                    label="Name"
                />,
                <ValidTextField
                    error={errors.displayName}
                    required={false}
                    id="displayName"
                    value={product.displayName}
                    onChange={(event) => setProduct({...product, displayName: event.target.value})}
                    label="Display name"
                />,
                <ValidTextField
                    error={errors.priceBuy}
                    id="priceBuy"
                    value={product.priceBuy}
                    onChange={(event) => setProduct({
                        ...product,
                        priceBuy: event.target.value
                    })}
                    label="Price buy"
                />,
                <ValidTextField
                    error={errors.priceSell}
                    id="priceSell"
                    value={product.priceSell}
                    onChange={(event) => setProduct({
                        ...product,
                        priceSell: event.target.value
                    })}
                    label="Price sell"
                />,
                <ValidTextField
                    error={errors.priceTax}
                    id="priceTax"
                    value={product.priceTax}
                    onChange={(event) => setProduct({
                        ...product,
                        priceTax: event.target.value
                    })}
                    label="Price tax"
                />,
                <CategoryDropdown error={errors.category && errors.category[0].innerError} category={product.category}
                                  setCategory={category => setProduct(({...product, category}))}/>,
                <TaxDropdown error={errors.tax && errors.tax[0].innerError} tax={product.tax}
                             setTax={tax => setProduct(prevState => ({...prevState, tax}))}/>,
                /*<UomDropdown error={errors.uom && errors.uom[0].innerError} uom={product.uom} setUom={uom => setProduct(prevState => ({...prevState, uom}))}/>*/
            ]}
        />
    );
};

export default ProductDropdown;