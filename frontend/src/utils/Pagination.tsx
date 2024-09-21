import ReactPaginate from "react-paginate";
import left_arrow from '../assets/left-arrow.svg'
import right_arrow from '../assets/right-arrow.svg'
import { PaginationInterface } from "../interfaces/Pagination";
import { useEffect, useState } from "react";

interface props {
  params: PaginationInterface
  getProducts: (page: number) => void
  getProductsWithUrl: (url: string) => void
}

const Pagination: React.FC<props> = ({params, getProducts, getProductsWithUrl}) => {

  const [selectedPage, setSelectedPage] = useState<number>(params.current_page - 1);

  interface PageChangeEvent {
    selected: number;
  }

  const handlePageClick = (event: PageChangeEvent) => {
    const page = (event.selected) + 1
    setSelectedPage(event.selected)
    getProducts(page)
  }

  useEffect(() => {
    console.log(params)
  }, [params])


  return (
    <footer className="mt-4 flex justify-center">
      <button onClick={() => {getProductsWithUrl(params.first_page_url); setSelectedPage(0)}} className="bg-blue-700 text-slate-100 p-1 rounded-lg font-semibold hover:opacity-60">First Page</button>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <img src={right_arrow} className="w-4" alt="Next Page"/>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={params.last_page}
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
      <button onClick={() => {getProductsWithUrl(params.last_page_url); setSelectedPage(params.last_page - 1)}}  className="bg-blue-700 text-slate-100 p-1 rounded-lg font-semibold hover:opacity-60">Last Page</button>
    </footer>
  )
}

export default Pagination