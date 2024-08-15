import { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../graphql/mutations/card';
import { DnDContext } from '../contexts/dndContexts';

type EditCardModalProps = {
    isOpen: boolean,
    onClose: Function,
    initialData: any,
}

const EditCardModal = ({ isOpen, onClose, initialData }: EditCardModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [updateCardM, _] = useMutation(UPDATE_CARD);
    // @ts-ignore
    const { reloadBoard } = useContext(DnDContext);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setAssignedTo(initialData.assignedTo || '');
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const updatedData = {
            id: initialData.id,
            title,
            description,
            priority: initialData.priority,
            assignedTo,
            columnId: initialData.columnId,
        };
        console.log(">>>Submitting updated data: ", updatedData);
        updateCardM({
            variables: updatedData,
        })
        reloadBoard()
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Field */}
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
                            placeholder="Enter card title"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task description"
                            required
                        />
                    </div>

                    {/* Assigned To Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
                            Assigned To
                        </label>
                        <input
                            id="assignedTo"
                            type="text"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter assignee name"
                            required
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCardModal;
