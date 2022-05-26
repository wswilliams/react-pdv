export interface HttpResponse {
    statusCode: number
    body?: any
}
export interface HttpRequest {
    body?: any
}

export const serverError = (error: any): HttpResponse => ({
    statusCode: 500,
    body: {
        message: error.message,
        trace: error.stack,
    }
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const noContent = (): HttpResponse => ({
    statusCode: 204
})

export const badRequest = (data: any): HttpResponse => ({
    statusCode: 400,
    body: data
})

export const unauthorized = (data: any): HttpResponse => ({
    statusCode: 401,
    body: data
})

export const forbidden = (data: any): HttpResponse => ({
    statusCode: 403,
    body: data
})

export const notFound = (data: any): HttpResponse => ({
    statusCode: 404,
    body: data
})
