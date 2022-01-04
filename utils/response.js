exports.data = (status, data = null, code, message) => {
    return {
        status: status,
        data: data,
        code: code,
        message: message
    }
}