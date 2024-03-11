import { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { appUrl } from "../services/app-url";
import { useSearchParams } from "react-router-dom";

export function Filter({ brands }) {
  const [selectBrand, setSelectBrand] = useState(null);
  const [price, setPrice] = useState(null);
  const [product, setProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (selectBrand) {
      if (selectBrand === "Выберите бренд") {
        appUrl.searchParams.delete("brand");
        setSearchParams(appUrl.searchParams);
      } else {
        appUrl.searchParams.set("brand", selectBrand);
        setSearchParams(appUrl.searchParams);
      }
    } else {
      if (appUrl.searchParams.has("brand")) {
        setSelectBrand(appUrl.searchParams.get("brand"));
      }
    }
    if (price) {
      appUrl.searchParams.set("price", price);
      setSearchParams(appUrl.searchParams);
    } else {
      if (price === "") {
        appUrl.searchParams.delete("price");
        setSearchParams(appUrl.searchParams);
      }
      if (appUrl.searchParams.has("price")) {
        setPrice(appUrl.searchParams.get("price"));
      }
    }
    if (product) {
      appUrl.searchParams.set("product", product);
      setSearchParams(appUrl.searchParams);
    } else {
      if (product === "") {
        appUrl.searchParams.delete("product");
        setSearchParams(appUrl.searchParams);
      }
      if (appUrl.searchParams.has("product")) {
        setProduct(appUrl.searchParams.get("product"));
      }
    }
  }, [selectBrand, price, product, searchParams, setSearchParams]);

  function onSetProduct(productAttr) {
    setProduct(productAttr);
  }

  function onPrice(priceAttr) {
    setPrice(priceAttr);
  }

  return (
    <Container fluid={"xxl"}>
      <Row>
        <Col sm>
          <InputGroup>
            <InputGroup.Text>Фильтр по названию</InputGroup.Text>
            <Form.Control
              aria-label="Name"
              value={product}
              onChange={(e) => onSetProduct(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col sm>
          <InputGroup>
            <InputGroup.Text>Фильтр по цене</InputGroup.Text>
            <Form.Control
              type={"number"}
              aria-label="Price"
              value={price}
              onChange={(e) => onPrice(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col sm>
          <InputGroup>
            <InputGroup.Text>Фильтр по бренду</InputGroup.Text>
            <Form.Select
              aria-label={"Выберите бренд"}
              value={selectBrand}
              onChange={(e) => setSelectBrand(e.target.value)}
            >
              <option defaultChecked>Выберите бренд</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}
