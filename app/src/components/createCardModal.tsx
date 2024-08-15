import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CARD } from '../graphql/mutations/card';
import { DnDContext } from '../contexts/dndContexts';
import { useParams } from 'react-router-dom';

type CreateCardModalProps = {
    isOpen: boolean,
    onClose: Function,
    columns: any[],
}
const CreateCardModal = ({ isOpen, onClose, columns }: CreateCardModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [columnId, setColumn] = useState('');
    const [createCardM, _] = useMutation(CREATE_CARD);
    const { boardId } = useParams();
    // @ts-ignore
    const { reloadBoard } = useContext(DnDContext);

    if (!isOpen) return null;

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const formData = {
            title,
            description,
            assignedTo,
            columnId,
            boardId,
            priority: 1, // default priority is 1
        };
        console.log('>>Creating card:', formData);
        createCardM({
            variables: formData
        })
        reloadBoard();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
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
                            placeholder="Enter task title"
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

                    {/* Column Selection Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="column">
                            Column
                        </label>
                        <select
                            id="column"
                            value={columnId}
                            onChange={(e) => setColumn(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select a column
                            </option>
                            {columns.map((col) => (
                                <option key={col.id} value={col.id}>
                                    {col.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={()=>onClose()}
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
        </div>
    );
};

export default CreateCardModal;
