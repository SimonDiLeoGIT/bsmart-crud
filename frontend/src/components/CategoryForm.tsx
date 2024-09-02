import React, { useState } from "react"
import submit from "../assets/submit.svg"
import CategoryService from "../services/category.service"

interface Props {
  handleSubmit: () => void
}

const CategoryForm: React.FC<Props> = ({handleSubmit}) => {

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const _handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const category = {
      name,
      description
    }

    const response = await CategoryService.createCategory(category)

    if (response) {
      setName("")
      setDescription("")
      handleSubmit()
    }
  }


  return (
    <form onSubmit={_handleSubmit} className="grid grid-cols-5">
      <input type="text" placeholder="Id (Autocomplete)" disabled className="p-2 w-10/12"/>
      <div className="col-span-2">
        <input 
          type="text" 
          placeholder="Nombre" 
          name="name" 
          required 
          className="p-2 w-10/12 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex">
        <input 
          type="text" 
          placeholder="Descripción" 
          name="description" 
          required 
          className="p-2 w-10/12 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-700 text-slate-100 font-semibold hover:opacity-70 rounded-md m-auto">
          <img src={submit} alt="submit" width={20}/>
        </button>
      </div>
    </form>
  )
}

export default CategoryForm