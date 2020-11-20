import React, { useState, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import quickSort from './quickSort';
import { useQuery } from './hooks';

// TODO
// undo feature
// statistics
// sort other data types
// fetch first google result for item image
// reorder list drag and drop
// FIX THE LIST SORT IN GENERAL

const root = document.querySelector("#root");
ReactDOM.render(<App/>, root);

function App() {
    const [items, setItems] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>('');
    const [options, setOptions] = useState<{a: string, b: string}>();
    const {isDone, makeQuery, query} = useQuery<string>();

    if (!isDone) {
        return (
            <div>
                <button onClick={() => query.resolve(options.a)}>{options.a}</button>
                <button onClick={() => query.resolve(options.b)}>{options.b}</button>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {items.map((name, i) => <ListItem key={i} name={name}/>)}
            </ul>
            <form onSubmit={onItemSubmit}>
                <input value={nameInput} onChange={handleInputChange}/>
                <input type="file" onChange={handleFileChange} />
            </form>
            <button onClick={() => startSorting()}>SORT</button>
        </div>
    )

    async function startSorting() {
        const r = await quickSort([...items], compare);
        setItems(r);

        async function compare(a: string, b: string) {
            setOptions({a, b});
            const result = await makeQuery();
            console.log(a, b, result === a);
            return result === a;
        }
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files[0];
        const lines = (await file.text()).split('\n');
        setItems(lines);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNameInput(e.target.value);
    }

    function onItemSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const name = nameInput;
        setNameInput("");
        setItems([...items, name]);
    }

    function ListItem(props: {name: string}) {
        return (
            <li>
                <p>{props.name}</p>
            </li>
        )
    }
}