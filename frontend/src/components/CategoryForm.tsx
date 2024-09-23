import cancel_icon from "../assets/cancel-svgrepo-com.svg"
import submit_icon from "../assets/submit.svg"
import { CategoryInterface } from "../interfaces/Category"

interface Props {
  category?: CategoryInterface
  handleCancel: () => void
  handleSubmit: (event: React.FormEvent) => void
  editingCategory?: CategoryInterface | null
  setEditingCategory: React.Dispatch<React.SetStateAction<CategoryInterface|null>>
  editing: boolean
}

const Category: React.FC<Props> = ({ category, handleSubmit, handleCancel, editingCategory, setEditingCategory, editing }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    } as CategoryInterface));
  };

  return (
    <form onSubmit={handleSubmit} key={category?.id} className="">
      <fieldset className="grid grid-cols-3 gap-2" disabled={!editing}>
        <p className="p-2">{category?.id ? category.id : 'Id'}</p>
        <input className={`w-10/12 p-2 ${editing ? "p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300" : "bg-slate-100"}`} value={editing ? editingCategory?.name : category?.name} name='name' onChange={handleInputChange}/>
        <input className={`hidden md:block w-10/12 p-2 ${editing ? "p-2 border-b-2 border-slate-500 focus:border-blue-400 focus:outline-none bg-gray-300" : "bg-slate-100"}`} value={editing ? editingCategory?.description : category?.description} name='description' onChange={handleInputChange}/>
      </fieldset>
      <div className="absolute top-0 right-0 flex justify-between gap-2 bg-slate-100 w-24 h-full">
      {editing ? (
          <>
            <button
              type="submit"
              className="bg-blue-700 p-1 m-1 w-full rounded-lg hover:opacity-80"
            >
              <img src={submit_icon} alt="ok icon" width={20} className="m-auto" />
            </button>
            <button
              type="button"
              className="bg-red-700 p-1 m-1 w-full rounded-lg hover:opacity-80"
              onClick={handleCancel}
            >
              <img
                src={cancel_icon}
                alt="cancel icon"
                width={20}
                className="m-auto"
              />
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default Category;