/**
 *
 */
export type FileDropProps<T = HTMLElement> = {
    onDragOver?: (e: React.DragEvent<T>) => void;
    onDrop?: (e: React.DragEvent<T>) => void;
};

/**
 *
 * @param onFiles
 */
export function getFileDropProps(onFiles: (files: FileList) => void) {
    const props: FileDropProps = {
        onDragOver,
        onDrop,
    };

    return props;

    function onDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        onFiles?.(e.dataTransfer.files);
    }
}
