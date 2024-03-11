import { Card } from "react-bootstrap";

export function Carts({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <Card key={i} border="success" style={{ width: "18rem" }}>
          <Card.Body className={"cart"}>
            <Card.Title>{item.product}</Card.Title>
            <p>{item.id}</p>
          </Card.Body>
          <Card.Header>
            Цена: {item.price} {item.brand ? `/ Бренд: ${item.brand}` : ""}
          </Card.Header>
        </Card>
      ))}
    </>
  );
}
