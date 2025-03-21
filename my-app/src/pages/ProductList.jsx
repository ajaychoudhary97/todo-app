import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1">
        <thead><tr><th>ID</th><th>Name</th><th>Price</th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}><td>{product.id}</td><td>{product.title}</td><td>${product.price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
