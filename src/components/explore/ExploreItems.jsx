import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(8);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
  }

  useEffect(fetchData, []);

  async function filterItems(value) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setItems(data);
    setLoading(false);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterItems(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!items.length || loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton height="60px" width="60px" borderRadius="50%" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton height="220px" width="100%" borderRadius="16px" />
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>
                      <Skeleton height="25px" width="120px" />
                    </h4>
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton height="20px" width="65px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton height="15px" width="25px" />
                  </div>
                </div>
              </div>
            </div>
          ))
        : items.slice(0, itemQuantity).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      <div className="col-md-12 text-center">
        {itemQuantity !== 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setItemQuantity(itemQuantity + 4)}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
