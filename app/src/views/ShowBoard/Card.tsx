import { useMemo, useContext, useState } from "react";
import { DnDContext } from "../../contexts/dndContexts";
import { useMutation } from "@apollo/client";
import { DELETE_CARD } from "../../graphql/mutations/card";
import EditCardModal from "../../components/editCardModal";
const Card = ({ cardInfo }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const { dropCard, setItem, reloadBoard } = useContext(DnDContext);
    const [deleteCardMutation, { data: deleteResponse }] = useMutation(DELETE_CARD);

    const dragStart = useMemo(() => {
        return (evt, card) => {
            evt.target.classList.add("opacity-50");
            setItem({ ...card, card: evt.target })
        };
    }, []);
    const dragEnd = useMemo(() => {
        return (evt) => {
            evt.target.classList.remove("opacity-50");
            dropCard()
        };
    }, []);

    const handleDeleteCard = useMemo(() => async (cardInfo) => {
        await deleteCardMutation({
            variables: { cardId: cardInfo.id, columnId: cardInfo.columnId },
        });
        reloadBoard();
    }, [])


    return (
        <li
            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4"
            draggable
            key={cardInfo.id}
            onDragStart={(e) => dragStart(e, cardInfo)}
            onDragEnd={(e) => dragEnd(e)}
        >
            {/* Título y botón de editar */}
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-left">{cardInfo.title || "No Tittle"}</h3>
                <div>
                    <button className="text-gray-500 hover:text-gray-700 hover:text-lg" onClick={() => setEditModalOpen(true)}>
                        ✎
                    </button>
                </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-700 flex-grow text-left">
                {cardInfo.description || "No description provided"}
            </p>

            {/* Asignado a */}
            <div className="flex justify-between space-x-2 pt-2 border-t border-gray-200">
                <div className="flex items-center">
                    {cardInfo.assignedTo && (
                        <img
                            src={`https://robohash.org/${cardInfo.assignedTo || "default"}.png?size=50x50`}
                            alt={`${cardInfo.assignedTo}`}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    )}
                    <span className="text-gray-900 font-medium">{cardInfo.assignedTo}</span>
                </div>
                <button className="text-gray-500 hover:text-red-600 hover:text-lg" onClick={() => handleDeleteCard(cardInfo)}>
                    ✖
                </button>
            </div>
            {isEditModalOpen && <EditCardModal isOpen={isEditModalOpen} initialData={cardInfo} onClose={() => setEditModalOpen(false)} />}
        </li>
    );
};

export default Card;
