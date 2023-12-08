import productsModel from '../../models/products.model.js'


export const updateProduct = async (req, res) => {
    
    const { pid } = req.params
    const { title, description, price, code, stock } = req.body
    
    try {
        
        const productToUpdate = await productsModel.findById (pid)

        if (!productToUpdate) {

            return res.status(404).json ({ error: 'Producto no encontrado' })
        }

        productToUpdate.title = title || productToUpdate.title
        productToUpdate.description = description || productToUpdate.description
        productToUpdate.price = price || productToUpdate.price
        productToUpdate.code = code || productToUpdate.code
        productToUpdate.stock = stock || productToUpdate.stock

        await productToUpdate.save()

        return res.status(200).json ({ message: 'Producto actualizado correctamente' })
        
    } catch (error) {

        console.error ('Error al actualizar el producto:', error)
        res.status(500).send ('Error al actualizar el producto')
    }
}
