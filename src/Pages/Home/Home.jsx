import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../Services/Redux/Slices/BookSlice";
import TableLoader from "../../Components/Loader/TableLoader";
import Pagination from "@mui/material/Pagination";
import { Tooltip } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const bookData = useSelector((state) => state.booksData);
    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        dispatch(getBooks(currentPage, itemsPerPage)).then((res) =>{
            if(res?.payload?.totalPages){
                setTotalPages(res?.payload?.totalPages)   
            }
        });
    }, [dispatch,currentPage]);
    return (
        <section className="container mt-5">
           <div className="w-100 overflow-auto">
    <div className="max-h-500 min-w-800 overflow-auto position-relative">
        <Table striped bordered hover responsive className="custom-table">
            <thead className="table-header">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Added By</th>
                </tr>
            </thead>
            <tbody>
                {bookData.loading ? (
                    <TableLoader colCounts={4} />
                ) : bookData.books?.data?.length !== 0 ? (
                    bookData.books?.data?.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>    
                                <Tooltip placement="bottom" title={book.description}>
                                    <span
                                        className="description-text"                                        
                                    >

                                        {book.description}
                                    </span>
                                </Tooltip>
                            </td>
                            <td>
                                {book.addedBy.name}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center">No Data Found...</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
</div>


            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </div>
            )}
        </section>
    );
};

export default Home;
