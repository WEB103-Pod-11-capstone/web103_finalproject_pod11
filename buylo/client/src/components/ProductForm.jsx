import React, { useState } from 'react';
import ProductsAPI from '../services/ProductsAPI';
import '../styles/ProductForm.css'; 

const ProductForm = ({ existingProduct, onSave, onCancel }) => {
  // Initialize state once. The 'key' in the parent ensures this 
  // runs fresh every time a different product is selected.
  const [formData, setFormData] = useState(existingProduct || {
    name: '',
    price: '',
    current_quantity: '',
    category: 'Home Decor',
    description: '',
    image_url: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await ProductsAPI.updateProduct(formData.id, formData);
      } else {
        await ProductsAPI.createProduct(formData);
      }
      onSave(); // Closes form and refreshes list in parent
    } catch (err) {
      console.log( err);
      setError("Failed to save product. Please check your connection.");
    }
  };

  return (
    <div className="product-form-container" style={{ border: '1px solid #009661', padding: '20px', marginBottom: '20px' }}>
      <h3>{formData.id ? `Editing: ${formData.name}` : "Add New Product"}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>Name: 
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>Category: 
            <input name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>Price: 
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </label>
          <label>Quantity: 
            <input type="number" name="current_quantity" value={formData.current_quantity} onChange={handleChange} required />
          </label>
        </div>
        <label style={{ display: 'block', marginTop: '10px' }}>Image Path: 
          <input name="image_url" value={formData.image_url} onChange={handleChange} style={{ width: '100%' }} />
        </label>
        <div className="form-actions">
            <button type="submit" className="btn-save">[ SAVE TO INVENTORY ]</button>
            <button type="button" onClick={onCancel} className="btn-cancel">[ CANCEL ]</button>
      </div>
      </form>
    </div>
  );
};

export default ProductForm;