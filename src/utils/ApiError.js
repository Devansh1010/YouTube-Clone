class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        //Read this in the documentation or ChatGpt
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
           this.stack = stack 
        } else {
            Error.captureStackTrace(this, this.construcor)
        }
    }
}

export {ApiError}