import { Description } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function SortByDropdown({ searchParams, setSearchParams }) {
  const navigate = useNavigate();
  const sortBy = ["date", "comments", "votes"];
  const sortByKey = {
    date: "created_at",
    comments: "comment_count",
    votes: "votes",
  };
  const orderKey = {
    "high to low": "desc",
    "low to high": "asc",
  };

  const handleSortChange = (event) => {
    const selectedSort = sortByKey[event.target.value];
    if (selectedSort !== "sort by") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort_by", selectedSort);
      setSearchParams(newParams);
    }
  };
  const handleOrderChange = (event) => {
    const selectedOrder = orderKey[event.target.value];
    if (selectedOrder !== "order") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("order", selectedOrder);
      setSearchParams(newParams);
    }
  };

  return (
    <>
      <div className="sort-by-order-by">
        <select
          className="react-select-sortby"
          name=""
          id=""
          onChange={handleSortChange}
        >
          <option>sort by</option>
          {sortBy.map((sort, index) => (
            <option key={index} value={sort}>
              {sort}
            </option>
          ))}
        </select>
        <select
          className="react-select-sortby"
          name=""
          id=""
          onChange={handleOrderChange}
        >
          <option>order</option>
          <option>high to low</option>
          <option>low to high</option>
        </select>
      </div>
    </>
  );
}
