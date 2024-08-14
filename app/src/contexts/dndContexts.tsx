
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD_COLUMN } from '../graphql/mutations/card';

export const DnDContext = React.createContext();


export const DnDProvider = ({ reloadBoard, children, }) => {
    const itemRef = useRef(null);
    const newColumnId = useRef(null);
    const setItem = useMemo(() => (item) => { itemRef.current = item }, []);
    const setContainer = useMemo(() => (container: string) => { newColumnId.current = container }, []);
    const [updateCardColumnM, { data: mutationUpdate }] = useMutation(UPDATE_CARD_COLUMN);



    const dropCard = useMemo(() => async () => {
        if (itemRef.current?.columnId !== newColumnId?.current) {
            itemRef.current?.card.classList.add("invisible");
            const payload = {
                cardId: itemRef.current.id,
                columnId: itemRef.current.columnId,
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