import React from 'react'
import { useState } from 'react';


export default function APITester() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [authType,setAuthType]=useState("");
    const [tokens, setTokens] = useState([]);  // no token on load
    const [headers, setHeaders] = useState([]); // no header on load
    const [requestJson,setRequestJson]=useState("{}");
    const [responseJson,setResponseJson]=useState("{}");
    const generateGuid = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };
    const sendRequest = async () => {
        if (!url) return alert("Please enter a URL");
        console.log("url:"+url);
        try {
            // Build headers
            const reqHeaders = { "Content-Type": "application/json" };
            headers.forEach((h) => {
            if (h.key) 
            {
                let value=h.value;
                if (value.includes("{{$guid}}")) {
                    value = value.replace(/\{\{\$guid\}\}/g, generateGuid());
                }
                reqHeaders[h.key] = value;
            }
            });
            //console.log(reqHeaders);
            const bearerToken = tokens.find((t) => t.type === "Bearer")?.value;
            if (bearerToken) {
             reqHeaders["Authorization"] = `Bearer ${bearerToken}`;
            }
            let processedRequestJson = requestJson.replace(/\{\{\$guid\}\}/g, generateGuid());
            //console.log(processedRequestJson);
            const options = { method, headers: reqHeaders };
            if (["POST", "PUT", "PATCH"].includes(method)) {
            options.body = requestJson;
            }
            const response = await fetch(url, options);
            const text = await response.text();
            try {
            setResponseJson(JSON.stringify(JSON.parse(text), null, 2));
            } catch {
            setResponseJson(text);
            }
            console.log(text);
        } catch (err) {
            console.error(err);
            alert("Request failed. Check console for details.");
        }    
    };

  const addToken = () => {
    setTokens([...tokens, { id: Date.now(), type: "Bearer", value: "" }]);
  };

  const removeToken = (id) => {
    setTokens(tokens.filter((t) => t.id !== id));
  };

  const updateToken = (id, field, value) => {
    setTokens(tokens.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };
    const addHeader = () => {
       setHeaders([...headers, { id: Date.now(), key: "", value: "" }]);
    };
    
    const removeHeader = (id) => {
        setHeaders(headers.filter((h) => h.id !== id));
    };
    
    const updateHeader = (id, field, value) => {
        setHeaders(headers.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
    };
    const Beautify = () => {
        try {
            if (requestJson) setRequestJson(JSON.stringify(JSON.parse(requestJson), null, 2));
            if (responseJson) setResponseJson(JSON.stringify(JSON.parse(responseJson), null, 2));
          } catch (error) {
            console.error("Invalid JSON:", error);
            alert("Cannot beautify: Invalid JSON detected!");
          }
    };
  return (
    <div className='bg-dark text-light'>
              <h2>Test API</h2>
        <div className="mb-3 d-flex">
            <div className="dropdown me-2">
                <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                {method}
                </button>
                <ul className="dropdown-menu">
                {["GET", "POST", "PUT", "PATCH"].map((m) => (
                    <li key={m}>
                    <button
                        className="dropdown-item"
                        onClick={() => setMethod(m)}
                        type="button"
                    >
                        {m}
                    </button>
                    </li>
                ))}
                </ul>
            </div>

            {/* URL Input */}
            <input
                type="text"
                className="form-control me-2 bg-dark text-light"
                placeholder="Enter request URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendRequest}>
                Send
            </button>
        </div>
        <div className="my-3 gap-3">
      {/* Authorization Section */}
      <div className="my-2">
        <div className='d-flex my-2'>
            <h5 className='me-2'>Authorization</h5>
            <button className="btn btn-outline-primary btn-sm me-2" onClick={addToken}>
                + Add Token
            </button>
      </div>
      {tokens.map((t) => (
        <div className="d-flex mb-2" key={t.id}>
          <select
            className="form-select me-2"
            value={t.type}
            onChange={(e) => updateToken(t.id, "type", e.target.value)}
          >
            <option value="Bearer">Bearer</option>
            <option value="Non-Bearer">Non-Bearer</option>
          </select>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter Token"
            value={t.value}
            onChange={(e) => updateToken(t.id, "value", e.target.value)}
          />
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => removeToken(t.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>

      {/* Headers Section */}
      <div className="my-2">
        <div className='d-flex my-2'>
            <h5 className='me-2'>Headers</h5>
            <button className="btn btn-outline-primary btn-sm me-2" onClick={addHeader}>
                + Add Header
            </button>
        </div>
          
          {headers.map((h) => (
            <div className="d-flex mb-2" key={h.id}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Key"
                value={h.key}
                onChange={(e) => updateHeader(h.id, "key", e.target.value)}
              />
              <input
                type="text"
                className="form-control me-2"
                placeholder="Value"
                value={h.value}
                onChange={(e) => updateHeader(h.id, "value", e.target.value)}
              />
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeHeader(h.id)}
              >
                Remove
              </button>
            </div>
          ))}
            
        </div>
      </div>
      <div className=''>
            <div className="d-flex me-2">
                <h5 className='me-2'>Request/Response</h5>
                <button className="btn btn-outline-primary btn-sm" onClick={Beautify}>
                    Beautify
                </button>
            </div>
            <div className="my-3 d-flex gap-3">
                {/* First textarea */}
                <div className="mb-3 flex-fill">
                    <label htmlFor="textarea1" className="form-label">
                    Request
                    </label>
                    <textarea
                    style={{height:"300px"}}
                    className="form-control bg-dark text-light"
                    id="textarea1"
                    rows="3"
                    value={requestJson}
                    onChange={(e) => setRequestJson(e.target.value)}
                    ></textarea>
                </div>

                {/* Second textarea */}
                <div className="mb-3 flex-fill">
                    <label htmlFor="textarea2" className="form-label">
                    Response
                    </label>
                    <textarea
                    className="form-control bg-dark text-light"
                    style={{height:"300px"}}
                    id="textarea2"
                    rows="3"
                    value={responseJson}
                    onChange={(e) => setResponseJson(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}
