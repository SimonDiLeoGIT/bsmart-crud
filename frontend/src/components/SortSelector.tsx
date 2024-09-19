import { useState } from "react"
import down_arrow from '../assets/down-arrow.svg'

interface Props<T> {
  options: string[]
  id: T
  text: string
  handleSelect: (id: T, op: string) => void
}

export const SortSelector = <T extends string | number>({ options, id, text, handleSelect }: Props<T>) => {


  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleMenuOpen() {
    setIsOpen(!isOpen)
  }

  function handleClik(id: T, op: string) {
    handleSelect(id, op)
    handleMenuOpen()
  }


  return (
    <article className="relative">
      <button
        className="mx-2 flex w-full"
        onClick={() => handleMenuOpen()}
      >
        <p className="font-semibold ">{text}</p>
        <p className="flex-1"><img src={down_arrow} className="w-6 m-auto mr-4" /></p>
      </button>

      <aside className={`absolute right-4 top-6 w-1/2 ${!isOpen && 'hidden'} bg-slate-100 z-50 overflow-hidden shadow-md`}>
        <ul className="text-sm border ">
          {
            options.map(op => {
              return (
                <li className="-text--color-black font-normal ">
                  <button
                    className="block text-start p-2 hover:opacity-80 border-b border-slate-500 w-full"
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
    </article>
  )
}