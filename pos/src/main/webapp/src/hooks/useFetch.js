import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import axios, {CancelTokenSource} from "axios";



export function useFindAll(request, errorMessage) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    function fireCall() {
        setLoading(true);
        return request.apply(this, Array.prototype.slice.call(arguments))
            .then(x => x.data)
            .then(x => {
                setData(x);
                setLoading(false);
                return x;
            })
            .catch(error => {
                const message = errorMessage ?
                    errorMessage :
                    'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                enqueueSnackbar(message, {variant: "error"});
                setLoading(false)
            });
    }

    return [fireCall, data, loading, setData];
}

export function useCancelerFindAll(request, errorMessage) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    let source = axios.CancelToken.source();

    function fireCall() {
        setLoading(true);
        source && source.cancel();
        // create the new request for cancellation
        source = axios.CancelToken.source();

        return request.apply(this, Array.prototype.slice.call([...arguments, source.token]))
            .then(x => x.data)
            .then(x => {
                setData(x);
                setLoading(false);
                return x;
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                const message = errorMessage ?
                    errorMessage :
                    'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                enqueueSnackbar(message, {variant: "error"});
                setLoading(false)
            });
    }

    return [fireCall, data, loading, setData];
}

export function useMultipleFindAll(requests, errorMessage) {

    const [data, setData] = useState({data: [...requests.map(() => [])], progress: 'idle'});
    const {enqueueSnackbar} = useSnackbar();

    function fireCall() {
        if (data.progress === 'done') {
            setData({data: [...requests.map(() => [])], progress: 'loading'});
        }
        Promise.all(requests.map(x => x()))
            .then(x => x.map(x => x.data))
            .then(x => setData({data: x, progress: 'done'}))
            .catch(error => {
                const message = errorMessage ?
                    errorMessage :
                    'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                enqueueSnackbar(message, {variant: "error"});
                setData({...data, progress: 'error'});
            });
    }

    function setDataForIndex(index, newValue) {
        return setData(prev => {
            const newData = [...prev.data];
            newData[index] = newValue(newData[index]);
            return {...prev, data: newData};
        });
    }

    return [fireCall, data, setDataForIndex];
}

export function useFindOne(request, errorMessage) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const {enqueueSnackbar} = useSnackbar();

    function fireCall() {
        setLoading(false);
        return request()
            .then(x => x.data)
            .then(x => {
                setData(x);
                setLoading(false)
            })
            .catch(error => {
                if (error.response?.status !== 400) {
                    const message = errorMessage ?
                        errorMessage :
                        'Unexpected error occurred, please contact support for more information.\n' + error.response?.data;
                    enqueueSnackbar(message, {variant: "error"});
                }
                setErrors(error.response?.data);
                setLoading(false)
            });
    }

    return [fireCall, data, loading, errors];
}

export function useSave(request, initialState = {
    data: undefined,
    loading: false,
    errors: undefined
}, errorMessage) {

    const [state, setState] = useState(initialState);
    const {enqueueSnackbar} = useSnackbar();

    function save(payload) {
        setState({
            ...initialState,
            loading: true,
        });

        return request(payload)
            .then(x => {
                setState({
                    data: x.data,
                    loading: false,
                    errors: {}
                });
                return x.data;
            })
            .catch(error => {
                if (error.response.status !== 400) {
                    const message = errorMessage ?
                        errorMessage :
                        'Unexpected error occurred, please contact support for more information.\n' + error.response?.data;
                    enqueueSnackbar(message, {variant: "error"});
                }
                setState({
                    data: {},
                    errors: error.response?.data,
                    loading: false
                });
                return Promise.reject(error.response?.data);
            });
    }

    return [save, state, setState];
}

const initialState = {
    data: undefined,
    progress: 'idle',
    errors: undefined
};

export function useSaveWithCallback(request, afterSave = () => {}) {
    const [state, setState] = useState(initialState);
    const {enqueueSnackbar} = useSnackbar();

    function save(payload) {
        setState({
            ...initialState,
            progress: 'loading',
        });
        return request(payload)
            .then(x => {
                afterSave(x.data);
                setState({
                    data: x.data,
                    progress: 'done',
                    errors: {}
                });
                return x.data;
            })
            .catch(error => {
                if (error.response.status !== 400) {
                    const message = 'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                    enqueueSnackbar(message, {variant: "error"});
                }
                setState({
                    data: {},
                    errors: error.response?.data,
                    progress: 'error'
                });
                return Promise.reject(error.response?.data);
            });
    }

    return [save, state, setState];
}

export function useOnce(request, response, initialState = {
    data: {},
    loading: true,
    errors: {}
}, errorMessage) {

    const [state, setState] = useState(initialState);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        request()
            .then(x => {
                response(x.data);
                setState({
                    data: x.data,
                    loading: false,
                    errors: {}
                });
            }).catch(error => {
            if (error.response?.status !== 400) {
                const message = errorMessage ?
                    errorMessage :
                    'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                enqueueSnackbar(message, {variant: "error"});
            }
            setState({
                errors: error.response?.data,
                loading: false
            });
            return Promise.reject(error.response?.data);
        });
    }, []);

    return [state.data, state.loading, state.errors];
}

export function useDeleteAll(request, errorMessage) {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    function deleteAll(data) {
        setLoading(true);
        return request(data)
            .then(x => {
                setLoading(false);
                return x.data
            })
            .catch(error => {
                const message = errorMessage ?
                    errorMessage :
                    'Unexpected error occurred, please contact support for more information.\n' + JSON.stringify(error.response?.data);
                enqueueSnackbar(message, {variant: "error"});
                setLoading(false)
            })
    }

    return [deleteAll, loading];
}