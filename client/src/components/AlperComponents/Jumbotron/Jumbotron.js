import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center", backgroundImage: "url(" + "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v396-ning-06-blockbg_2.jpg?auto=format&bg=F4F4F3&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-1.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1200&s=09fc6082ee0f6f47e2779975edb08571" + ")", backgroundSize: "cover" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
