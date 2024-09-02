import React, { useState } from 'react'
import edit from '../assets/edit.svg'
import { CategoryInterface } from '../interfaces/Category'
import CategoryService from '../services/category.service'

interface Props {
  category: CategoryInterface
  handleSubmit: () => void
}

const EditCategory: React.FC<Props> = ({ category, handleSubmit }) => {

  const [showModal, setShowModal] = useState(false)
  const [_category, setCategory] = useState<CategoryInterface>(category)

  const _handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(_category)
    const response = await CategoryService.updateCategory(_category)

    if (response) {
      handleSubmit()
      setShowModal(false)
    }
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>
          <img src={edit} alt='edit' width={20}/>
      </button>

      <aside className={`${showModal ? 'visible' : 'hidden'}  fixed top-0 left-0 right-0 bottom-0 bg-slate-500 bg-opacity-40 z-20`}>
        <section className='bg-slate-100 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 p-4 rounded-lg shadow-md text-start'>
          <h1 className='font-bold mb-4'>Editar Categoría {category.name}</h1>
          <div className='grid gap-4'>
            <form onSubmit={_handleSubmit} className='grid gap-4'>
              <input type='text' className='p-2  border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300' defaultValue={category.name} onChange={(e) => setCategory({ ..._category, name: e.target.value })} name='name'/>
              <input type='text' className='p-2  border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300' defaultValue={category.description} onChange={(e) => setCategory({ ..._category, description: e.target.value })} name='description'/>
              <input type='submit' className='bg-green-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70 hover:cursor-pointer ' value="Aceptar" />
            </form>
            <button onClick={() => setShowModal(false)} className='bg-red-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70'>Cancelar</button>
          </div>  
        </section>
      </aside>
    </>
  )
}

export default EditCategory