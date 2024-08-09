import { useEffect, useState } from "react";
import "./App.css"

const RANDOM_QUOTE_URL = "https://type.fit/api/quotes";

export default function QuoteFetcher() {
    const [quote, setQuote] = useState({ text: "", author: "" });

    useEffect(() => {
        fetchQuote();
    }, []);

    async function fetchQuote() {
        try {
            const response = await fetch(RANDOM_QUOTE_URL);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonResponse = await response.json();
            const randomIndex = Math.floor(Math.random() * jsonResponse.length);
            const rQuote = jsonResponse[randomIndex];
            setQuote(rQuote);
        } catch (error) {
            console.error("Failed to fetch quote:", error);
        }
    }

    return (
        <div class="content">
            <button onClick={fetchQuote}>Сгенерируй мне цитату</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author || "Неизвестный автор"} </h3>
        </div>
    );
}
