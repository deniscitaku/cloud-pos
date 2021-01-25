/* tslint:disable */
/* eslint-disable */

import {CancelToken} from "axios";
                                export const axiosInstance = axios.create({ baseURL: "http://localhost:8080/api/"});;

export class BasicControllerOperations<T, P> {

    constructor(data: BasicControllerOperations<T, P>) {
    }
}

export class ValidationExceptionPayload {
    fieldName: string;
    rejectedValue: any;
    message: string;
    code: string;
    innerError: { [index: string]: ValidationExceptionPayload };

    constructor(data: ValidationExceptionPayload) {
        this.fieldName = data.fieldName;
        this.rejectedValue = data.rejectedValue;
        this.message = data.message;
        this.code = data.code;
        this.innerError = data.innerError;
    }
}

export class BasePayload {
    id: number;

    constructor(data: BasePayload) {
        this.id = data.id;
    }
}

export class BaseAuditPayload extends BasePayload {
    modifiedByUser: UserPayload;
    createdByUser: UserPayload;
    createdOn: Date;
    updatedOn: Date;

    constructor(data: BaseAuditPayload) {
        super(data);
        this.modifiedByUser = data.modifiedByUser;
        this.createdByUser = data.createdByUser;
        this.createdOn = data.createdOn;
        this.updatedOn = data.updatedOn;
    }
}

export class LocationPayload extends BasePayload {
    name: string;
    sequenceHolders: SequenceHolderPayload[];

    constructor(data: LocationPayload) {
        super(data);
        this.name = data.name;
        this.sequenceHolders = data.sequenceHolders;
    }
}

export class SequenceHolderPayload extends BasePayload {
    movementKind: MovementKind;
    sequence: number;

    constructor(data: SequenceHolderPayload) {
        super(data);
        this.movementKind = data.movementKind;
        this.sequence = data.sequence;
    }
}

export class UserPayload extends BasePayload {
    name: string;
    phoneNumber: string;
    email: string;
    createdOn: Date;
    updatedOn: Date;

    constructor(data: UserPayload) {
        super(data);
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.createdOn = data.createdOn;
        this.updatedOn = data.updatedOn;
    }
}

export class CategoryPayload extends BasePayload {
    name: string;
    subCategories: SubCategoryPayload[];

    constructor(data: CategoryPayload) {
        super(data);
        this.name = data.name;
        this.subCategories = data.subCategories;
    }
}

export class ProductPayload extends BaseAuditPayload {
    code: string;
    name: string;
    displayName: string;
    priceBuy: number;
    priceSell: number;
    priceTax: number;
    category: CategoryPayload;
    subCategory: SubCategoryPayload;
    tax: TaxPayload;
    uoms: UomPayload[];
    minStock: number;

    constructor(data: ProductPayload) {
        super(data);
        this.code = data.code;
        this.name = data.name;
        this.displayName = data.displayName;
        this.priceBuy = data.priceBuy;
        this.priceSell = data.priceSell;
        this.priceTax = data.priceTax;
        this.category = data.category;
        this.subCategory = data.subCategory;
        this.tax = data.tax;
        this.uoms = data.uoms;
        this.minStock = data.minStock;
    }
}

export class StockPayload extends BasePayload {
    stockId: StockIdPayload;
    units: number;

    constructor(data: StockPayload) {
        super(data);
        this.stockId = data.stockId;
        this.units = data.units;
    }
}

export class SubCategoryPayload extends BasePayload {
    name: string;
    category: CategoryPayload;

    constructor(data: SubCategoryPayload) {
        super(data);
        this.name = data.name;
        this.category = data.category;
    }
}

export class TaxPayload extends BasePayload {
    name: string;
    taxRate: number;
    default: boolean;

    constructor(data: TaxPayload) {
        super(data);
        this.name = data.name;
        this.taxRate = data.taxRate;
        this.default = data.default;
    }
}

