import React, { useEffect } from "react";
import { Query } from "../hooks/useQuery";
import "./Compare.scss";

export type CompareProps = {
    query: Query<string>;
    options: { a: string; b: string };
};

export default function Compare(props: CompareProps) {
    const {
        query,
        options: { a, b },
    } = props;

    useEffect(() => {
        document.addEventListener("keydown", keyListener);
        return () => document.removeEventListener("keydown", keyListener);

        function keyListener(e: KeyboardEvent) {
            switch (e.key) {
                case "A":
                case "Q":
                case "ArrowLeft":
                    query.resolve(a);

                case "D":
                case "W":
                case "ArrowRight":
                    query.resolve(b);
            }
        }
    }, []);

    return (
        <main className="app compare">
            <section>
                <button onClick={() => query.resolve(a)}>{a}</button>
            </section>
            <section>
                <button onClick={() => query.resolve(b)}>{b}</button>
            </section>
        </main>
    );
}
