import { Link } from "react-router-dom"
import { ProductCategory } from "../interfaces/ProductInterfaces"
import DeleteModal from "./DeleteModal"

interface Props {
  product: ProductCategory
  index: number
  handleDelete: (id: number) => void
}

const ProductItem: React.FC<Props> = ({product, index, handleDelete}) => {
  return (
    <li key={product.id} className="relative">
      <Link to={`/detalle/${product.id}`} className="hover:opacity-70">
        <article className={`grid grid-cols-3 md:grid-cols-5 border-b border-slate-500 p-2 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-300'}`}>
          <p>{product.id}</p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
          <p className="hidden md:block">{product.category.name}</p>
          <p className="hidden md:block">{product.stock}</p> 
          <p>${product.price}</p>
        </article>
      </Link>
      <div className="absolute right-0 top-0">
        <DeleteModal id={product.id} name={product.name} handleDelete={handleDelete} message="¿Deseas eliminar este producto?"/>
      </div>
    </li>
  )
}

export default ProductItem