import { useEffect, useState } from "react"
import { CategoryInterface } from "../interfaces/Category"
import CategoryService from "../services/category.service";
import CategoryForm from "./CategoryForm";
import Message from "./Message";
import DeleteModal from "./DeleteModal";
import { SortSelector } from "./SortSelector";
import ErrorMessage from "./ErrorMessage";
import { ErrorInterface } from "../interfaces/ErrorInterface";
import edit_icon from "../assets/edit.svg"

interface Props {
  visibleModal: boolean
  onClose: () => void
}

const Categories: React.FC<Props> = ({visibleModal, onClose}) => {

  const [showModal, setShowModal] = useState(visibleModal);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const [sortBy, setSortBy] = useState<keyof CategoryInterface>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [selectedSort, setSelectedSort] = useState<keyof CategoryInterface | null>(null)

  const [editingCategory, setEditingCategory] = useState<CategoryInterface | null>(null);	

  const [adding, setAdding] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    getCategories(sortBy, sortOrder)
  },[sortBy, sortOrder])

  useEffect(() => {
    setShowModal(visibleModal);
  }, [visibleModal]);
  
  
  const getCategories = async (sortBy: keyof CategoryInterface = 'id', sortOrder: string = 'asc') => {
    const response = await CategoryService.getCategories(sortBy, sortOrder);
    if (response) {
      setCategories(response);
    }
  };

  const handleSelect = (id: keyof CategoryInterface, op: string) => {
    setSortBy(id)
    setSortOrder(op === 'Up' ? 'asc' : 'desc')
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const response = await CategoryService.updateCategory(editingCategory);
      console.log(response)
      setMessage('Categoría Actualizada con éxito');
      setVisibleMessage(true);
      setEditingCategory(null);
      await getCategories(sortBy, sortOrder)
    } catch (error) {
      const errorResponse: ErrorInterface = error as ErrorInterface;
      setErrorMessage(errorResponse.message || "An error occurred");
      setVisibleErrorMessage(true);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const response = await CategoryService.createCategory(editingCategory);
      setEditingCategory(response);
      setMessage('La categoría se creó con éxito');
      setVisibleMessage(true);
      setAdding(false);
      setEditingCategory(null);
      await getCategories(sortBy, sortOrder)
    } catch (error) {
      const errorResponse: ErrorInterface = error as ErrorInterface;
      setErrorMessage(errorResponse.message || "An error occurred");
      setVisibleErrorMessage(true);
    }
  }

  const handleCancelEditing = () => {
    setEditingCategory(null);
  }

  const handleCancelAdding = () => {
    setAdding(false);
  }
  
  const handleDelete = async (id: number) => {
    try {
      const response = await CategoryService.deleteCategory(id)
      if (response) {
        setMessage("Categoría eliminada con exito.")
        setVisibleMessage(true)
        getCategories(sortBy, sortOrder)
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('No se pudo eliminar la categoría. Intentelo nuevamente')
      setVisibleErrorMessage(true)
    }
  }

  function closeModal() {
    setEditingCategory(null);
    setAdding(false);
    setShowModal(false);
    onClose();
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-teal-700 text-slate-100 p-2 rounded-md border font-semibold hover:opacity-70 m-auto mr-0"
      >
        Categorías
      </button>

      <aside className={`${showModal ? 'visible' : 'hidden'}  fixed top-0 left-0 right-0 bottom-0 bg-slate-500 bg-opacity-40 z-20`}>
        <Message visible={visibleMessage} message={message} setVisible={setVisibleMessage}/>
        <ErrorMessage visible={visibleErrorMessage} message={errorMessage} setVisible={setVisibleErrorMessage}/>
        <section className='bg-slate-100 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full md:w-10/12 p-2 md:p-8 rounded-lg shadow-md text-start overflow-y-auto'>
          <header className="flex gap-2">
            <h1 className='font-bold'>Categorías</h1>
            <div className="m-auto mr-0">
              <button 
                onClick={closeModal} 
                className="bg-red-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70 md:w-32 mr-2 disabled:opacity-40 disabled:hover:opacity-40"
                disabled={adding || editingCategory!==null}
              >
                Cerrar
              </button>
              <button 
                onClick={() => setAdding(true)}
                className='bg-teal-700 text-slate-100 p-2 min-w-32 rounded-md font-semibold hover:opacity-70 disabled:opacity-40 disabled:hover:opacity-40'
                disabled={adding || editingCategory!==null}
              >
                Agregar Categoría
              </button>
            </div>
          </header>
          <ul className="mt-4 shadow-lg shadow-slate-400">
            <li className="grid grid-cols-3 border-b-2 border-slate-700 p-2 font-semibold">
              <SortSelector text="Id" options={['Up', 'Down']} id='id' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
              <SortSelector text="Nombre" options={['Up', 'Down']} id='name' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
              <div className="hidden md:block w-10/12 "><SortSelector text="Descripción" options={['Up', 'Down']} id='description' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /></div>
            </li>
            <div className="h-96 overflow-y-auto">
            {
              adding && 
              <li key={0} className="border-b-2 border-slate-700 relative">
                <CategoryForm  handleSubmit={handleCreate} handleCancel={handleCancelAdding} setEditingCategory={setEditingCategory} editing/>
              </li>
            }
            {
            categories.length === 0 ?
              <li className="grid h-96 place-content-center">
                <p className="m-auto">No hay categorías</p>
              </li>
            :
            categories?.map((category) => (
              category.id &&
              <li key={category.id} className="border-b-2 border-slate-700 relative">
                <CategoryForm category={category} handleSubmit={handleUpdate} handleCancel={handleCancelEditing} editingCategory={editingCategory} setEditingCategory={setEditingCategory} editing={editingCategory?.id === category.id} />
                {
                  !editingCategory &&
                  <div className="absolute top-0 right-0 flex justify-between gap-2 bg-slate-100 w-24 h-full">
                    <button
                      type="button"
                      onClick={() => setEditingCategory(category)}
                      className="hover:opacity-80 p-1 m-1 w-full rounded-lg"
                      >
                      <img src={edit_icon} alt="edit icon" width={20} className="m-auto" />
                    </button>
                    <DeleteModal id={category.id} name={category.name} handleDelete={handleDelete} message="¿Deseas eliminar esta Categoría?"/>
                  </div>        
                }
              </li>
            ))}
            </div>
          </ul>      
        </section>
      </aside>
    </>
  )
}

export default Categories