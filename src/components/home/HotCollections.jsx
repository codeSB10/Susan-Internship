import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

function HotCollections() {
  const [authors, setAuthors] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setAuthors(data);
  }

  useEffect(fetchData, []);

  const owlSettings = {
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!authors.length ? (
            <>
              <OwlCarousel className="owl-theme" {...owlSettings}>
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Skeleton height="220px" width="100%" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton height="60px" width="60px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton height="20px" width="110px" />
                      </h4>
                      <Skeleton height="20px" width="65px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...owlSettings}>
              {authors.map((author) => (
                <div className="nft_coll" key={author.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={author.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={author.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{author.title}</h4>
                    </Link>
                    <span>ERC-{author.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
