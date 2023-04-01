import { useCart } from "../context/cart";
import Jumbotron from "../ components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import moment from "moment";

export default function Cart() {
  //context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const removeFromCart = async (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("CNY", {
      style: "currency",
      currency: "CNY",
    });
  };
  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart?.length} items in the cart. ${
                auth?.token ? "" : "Please login to check"
              }`
            : "Your cart is empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/shop")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                  <div
                    key={index}
                    className="card mb-3"
                    // style={{ maxWidth: 540 }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                          alt={p.name}
                          style={{
                            height: "150px",
                            height: "150px",
                            objectFit: "cover",
                            marginLeft: "-12px",
                            borderRopRightRadius: "0px",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {p.name}
                            {p?.price?.toLocaleString("CNY", {
                              style: "currency",
                              currency: "CNY",
                            })}
                          </h5>
                          <p className="card-text">{`${p?.description?.substring(
                            0,
                            50
                          )}...`}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text">
                          <small className="text-muted">
                            Listed {moment(p.createdAt).fromNow()}
                          </small>
                        </p>
                        <p
                          className="text-danger mb-2 pointer"
                          onClick={() => removeFromCart(p._id)}
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <h4>Your Cart Summary</h4>
              Total/Address/Pay
              <hr />
              <h5>Total: {cartTotal()}</h5>
              {auth.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <h4>Address:</h4>
                    <h5>{auth?.user?.address}</h5>
                  </div>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update address
                  </button>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning mt-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add delivery address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}