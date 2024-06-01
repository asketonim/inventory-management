import "./styles.css"

interface Props {
  productNames: string[];
}

export default function NewlyAddedProducts({ productNames }: Props) {
  return (
    <div className="products-container">
      <h3>New Products</h3>
      {productNames.length ? (
        <ul>
          {productNames.map((productName) => (
            <li key={productName} className="wrap">{productName}</li>
          ))}
        </ul>
      ) : (
        <div>No new products added</div>
      )}
    </div>
  );
}
