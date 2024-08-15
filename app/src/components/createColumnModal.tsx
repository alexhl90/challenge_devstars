import { useEffect, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COLUMN, UPDATE_COLUMN } from '../graphql/mutations/column';
import { DnDContext } from '../contexts/dndContexts';
import { useParams } from 'react-router-dom';


const CreateColumnModal = ({ isOpen, onClose, initialData }: any) => {
    const [title, setTitle] = useState('');
    const [order, setOrder] = useState('');
    if (!isOpen) return null;
    const [upsertColumnM, { data: mutationSuccess }] = useMutation((Object.keys(initialData).length > 0 ? UPDATE_COLUMN : CREATE_COLUMN));

    const { boardId } = useParams();
    const { reloadBoard } = useContext(DnDContext);

    useEffect(() => {
        if (initialData) {

            setTitle(initialData.title || '');
            setOrder(initialData.order || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = {
            ...initialData,
            title,
            order: parseInt(order),
            boardId,
        };
        await upsertColumnM({
            variables: formData,
        })
        reloadBoard()
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Enter Title and Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter column title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
                            Order
                        </label>
                        <input
                            id="order"
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter order number"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default CreateColumnModal;
