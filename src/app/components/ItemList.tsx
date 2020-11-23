import React, { CSSProperties, useState } from 'react';
import { useDropFile } from '../hooks';
import { ListState } from './App';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

function reorder<T>(arr: T[], startIndex: number, endIndex: number) {
    const result = [...arr]
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export function ItemList(props: { listState: ListState; }) {
    const { listState: [items, setItems] } = props;
    const dropProps = useDropFile(files => onFile(files[0]));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((name, i) => <ListItem index={i} key={i} name={name} remove={() => removeItem(name)} rename={name => renameItem(i, name)} />)}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )

    function renameItem(index: number, name: string) {
        const next = [...items];
        next[index] = name;
        setItems(next);
    }

    function removeItem(name: string) {
        setItems([...items].filter(item => item != name));
    }

    function onDragEnd(result: DropResult, provided: ResponderProvided) {
        if (!result.destination) {
            return;
        }
    
        const next = reorder([...items], result.source.index, result.destination.index);
        setItems(next);
    }

    function ListItem(props: { name: string, index: number, remove: () => void, rename: (name: string) => void }) {
        const { remove, index, rename } = props;
        const [name, setName] = useState(props.name); 

        return (
            <Draggable draggableId={name} index={index}>
                {(provided, snapshot) => (
                    <div
                        className="list-item"
                        style={getStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <li>
                            <input value={name} onChange={e => setName(e.target.value)} onBlur={() => rename(name)} />
                            <button onClick={remove}>remove</button>
                        </li>
                    </div>
                )}
            </Draggable>
        )

        function getStyle(isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle): CSSProperties {
            return draggableStyle;
        }
    }

    async function onFile(file: File) {
        const lines = (await file.text()).split('\n');
        setItems(lines);
    }
}
