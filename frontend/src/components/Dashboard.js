import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [totals, setTotals] = useState({ totalUsers: 0, totalProducts: 0 });
  const [categoriesCount, setCategoriesCount] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [lastCreated, setLastCreated] = useState({ user: null, product: null });

  useEffect(() => {
    // Cargar usuarios
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => {
        setTotals(prev => ({ ...prev, totalUsers: data.count }));
        if (data.users && data.users.length > 0) {
          setLastCreated(prev => ({
            ...prev,
            user: data.users[data.users.length - 1]
          }));
        }
      })
      .catch(err => console.error('Error en fetch usuarios:', err));

    // Cargar productos
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setTotals(prev => ({ ...prev, totalProducts: data.count }));
        setCategoriesCount(data.countByCategory || {});
        setProductsList(data.products || []);
        if (data.products && data.products.length > 0) {
          setLastCreated(prev => ({
            ...prev,
            product: data.products[data.products.length - 1]
          }));
        }
      })
      .catch(err => console.error('Error en fetch productos:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card-grid">
        <div className="card">
          <p>{totals.totalUsers}</p>
          <small>Total Usuarios</small>
        </div>
        <div className="card">
          <p>{totals.totalProducts}</p>
          <small>Total Productos</small>
        </div>
      </div>

      <h3>Categorías:</h3>
      {Object.keys(categoriesCount).length > 0 ? (
        <ul className="category-list">
          {Object.entries(categoriesCount).map(([cat, count]) => (
            <li key={cat}><span>{cat}:</span> {count}</li>
          ))}
        </ul>
      ) : (
        <p>No hay categorías.</p>
      )}

      <h3>Último usuario creado:</h3>
      <div className="card">
        {lastCreated.user ? (
          <>
            <p>{lastCreated.user.name}</p>
            <small>{lastCreated.user.email}</small>
          </>
        ) : <p>No hay usuarios.</p>}
      </div>

      <h3>Último producto creado:</h3>
      <div className="card">
        {lastCreated.product ? (
          <>
            <p>{lastCreated.product.name}</p>
            <small>{lastCreated.product.description}</small>
          </>
        ) : <p>No hay productos.</p>}
      </div>

      <h3>Lista de productos:</h3>
      <ul className="product-list">
        {productsList.length > 0 ? (
          productsList.map(product => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;