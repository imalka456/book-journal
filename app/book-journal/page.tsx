"use client"
import Table from "../ui/book-journal/table"
import { useState, useEffect } from 'react';
import { Book } from '../models/interfaces';
import { addNewBook, editBook, fetchBooks } from '../lib/data';
import Popup from '../ui/book-journal/add-book-popup';

export default function BookJournal() {
  const [books, setBooks] = useState<Book[]>([]); // State to store books data
  const [error, setError] = useState<string | null>(null); // State to store errors
  const [loading, setLoading] = useState<boolean>(true); // State for loading state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const closePopup = () => setIsPopupOpen(false);

  const handleAddBook = () => {
    setPopupMode("add");
    setSelectedBook(null); // Clear form data for adding a new book
    setIsPopupOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setPopupMode("edit");
    setSelectedBook(book); // Pass book data to prefill the form
    setIsPopupOpen(true);
  };

  const handlePopupSubmit = (data: { id: number | undefined, title: string; isbn: string; startDate: Date | undefined; endDate: Date | undefined; isToggled: boolean}) => {
    try {
      const handleBookOperation = (operation: () => Promise<void>) => {
        operation()
          .then(() => {
            closePopup();
            getBooks();
          })
          .catch((error) => {
            console.error(error);
          });
      };

      if (popupMode === "add") {
        handleBookOperation(() => addNewBook(data));
      } else if (popupMode === "edit") {
        handleBookOperation(() => editBook(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // If it's an instance of Error, we can safely access message
      } else {
        setError('An unknown error occurred'); // Fallback for other types of errors
      }
    }   
    
  };

  const getBooks = async () => {
    try {
      const data = await fetchBooks(); // Call the fetchBooks function
      setBooks(data); // Set books data in state
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // If it's an instance of Error, we can safely access message
      } else {
        setError('An unknown error occurred'); // Fallback for other types of errors
      }
    } finally {
      setLoading(false); // Set loading state to false once the data is fetched
    }
  };

  useEffect(() => {
    getBooks(); // Fetch books when component mounts
  }, []); // Empty dependency array ensures this runs only once after initial render

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetch fails
  }

  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl text-dark-blue font-medium ">Book Journal</h1>
      {/* <ul>
      {books.map((book: Book) => (
          <li key={book.title}>
            <h3>{book.title}</h3>
            <p>Start Date: {book.start_date}</p>
            <p>End Date: {book.end_date}</p>
            <p>Status: {book.status}</p>
          </li>
        ))}
      </ul> */}

<div className="w-full pt-5 flex flex-col md:flex-row items-center gap-2 md:gap-4">
  <input
    className="flex-grow p-2 rounded-md border border-gray-200 placeholder:text-gray-500 focus:outline-dark-blue w-full md:w-auto"
    placeholder="Search"
  />
  <button
    className="p-2 bg-dark-blue text-white px-4 w-full md:w-auto"
    onClick={handleAddBook}
  >
    + Add New Book
  </button>
</div>
      {isPopupOpen && <Popup 
          onClose={closePopup} 
          mode={popupMode}
          initialData={selectedBook}
          onSubmit={handlePopupSubmit }/>}
      <Table books={books} onEdit={handleEditBook}/>
    </div>
  );
}