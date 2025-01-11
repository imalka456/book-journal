import { Book } from '../../models/interfaces';
import { MdOutlineEdit } from "react-icons/md";

export default function Table({books, onEdit}: Readonly<{ books: Book[], onEdit: (book: Book) => void; }>) {
  return (
    <div className="mt-6">
      <div className="inline-block min-w-full align-middle hidden md:block">
        <div className="rounded-lg bg-gray-200 p-2 w-full h-full overflow-y-auto">
          <table className="min-w-full text-gray-900">
            <thead className="bg-gray-200 rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  ISBN
                </th>
                <th scope="col" className="px-6 py-3 font-medium">                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {books.map((book: Book) => (
                    <tr className="border-b" key={book.title}>
                    <td className="text-md px-6 py-3">{book.title}</td>
                    <td className="text-md px-6 py-3">{book.start_date}</td>
                    <td className="text-md px-6 py-3">{book.end_date}</td>
                    <td className={`text-md px-6 py-3 bg-opacity-50`}>
                      <div className={`m-2 px-2 text-center rounded-lg ${book.status === "Finished" ? "text-green-800 bg-green-200" : "text-yellow-800 bg-yellow-200"}`}>{book.status}</div></td>
                    <td className="text-md px-6 py-3">{book.isbn}</td>
                    <td className="text-md px-6 py-3"><button onClick={() => onEdit(book)}><MdOutlineEdit 
                    className='rounded-full p-1 text-2xl bg-dark-blue text-white cursor-pointer hover:bg-hover-color'/></button></td>
                    {/* <td className="text-md px-6 py-3">11</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>        
        {books.map((book: Book) => (
          <div className='bg-white p-4 rounded-lg shadow' key={book.title}>
            <div className='flex justify-between items-center text-sm text-gray-900'>
              <div className='font-bold'>{book.title}</div>
              <div><button onClick={() => onEdit(book)}><MdOutlineEdit 
                    className='rounded-full p-1 text-2xl bg-dark-blue text-white cursor-pointer hover:bg-hover-color'/></button></div>
            </div>
            <div className='flex justify-between items-center'>
              <div>{book.isbn}</div>
              <div className='bg-opacity-50'><div className={`m-2 px-2 text-center rounded-lg ${book.status === "Finished" ? "text-green-800 bg-green-200" : "text-yellow-800 bg-yellow-200"}`}>{book.status}</div></div>
            </div>
            <div className='flex justify-between items-center text-sm'>
              <div>Start Date</div>
              <div>End Date</div>
            </div>
            <div className='flex justify-between items-center text-sm'>
              <div>{book.start_date}</div>
              <div>{book.end_date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}