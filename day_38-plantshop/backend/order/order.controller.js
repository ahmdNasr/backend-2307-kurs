import { Order } from "./order.model.js"

export const postOrder = async (req, res) => {
    const user = req.authenticatedUser
    const {products} = req.body

    
    


    console.log(products)
    res.end()
}



// const beispielBody = {
//     products: [
//         {id: "blabla", amount: 5, preis: 10}
//     ],
//     comments: ""
// }