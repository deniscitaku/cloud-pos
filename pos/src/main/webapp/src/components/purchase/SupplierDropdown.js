import React from 'react';
import {AxiosSupplierClient, SupplierPayload} from "../../client/Client";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import ValidTextField from "../common/ValidTextField";
import AutocompleteForm from "../common/AutocompleteForm";

const emptySupplier = new SupplierPayload({
    name: '',
    nui: '',
    phoneNumber: '',
    email: ''
});

const supplierClient = new AxiosSupplierClient();

export default function SupplierDropdown() {

    return (
        <AutocompleteForm
            label='Search supplier'
            icon={<LocalShippingOutlinedIcon color={'action'}/>}
            dialogTitle={"Add supplier"}
            emptyValue={emptySupplier}
            focusFieldAfterDialogOpen={'name'}
            findAll={() => supplierClient.findAll()}
            create={x => supplierClient.create(x)}
            formElements={(supplier, setSupplier, errors) => [
                <ValidTextField
                    error={errors.name}
                    id="name"
                    value={supplier.name}
                    onChange={(event) => setSupplier({...supplier, name: event.target.value})}
                    label="Name"
                    type="text"
                />,
                <ValidTextField
                    error={errors.nui}
                    required={false}
                    autoFocus
                    id="nui"
                    value={supplier.nui}
                    onChange={(event) => setSupplier({...supplier, nui: event.target.value})}
                    label="Nui"
                    type="text"
                />,
                <ValidTextField
                    error={errors.email}
                    required={false}
                    id="email"
                    value={supplier.email}
                    onChange={(event) => setSupplier({...supplier, email: event.target.value})}
                    label="Email"
                    type="text"
                />,
                <ValidTextField
                    error={errors.phoneNumber}
                    required={false}
                    id="phoneNumber"
                    value={supplier.phoneNumber}
                    onChange={(event) => setSupplier({
                        ...supplier,
                        phoneNumber: event.target.value
                    })}
                    label="Phone number"
                    type="text"
                />
            ]
            }
        />
    );
}