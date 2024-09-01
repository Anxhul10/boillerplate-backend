const asyncHandler = (fn)=>async(req, res, next)=>{
    try{
        await fn(req, res, next);
    }   
    catch(error){
        res.status("error occured"+error || 500).json({
            success:false,
            message:error
        })
    }
}
// node js error class