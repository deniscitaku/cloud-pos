import {QueryClient} from "react-query";
import {
    AxiosCategoryClient, AxiosCustomerClient,
    AxiosProductClient, AxiosSubCategoryClient,
    AxiosSupplierClient,
    AxiosTaxClient,
    QueryKeys
} from "../client/Client";

const productService = new AxiosProductClient();
const categoryService = new AxiosCategoryClient();
const subCategoryService = new AxiosSubCategoryClient();
const supplierService = new AxiosSupplierClient();
const customerService = new AxiosCustomerClient();
const taxService = new AxiosTaxClient();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            notifyOnChangeProps: ['data', 'error'],
        },
    },
});


queryClient.setQueryDefaults(QueryKeys.PRODUCTS, {queryFn: () => productService.findAll().then(x => x.data)});
queryClient.setQueryDefaults(QueryKeys.CATEGORIES, {queryFn: () => categoryService.findAll().then(x => x.data)});
queryClient.setQueryDefaults(QueryKeys.SUB_CATEGORIES, {queryFn: () => subCategoryService.findAll().then(x => x.data)});
queryClient.setQueryDefaults(QueryKeys.SUPPLIERS, {queryFn: () => supplierService.findAll().then(x => x.data)});
queryClient.setQueryDefaults(QueryKeys.CUSTOMERS, {queryFn: () => customerService.findAll().then(x => x.data)});
queryClient.setQueryDefaults(QueryKeys.TAXES, {queryFn: () => taxService.findAll().then(x => x.data)});

export default queryClient;