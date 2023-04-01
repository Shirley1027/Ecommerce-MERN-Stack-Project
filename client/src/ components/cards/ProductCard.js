import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "../../context/cart";

export default function ProductCard({ p }) {
  //context
  const [cart, setCart]= useCart();
  //hooks
  const navigate = useNavigate();
  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="pink">
        <Badge.Ribbon
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
          }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>

        <h4 className="fw-bold">
          {p?.price?.toLocaleString("CNY", {
            style: "currency",
            currency: "CNY",
          })}
        </h4>

        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={()=>navigate(`/product/${p.slug}`)}
        >
          View Product
        </button>

        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={()=>setCart([...cart,p])}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}
