import { useNavigate } from "react-router-dom";

export default function SortByDropdown({ searchParams, setSearchParams }) {
  const navigate = useNavigate();
  const sortBy = ["date", "comments", "votes"];
  const sortByKey = {
    date: "created_at",
    comments: "comment_count",
    votes: "votes",
  };
  const handleSortChange = (event) => {
    const selectedSort = sortByKey[event.target.value];
    if (selectedSort !== "Sort By") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort_by", selectedSort);
      setSearchParams(newParams);
      console.log(searchParams);
    }
  };
  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder !== "Order") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("order", selectedOrder);
      setSearchParams(newParams);
      console.log(searchParams);
    }
  };

  return (
    <>
      <select name="" id="" onChange={handleSortChange}>
        <option>Sort By</option>
        {sortBy.map((sort, index) => (
          <option key={index} value={sort}>
            {sort}
          </option>
        ))}
      </select>
      <select name="" id="" onChange={handleOrderChange}>
        <option>Order</option>
        <option>asc</option>
        <option>desc</option>
      </select>
    </>
  );
}