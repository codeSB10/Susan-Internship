import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState();

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNft(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div id="wrapper" data-aos="fade-down" data-aos-duration="1000">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {!nft ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height="450px" width="100%" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton height="45px" width="70%" />
                    </h2>

                    <div className="item_info_counts">
                      <Skeleton height="30px" width="80px" />
                      <Skeleton height="30px" width="80px" />
                    </div>
                    <Skeleton height="100px" width="100%" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              height="50px"
                              width="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton height="25px" width="120px" />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              height="50px"
                              width="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton height="25px" width="120px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton height="30px" width="90px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nft.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes}
                      </div>
                    </div>
                    <p>{nft.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.ownerId}`}>
                              <img className="lazy" src={nft.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.creatorId}`}>
                              <img className="lazy" src={nft.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nft.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
