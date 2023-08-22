import { useState } from 'react';
import './App.css';

// importando custom hook
import { useFetch } from './hooks/useFetch';

function App() {
  const [products, setProducts] = useState({});
  const url = "http://localhost:3000/products";
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Resgatando dados
  // usando hook
  const { data:items, httpConfig, loading, error } = useFetch(url);

  // usando useEffect
  /*
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);

      const data = await response.json();
  
      setProducts(data);
    }
    fetchData();
  }, []);
*/
  // Adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    }
    console.log(product)
    
    // POST
    httpConfig(product, "POST");
/*
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const addedProduct = await response.json();

    // Carregamento dinâmico
    setProducts((previousProducts) => [...previousProducts, addedProduct]);
*/
    setName("");
    setPrice("");

  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p className='error'>{error}</p>}
      {!loading && (
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}0</li>
        ))}
      </ul>
      )}

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input 
            type="text" 
            value={name} 
            name="name" 
            onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Preço:
            <input 
            type="number" 
            value={price} 
            name="price" 
            onChange={(e) => setPrice(e.target.value)}/>
          </label>
          {/* Loading no post */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
};

export default App;
