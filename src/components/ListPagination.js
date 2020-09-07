import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { blogActions } from "../redux/actions";

const pageLimit = 6;
const ListPagination = () => {
  const pageNum = useSelector((state) => state.blog.pageNum);
  // const totalPageNum = useSelector(
  //   (state) => Math.ceil(state.blog.totalPageNum) / pageLimit
  // );
  const totalResults = useSelector(state => state.blog.totalResults)
  let totalPageNum = 0
  if ((totalResults % pageLimit) > 0) totalPageNum = Math.floor(totalResults / pageLimit) + 1
  else totalPageNum = Math.floor(totalResults / pageLimit)

  const dispatch = useDispatch();

  const getPaginationRequest = (page) => {
    dispatch(blogActions.blogsRequest(page));
  };
  const handleOnClickPrev = () => {
    dispatch(blogActions.blogsRequest(pageNum - 1));
  };
  const handleOnClickNext = () => {
    dispatch(blogActions.blogsRequest(pageNum + 1));
  };

  return (
    <>
      <Pagination size="lg" className="justify-content-center pagination">
        <Pagination.Prev
          disabled={pageNum === 1}
          onClick={() => handleOnClickPrev()}
        />


        <Pagination.Item
          active={pageNum === 1}
          onClick={() => getPaginationRequest(pageNum)}
        >
          {pageNum}
        </Pagination.Item>

        {pageNum > 1 && pageNum < totalPageNum && (
          <Pagination.Item active>{pageNum}</Pagination.Item>
        )}



        {totalPageNum > 1 && (
          <Pagination.Item
            active={pageNum === totalPageNum}
            onClick={() => getPaginationRequest(totalPageNum)}
          >
            {totalPageNum}
          </Pagination.Item>
        )}
        <Pagination.Next
          disabled={pageNum === totalPageNum}
          onClick={() => handleOnClickNext()}
        />
      </Pagination>
    </>
  );
};

export default ListPagination;
