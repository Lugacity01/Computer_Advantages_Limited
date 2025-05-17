


import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner"


// export const usefetchAllData = async () => {

//     const [data, setData] = useState<any>("");

//     const fetchData = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/all");
//             console.log("Fetched data: ", response.data);
//             setData(response.data);
//             // Handle the fetched data here
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//             toast.error("Failed to fetch data. Please try again.");
//         }
//     };

//     useEffect(() => {
//         fetchData();   
//     }, []);

//     return {data}

// }



export function useFetchData() {
  const [data, setData] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("https://backend-computer-advantage.vercel.app/all");
      console.log("Fetched data: ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Failed to fetch data. Please try again.");
    }
  }, []);
  

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, fetchData };
}

