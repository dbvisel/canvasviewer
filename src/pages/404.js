import * as React from "react";
import { Link } from "gatsby";
import Layout from "./../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <div style={{ padding: "var(--outerMargin)" }}>
      <h1>Not found!</h1>
      <p>
        Sorry. Try going back <Link to={`/`}>here</Link>.
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
