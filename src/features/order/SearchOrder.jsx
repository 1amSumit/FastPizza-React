import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchOrder;
