import React from "react";
import styled from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
function Footer() {
  return (
    <Fade bottom>
      <FooterContainer className="main-footer">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <h4 className="footerText">Reach Us</h4>
                <i>
                  <ul className="list-unstyled text-muted">
                    <li>support@cd-shoppe.com</li>
                    <li>Phone: +999999999</li>
                    <li>Address:83e South street,Coimbatore</li>
                    <li>628509</li>
                  </ul>
                </i>
              </div>
              <div className="col-md-3 col-sm-6">
                <h4 className="footerText">MY ACCOUNT</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">My Account</a>
                  </li>
                  <li>
                    <a href="/">Order history</a>
                  </li>
                  <li>
                    <a href="/">Wishlist</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h4 className="footerText">ABOUT US</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Contact us</a>
                  </li>
                  <li>
                    <a href="/">About us</a>
                  </li>
                  <li>
                    <a href="/">Customer Reviews</a>
                  </li>
                  <li>
                    <a href="/">Earn with affiliated program</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h4 className="footerText">IMPORTANT POLICIES</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Refund Policy</a>
                  </li>
                  <li>
                    <a href="/">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="/">FAQ</a>
                  </li>
                </ul>
              </div>
             
              <div className="col-md-3 offset-md-6">
                <h5 style={{ fontWeight: "400", marginBottom: "25x" }}>
                  Subscribe For getting Updates and Offers{" "}
                </h5>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  style={{ height: "41px" }}
                />
                <Button
                  variant="danger border-none"
                  style={{ height: "41px", marginTop: "-2px" }}
                >
                  Subscribe
                </Button>
              </div>
              <div className="col-md-3 col-sm-6">
                <h4 className="footerText">REACH US</h4>
                <ul className="list-unstyled" style={{ marginRight: "100px" }}>
                  <FacebookIcon />
                  <a href="/"> Facebook</a>
                  <br/>
                  <TwitterIcon />
                  <a href="/"> Twitter</a>
                  <br/>
                  <YouTubeIcon />
                  <a href="/"> Youtube</a>
                  <br/>
                  <InstagramIcon />
                  <a href="/"> Instagram</a>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="text-xs-center">
                <center>
                  {" "}
                  &copy;{new Date().getFullYear()} CD-SHOPPE WEB App -
                  All Rights Reserved
                </center>
              </p>
            </div>
          </div>
        </div>
      </FooterContainer>
    </Fade>
  );
}
export default Footer;

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--mainDark);
    padding-top: 3rem;
    padding-bottom: 1rem;
    color: var(--mainWhite);
  }
  .footer-bottom {
    padding-top: 4rem;
  }
  ul li a {
    color: var(--mainGrey);
  }
  ul li a:hover {
    color: var(--mainLightGrey);
  }
  ul a {
    color: var(--mainGrey);
  }
  ul a:hover {
    color: var(--mainLightGrey);
  }
`;
