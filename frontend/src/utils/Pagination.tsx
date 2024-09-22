import ReactPaginate from "react-paginate";
import left_arrow from '../assets/left-arrow.svg'
import right_arrow from '../assets/right-arrow.svg'
import { useEffect, useState } from "react";
import { useProducts } from "../hook/useProducts";
import Loading from "../components/Loading";


const Pagination = () => {

  const { products, name, getProductsWithUrl } = useProducts();
  
  const [selectedPage, setSelectedPage] = useState<number>(0);


  useEffect(() => {
    if (products) setSelectedPage(products?.current_page - 1)
  },[products])

  interface PageChangeEvent {
    selected: number;
  }

  const handlePageClick = (event: PageChangeEvent) => {
    const page = (event.selected) + 1
    setSelectedPage(event.selected)
    getProductsWithUrl(`${products?.path}?page=${page}&per_page=${products?.per_page}${name !== '' ? `&name=${name}` : ''}`);
  }

  if (!products) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <footer className="mt-4 flex justify-center">
      <button onClick={() => {getProductsWithUrl(`${products?.first_page_url}&per_page=${products?.per_page}${name !== '' ? `&name=${name}` : ''}`);setSelectedPage(0)}} className="bg-blue-700 text-slate-100 p-1 rounded-lg font-semibold hover:opacity-60">First Page</button>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <img src={right_arrow} className="w-4" alt="Next Page"/>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={products?.last_page}
        marginPagesDisplayed={2}
        previousLabel={
          <img src={left_arrow} className="w-4 " alt="Prev Page"/>
        }
        containerClassName="flex justify-center hover:cursor-pointer m-auto text-slate-700 mx-2"
        pageLinkClassName="p-2"
        pageClassName="p-1 rounded-lg font-semibold hover:opacity-60 border mx-1 border-2 hover:bg-blue-700 hover:text-slate-100"
        activeClassName="bg-blue-700 text-slate-100"
        previousClassName="h-8 w-4 md:w-8 flex items-center justify-center bg-blue-700 rounded-lg m-auto mr-1 hover:opacity-60"
        nextClassName="h-8 w-4 md:w-8 flex items-center justify-center bg-blue-700 rounded-lg m-auto ml-1 hover:opacity-60"
        renderOnZeroPageCount={null}
        forcePage={selectedPage}
      />
      <button onClick={() => {getProductsWithUrl(`${products?.last_page_url}&per_page=${products?.per_page}${name !== '' ? `&name=${name}` : ''}`); setSelectedPage(products?.last_page - 1)}}  className="bg-blue-700 text-slate-100 p-1 rounded-lg font-semibold hover:opacity-60">Last Page</button>
    </footer>
  )
}

export default Pagination