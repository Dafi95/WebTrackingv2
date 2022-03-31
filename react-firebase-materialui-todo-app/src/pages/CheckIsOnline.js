import React, { useEffect, useState } from "react";
import isReachable from "is-reachable";
import "./CheckIsOnline.css";

function App() {
    const [input, setInput] = useState("");
    const [online, setOnline] = useState(false);
    const [data] = useState(["onet.pl", "google.pl", "stronaktorajestoffline.pl"]);
    const [prezentedData, setPrezentedData] = useState([]);
    const handleChange = (event) => {
        setInput(event.target.value);
    };

    useEffect(() => {
        Promise.all(data.map((el) => isOnline(el))).then((is) =>
            setPrezentedData(
                is.map((el, i) => ({
                    isOnline: el,
                    name: data[i]
                }))
            )
        );
    }, [data]);

    const handleSubmit = () => {
        const isOnline = async () => {
            const is = await isReachable(input);
            console.log(is);
            setOnline(is);
        };
        isOnline();
    };

    const isOnline = async (el) => {
        const is = await isReachable(el);
        return is;
    };

    return (
        <div className="class12">
            <div className="Checker">
                <input
                    className="OnlineCheck"
                    type="text"
                    placeholder="Wpisz"
                    onChange={handleChange}
                    value={input}
                />
                <button onClick={handleSubmit}>Sprawdź Status</button>
                <h1>{online ? "Strona jest Online" : "Strona jest Offline"}</h1>
            </div>
            <div className="favortiesites">
                <ul>
                    {prezentedData.map((el) => {
                        return (
                            <li>
                                {el.name} - {el.isOnline ? "online" : "offline"}
                            </li>
                        );
                    })}
                </ul>

            </div>
        </div>
    );
}

export default App;
