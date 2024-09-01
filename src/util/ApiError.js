class ApiError extends Error{
    Constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode // overwritin status code with custom
        this.data = null
        this.message = message // overwriting the message
        this.success = false
        this.errors = errors

        if(statck){
            this.stack = statck
        }
        else{
            Error.captureStackTrace(this, this.Constructor);
        }
    }
}
export default ApiError