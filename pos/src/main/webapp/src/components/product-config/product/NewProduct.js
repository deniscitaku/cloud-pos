import React, {useState} from 'react';
import FormDialog from "../../common/FormDialog";
import {
    AxiosCategoryClient,
    AxiosProductClient,
    AxiosSubCategoryClient,
    AxiosTaxClient,
    QueryKeys
} from "../../../client/Client";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import ValidTextField from "../../common/ValidTextField";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import {emptyProduct} from "../../../services/EmptyObjects";
import {useMutation, useQueries, useQueryClient} from "react-query";
import CustomBackdrop from "../../common/CustomBackdrop";

const productService = new AxiosProductClient();
const categoryService = new AxiosCategoryClient();
const subCategoryService = new AxiosSubCategoryClient();
const taxService = new AxiosTaxClient();

function NewProduct({savedProduct, isOpen, setOpen, initialProduct = taxes => ({...emptyProduct, tax: taxes.find(x => x.default)}), autoFocusIndex}) {
    console.log("Inside New product");

    const [priceTax, setPriceTax] = useState(0);

    const queryClient = useQueryClient();
    const [
        {data: categories, isLoading: categoriesLoading},
        {data: subCategories, isLoading: subCategoriesLoading},
        {data: taxes, isLoading: taxesLoading},
    ] = useQueries([
        {queryKey: QueryKeys.CATEGORIES, queryFn: () => categoryService.findAll().then(x => x.data)},
        {queryKey: QueryKeys.SUB_CATEGORIES, queryFn: () => subCategoryService.findAll().then(x => x.data)},
        {queryKey: QueryKeys.TAXES, queryFn: () => taxService.findAll().then(x => x.data)}
    ]);
    const {mutate: saveProduct, error, isLoading, reset} = useMutation(x => productService.create(x.data).then(x => x.data), {
        onSuccess: (data, vars) => {
            setOpen(false);
            vars.reset();
            savedProduct(data);
            if (queryClient.getQueryData(QueryKeys.PRODUCTS)) {
                queryClient.setQueryData(QueryKeys.PRODUCTS, old => [...old, data]);
            }
        },
    });

    const multipleLoading = categoriesLoading || subCategoriesLoading || taxesLoading;
    const errors = error?.response?.data;

    if (multipleLoading) {
        return (<CustomBackdrop/>);
    }

    function onValueChange(fieldName, newValue, product, setProduct) {
        if (fieldName === 'priceSell') {
            setPriceTax((newValue * (product.tax ? product.tax.taxRate : 1)).toFixed(2));
            setProduct({...product, priceTax: priceTax});
        } else if (fieldName === 'tax' && product.priceSell) {
            setPriceTax((newValue ? newValue.taxRate * product.priceSell : product.priceSell).toFixed(2));
            setProduct({...product, priceTax: priceTax});
        }
    }

    const dropdownProps = (product, setProduct, fieldName) => {
        const onChange = (event, newValue) => {
            event.preventDefault();
            if (newValue && newValue.inputValue) {
                setProduct({...product.current, [fieldName]: null});
            } else {
                setProduct({...product.current, [fieldName]: newValue});
            }
        };

        return {
            defaultValue: initialProduct(taxes)[fieldName],
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
            customElement: (product, setProduct) => <AutocompleteDropdown
                props={dropdownProps(product, setProduct, 'tax')}
                label={'Tax'}
                required
                error={errors && errors['tax']}
                variant="standard"
                items={taxes}/>
        },
        {
            title: 'Final price',
            field: "priceTax",
            type: 'number',
            customElement: () => <ValidTextField
                disabled
                error={errors && errors['priceTax']}
                id="priceTax"
                value={priceTax}
                label={"Final price"}
            />
        },
        {
            title: 'Category',
            field: "category",
            customElement: (product, setProduct) => <AutocompleteDropdown
                props={dropdownProps(product, setProduct, 'category')}
                label={'Category'}
                required={false}
                error={errors && errors['category']}
                variant="standard"
                items={categories}/>,
        },
        {
            title: 'Sub-Category',
            field: "subCategory",
            customElement: (product, setProduct) => <AutocompleteDropdown
                props={dropdownProps(product, setProduct, 'subCategory')}
                label={'Sub-Category'}
                required={false}
                error={errors && errors['subCategory']}
                variant="standard"
                items={subCategories}/>,
        },
        {
            title: 'Min. stock',
            field: 'minStock',
            type: 'number',
            required: false
        }
    ];

    function handleSubmit(event, product, reset) {
        saveProduct({data: product, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        reset();
    }

    return (
        !multipleLoading && isOpen && (
            <FormDialog
                open={isOpen}
                title="Product"
                onSubmit={handleSubmit}
                onClose={handleClose}
                errors={errors}
                loading={isLoading}
                fields={fields}
                onValueChange={onValueChange}
                Icon={FastFoodIcon}
                initialObject={initialProduct(taxes)}
                autoFocusIndex={autoFocusIndex}
            />
        )
    );
}

export default NewProduct;