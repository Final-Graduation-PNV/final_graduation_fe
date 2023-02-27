import { useState } from "react";
import axios from "axios";
import FormInput from "../../components/FormInput";
import ButtonSubmit from "../../components/ButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function AddProduct({ closeModal }) {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    type: "",
    description: "",
    quantity: "",
    shop_id:""
  });

  const handlerInput = (e) => {
    const { name, value } = e.target;
    console.log(product);
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const tooggle = () => {
    setModal(!modal);
  };
  const onRedirect = () => {
    setProduct({}); //set lại state product là đói tượng rỗng
    tooggle();

  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("https://61ce733e7067f600179c5ea7.mockapi.io/mn/products", product)
      .then(function (response) {
        console.log(response);
        window.location.reload();
        onRedirect();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
  const token = localStorage.getItem("token")
    axios.post("http://ec2-54-193-79-196.us-west-1.compute.amazonaws.com/api/user/products", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log("Res:", res)
        setProducts(res.data)
      })
      .catch(err => { console.log("Err:", err) })
  }, [])

  return (
    <div className="add-product">

      <form className="add-product__form">
        <h2>Add product</h2>
        <button className="add-product__form__button-cancel" onClick={() => closeModal(false)}><FontAwesomeIcon icon={faClose} /></button>
        <FormInput
          name="name"
          title="Product Name"
          value={product.name}
          onChange={handlerInput}
          type="text"
        />
        <FormInput
          name="image"
          title="Product Image"
          value={product.image}
          onChange={handlerInput}
          type="text"
        />
        <FormInput
          name="price"
          title="Product Price"
          value={product.price}
          onChange={handlerInput}
          type="number"
        />
        <div className="add-product__form__select-type">
          <label>Product Type</label>
          <select name="type" title="Product Type" onChange={handlerInput} type="select">
            <option value={1}>Indoor plants</option>
            <option value={2}>Out door tree</option>
            <option value={3}>Indoor flower</option>
            <option value={4}>Out door flower</option>
          </select>
        </div>
        <FormInput
          name="description"
          title="Product Description"
          className="add-product__form__input-description"
          value={product.description}
          onChange={handlerInput}
          type="text"
        />
        <FormInput
          name="quantity"
          title="Product Quantity"
          value={product.quantity}
          onChange={handlerInput}
          type="number"
        />
        <div className="add-product__form__submit-button">
          <ButtonSubmit className="add-product__form__submit-button__add-new" type="submit" onClick={handleSubmitForm} title="Add new" />
        </div>
      </form>
    </div>
  );
}
export default AddProduct;
