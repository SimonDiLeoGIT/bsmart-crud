import { useState } from "react"
// import down_arrow from '../assets/left-arrow.svg"

interface Props<T> {
  options: string[]
  id: T
  handleSelect: (id: T, op: string) => void
}

export const SortSelector = <T extends string | number>({ options, id, handleSelect }: Props<T>) => {


  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    setIsOpen(!isOpen)
  }

  function handleClik(id: T, op: string) {
    handleSelect(id, op)
    handleMenuOpen()
  }


  return (
    <>
      <button
        className="m-auto mr-4"
        onClick={() => handleMenuOpen()}
      >
        {/* <img src={down_arrow} className="w-4" /> */}
        v
      </button>

      <aside className={`absolute right-4 top-6 w-16 ${!isOpen && 'hidden'} bg-slate-100 z-50 overflow-hidden shadow-md`}>
        <ul className="text-sm">
          {
            options.map(op => {
              return (
                <li className="-text--color-black font-normal ">
                  <button
                    className="block text-start w-12 px-2 hover:opacity-80"
                    onClick={() => handleClik(id, op)}
                  >
                    {op}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </aside>
    </>
  )
}