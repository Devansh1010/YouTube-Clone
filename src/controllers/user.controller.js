import {asynceHandler} from "../utils/asynceHandler.js";

const registerUser = asynceHandler( async (req, res) => {
     res.status(200).json({
        message: "ok"
    })
})

export {registerUser}