import { useEffect, useState } from "react";
import { CategoryProductsInterface } from "../interfaces/Category"
import Chart from "react-apexcharts";

interface Props {
  categories: CategoryProductsInterface[]
}

const CategoryDashboard: React.FC<Props> = ({ categories }) => {

  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    if (categories.length > 0) setCategorySelected(categories[0].id);
  }, [categories])

  const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategorySelected(Number(e.target.value));
  }

  return (
    <section className="py-10">
      <select name="category" onChange={handleSelectedChange} className="p-4 shadow-md shadow-slate-400 rounded-xl w-full mb-10 border">
        {
          categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))
        }
      </select>
      <section className="grid grid-cols-2 gap-4">
        <article className="shadow-md shadow-slate-400 rounded-xl relative border p-1">
          <h3 className="p-2 bg-teal-700 text-slate-100 inline rounded-lg absolute top-2 left-2 z-10">Stock por producto</h3>
          <Chart 
            options={{
              chart: {
                id: "CategoryProductsBarByStock"
              },
              xaxis: {
                
                categories: categories
                  .filter(c => c.id === categorySelected)
                  .flatMap(c => c.products.map(p => p.name)) 
              }
            }}
            series={[{
              name: "Products Stock",
              data: categories
                .filter(c => c.id === categorySelected)
                .flatMap(c => c.products.map(p => p.stock)) 
            }]}
            type="bar"
            height={600}
          />
        </article>
        <article className="shadow-md shadow-slate-400 rounded-xl relative border p-1">
          <h3 className="p-2 bg-teal-700 text-slate-100 inline rounded-lg absolute top-2 left-2 z-10">Precio por Producto</h3>
          <Chart 
            options={{
              chart: {
                id: "CategoryProductsBarByPrice"
              },
              xaxis: {
                
                categories: categories
                  .filter(c => c.id === categorySelected)
                  .flatMap(c => c.products.map(p => p.name)) 
              }
            }}
            series={[{
              name: "Products price",
              data: categories
                .filter(c => c.id === categorySelected)
                .flatMap(c => c.products.map(p => p.price)) 
            }]}
            type="bar"
            height={600}
          />
        </article>
      </section>
    </section>
  )
}

export default CategoryDashboard