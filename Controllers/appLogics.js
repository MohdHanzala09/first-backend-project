export const handleHome = async (req,res) => {
    try {
        return res.status(200).json({msg:"Home page", success:true})
    } catch (error) {
        console.log(error)
    }
}


export const handleAbout = async (req,res) => {
    try {
        return res.status(200).json({msg:"About page", success:true})
    } catch (error) {
        console.log(error)
    }
}
export const handleContact = async (req,res) => {
    try {
        return res.status(200).json({msg:"Contact page", success:true})
    } catch (error) {
        console.log(error)
    }
}