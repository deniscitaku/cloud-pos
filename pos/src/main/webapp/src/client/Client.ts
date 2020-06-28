/* tslint:disable */
/* eslint-disable */

import {CancelToken} from "axios";

export class BasicControllerOperations<T, P> {

    constructor(data: BasicControllerOperations<T, P>) {
    }
}

export class ValidationExceptionPayload {
    fieldName: string;
    rejectedValue: any;
    errorMessage: string;
    errorCode: string;

    constructor(data: ValidationExceptionPayload) {
        this.fieldName = data.fieldName;
        this.rejectedValue = data.rejectedValue;
        this.errorMessage = data.errorMessage;
        this.errorCode = data.errorCode;
    }
}

export class BasePayload {
    id: string;

    constructor(data: BasePayload) {
        this.id = data.id;
    }
}

export class BaseAuditPayload extends BasePayload {
    modifiedByUser: User;
    createdByUser: User;
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
    sequenceByMovementKind: { [P in MovementKind]?: number };

    constructor(data: LocationPayload) {
        super(data);
        this.name = data.name;
        this.sequenceByMovementKind = data.sequenceByMovementKind;
    }
}

export class CategoryPayload extends BasePayload {
    name: string;

    constructor(data: CategoryPayload) {
        super(data);
        this.name = data.name;
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
    tax: TaxPayload;
    uom: UomPayload;
    stock: StockPayload;
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
        this.tax = data.tax;
        this.uom = data.uom;
        this.stock = data.stock;
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

export class TaxPayload extends BasePayload {
    name: string;
    taxRate: number;

    constructor(data: TaxPayload) {
        super(data);
        this.name = data.name;
        this.taxRate = data.taxRate;
    }
}

export class UomPayload extends BasePayload {
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
    quantity: number;

    constructor(data: BaseLinePayload) {
        super(data);
        this.lineNumber = data.lineNumber;
        this.product = data.product;
        this.priceBuy = data.priceBuy;
        this.quantity = data.quantity;
    }
}

export class InventoryMovementLinePayload extends BaseLinePayload {

    constructor(data: InventoryMovementLinePayload) {
        super(data);
    }
}

export class InventoryMovementPayload extends BaseAuditPayload {
    sequence: string;
    kind: MovementKind;
    inventoryMovementLines: InventoryMovementLinePayload[];
    location: LocationPayload;
    supplier: SupplierPayload;
    locationTo: LocationPayload;

    constructor(data: InventoryMovementPayload) {
        super(data);
        this.sequence = data.sequence;
        this.kind = data.kind;
        this.inventoryMovementLines = data.inventoryMovementLines;
        this.location = data.location;
        this.supplier = data.supplier;
        this.locationTo = data.locationTo;
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

export class TicketLinePayload extends BaseLinePayload {
    priceSell: number;
    tax: TaxPayload;
    amount: number;

    constructor(data: TicketLinePayload) {
        super(data);
        this.priceSell = data.priceSell;
        this.tax = data.tax;
        this.amount = data.amount;
    }
}

export class TicketPayload extends BaseAuditPayload {
    sequence: string;
    paymentType: PaymentType;
    totalAmount: number;
    givenAmount: number;
    location: LocationPayload;
    ticketLines: TicketLinePayload[];
    status: TicketStatus;

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

export class User {

    constructor(data: User) {
    }
}

export class StockIdPayload {
    productId: string;
    locationId: string;

    constructor(data: StockIdPayload) {
        this.productId = data.productId;
        this.locationId = data.locationId;
    }
}

export interface HttpClient<O> {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; cancelToken?: CancelToken, options?: O; }): RestResponse<R>;
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
     * Java method: com.denlir.pos.controller.inventory.UomController.delete
     */
    delete(arg0: UomPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /inventory/uom/all
     * Java method: com.denlir.pos.controller.inventory.UomController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<UomPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<UomPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/uom/${id}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.inventory.TaxController.delete
     */
    delete(arg0: TaxPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /inventory/tax/all
     * Java method: com.denlir.pos.controller.inventory.TaxController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<TaxPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<TaxPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/tax/${id}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.delete
     */
    delete(arg0: InventoryMovementPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /inventory/movement/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<InventoryMovementPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<InventoryMovementPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/{kind}
     * Java method: com.denlir.pos.controller.inventory.movement.diary.InventoryMovementController.findByKind
     */
    findByKind(kind: string, cancelToken?: CancelToken, options?: O): RestResponse<Array<InventoryMovementPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/${kind}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.delete
     */
    delete(arg0: SupplierPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /inventory/movement/supplier/all
     * Java method: com.denlir.pos.controller.inventory.movement.diary.SupplierController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<SupplierPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<SupplierPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/supplier/${id}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.inventory.CategoryController.delete
     */
    delete(arg0: CategoryPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /inventory/category/all
     * Java method: com.denlir.pos.controller.inventory.CategoryController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<CategoryPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<CategoryPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/category/${id}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.domain.LocationController.delete
     */
    delete(arg0: LocationPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
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
     * HTTP GET /domain/location/all
     * Java method: com.denlir.pos.controller.domain.LocationController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<LocationPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/all`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<LocationPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`domain/location/${id}`, options: options, cancelToken: cancelToken });
    }
}

export class TicketClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.create
     */
    create(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.delete
     */
    delete(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/ticket
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.update
     */
    update(arg0: TicketPayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/ticket`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/ticket/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<TicketPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/ticket/all`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/ticket/open/{locationId}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.openTicket
     */
    openTicket(locationId: string, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/ticket/open/${locationId}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/ticket/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/ticket/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/ticket/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketController.findById
     */
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<TicketPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/ticket/${id}`, options: options, cancelToken: cancelToken });
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
     * Java method: com.denlir.pos.controller.inventory.ProductController.delete
     */
    delete(arg0: ProductPayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/product`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product
     * Java method: com.denlir.pos.controller.inventory.ProductController.findByCodeOrName
     */
    findByCodeOrName(queryParams: { arg0: string; }, cancelToken?: CancelToken, options?: O): RestResponse<Array<ProductPayload>> {
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
     * HTTP GET /inventory/product/all
     * Java method: com.denlir.pos.controller.inventory.ProductController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<ProductPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/all`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP POST /inventory/product/sale
     * Java method: com.denlir.pos.controller.inventory.ProductController.createFromSale
     */
    createFromSale(arg0: ProductPayload, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/product/sale`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/product/sale
     * Java method: com.denlir.pos.controller.inventory.ProductController.updateFromSale
     */
    updateFromSale(arg0: ProductPayload, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/product/sale`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/stock
     * Java method: com.denlir.pos.controller.inventory.ProductController.findAllLowInStock
     */
    findAllLowInStock(queryParams: { arg0: string; }, cancelToken?: CancelToken, options?: O): RestResponse<Array<ProductPayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/stock`, queryParams: queryParams, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/product/{code}
     * Java method: com.denlir.pos.controller.inventory.ProductController.findByCode
     */
    findByCode(code: string, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/${code}`, options: options, cancelToken: cancelToken });
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
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<ProductPayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/product/${id}`, options: options, cancelToken: cancelToken });
    }
}

export class TicketLineClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /inventory/movement/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.create
     */
    create(arg0: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`inventory/movement/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.delete
     */
    delete(arg0: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP PUT /inventory/movement/ticket-line
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.update
     */
    update(arg0: TicketLinePayload, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`inventory/movement/ticket-line`, data: arg0, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/ticket-line/all
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findAll
     */
    findAll(cancelToken?: CancelToken, options?: O): RestResponse<Array<TicketLinePayload>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/ticket-line/all`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP DELETE /inventory/movement/ticket-line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.deleteById
     */
    deleteById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`inventory/movement/ticket-line/${id}`, options: options, cancelToken: cancelToken });
    }

    /**
     * HTTP GET /inventory/movement/ticket-line/{id}
     * Java method: com.denlir.pos.controller.inventory.movement.sale.TicketLineController.findById
     */
    findById(id: string, cancelToken?: CancelToken, options?: O): RestResponse<TicketLinePayload> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`inventory/movement/ticket-line/${id}`, options: options, cancelToken: cancelToken });
    }
}

export type RestResponse<R> = Promise<Axios.GenericAxiosResponse<R>>;

export type PaymentType = "CASH" | "CARD";

export type TicketStatus = "OPEN" | "CLOSED";

export type MovementKind = "SALE" | "TRANSFER" | "EXPIRATION" | "RETURN_SUPPLIER" | "PURCHASE" | "REGISTRATION";

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

export class AxiosUomClient extends UomClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTaxClient extends TaxClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosInventoryMovementClient extends InventoryMovementClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosSupplierClient extends SupplierClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosCategoryClient extends CategoryClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosLocationClient extends LocationClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTicketClient extends TicketClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosProductClient extends ProductClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}

export class AxiosTicketLineClient extends TicketLineClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string = "http://localhost:8080/pos/", axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}
