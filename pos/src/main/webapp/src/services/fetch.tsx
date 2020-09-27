import React from "react";
import {RestResponse, ValidationExceptionPayload} from "../client/Client";
import HttpErrorHandling from "./HttpErrorHandling";
import axios, {CancelToken, CancelTokenSource, CancelTokenStatic} from 'axios';

const cancelToken: CancelTokenStatic = axios.CancelToken;
let source: CancelTokenSource = cancelToken.source();

export function fetchPromise<T>(request: RestResponse<T>,
                                errorResponse?: (errors?: Map<string, ValidationExceptionPayload[]>) => any): Promise<void | T> {
    return request.then(response => {
        return response.data;
    }).catch(exception => {
        handleError(exception, errorResponse);
    })
}

export function fetch<T>(request: RestResponse<T>,
                         dataResponse: (data: T) => any,
                         errorResponse?: (errors?: Map<string, ValidationExceptionPayload[]>) => any): void {
    request.then(response => {
        return dataResponse(response.data);
    }).catch(exception => {
        handleError(exception, errorResponse);
    })
}

/**
 * Cancels previous request if new request has come before previous request has finished
 */
export function cancelerFetch<T>(request: (cancelToken: CancelToken) => RestResponse<T>,
                                 dataResponse: (data: T | void) => T | void,
                                 setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                 errorResponse?: (errors?: Map<string, ValidationExceptionPayload[]>) => any) {
    setLoading(true)

    source && source.cancel();
    // save the new request for cancellation
    source = axios.CancelToken.source();

    request(source.token)
        .then(response => {
            const data = dataResponse(response.data);
            setLoading(false);
            return data;
        }).catch(exception => {
            if (axios.isCancel(exception)) {
                return;
            }
            handleError(exception, errorResponse);
            setLoading(false);
        }
    );

    return {};
}

export function loadingFetch<T>(request: RestResponse<T>,
                                dataResponse: (data: T | void) => T | void,
                                setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                errorResponse?: (errors?: Map<string, ValidationExceptionPayload[]>) => any) {
    setLoading(true);
    request.then(response => {
        const data = dataResponse(response.data);
        setLoading(false);
        return data;
    }).catch(exception => {
        handleError(exception, errorResponse)
        setLoading(false);
    })

    return {};
}

function handleError(exception: any, errorResponse?: (error?: Map<string, ValidationExceptionPayload[]>) => any) {
    const errorHandling = new HttpErrorHandling();

    if (exception.status === 401) {
        errorHandling.handle401Unauthorized();
    } else if (exception.status === 402) {
        errorHandling.handle402LicenseExpired();
    } else if (exception.status === 403) {
        errorHandling.handle403Forbidden();
    } else if (exception.status === 404) {
        errorHandling.handle404NotFound();
    } else {
        if (errorResponse) {
            errorResponse(exception.response?.data);
            return;
        }
    }
}