import {useAuthStore} from '@/stores/auth';

export const fetchWrapper = {
    get: request('GET'),
    post: requestWithBody('POST'),
    put: requestWithBody('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function requestWithBody(method) {
    return (url, body = null, isFormData = false) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            if (isFormData) {
                // Для отправки FormData, заголовок 'Content-Type' не устанавливается
                requestOptions.body = body;
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const {user} = useAuthStore();
    const isLoggedIn = !!user?.token;
    // const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    const isApiUrl = !!url
    if (isLoggedIn && isApiUrl) {
        return {Authorization: `Bearer ${user.token}`};
    } else {
        return {};
    }
}

function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    const {user, logout} = useAuthStore();
    if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
    }

    if (contentType && contentType.includes("application/json")) {
        return response.json().then(data => {
            if (!response.ok) {
                // Обработка ошибок для JSON ответа
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    } else {
        // Обработка не-JSON ответов
        return response.text().then(text => {
            if (!response.ok) {
                // Обработка ошибок для текстовых ответов
                return Promise.reject(text);
            }
            return text;
        });
    }
}
