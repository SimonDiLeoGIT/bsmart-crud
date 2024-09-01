import ReactPaginate from "react-paginate";
import left_arrow from '../assets/left-arrow.svg'
import right_arrow from '../assets/right-arrow.svg'
import { PaginationInterface } from "../interfaces/Pagination";

interface props {
  params: PaginationInterface
  getProducts: (page: number) => void
}

const Pagination: React.FC<props> = ({params, getProducts}) => {

  interface PageChangeEvent {
    selected: number;
  }

  const handlePageClick = (event: PageChangeEvent) => {
    const page = (event.selected) + 1
    getProducts(page)
  }


  return (
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
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center hover:cursor-pointer m-auto"
      pageLinkClassName="p-1 md:p-2"
      pageClassName="p-1 rounded-lg font-semibold hover:opacity-60 border mx-1"
      activeClassName="bg-blue-700"
      previousClassName="h-8 w-4 md:w-8 flex items-center justify-center bg-blue-700 rounded-lg m-auto mr-1 hover:opacity-60"
      nextClassName="h-8 w-4 md:w-8 flex items-center justify-center bg-blue-700 rounded-lg m-auto ml-1 hover:opacity-60"
    />
  )
}

export default Pagination