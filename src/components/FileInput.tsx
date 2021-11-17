import React, { useRef } from 'react';
import { combineProps, HTMLProps } from '../common';
import { useDropFile } from '../hooks';
import './FileInput.scss';

export type FileInputProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    onFiles?: (files: FileList) => void;
};

export default function FileInput(props: FileInputProps) {
    const ref = useRef<HTMLInputElement>();
    const dropProps = useDropFile(props.onFiles);

    const inputProps = combineProps<FileInputProps>(props, {ref, onChange: onInputFile})
    delete inputProps.children;
    delete inputProps.onFiles;

    return (
        <div className="file-input" {...dropProps}>
            <input {...inputProps} type="file"/>
            <button onClick={handleClick}>{props.children}</button>
        </div>
    )

    function onInputFile(e: React.ChangeEvent<HTMLInputElement>) {
        props.onFiles?.(e.currentTarget.files);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        props.onFiles?.(e.dataTransfer.files);
    }

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        ref.current.click();
    }
}