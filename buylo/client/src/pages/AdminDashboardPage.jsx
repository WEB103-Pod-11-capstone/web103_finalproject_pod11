import React, { useState, useEffect } from 'react';
import ProductsAPI from '../services/ProductsAPI';
import ProductForm from '../components/ProductForm';
import '../styles/AdminDashboard.css';

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await ProductsAPI.getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await ProductsAPI.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>INVENTORY MANAGER</h1>
        <button onClick={handleAddClick} className="btn-add-product">
          [ + ADD PRODUCT ]
        </button>
      </header>

      {/* THE KEY PATTERN: Changes to 'key' force ProductForm to remount */}
      {isFormOpen && (
        <ProductForm 
          key={selectedProduct ? selectedProduct.id : 'new-product'}
          existingProduct={selectedProduct} 
          onSave={() => { setIsFormOpen(false); fetchInventory(); }}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>TITLE</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><img src={p.image_url} alt={p.name} style={{ width: '40px' }} /></td>
              <td>{p.name}</td>
              <td>${Number(p.price).toFixed(2)}</td>
              <td>
                <button onClick={() => handleEditClick(p)}>[Edit]</button>
                <button onClick={() => handleDelete(p.id)}>[Delete]</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;