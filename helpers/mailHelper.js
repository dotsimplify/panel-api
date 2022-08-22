const mailSender = {
  newPostEmail: (email, title, date, description, link, copyrightYear) => {
    const mailOptions = {
      from: process.env.MAIL_TO,
      to: email,
      subject: "Complete your registeration",
      html: `<!DOCTYPE html>
      <html
        lang="en-GB"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:v="urn:schemas-microsoft-com:vml"
      >
        <head>
          <title>${title}</title>
          <meta charset="utf-8" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
      
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,300&display=swap"
            rel="stylesheet"
          />
      
          <style>
            .section {
              width: 100%;
              max-width: 400px;
              margin-left: auto;
              margin-right: auto;
              background-color: #ffffff;
              padding: 1rem;
            }
            .logo {
              color: rgb(48, 17, 160);
              font-size: 1.2rem;
              font-weight: 700;
              padding-top: 14px;
              text-align: center;
              background-color: #f3f3f3;
            }
          </style>
        </head>
        <body
          style="
            background-color: #eeeeee;
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            min-height: 100vh;
          "
        >
          <nav
            style="
              background-color: #f3f3f3;
              padding-top: 5px;
              padding-bottom: 5px;
              max-width: 400px;
              margin-left: auto;
              margin-right: auto;
              padding-left: 1rem;
              padding-right: 1rem;
              width: 100%;
            "
          >
            <h4 class="logo">HYIP Trading Exposed</h4>
          </nav>
          <section class="section">
            <h1 style="font-size: 1.4rem; color: #585858">${title}</h1>
            <h3
              style="
                font-size: 0.8rem;
                font-weight: normal;
                font-style: italic;
                color: #808080;
              "
              ;
              class="text-sm italic py-1"
            >
              Posted on ${date}
            </h3>
      
            <div id="content" style="text-align: justify; color: #363636">
              ${description}
              <a style="color: #2969bd" href="${link}" target="_blank"> Read more</a>
            </div>
          </section>
      
          <footer
            style="
              background-color: #0a0808;
              max-width: 400px;
              margin-left: auto;
              margin-right: auto;
              padding: 0.8rem;
              width: 100%;
            "
          >
            <h4 style="text-align: center">
              <span style="color: #e4e4e4; font-size: 12px">${copyrightYear}</span>
              <a
                style="color: #e4e4e4; text-decoration: underline; font-size: 12px"
                target="_blank"
                href="https://hyiptrading.exposed"
                >HYIP Trading Exposed</a
              >
            </h4>
          </footer>
        </body>
      </html>
      `,
    };
    return mailOptions;
  },
};
module.exports = mailSender;
