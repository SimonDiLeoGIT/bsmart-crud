import { useState } from "react";
import { Product } from "../interfaces/ProductInterfaces";
import ProductService from "../services/product.service";
import Message from "./Message";

interface Props {
  product?: Product
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const ProductForm: React.FC<Props> = ({ product = null, setProduct}) => {

  const [disabledInputs, setDisabledInputs] = useState(true)
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setProduct((prevProduct) => {
      if (!prevProduct) {
        return {
          name: name === "name" ? value : "",
          description: name === "description" ? value : "",
          price: name === "price" ? parseFloat(value) : 0,
          stock: name === "stock" ? parseInt(value) : 0,
          category_id: name === "category_id" ? parseInt(value) : 0,
        } as Product;
      }
  
      return {
        ...prevProduct,
        [name]: name === "price" || name === "stock" || name === "category_id" ? parseFloat(value) : value,
      } as Product;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        const response = await ProductService.updateProduct(product)
        if (response) {
          setProduct(response)
          setDisabledInputs(true)
          setMessage("Producto actualizado con exito")
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  const handleCancel = () => {
    window.location.reload()
  }

  const handleEditClick = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabledInputs(false);
  };

  return (
    <>
    <Message message={message} />
    <form onSubmit={handleSubmit} className="max-w-2xl m-auto p-8 ">
      <fieldset disabled={disabledInputs} className={`grid grid-cols-4 mt-10 gap-4  ${disabledInputs && "opacity-80"}`}>
        <label className="font-semibold m-auto ml-0" htmlFor="name">Nombre</label>
        <input 
          className={`p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3 ${disabledInputs && ' opacity-80'}`} 
          required 
          type="text" 
          id="name" 
          name="name" 
          value={product?.name}
          onChange={handleChange} 
          autoFocus={!disabledInputs}
          />
        <label className="font-semibold m-auto ml-0" htmlFor="description">Descripción</label>
        <input 
          className={`p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3 ${disabledInputs && ' opacity-80'}`} 
          required 
          type="text" 
          id="description" 
          name="description" 
          value={product?.description} 
          onChange={handleChange} 
          />
        <label className="font-semibold m-auto ml-0" htmlFor="price">Precio</label>
        <input 
          className={`p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3 ${disabledInputs && ' opacity-80'}`} 
          required type="number" 
          id="price" 
          name="price" 
          value={product?.price} 
          onChange={handleChange} 
          />
        <label className="font-semibold m-auto ml-0" htmlFor="category">Categoría</label>
        <input 
          className={`p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3 ${disabledInputs && ' opacity-80'}`} 
          required 
          type="text" 
          id="category" 
          name="category" 
          value={product?.category_id} 
          onChange={handleChange} 
          />
        <label className="font-semibold m-auto ml-0" htmlFor="stock">Stock</label>
        <input 
          className={`p-2 border-b-2 border-violet-300 focus:border-violet-400 focus:outline-none bg-gray-700 col-span-3 ${disabledInputs && ' opacity-80'}`} 
          required 
          type="number" 
          id="stock" 
          name="stock" 
          value={product?.stock} 
          onChange={handleChange} 
          />
        </fieldset>
        <footer className="grid grid-cols-2 gap-4 col-span-4 w-8/12 m-auto mt-8">
          {
            disabledInputs ?
            <button onClick={handleEditClick} className="col-span-2 bg-gray-900 p-2 rounded-md border font-semibold hover:opacity-70">Editar Producto</button>
            :
            <>
                <button className="bg-red-950 p-2 rounded-md border font-semibold hover:opacity-70"  onClick={handleCancel}>Cancelar</button>
                <input  className="bg-green-950 p-2 rounded-md border font-semibold hover:opacity-70 hover:cursor-pointer" type="submit" value="Aceptar" />
              </>
          }
        </footer>
    </form>
    </>
  )
}

export default ProductForm