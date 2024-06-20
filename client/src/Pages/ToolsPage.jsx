import { useEffect, useState } from "react"

export function ToolsPage() {

    const [tools, setTools] = useState([]);
    const [allTools, setAllTools] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [toolData, setToolData] = useState({ name: "", weight: 0 });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/tools');
                const data = await response.json();
                setTools(data);
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }

        }
        fetchData();
    }, [])

    const searchTools = (value) => {

        const searchResults = allTools.filter((tool) => {
            return value && tool.name.toLowerCase().includes(value)
        })
        return searchResults;
    }

    const handleSearch = (value) => {

        setSearchInput(value)

        if (!allTools.length) {
            setAllTools(tools);
        }
        if (value && tools.length !== 0) {
            setTools(searchTools(value))
        }
        else if (value && tools.length === 0) {
            setTools(!searchTools(value) ? [] : searchTools(value))
        }
        else {
            setTools(allTools)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setToolData((prevTool) => ({ ...prevTool, [name]: value }));
    }

    const submitTool = async () => {
        try {
            await fetch(`/api/tools`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toolData)
            })
        }
        catch (error) {
            console.error(error);
        }
        setTools((prevTools) => [ ...prevTools, toolData ]);
    }

    return (<div>
        <label>Search<input type="text" value={searchInput} onChange={(e) => handleSearch(e.target.value)}></input></label>
        <label> Tool name<input type="text" name="name" value={toolData.name} onChange={handleInput}></input></label>
        <label> Tool weight<input type="text" name="weight" value={toolData.weight} onChange={handleInput}></input></label>
        <button onClick={submitTool}>Add new tool</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {tools.map((tool) => {
                    return <tr>
                        <td>{tool.name}</td>
                        <td>{tool.weight}</td> </tr>
                })}

            </tbody>
        </table>
    </div>)
}