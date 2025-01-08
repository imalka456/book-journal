import { Book } from '../../models/interfaces';
import { MdOutlineEdit } from "react-icons/md";

export default function Table({books, onEdit}: { books: Book[], onEdit: (book: Book) => void; }) {
    return (
        <div className="mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2">
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
                    <td className="text-md px-6 py-3">{book.status}</td>
                    <td className="text-md px-6 py-3">{book.isbn}</td>
                    <td className="text-md px-6 py-3"><button onClick={() => onEdit(book)}><MdOutlineEdit 
                    className='rounded-full p-1 text-2xl bg-dark-blue text-white cursor-pointer'/></button></td>
                    {/* <td className="text-md px-6 py-3">11</td> */}
                </tr>
        ))}



                    {/* <tr className="border-b" key={book.title}>
                        <td className="text-md px-6 py-3">{book.title}</td>
                        <td className="text-md px-6 py-3">{book.start_date}</td>
                        <td className="text-md px-6 py-3">{book.end_date}</td>
                        <td className="text-md px-6 py-3">{book.status}</td>
                        <td className="text-md px-6 py-3">11</td>
                    </tr> */}


                    {/* <tr className="border-b">
                        <td className="text-md px-6 py-3">The Alchemist</td>
                        <td className="text-md px-6 py-3">2024/11/01</td>
                        <td className="text-md px-6 py-3">2024/12/01</td>
                        <td className="text-md px-6 py-3">Finished</td>
                        <td className="text-md px-6 py-3">21</td>
                    </tr> */}


                    {/* <tr>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                    </tr>
                    <tr>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                    </tr>
                    <tr>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                        <td className="text-md px-6 py-3">Create</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    )
}