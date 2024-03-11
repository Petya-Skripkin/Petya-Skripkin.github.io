import "./App.css";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { getIds } from "./services/get-ids";
import { useEffect, useState } from "react";
import { getItems } from "./services/get-items";
import { getFields } from "./services/get-fields";
import { filter } from "./services/filter";
import { Navigation } from "./components/pagination";
import { Carts } from "./components/carts";
import { Filter } from "./components/filter";
import { appUrl } from "./services/app-url";
import { useSearchParams } from "react-router-dom";

function App() {
  const [ids, setIds] = useState(null);
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  let [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItems([]);
        if (appUrl.searchParams.size === 0) {
          appUrl.searchParams.set("page", 1);
          setSearchParams(appUrl.searchParams);
        } else {
          setCurrentPage(appUrl.searchParams.get("page"));
        }
        if (brands.length < 1) {
          const fieldsResponse = await getFields();
          const brandsData = Array.from(
            new Set(fieldsResponse?.result.filter((item) => item !== null))
          );
          setBrands(brandsData);
          setProductCount(fieldsResponse?.result.length + 1);
        }

        if (appUrl.searchParams.size <= 1) {
          const idsResponse = await getIds();
          setIds(idsResponse?.result ?? null);
        } else {
          clearTimeout(timer);
          await setTimer(
            setTimeout(async () => {
              const params = {};

              if (appUrl.searchParams.has("brand")) {
                params.brand = appUrl.searchParams.get("brand");
              }

              if (appUrl.searchParams.has("price")) {
                params.price = +appUrl.searchParams.get("price");
              }

              if (appUrl.searchParams.has("product")) {
                params.product = appUrl.searchParams.get("product");
              }

              const filterResponse = await filter(params);
              if (filterResponse?.result) {
                setIds((prev) => (prev = filterResponse?.result));
              }

              setProductCount(filterResponse?.result.length + 1);
            }, 500)
          );
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [brands.length, searchParams]);

  useEffect(() => {
    if (ids !== null && ids.length > 0) {
      const individualIds = Array.from(new Set(ids));
      getItems(individualIds).then((res) => {
        setItems(res?.result ?? []);
      });
    }
  }, [ids]);

  function onPageChange(page) {
    appUrl.searchParams.set("page", page);
    setCurrentPage(appUrl.searchParams.get("page"));
    setSearchParams(appUrl.searchParams);
  }

  if (loading)
    return (
      <div className={"spinner"}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <Container fluid={true}>
        <Row className={"header"}>
          <Container fluid={"xxl"}>
            <Row>
              <Col className={"logo"} sm>
                Test task
              </Col>
              <Col className={"menu"} sm>
                Other menu with links
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Container className={"sticky"} fluid={true}>
        <Row className={"filter"}>
          <Filter brands={brands} />
        </Row>
      </Container>
      <Container className={"bodyContainer"}>
        {items.length > 0 ? (
          <Carts items={items} />
        ) : (
          <div className={"spinner"}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Container>
      <Container className={"pagination"}>
        <Navigation
          productCount={productCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Container>
    </div>
  );
}

export default App;
