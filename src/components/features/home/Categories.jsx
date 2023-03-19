import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { categories } from "../../../api/Categories";
const Categories = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState("plant");
  useEffect(() => {
    const getCate = async () => {
      try {
        const res = await categories();
        setCategory(res.data.categories);
      } catch (error) {
        console.log("Err categoris: ", error);
      }
    };
    getCate();
  }, []);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);
    localStorage.setItem("selectedProduct", selectedProduct);
  };

  return (
    <>
      <select
        className="selectToday_name"
        defaultValue={category[0]?.id}
        onChange={handleProductChange}
        // onClick={handleProductChange}
      >
        {category.map((cate) => (
          <option key={cate.id} value={cate.name}>
            {cate.name}
          </option>
        ))}
      </select>
      <FontAwesomeIcon className="selet__faChevronDown" icon={faChevronDown} />
    </>
  );
};
export default Categories;
