

export const login=async (req,res) => {
    
    const {email,password}=req.body;

    

    res.status(200).json({
        success:true,
        message:"Login sucessFull",
        email:email
    })
}