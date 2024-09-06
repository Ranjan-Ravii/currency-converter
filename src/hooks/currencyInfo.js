// import { useEffect, useState } from "react";

// function useCurrencyInfo(currency) {
//     const [data, setData] = useState({})
//     useEffect( () => {


//         const api = "https://api.exchangerate-api.com/v4/latest/USD";

//         const api = `https://api.exchangerate-api.com/v4/latest/${currency}`;
//         fetch(api)
//         .then((res) => res.json())
//         .then((res) => setData(res.rates))

//     },[currency])

//     console.log(data);

//     return data

// } export default useCurrencyInfo;



import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currency) return; // Avoid making API call if currency is not provided

        const api = `https://api.exchangerate-api.com/v4/latest/${currency}`;

        fetch(api)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => setData(res.rates))
            .catch((error) => {
                console.error("Error fetching currency data:", error);
                setError(error);
                setData({}); // Handle error by setting data to an empty object
            });

    }, [currency]);

    if (error) {
        return { error };
    }

    console.log(data);

    return data;
}

export default useCurrencyInfo;
