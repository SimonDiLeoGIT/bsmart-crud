import { useEffect, useState } from "react"
import { CategoryInterface } from "../interfaces/Category"
import CategoryService from "../services/category.service";
import CategoryForm from "./CategoryForm";
import Message from "./Message";
import DeleteModal from "./DeleteModal";
import EditCategory from "./EditCategory";

interface Props {
  visibleModal: boolean
  onClose: () => void
}

const Categories: React.FC<Props> = ({visibleModal, onClose}) => {

  const [showModal, setShowModal] = useState(visibleModal);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  },[]);

  useEffect(() => {
    setShowModal(visibleModal);
  }, [visibleModal]);
  
  
  const getCategories = async () => {
    const response = await CategoryService.getCategories();
    if (response) {
      setCategories(response);
    }
  };

  const handleClickEditing = () => {
    setEditing(!editing)
  }

  const handleSubmit = () => {
    setEditing(false)
    getCategories();
    setMessage("Categoría agregada con exito.")
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const handleEdit = () => {
    getCategories();
    setMessage("Categoría Editada con exito.")
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await CategoryService.deleteCategory(id)
      if (response) {
        setMessage("Categoría eliminada con exito.")
        setVisible(true)
        setTimeout(() => {
          setVisible(false)
        }, 3000)
        getCategories()
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-rose-700 text-slate-100 p-2 rounded-md border font-semibold hover:opacity-70 m-auto mr-0"
      >
        Categorías
      </button>

      <aside className={`${showModal ? 'visible' : 'hidden'}  fixed top-0 left-0 right-0 bottom-0 bg-slate-500 bg-opacity-40 z-20`}>
        <Message visible={visible} message={message} />
        <section className='bg-slate-100 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full md:w-10/12 p-2 md:p-8 rounded-lg shadow-md text-start overflow-y-auto'>
          <header className="flex gap-2">
            <h1 className='font-bold'>Categorías</h1>
            <div className="m-auto mr-0">
              {
                !editing &&
                <button onClick={() => { setShowModal(false); onClose(); }} className="bg-red-700 text-slate-100 p-2 rounded-md font-semibold hover:opacity-70 md:w-32 mr-4">
                  Cerrar
                </button>
              }
              <button 
                onClick={handleClickEditing}
                className={`${editing ? 'bg-red-700' : 'bg-blue-700'} text-slate-100 p-2 min-w-32 rounded-md font-semibold hover:opacity-70`}
                >
                {
                  editing ? (
                    'Cancelar'
                  ) : (
                    'Agregar Categoría'
                  )
                }
              </button>
            </div>
          </header>
          <ul className="mt-4 shadow-lg shadow-slate-400">
            <li className="grid grid-cols-5 border-b-2 border-slate-700 p-2 font-semibold">
              <p>Id</p>
              <p className="col-span-2 whitespace-nowrap overflow-hidden text-ellipsis">Nombre</p>
              <p className="hidden md:block col-span-2 whitespace-nowrap overflow-hidden text-ellipsis">Descripción</p>
            </li>
            <div className="h-96 overflow-y-auto">
            {
              editing && 
                <li className="border-b-2 border-slate-700">
                  <CategoryForm handleSubmit={handleSubmit} />
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
              <li key={category.id} className="grid grid-cols-5 border-b-2 border-slate-700 p-2 relative">
                <p>{category.id}</p>
                <p className="col-span-2 whitespace-nowrap overflow-hidden text-ellipsis ">{category.name}</p>
                <p className="col-span-2 whitespace-nowrap overflow-hidden text-ellipsis hidden md:block ">{category.description}</p>
                <div className="absolute right-0 top-2 flex bg-slate-100 gap-2 px-2">
                  <EditCategory category={category} handleSubmit={handleEdit} />
                  <DeleteModal id={category.id} name={category.name} handleDelete={handleDelete} message="¿Deseas eliminar esta Categoría?"/>
                </div>                
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