import { Pagination } from "react-bootstrap";

export function Navigation({ productCount, currentPage, onPageChange }) {
  const pageSize = 50;
  const maxPages = Math.ceil(productCount / pageSize);

  const renderPaginationItems = () => {
    const items = [];

    // Первая страница
    items.push(
      <Pagination.First
        key="first"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
    );

    // Предыдущая страница
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Генерация кнопок пагинации
    const visiblePages = 5; // Количество видимых кнопок пагинации

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(maxPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
    }

    for (let i = startPage; i <= endPage; i++) {
      console.log(i);
      items.push(
        <Pagination.Item
          key={i}
          active={i === +currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < maxPages) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
    }

    // Следующая страница
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
      />
    );

    // Последняя страница
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => onPageChange(maxPages)}
        disabled={currentPage === maxPages}
      />
    );

    return items;
  };

  return (
    <Pagination>{renderPaginationItems()}</Pagination>
  );
}
