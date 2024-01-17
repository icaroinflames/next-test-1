"use client"
import { useEffect, useState } from 'react';

export default function Home() {

  const [ fabricante, setFabricante ]= useState(0);
  const [ password, setPassword ] = useState("");
  const [ cliente, setCliente ] = useState(0);
  const [ baseDeDatos, setBaseDeDatos ] = useState("");
  const [ fetchData, setFetchData ] = useState(false);
  const [ resultado, setResultado ] = useState("");
  const [ respuesta, setRespuesta ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchData(true);
  };

  useEffect(() => {
    if(!fetchData) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "codigoFabricante": fabricante,
      "password": password,
      "codigoCliente": cliente,
      "baseDatosCliente": baseDeDatos
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://api.sdelsol.com/login/autenticar", requestOptions)
      .then(response => {
        console.log("res",response);
        return response.json()
      })
      .then(result => {
        console.log(result);
        setResultado(JSON.stringify(result.resultado));
        setRespuesta(JSON.stringify(result.respuesta));
      })
      .catch(error => console.log('error', error));
      setFetchData(false);
  },[fetchData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" name="fabricante" value={fabricante} onChange={(e) => setFabricante(+e.target.value)}></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br/>
            <label htmlFor="cliente">Cliente:</label>
            <input type="text" id="cliente" name="cliente" value={cliente} onChange={(e) => setCliente(+e.target.value)}></input>
            <br/>
            <label htmlFor="baseDeDatos">Base de datos:</label>
            <input type="text" id="baseDeDatos" name="baseDeDatos" value={baseDeDatos} onChange={(e) => setBaseDeDatos(e.target.value)}></input>
            <br/>
            <input type="submit" value="Submit" />
        </form>
        <br/><br/>
        <div className="lg:w-1/2">
        resultado<br/>
        {resultado}<br/>
        respuesta<br/>
        {respuesta}<br/>
        </div>
      </div>
      
    </main>
  )
}