export class UomPayload extends BaseAuditPayload {
    smallerUnitName: string;
    biggerUnitName: string;
    convertValue: number;

    constructor(data: UomPayload) {
        super(data);
        this.smallerUnitName = data.smallerUnitName;
        this.biggerUnitName = data.biggerUnitName;
        this.convertValue = data.convertValue;
    }
}

export class BaseLinePayload extends BasePayload {
    lineNumber: number;
    product: ProductPayload;
    priceBuy: number;
    priceSell: number;
    quantity: number;
    amount: number;
    tax: TaxPayload;
    uom: UomPayload;

    constructor(data: BaseLinePayload) {
        super(data);
        this.lineNumber = data.lineNumber;
        this.product = data.product;
        this.priceBuy = data.priceBuy;
        this.priceSell = data.priceSell;
        this.quantity = data.quantity;
        this.amount = data.amount;
        this.tax = data.tax;
        this.uom = data.uom;
    }
}

export class InventoryMovementLinePayload extends BaseLinePayload {

    constructor(data: InventoryMovementLinePayload) {
        super(data);
    }
}

export class InventoryMovementPayload extends BaseAuditPayload {
    sequence: number;
    kind: MovementKind;
    inventoryMovementLines: InventoryMovementLinePayload[];
    location: LocationPayload;
    supplier: SupplierPayload;
    locationTo: LocationPayload;
    status: Status;

    constructor(data: InventoryMovementPayload) {
        super(data);
        this.sequence = data.sequence;
        this.kind = data.kind;
        this.inventoryMovementLines = data.inventoryMovementLines;
        this.location = data.location;
        this.supplier = data.supplier;
        this.locationTo = data.locationTo;
        this.status = data.status;
    }
}

export class SupplierPayload extends BaseAuditPayload {
    name: string;
    nui: string;
    phoneNumber: string;
    email: string;

    constructor(data: SupplierPayload) {
        super(data);
        this.name = data.name;
        this.nui = data.nui;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
    }
}

export class CustomerPayload extends BaseAuditPayload {
    name: string;
    email: string;
    phoneNumber: string;
    currentDebt: number;
    maxDebt: number;
    discount: number;

    constructor(data: CustomerPayload) {
        super(data);
        this.name = data.name;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.currentDebt = data.currentDebt;
        this.maxDebt = data.maxDebt;
        this.discount = data.discount;
    }
}

export class TicketLinePayload extends BaseLinePayload {

    constructor(data: TicketLinePayload) {
        super(data);
    }
}

export class TicketPayload extends BaseAuditPayload {
    sequence: number;
    paymentType: PaymentType;
    totalAmount: number;
    givenAmount: number;
    location: LocationPayload;
    ticketLines: TicketLinePayload[];
    status: Status;

    constructor(data: TicketPayload) {
        super(data);
        this.sequence = data.sequence;
        this.paymentType = data.paymentType;
        this.totalAmount = data.totalAmount;
        this.givenAmount = data.givenAmount;
        this.location = data.location;
        this.ticketLines = data.ticketLines;
        this.status = data.status;
    }
}

export class StockIdPayload {
    productId: number;
    locationId: number;

    constructor(data: StockIdPayload) {
        this.productId = data.productId;
        this.locationId = data.locationId;
    }
}

export class PagePayload<P> {
    data: P[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    sortDirection: string;
    sortedBy: string[];

    constructor(data: PagePayload<P>) {
        this.data = data.data;
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.totalPages = data.totalPages;
        this.totalCount = data.totalCount;
        this.sortDirection = data.sortDirection;
        this.sortedBy = data.sortedBy;
    }
}

export interface HttpClient<O> {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; cancelToken?: CancelToken, options?: O; }): RestResponse<R>;
}

