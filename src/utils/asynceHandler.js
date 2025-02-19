const asynceHandler = (requestHandler) =>{
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}

export { asynceHandler }


// Another Method to do this 

// const asyncHandler = (requestHandler) => async(err, req, res, next) =>{
//     try {
//         await requestHandler(err, req, res, next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
