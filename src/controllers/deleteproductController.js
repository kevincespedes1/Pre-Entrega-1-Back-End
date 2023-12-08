import productsModel from '../../models/products.model.js'


export const deleteProduct = async (req, res) => {
    
    const { pid } = req.params

    try {

        const productToDelete = await productsModel.findById (pid)

        if (!productToDelete) {

            return res.status(404).json ({ error: 'Producto no encontrado' })
        }

        await productToDelete.remove()

        return res.json ({ message: 'Producto eliminado correctamente', deletedProduct: productToDelete})

    } catch (error) {

        console.error ('Error al eliminar el producto:', error)
        return res.status(500).json ({ message: 'Error interno del servidor'})
    }
}
