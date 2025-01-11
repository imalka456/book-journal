import { getSupabaseClient } from "./supabaseClient";
import { Book } from "../models/interfaces";

export async function fetchBooks(): Promise<Book[]> {
  try {
    const supabase = getSupabaseClient();

    // Run the query to fetch books with the specified conditions
    const { data, error } = await supabase
      .from("books")
      .select(
        `
        id,
        title,
        created_at,
        isbn,
        user_books (
          user_id,
          start_date,
          end_date,
          status          
        )
      `,
      )
      .eq("user_books.user_id", 1)
      .order("id", { ascending: true }); // Filter on the user_id in users_books

    // Check if there is an error in the query
    if (error) {
      throw new Error(error.message); // Throw an error with the message if there's an issue
    }

    // Return the data if no error occurred
    console.log(data);
    const processedData: Book[] = data.map((item) => ({
      id: item.id,
      title: item.title,
      created_at: item.created_at,
      user_id: item.user_books?.[0]?.user_id || 0,
      status: getStatusLabel(item.user_books?.[0].status), //getStatusLabel(item.user_books?.[0].status)
      start_date: formatDate(item.user_books?.[0].start_date) || null,
      end_date: formatDate(item.user_books?.[0].end_date) || null,
      isbn: item.isbn,
    }));

    // const processedData: Book[] = data.map(item => {
    //     const userBook = item.user_books?.[0]; // Access the first user_books entry safely

    //     return {
    //       title: item.title,
    //       created_at: item.created_at,
    //       user_id: userBook?.user_id || 0, // Default to 0 if missing
    //       status: userBook?.status || 'unknown', // Provide a default status
    //       start_date: userBook?.start_date ? new Date(userBook.start_date) : null,
    //       end_date: userBook?.end_date ? new Date(userBook.end_date) : null,
    //     };
    //   });

    return processedData;
  } catch (error) {
    // Log the error for debugging
    console.error("Database Error:", error);

    // Return a more specific error message
    throw new Error("Failed to fetch books data.");
  }
}

const formatDateToDB = (date: Date) => {
  // Adjust for local timezone offset (in minutes)
  const localOffset = date.getTimezoneOffset();

  // Create a new date to avoid modifying the original one
  const adjustedDate = new Date(date.getTime() - localOffset * 60000);

  // Format the adjusted date to 'YYYY-MM-DD'
  const formattedDate = adjustedDate.toISOString().split("T")[0];

  return formattedDate;
};

export async function addNewBook(book: {
  title: string;
  isbn: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isToggled: boolean;
}): Promise<void> {
  try {
    const userId = "1";
    const supabase = getSupabaseClient();

    const response = await supabase
      .from("books")
      .select("isbn, id")
      .eq("isbn", book.isbn)
      .single();

    let existingBook = response.data;
    const bookError = response.error;

    if (bookError && bookError.code !== "PGRST116") {
      throw new Error("Error checking book availability");
    }

    const startDateFormatted = book.startDate
      ? formatDateToDB(book.startDate)
      : null;
    const endDateFormatted = book.endDate ? formatDateToDB(book.endDate) : null;

    if (!existingBook) {
      const { data: newBook, error: insertBookError } = await supabase
        .from("books")
        .insert([{ title: book.title, isbn: book.isbn }])
        .select("isbn, id")
        .single();

      if (insertBookError) {
        throw new Error("Error inserting new book");
      }

      existingBook = newBook;
    }

    // Check if the user already has this book in their user_books table
    const { data: userBook, error: userBookError } = await supabase
      .from("user_books")
      .select("user_id, book_id")
      .eq("user_id", userId)
      .eq("book_id", existingBook.id)
      .single(); // Fetch a single record

    if (userBookError && userBookError.code !== "PGRST116") {
      throw new Error("Error checking user_books");
    }

    // If the user doesn't have this book, add it to user_books table
    if (!userBook) {
      const { data: userBookRecord, error: insertUserBookError } =
        await supabase
          .from("user_books")
          .insert([
            {
              user_id: userId,
              book_id: existingBook.id, //, start_date: startDateFormatted, end_date: endDateFormatted
              start_date: startDateFormatted ?? null, // If no start_date, store as null
              end_date: endDateFormatted ?? null, // If no start_date, store as null
              status: book.isToggled ? "finished" : "in_progress",
            },
          ])
          .single();

      if (insertUserBookError) {
        throw new Error("Error inserting user_book record");
      }

      console.log("User book added:", userBookRecord);
    } else {
      console.log("User already has this book.");
    }

    console.log("Book processing completed");
  } catch (error) {
    console.error("Database Error:", error);

    // Return a more specific error message
    throw new Error("Failed to fetch books data.");
  }
}

export async function editBook(book: {
  id: number | undefined;
  title: string;
  isbn: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isToggled: boolean;
}): Promise<void> {
  try {
    const userId = 1; // Replace with actual user ID
    const supabase = getSupabaseClient();

    // Format dates if they exist
    const startDateFormatted = book.startDate
      ? formatDateToDB(book.startDate)
      : null;
    const endDateFormatted = book.endDate ? formatDateToDB(book.endDate) : null;

    // Update the `books` table
    const { error: booksError } = await supabase
      .from("books")
      .update({
        title: book.title,
        isbn: book.isbn,
      })
      .eq("id", book.id);

    if (booksError) {
      throw new Error(`Failed to update books table: ${booksError.message}`);
    }

    // Update the `user_books` table
    const { error: userBooksError } = await supabase
      .from("user_books")
      .update({
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        status: book.isToggled ? "finished" : "in_progress",
      })
      .eq("book_id", book.id)
      .eq("user_id", userId);

    if (userBooksError) {
      throw new Error(
        `Failed to update user_books table: ${userBooksError.message}`,
      );
    }

    console.log("Update successful");
  } catch (error) {
    console.error("Update failed", error);
    throw error; // Re-throw the error if needed
  }
}

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case "in_progress":
      return "In Progress";
    case "finished":
      return "Finished";
    // Add more cases as needed
    default:
      return "Unknown Status";
  }
};

export const formatDate = (date: Date): string => {
  if (date) {
    const date1 = new Date(date);
    return date1.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } else {
    return "-";
  }
};