export class TicketLineClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/sale/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.create
     */
    create(arg0: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.deleteAll
     */
    deleteAll(arg0: TicketLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.update
     */
    update(arg0: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/sale/ticket-line/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.createAll
     */
    createAll(arg0: TicketLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/ticket-line/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket-line/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket-line/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket-line/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.updateAll
     */
    updateAll(arg0: TicketLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket-line/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket-line/paged
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<TicketLinePayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket-line/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket-line/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket-line/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/ticket-line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/ticket-line/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket-line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket-line/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class UomClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/uom
     * Java method: com.denlir.pos.controller.inventory.UomController.create
     */
    create(arg0: UomPayload, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/uom`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/uom
     * Java method: com.denlir.pos.controller.inventory.UomController.deleteAll
     */
    deleteAll(arg0: UomPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/uom`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/uom
     * Java method: com.denlir.pos.controller.inventory.UomController.update
     */
    update(arg0: UomPayload, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/uom`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/uom/all
     * Java method: com.denlir.pos.controller.inventory.UomController.createAll
     */
    createAll(arg0: UomPayload[], cancelToken?: CancelToken, options?: O): RestResponse<UomPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/uom/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/uom/all
     * Java method: com.denlir.pos.controller.inventory.UomController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/uom/all
     * Java method: com.denlir.pos.controller.inventory.UomController.updateAll
     */
    updateAll(arg0: UomPayload[], cancelToken?: CancelToken, options?: O): RestResponse<UomPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/uom/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/uom/paged
     * Java method: com.denlir.pos.controller.inventory.UomController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<UomPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/uom/sorted
     * Java method: com.denlir.pos.controller.inventory.UomController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/uom/{id}
     * Java method: com.denlir.pos.controller.inventory.UomController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/uom/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/uom/{id}
     * Java method: com.denlir.pos.controller.inventory.UomController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class TaxClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/tax
     * Java method: com.denlir.pos.controller.inventory.TaxController.create
     */
    create(arg0: TaxPayload, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/tax`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/tax
     * Java method: com.denlir.pos.controller.inventory.TaxController.deleteAll
     */
    deleteAll(arg0: TaxPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/tax`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/tax
     * Java method: com.denlir.pos.controller.inventory.TaxController.update
     */
    update(arg0: TaxPayload, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/tax`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/tax/all
     * Java method: com.denlir.pos.controller.inventory.TaxController.createAll
     */
    createAll(arg0: TaxPayload[], cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/tax/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/tax/all
     * Java method: com.denlir.pos.controller.inventory.TaxController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/tax/all
     * Java method: com.denlir.pos.controller.inventory.TaxController.updateAll
     */
    updateAll(arg0: TaxPayload[], cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/tax/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/tax/paged
     * Java method: com.denlir.pos.controller.inventory.TaxController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<TaxPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/tax/sorted
     * Java method: com.denlir.pos.controller.inventory.TaxController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/tax/{id}
     * Java method: com.denlir.pos.controller.inventory.TaxController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/tax/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/tax/{id}
     * Java method: com.denlir.pos.controller.inventory.TaxController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class LocationClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /domain/location
     * Java method: com.denlir.pos.controller.domain.LocationController.create
     */
    create(arg0: LocationPayload, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`domain/location`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /domain/location
     * Java method: com.denlir.pos.controller.domain.LocationController.deleteAll
     */
    deleteAll(arg0: LocationPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`domain/location`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /domain/location
     * Java method: com.denlir.pos.controller.domain.LocationController.update
     */
    update(arg0: LocationPayload, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`domain/location`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /domain/location/all
     * Java method: com.denlir.pos.controller.domain.LocationController.createAll
     */
    createAll(arg0: LocationPayload[], cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`domain/location/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /domain/location/all
     * Java method: com.denlir.pos.controller.domain.LocationController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /domain/location/all
     * Java method: com.denlir.pos.controller.domain.LocationController.updateAll
     */
    updateAll(arg0: LocationPayload[], cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`domain/location/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /domain/location/paged
     * Java method: com.denlir.pos.controller.domain.LocationController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<LocationPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /domain/location/sorted
     * Java method: com.denlir.pos.controller.domain.LocationController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /domain/location/{id}
     * Java method: com.denlir.pos.controller.domain.LocationController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`domain/location/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /domain/location/{id}
     * Java method: com.denlir.pos.controller.domain.LocationController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class TicketClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/sale/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.create
     */
    create(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.deleteAll
     */
    deleteAll(arg0: TicketPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.update
     */
    update(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/sale/ticket/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.createAll
     */
    createAll(arg0: TicketPayload[], cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/ticket/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.updateAll
     */
    updateAll(arg0: TicketPayload[], cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket/close
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.closeTicket
     */
    closeTicket(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket/close`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket/paged
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<TicketPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/ticket/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/ticket/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/ticket/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/ticket/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/sale/ticket/{locationId}/open
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.openTicket
     */
    openTicket(locationId: string, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/ticket/${locationId}/open`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/ticket/{ticketId}/add-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.addTicketLine
     */
    addTicketLine(ticketId: string, arg1: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/ticket/${ticketId}/add-line`, data: arg1, options: options, cancelToken: cancelToken });
    }
}

export class CustomerClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/sale/customer
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.create
     */
    create(arg0: CustomerPayload, cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/customer`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/customer
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.deleteAll
     */
    deleteAll(arg0: CustomerPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/customer`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/customer
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.update
     */
    update(arg0: CustomerPayload, cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/customer`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/sale/customer/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.createAll
     */
    createAll(arg0: CustomerPayload[], cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/sale/customer/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/customer/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/customer/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/sale/customer/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.updateAll
     */
    updateAll(arg0: CustomerPayload[], cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/sale/customer/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/customer/paged
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<CustomerPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/customer/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/customer/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/customer/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/sale/customer/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/sale/customer/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sale/customer/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.CustomerController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CustomerPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sale/customer/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class ProductClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/product
     * Java method: com.denlir.pos.controller.inventory.ProductController.create
     */
    create(arg0: ProductPayload, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/product`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/product
     * Java method: com.denlir.pos.controller.inventory.ProductController.deleteAll
     */
    deleteAll(arg0: ProductPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/product`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product
     * Java method: com.denlir.pos.controller.inventory.ProductController.findByCodeOrName
     */
    findByCodeOrName(queryParams: { arg0: string; }, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/product
     * Java method: com.denlir.pos.controller.inventory.ProductController.update
     */
    update(arg0: ProductPayload, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/product`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/product/all
     * Java method: com.denlir.pos.controller.inventory.ProductController.createAll
     */
    createAll(arg0: ProductPayload[], cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/product/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/all
     * Java method: com.denlir.pos.controller.inventory.ProductController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/product/all
     * Java method: com.denlir.pos.controller.inventory.ProductController.updateAll
     */
    updateAll(arg0: ProductPayload[], cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/product/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/category/{categoryId}
     * Java method: com.denlir.pos.controller.inventory.ProductController.findByCategoryId
     */
    findByCategoryId(categoryId: string, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/category/${categoryId}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/code/{code}
     * Java method: com.denlir.pos.controller.inventory.ProductController.findByCode
     */
    findByCode(code: string, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/code/${code}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/paged
     * Java method: com.denlir.pos.controller.inventory.ProductController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<ProductPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/sorted
     * Java method: com.denlir.pos.controller.inventory.ProductController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/sub-category/{subCategoryId}
     * Java method: com.denlir.pos.controller.inventory.ProductController.findBySubCategoryId
     */
    findBySubCategoryId(subCategoryId: string, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/sub-category/${subCategoryId}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/product/{id}
     * Java method: com.denlir.pos.controller.inventory.ProductController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/product/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/{id}
     * Java method: com.denlir.pos.controller.inventory.ProductController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class SubCategoryClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/sub-category
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.create
     */
    create(arg0: SubCategoryPayload, cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/sub-category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/sub-category
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.deleteAll
     */
    deleteAll(arg0: SubCategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/sub-category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/sub-category
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.update
     */
    update(arg0: SubCategoryPayload, cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/sub-category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/sub-category/all
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.createAll
     */
    createAll(arg0: SubCategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/sub-category/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/sub-category/all
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/sub-category/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/sub-category/all
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.updateAll
     */
    updateAll(arg0: SubCategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/sub-category/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/sub-category/paged
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<SubCategoryPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/sub-category/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/sub-category/sorted
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/sub-category/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/sub-category/{id}
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/sub-category/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/sub-category/{id}
     * Java method: com.denlir.pos.controller.inventory.SubCategoryController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SubCategoryPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/sub-category/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class CategoryClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/category
     * Java method: com.denlir.pos.controller.inventory.CategoryController.create
     */
    create(arg0: CategoryPayload, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/category
     * Java method: com.denlir.pos.controller.inventory.CategoryController.deleteAll
     */
    deleteAll(arg0: CategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/category
     * Java method: com.denlir.pos.controller.inventory.CategoryController.update
     */
    update(arg0: CategoryPayload, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/category`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/category/all
     * Java method: com.denlir.pos.controller.inventory.CategoryController.createAll
     */
    createAll(arg0: CategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/category/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/category/all
     * Java method: com.denlir.pos.controller.inventory.CategoryController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/category/all
     * Java method: com.denlir.pos.controller.inventory.CategoryController.updateAll
     */
    updateAll(arg0: CategoryPayload[], cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/category/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/category/paged
     * Java method: com.denlir.pos.controller.inventory.CategoryController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<CategoryPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/category/sorted
     * Java method: com.denlir.pos.controller.inventory.CategoryController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/category/{id}
     * Java method: com.denlir.pos.controller.inventory.CategoryController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/category/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/category/{id}
     * Java method: com.denlir.pos.controller.inventory.CategoryController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class SupplierClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/supplier
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.create
     */
    create(arg0: SupplierPayload, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/supplier`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/supplier
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.deleteAll
     */
    deleteAll(arg0: SupplierPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/supplier`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/supplier
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.update
     */
    update(arg0: SupplierPayload, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/supplier`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/supplier/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.createAll
     */
    createAll(arg0: SupplierPayload[], cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/supplier/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/supplier/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/supplier/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.updateAll
     */
    updateAll(arg0: SupplierPayload[], cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/supplier/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/supplier/paged
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<SupplierPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/supplier/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/supplier/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/supplier/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/supplier/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export class InventoryMovementClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.create
     */
    create(arg0: InventoryMovementPayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.deleteAll
     */
    deleteAll(arg0: InventoryMovementPayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.update
     */
    update(arg0: InventoryMovementPayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.createAll
     */
    createAll(arg0: InventoryMovementPayload[], cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.updateAll
     */
    updateAll(arg0: InventoryMovementPayload[], cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/close
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.closeInventoryMovement
     */
    closeInventoryMovement(arg0: InventoryMovementPayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/close`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/paged
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<InventoryMovementPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/{inventoryMovementId}/add-line
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.addInventoryMovementLine
     */
    addInventoryMovementLine(inventoryMovementId: string, arg1: InventoryMovementLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/${inventoryMovementId}/add-line`, data: arg1, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/{kind}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findByKind
     */
    findByKind(kind: string, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/${kind}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/{kind}/{status}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findByKindAndStatus
     */
    findByKindAndStatus(kind: string, status: string, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/${kind}/${status}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/{locationId}/{kind}/open
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.openInventoryMovement
     */
    openInventoryMovement(locationId: string, kind: string, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/${locationId}/${kind}/open`, options: options, cancelToken: cancelToken });
    }
}

export class InventoryMovementLineClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/line
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.create
     */
    create(arg0: InventoryMovementLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/line
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.deleteAll
     */
    deleteAll(arg0: InventoryMovementLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/line
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.update
     */
    update(arg0: InventoryMovementLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/movement/line/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.createAll
     */
    createAll(arg0: InventoryMovementLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload[]> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/line/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/line/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.findAll
     */
    findAll(queryParams?: { arg0?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/line/all`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/line/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.updateAll
     */
    updateAll(arg0: InventoryMovementLinePayload[], cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload[]> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/line/all`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/line/paged
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.findAllPaged
     */
    findAllPaged(queryParams: { arg0: number; arg1: number; arg2?: string[]; arg3?: string; arg4?: string; arg5?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<PagePayload<InventoryMovementLinePayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/line/paged`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/line/sorted
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.findAllSorted
     */
    findAllSorted(queryParams: { arg0: string; arg1: string[]; arg2?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/line/sorted`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/line/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementLineController.findById
     */
    findById(id: string, queryParams?: { arg1?: string[]; }, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementLinePayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/line/${id}`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }
}

export type RestResponse<R> = Promise<Axios.GenericAxiosResponse<R>>;

export enum PaymentType {
    CASH = "CASH",
    CARD = "CARD",
}

export enum Status {
    OPENED = "OPENED",
    CLOSED = "CLOSED",
}

export enum QueryKeys {
    PRODUCTS = "PRODUCTS",
    CATEGORIES = "CATEGORIES",
    SUB_CATEGORIES = "SUB_CATEGORIES",
    TAXES = "TAXES",
    CUSTOMERS = "CUSTOMERS",
    SUPPLIERS = "SUPPLIERS",
    UOM = "UOM",
}

export enum MovementKind {
    SALE = "SALE",
    TRANSFER = "TRANSFER",
    EXPIRATION = "EXPIRATION",
    RETURN_SUPPLIER = "RETURN_SUPPLIER",
    PURCHASE = "PURCHASE",
    REGISTRATION = "REGISTRATION",
}

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}


// Added by 'AxiosClientExtension' extension

import axios from "axios";
import * as Axios from "axios";

declare module "axios" {
    export interface GenericAxiosResponse<R> extends Axios.AxiosResponse {
        data: R;
    }
}

class AxiosHttpClient implements HttpClient<Axios.AxiosRequestConfig> {

    constructor(private axios: Axios.AxiosInstance) {
    }

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; options?: Axios.AxiosRequestConfig; cancelToken?: CancelToken; }): RestResponse<R> {
        function assign(target: any, source?: any) {
            if (source != undefined) {
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        }

        const config: Axios.AxiosRequestConfig = {};
        config.method = requestConfig.method as typeof config.method;  // `string` in axios 0.16.0, `Method` in axios 0.19.0
        config.url = requestConfig.url;
        config.params = requestConfig.queryParams;
        config.data = requestConfig.data;
                                        config.cancelToken = requestConfig.cancelToken;
        assign(config, requestConfig.options);
        const copyFn = requestConfig.copyFn;

        const axiosResponse = this.axios.request(config);
        return axiosResponse.then(axiosResponse => {
            if (copyFn && axiosResponse.data) {
                (axiosResponse as any).originalData = axiosResponse.data;
                axiosResponse.data = copyFn(axiosResponse.data);
            }
            return axiosResponse;
        });
    }
}

export class AxiosTicketLineClient extends TicketLineClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosUomClient extends UomClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTaxClient extends TaxClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosLocationClient extends LocationClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTicketClient extends TicketClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosCustomerClient extends CustomerClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosProductClient extends ProductClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosSubCategoryClient extends SubCategoryClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosCategoryClient extends CategoryClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosSupplierClient extends SupplierClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosInventoryMovementClient extends InventoryMovementClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosInventoryMovementLineClient extends InventoryMovementLineClient<Axios.AxiosRequestConfig> {

    constructor() {
        
        super(new AxiosHttpClient(axiosInstance));
    }
}
