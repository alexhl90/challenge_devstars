import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD, UPDATE_BOARD } from '../graphql/mutations/board';


const CreateBoardModal = ({ isOpen, onClose, initialData, reload }: any) => {
    const [name, setName] = useState('');
    if (!isOpen) return null;
    const [upsertBoard, _] = useMutation((Object.keys(initialData).length > 0 ? UPDATE_BOARD : CREATE_BOARD));

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ...initialData,
            name,
        };
        await upsertBoard({
            variables: formData,
        })
        reload()
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Board name</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="boardName">
                            Name
                        </label>
                        <input
                            id="boardName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter  board name"
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

export default CreateBoardModal;
