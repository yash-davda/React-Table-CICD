import { useState } from "react";

const Pagination = () =>{
    const[page,setPage] = useState(1);
    const [limit] = useState(10);

    return {page,setPage,limit};
}

export default Pagination