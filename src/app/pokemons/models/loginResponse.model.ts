export interface LoginResponse {
    access_token: string,
    refresh_token: string,
    expire_in: string,
    token_type: string,
    statusCode: string,
    error: string,
    message: string
}