import {
    CategoryPayload,
    CustomerPayload, ProductPayload,
    SubCategoryPayload,
    SupplierPayload,
    TaxPayload,
    UomPayload
} from "../client/Client";

export const emptySupplier =  new SupplierPayload({
    name: '',
    nui: '',
    phoneNumber: '',
    email: ''
});

export const emptyCustomer = new CustomerPayload({
    name: '',
    email: '',
    phoneNumber: '',
    currentDebt: '',
    maxDebt: '',
    discount: '',
});

export const emptyTax = new TaxPayload({
    name: '',
    taxRate: '',
    default: false
});

export const emptyUom = new UomPayload({
    smallerUnitName: '',
    biggerUnitName: '',
    convertValue: ''
});

export const emptyCategory = new CategoryPayload({
    name: ''
});

export const emptySubCategory = new SubCategoryPayload({
    name: '',
    category: null
});

export const emptyProduct = new ProductPayload({
    code: '',
    name: '',
    displayName: null,
    priceBuy: '',
    priceSell: '',
    priceTax: '',
    minStock: null,
    category: null,
    subCategory: null,
    tax: null,
    uoms: []
});