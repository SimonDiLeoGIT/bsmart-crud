import { useEffect, useState } from "react";
import { Product } from "../interfaces/ProductInterfaces";
import CategoryService from "../services/category.service";
import { CategoryInterface } from "../interfaces/Category";

interface Props {
  product?: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  handleSubmit: () => void;
  editing?: boolean;
  handleCancel: () => void;
}

const ProductForm: React.FC<Props> = ({ product = null, setProduct, handleSubmit, editing = true, handleCancel }) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await CategoryService.getCategories();
      if (response) {
        setCategories(response);
      }
    };

    getCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if(product?.price >= 0) {
      handleSubmit();
      setError(null);
    } else {
      setError('El precio debe ser mayor a 0.');
    }
  }

  return (
    <>
      <form onSubmit={_handleSubmit} className="m-auto">
        <span className={`${error ? "block" : "hidden"} text-red-500 font-semibold`}>{error}</span>
        <fieldset disabled={!editing} className={`grid grid-cols-4 mt-10 gap-4  ${!editing && "opacity-80"}`}>
          <label className="font-semibold m-auto ml-0" htmlFor="name">Nombre</label>
          <input
            className={`p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300 col-span-3`}
            required
            type="text"
            id="name"
            name="name"
            value={product?.name || ""}
            onChange={handleChange}
            autoFocus={editing}
            />
          <label className="font-semibold m-auto ml-0" htmlFor="description">Descripción</label>
          <input
            className={`p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300 col-span-3`}
            required
            type="text"
            id="description"
            name="description"
            value={product?.description || ""}
            onChange={handleChange}
            />
          <label className="font-semibold m-auto ml-0" htmlFor="price">Precio</label>
          <input
            className={`p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300 col-span-3`}
            required
            type="number"
            id="price"
            name="price"
            value={product?.price || ""}
            onChange={handleChange}
            />
          <label className="font-semibold m-auto ml-0" htmlFor="category">Categoría</label>
          <select
            id="category_id"
            name="category_id"
            value={product?.category_id || 0}
            onChange={handleChange}
            className={`p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300 col-span-3`}
            >
            <option value={0}>Selecciona una Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="font-semibold m-auto ml-0" htmlFor="stock">Stock</label>
          <input
            className={`p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300 col-span-3`}
            required
            type="number"
            id="stock"
            name="stock"
            min={0}
            value={product?.stock || ""}
            onChange={handleChange}
            />
        </fieldset>
        <footer className="grid grid-cols-2 gap-4 col-span-4 w-8/12 m-auto mt-8">
          {
            editing &&
            <>
              <button
              className="bg-red-700 text-slate-100 p-2 rounded-md border font-semibold hover:opacity-70"
              onClick={handleCancel}
              >
                Cancelar
              </button>
              <input
                className="bg-green-700 text-slate-100 p-2 rounded-md border font-semibold hover:opacity-70 hover:cursor-pointer"
                type="submit"
                value="Aceptar"
              />
            </>
          }
        </footer>
      </form>
    </>
  );
};

export default ProductForm;
