import React, { useRef } from "react";
import { combineProps } from "../common/props";
import { getFileDropProps } from "../common/files";
import "./FileInput.scss";

export type FileInputProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    onFiles?: (files: FileList) => void;
};

export default function FileInput(props: FileInputProps) {
    const ref = useRef<HTMLInputElement>();
    const dropProps = getFileDropProps(props.onFiles);

    const inputProps = combineProps<FileInputProps>(props, {
        ref,
        onChange: onInputFile,
    });
    delete inputProps.children;
    delete inputProps.onFiles;

    return (
        <div className="file-input" {...dropProps}>
            <input {...inputProps} type="file" />
            <button onClick={handleClick}>{props.children}</button>
        </div>
    );

    function onInputFile(e: React.ChangeEvent<HTMLInputElement>) {
        props.onFiles?.(e.currentTarget.files);
    }

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        ref.current.click();
    }
}
