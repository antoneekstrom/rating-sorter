import React, { useState } from 'react';
import { ListState } from './App';
import FileInput from './FileInput';
import { ItemList } from './ItemList';
import './MainView.scss';

export type MainViewProps = {
    listState: ListState;
    sort: () => void;
};

export default function MainView(props: MainViewProps) {
    const { listState: [items, setItems], sort } = props;
    const [nameInput, setNameInput] = useState<string>('');

    return (
        <main className="app main">
            <section className="settings"></section>

            <section className="list">
                <ItemList listState={props.listState} />
            </section>

            <section className="items">
                <div>
                    <form onSubmit={onItemSubmit}>
                        <label>Add item</label>
                        <div className="add-item row">
                            <input value={nameInput} onChange={handleInputChange} />
                            <button>Add</button>
                        </div>
                    </form>
                    <div className="form">
                        <div className="split">
                            <FileInput onFiles={files => onFile(files[0])}>Import</FileInput>
                            <div className="center">
                                <button onClick={saveList}>Export</button>
                            </div>
                            <div className="center"><button onClick={clearList}>Clear</button></div>
                        </div>
                    </div>
                    <button className="sort" onClick={sort}>SORT</button>
                </div>
            </section>
        </main>
    );

    function saveList() {
        const fileBlob = new Blob([items.join('\n')]);
        const fileUrl = URL.createObjectURL(fileBlob);

        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = 'epic-list.txt';
        anchor.click();
    }

    function clearList(e?: React.SyntheticEvent) {
        e?.preventDefault();
        setItems([]);
    }

    async function onFile(file: File) {
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
}
