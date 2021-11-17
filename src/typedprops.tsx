import React, { FunctionComponent, PropsWithChildren, ReactElement, ReactNode } from 'react'

type ChildProps = {
    isChild: true
}

type ParentProps = PropsWithChildren<{
    children?: React.ReactElement<ChildProps>
}>

function Parent(props: ParentProps) {
    return (
        <div>
            {props.children}
        </div>
    )
}

function Child(props: ChildProps) {
    return (
        <div></div>
    )
}

function Test() {
    return (
        <Parent>
            <Child isChild={true} />
        </Parent>
    )
}