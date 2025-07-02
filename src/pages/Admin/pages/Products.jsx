import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Admin.css';

const Products = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      toast.error("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("category", product.category);
    if (product.image) formData.append("image", product.image);

    try {
      if (product._id) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✏️ Product updated!");
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✅ Product uploaded!");
      }

      setProduct({ title: '', price: '', category: '', image: null });
      setPreview(null);
      fileInputRef.current.value = null;
      fetchProducts();
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) return toast.error("Unauthorized");

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("🗑️ Product deleted");
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item) => {
    setProduct({ ...item, image: null });
    setPreview(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="admin-container">
      <h2>{product._id ? 'Edit Product' : 'Add New Product'}</h2>
      <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price (₦)"
          value={product.price}
          onChange={handleChange}
          required
        />
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">--Select Category--</option>
          <option value="New">New Arrival</option>
          <option value="Best">Best Seller</option>
          <option value="Dresses">Dresses</option>
          <option value="Casual">Casual</option>
          <option value="Office">Office</option>
          <option value="Bridal">Bridal</option>
        </select>

        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="preview-img" />
          ) : (
            <p>📥 Drag & drop or click to select image</p>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" disabled={loading} className="admin-btn">
          {loading ? (
            <span className="spinner"></span>
          ) : (
            product._id ? 'Update Product' : 'Upload Product'
          )}
        </button>
      </form>

      <div className="product-list">
        <h3>Uploaded Products</h3>
        {paginatedProducts.map((p) => (
          <div className="product-card" key={p._id}>
            <div className="product-info">
              <p><strong>{p.title}</strong></p>
              <p>₦{p.price.toLocaleString()}</p>
              <p>{p.category}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(p)} title="Edit">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(p._id)} title="Delete">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <div className="pagination-controls">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            ← Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
