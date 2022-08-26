import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    err.message = err.message || 'INTERNAL SERVER ERROR'


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error_stack: err.stack
    })
}