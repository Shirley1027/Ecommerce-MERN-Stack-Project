import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Jumbotron from "../ components/cards/Jumbotron";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

export default function ProductView() {
  const [product, setProduct] = useState({});
  //hooks
  const params = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} sold`} color="pink">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} in stock`
                    : "Out of stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>

              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-5 bg-light">
              <div>
                <p className="fw-bold">
                  <FaDollarSign />
                  Price:{" "}
                  {product?.price?.toLocaleString("USD", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p >
                  <FaProjectDiagram />
                  Category: {" "}
                  {product?.category?.name}
                </p>
                <p >
                  <FaRegClock />
                  Added: {" "}
                  {moment(product?.createdAt).fromNow()}
                </p>
                <p >
                  {product?.quantity>0?<FaCheck/>:<FaTimes/>}
                  {product?.quantity>0?"In Stock":"Out of Stock"}
                </p>
                <p >
                  <FaWarehouse />
                  Available: {" "}
                  {product?.quantity - product?.sold}
                </p>
                <p >
                  <FaRocket />
                  Sold: {" "}
                  {product?.sold}
                </p>

              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Related Productss</h2>
        </div>
      </div>
    </div>
  );
}
