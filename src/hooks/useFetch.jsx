import { useState, useEffect } from "react";

// Custom hook

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    // loading
    const [loading, setLoading] = useState(false);

    // tratando erros
    const [error, setError] = useState(null);

    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            setMethod(method);
        }
    }

    // GET
    useEffect(() => {

        const fetchData = async () => {

            //loading
            setLoading(true);
            try {
                const response = await fetch(url)
                const json = await response.json()

                setData(json);
            } catch (error) {
                console.log(error.message);
                setError("Houve algum erro ao buscar os dados!");
            }

            setLoading(false);
        }

        fetchData();

    }, [url, callFetch]);

    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
               try {
                let fetchOptions = [url, config];
    
                const response = await fetch(...fetchOptions);
                console.log("Status da resposta:", response.status);
                const json = await response.json();
                console.log("Corpo da resposta:", json);
    
                setCallFetch(json);
                
               } catch (error) {
                console.log(error.message);
                setError("Houve algum erro ao adicionar os dados!");
               }
            }
        }
        httpRequest();
    }, [config, method, url])

    return { data, httpConfig, loading, error };

};