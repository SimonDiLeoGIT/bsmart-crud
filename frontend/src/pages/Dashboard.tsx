import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryProductsInterface } from "../interfaces/Category";
import CategoryDashboard from "../components/CategoryDashboard";

const Dashboard = () => {

  const [categories, setCategories] = useState<CategoryProductsInterface[]>([]);

  useEffect(() => {
    getCategories();  
  }, [])

  const getCategories = async () => {
    const response = await CategoryService.getCategoryProducs();
    if (response) {
      setCategories(response);
      console.log(response)
    }
  };

  return (
    <main className="h-screen w-screen max-w-full bg-slate-100 text-slate-900 md:p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <section className="text-xl">
        <h2>Productos por Categoría</h2>
        <section className="flex gap-4">
          <article className="w-1/3 shadow-md shadow-slate-400 rounded-xl border">
            <Chart 
              options={{
                chart: {
                  id: "CategoriesDonut"
                },
                labels: categories.map(c => c.name) 
              }}
              series={categories.map(c => c.products.length)}
              type="donut"
            />
          </article>
          <article className="flex-1 shadow-md shadow-slate-400 rounded-xl border p-1">
            <Chart 
              options={{
                chart: {
                  id: "CategoriesBar"
                },
                xaxis: {
                  categories: categories.map(c => c.name)
                }
              }}
              series={[{
                name: "Products",
                data: categories.map(c => c.products.length) 
              }]}
              type="bar"
              height={500}
            />
          </article>
        </section>
      </section>
      <CategoryDashboard categories={categories} />
    </main>
  )
}

export default Dashboard;
