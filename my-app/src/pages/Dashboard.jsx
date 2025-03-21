import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({ title: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!productData.title || !productData.price) return;
    
    if (isEditing) {
      dispatch(updateProduct({ id: editProductId, updatedProduct: productData }));
      setIsEditing(false);
      setEditProductId(null);
    } else {
      dispatch(addProduct(productData));
    }
    setProductData({ title: '', price: '' });
  };

  const handleEditProduct = (product) => {
    setProductData({ title: product.title, price: product.price });
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h2>Todo Application (CRUD)</h2>
      
      <div>
        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <input type="text" placeholder="Title" value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })} />
        <input type="number" placeholder="Price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
        <button onClick={handleSubmit}>{isEditing ? 'Update Product' : 'Add Product'}</button>
        {isEditing && <button onClick={() => { setIsEditing(false); setProductData({ title: '', price: '' }); }}>Cancel</button>}
      </div>
      
      <h3>Product List</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Products: {products.length}</h3>
    </div>
  );
};

export default Dashboard;
