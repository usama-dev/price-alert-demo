// import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const homeComponent = () => {
  return (
    <div className="main-div">
      <h2 className="pt-4">Hi 👋</h2>
      <p>This Frontend App has been built using ReactJS. </p>
      <h4>Packages 📦</h4>
      <p>The following packages are used for building this frontend:</p>
      <ul>
        <li>
          <a href="https://reactrouter.com/en/main/">React Router</a>: For
          seamless routing
        </li>
        <li>
          <a href="https://tanstack.com/query/v4/">React Query</a>: For state
          management
        </li>
        <li>
          <a href="https://react-bootstrap.github.io/">React Bootstrap</a>: For
          styling
        </li>
        <li>
          <a href="https://react-hook-form.com/">React Hook Form</a>: For forms
        </li>
        <li>
          <a href="https://www.primefaces.org/primereact/">Prime React</a>: For
          inline edit datatable
        </li>
        <li>
          <a href="https://vitejs.dev/">Vite</a>: For build & dev tooling
        </li>
        <li>
          <a href="https://eslint.org/">ESLint & Prettier</a>: For code linting
        </li>
      </ul>
      <h4>Pages 🗐</h4>
      <p>This Web App has the following 6 pages:</p>
      <ol>
        <li>
          <Link to="/">Home</Link>: The main page of this App.
        </li>
        <li>
          <Link to="/products">Products</Link>: Listing of all the products. 8
          dummy products have been populated on init. The images used for those
          products are from this{" "}
          <a href="https://picsum.photos/">Picsum.photos</a> website.
        </li>
        <li>
          Product Detail <i>(/product/id)</i> : The product detailed page where
          user can set the price alert.
        </li>
        <li>
          <Link to="/subscribedusers">Subscribed Users</Link>: This page lists
          all the users who have subscribed to products.
        </li>
        <li>
          <Link to="/subscribedproducts">Subscribed Products</Link>: From this
          page user can check all his subscribed products.
        </li>
        <li>
          <Link to="/admin">Admin</Link>: Here we can update the price of the
          products.
        </li>
      </ol>
      <h4>Fake SMTP Server 👻</h4>
      <p>
        <a href="https://ethereal.email/">Ethereal</a> has been used to send the
        emails to the subscribed users. This is for demo purpose, we can change
        it Gmail etc. for production App.
      </p>
      <p>
        A dummy account has also been created to see the incoming mails. Here
        are the login credentials:
      </p>
      <p>
        <b>Login Page:</b>{" "}
        <a href="https://ethereal.email/login">https://ethereal.email/login</a>
      </p>
      <p>
        <b>Email:</b> martina.torphy@ethereal.email
      </p>
      <p>
        <b>Password:</b> SUD9VD1Q8n26tkjS75
      </p>
      <p>
        <b>Messages:</b>{" "}
        <a href="https://ethereal.email/messages">
          https://ethereal.email/messages
        </a>
      </p>
      <h2 className="text-center pb-5">That&apos;s all!✌</h2>
    </div>
  );
};

export default homeComponent;
