import React from "react";
import categoryList from "../category.jsx";
function Category({ categoryList, updateCategory }) {
  function handleClick(c) {
    updateCategory(c);
  }
  return (
    <>
      <h3 style={{ marginBottom: "15px" }}>Pick a Category to Browse Quotes</h3>
      <div className="category-list">
        {categoryList.map((c, index) => (
          <span onClick={() => handleClick(c)} key={index}>
            {c}
          </span>
        ))}
      </div>
    </>
  );
}

export default Category;
