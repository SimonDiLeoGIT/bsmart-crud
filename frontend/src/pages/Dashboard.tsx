import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryProductsInterface } from "../interfaces/Category";
import CategoryDashboard from "../components/CategoryDashboard";
import { useUser } from "../hook/useUser";
import Loading from "../components/Loading";

const Dashboard = () => {

  const { token } = useUser()
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryProductsInterface[]>([]);

  useEffect(() => {
    getCategories();  
  }, [])

  useEffect(() => {
    setLoading(true);
    if (!token) {
      window.location.href = '/login'
    } else {
      setLoading(false);
    }

  }, [token])

  const getCategories = async () => {
    setLoading(true);
    const response = await CategoryService.getCategoryProducs();
    if (response) {
      setCategories(response);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-slate-100">
        <Loading />
      </div>
    )
  }

  return (
    <main className="h-screen w-screen max-w-full bg-slate-100 text-slate-900 md:p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <section className="text-xl">
        <h2>Productos por Categoría</h2>
        <section className="flex flex-col lg:flex-row gap-4 my-4">
          <article className="lg:flex-1 shadow-md shadow-slate-400 rounded-xl border">
            <Chart 
              options={{
                chart: {
                  id: "CategoriesDonut"
                },
                labels: categories.map(c => c.name) 
              }}
              series={categories.map(c => c.products.length)}
              type="donut"
              height={300}
            />
          </article>
          <article className="lg:w-1/2 xl:w-2/3 shadow-md shadow-slate-400 rounded-xl border p-1">
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
              height={300}
            />
          </article>
        </section>
      </section>
      <CategoryDashboard categories={categories} />
    </main>
  )
}

export default Dashboard;
