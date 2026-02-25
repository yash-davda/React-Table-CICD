import { useState, useMemo } from 'react';
import './App.css'
import { useEffect } from 'react';
import Pagination from './hooks/usePagination';
import useDebounce from './hooks/useDebounce';
import axios from "axios";
import Paginations from "./components/Paginations.jsx"
function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { page, limit, setPage } = Pagination();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const paginationCss = {
    display: "flex",
    justifyContent: "end"
  }
  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch]);
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(`${baseUrl}/comments`, {
      params: { page, limit, search: debouncedSearch }
    });
    setData(res.data?.data || []);
    setTotalPage(res.data.totalPages);
    setLoading(false);
  }
  const memoizedData = useMemo(() => data, [data]);

  return (
    <div>
      <h3>Comment Table</h3>

      <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      {!loading && memoizedData.length === 0 && <p>No Data Found!</p>}
      {!loading && memoizedData.length > 0 && (
        <table border="1">
          <thead>
            <th>Sr No</th>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </thead>
          <tbody>
            {memoizedData.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{item.postId}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={paginationCss}>
        {/* {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{ fontWeight: page === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))} */}
        <Paginations
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default App
