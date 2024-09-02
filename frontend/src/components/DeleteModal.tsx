import React, { useState } from 'react'
import trash from '../assets/trash.svg'
import ProductService from '../services/product.service'

interface Props {
  product_id: number
  product_name: string
  handleDelete: () => void
  text?: string
}

const DeleteModal: React.FC<Props> = ({ product_id, product_name, handleDelete, text }) => {

  const [showModal, setShowModal] = useState(false)

  const _handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await ProductService.deleteProduct(product_id)
      if (response) {
        setShowModal(false)
        handleDelete()
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className={`${text && "bg-red-700 p-2 rounded-md border font-semibold hover:opacity-70 text-slate-100"}`}>
        {
          text ? 
            text 
          : 
          <img src={trash} alt='trash' width={20}/>
        }
      </button>

      <aside className={`${showModal ? 'visible' : 'hidden'}  fixed top-0 left-0 right-0 bottom-0 bg-slate-500 bg-opacity-40 z-20`}>
        <section className='bg-slate-100 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 p-4 rounded-lg shadow-md text-start'>
          <h1 className='font-bold'>¿Deseas eliminar este producto?</h1>
          <h2>{product_name}</h2>
          <p className=''>¡Esto no se puede deshacer!</p>
          <div className='flex gap-2 mt-4'>
            <button onClick={() => setShowModal(false)} className='bg-blue-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70 m-auto mr-0'>Cancelar</button>
            <form onSubmit={_handleSubmit} className='m-auto ml-0'>
              <input type='submit' className='bg-rose-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70 hover:cursor-pointer' value="Eliminar" />
            </form>
          </div>
        </section>
      </aside>
    </>
  )
}

export default DeleteModal