// remove
"use client"
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

// Create a generic custom hook to fetch data from Supabase
function useFetchFromSupabase<T>(table: string): { data: T[] | null; loading: boolean; error: string | null } {
  const supabase = getSupabaseClient();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Provide both type arguments to the `from` method
        const { data, error } = await supabase
          .from(table) // specify the table name
          .select('*');  // or add specific columns

        if (error) {
          throw error;
        }

        setData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, table]);

  return { data, loading, error };
}

export default useFetchFromSupabase;