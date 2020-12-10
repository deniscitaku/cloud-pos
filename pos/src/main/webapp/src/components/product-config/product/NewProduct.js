import React, {useCallback, useMemo, useState} from 'react';
import FormDialog from "../../common/FormDialog";
import {AxiosProductClient} from "../../../client/Client";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import ValidTextField from "../../common/ValidTextField";
import {useSave} from "../../../hooks/useFetch";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import {emptyProduct} from "../../../services/EmptyObjects";

const productService = new AxiosProductClient();

function NewProduct({savedProduct, isOpen, setOpen, categories, subCategories, taxes, initialProductOnAdd, autoFocusIndex}) {
    console.log("Inside New product");

    const [saveProduct, {errors, loading}, setState] = useSave(x => productService.create(x));
    const [priceTax, setPriceTax] = useState(0);

    const icon = useMemo(() => <FastFoodIcon/>, []);

    const finalInitialProductOnAdd = initialProductOnAdd ? initialProductOnAdd() : {...emptyProduct, tax: taxes.find(x => x.default)};

    const handleSubmit = useCallback((event, product, reset) => {
        saveProduct(product).then((x) => {
            setOpen(false);
            reset();
            savedProduct(x);
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setState(x => ({...x, errors: {}}));
    }, []);

    const onValueChange = useCallback((fieldName, newValue, product, setProduct) => {
        if (fieldName === 'priceSell') {
            setPriceTax((newValue * (product.tax ? product.tax.taxRate : 1)).toFixed(2));
            setProduct({...product, priceTax: priceTax});
        } else if (fieldName === 'tax' && product.priceSell) {
            setPriceTax((newValue ? newValue.taxRate * product.priceSell : product.priceSell).toFixed(2));
            setProduct({...product, priceTax: priceTax});
        }
    }, []);

    const categoryDropdown = useCallback((product, setProduct) => <AutocompleteDropdown
        props={dropdownProps(product, setProduct, 'category')}
        label={'Category'}
        required
        error={errors && errors['category']}
        variant="standard"
        items={categories}/>, []);

    const subCategoryDropdown = useCallback((product, setProduct) => <AutocompleteDropdown
        props={dropdownProps(product, setProduct, 'subCategory')}
        label={'Sub-Category'}
        required
        error={errors && errors['subCategory']}
        variant="standard"
        items={subCategories}/>, []);

    const taxDropdown = useCallback((product, setProduct) => <AutocompleteDropdown
        props={dropdownProps(product, setProduct, 'tax')}
        label={'Tax'}
        required
        error={errors && errors['tax']}
        variant="standard"
        items={taxes}/>, []);

    const priceTaxTextField = useCallback(() => <ValidTextField
        disabled
        error={errors && errors['priceTax']}
        id="priceTax"
        value={priceTax}
        label={"Final price"}
    />, []);

    const dropdownProps = (product, setProduct, fieldName) => {
        const onChange = (event, newValue) => {
            event.preventDefault();
            console.log("Autocomplete value changed: ", newValue);
            if (newValue && newValue.inputValue) {
                setProduct({...product, [fieldName]: null});
            } else {
                setProduct({...product, [fieldName]: newValue});
            }
        };

        return {
            defaultValue: finalInitialProductOnAdd[fieldName],
            onChange: onChange
        }
    };

    const fields = [
        {
            title: 'Code',
            field: "code",
        },
        {
            title: 'Name',
            field: "name",
        },
        {
            title: 'Display name',
            field: "displayName",
            required: false,
        },
        {
            title: 'Buy price',
            field: "priceBuy",
            type: 'number',
        },
        {
            title: 'Sell price',
            field: "priceSell",
            type: 'number',
        },
        {
            title: 'Taxes',
            field: "tax",
            customElement: taxDropdown
        },
        {
            title: 'Final price',
            field: "priceTax",
            type: 'number',
            customElement: priceTaxTextField
        },
        {
            title: 'Category',
            field: "category",
            customElement: categoryDropdown,
        },
        {
            title: 'Sub-Category',
            field: "subCategory",
            required: false,
            customElement: subCategoryDropdown,
        },
        {
            title: 'Min. stock',
            field: 'minStock',
            type: 'number',
            required: false
        }
    ];

    return (
        <FormDialog
            open={isOpen}
            title="Product"
            onSubmit={handleSubmit}
            onClose={handleClose}
            errors={errors}
            loading={loading}
            fields={fields}
            onValueChange={onValueChange}
            icon={icon}
            initialObject={{...emptyProduct, tax: taxes.find(x => x.default)}}
            initialObjectOnAdd={finalInitialProductOnAdd}
            autoFocusIndex={autoFocusIndex}
        />
    );
}

export default React.memo(NewProduct);