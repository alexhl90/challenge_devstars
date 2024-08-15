
import React, { useRef, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD_COLUMN } from '../graphql/mutations/card';


type DndProviderProps = {
    reloadBoard: Function,
    children: React.ReactNode,
}

export const DnDContext = React.createContext(null);


export const DnDProvider = ({ reloadBoard, children, }: DndProviderProps) => {
    const itemRef = useRef(null);
    const newColumnId = useRef(null);
    // @ts-ignore
    const setItem = useMemo(() => (item) => { itemRef.current = item }, []);
    // @ts-ignore
    const setContainer = useMemo(() => (container) => { newColumnId.current = container }, []);
    const [updateCardColumnM, _] = useMutation(UPDATE_CARD_COLUMN);



    const dropCard = useMemo(() => async () => {
        // @ts-ignore
        if (itemRef.current?.columnId !== newColumnId?.current) {
            // @ts-ignore
            itemRef.current?.card.classList.add("invisible");
            const payload = {
                // @ts-ignore
                cardId: itemRef.current?.id,
                // @ts-ignore
                columnId: itemRef.current?.columnId,
                newColumnId: newColumnId.current,
            }
            await updateCardColumnM({
                variables: payload,
            })
            reloadBoard()
        }
    }, []);

    return (
        <DnDContext.Provider
            // @ts-ignore
            value={{
                setItem,
                setContainer,
                dropCard,
                reloadBoard,
            }}
        >
            {children}
        </DnDContext.Provider>
    );

}