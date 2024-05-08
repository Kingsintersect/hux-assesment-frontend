import { useState } from 'react';
import Modal from '../Modal';

export default function DetailsModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Modal Content</h2>
                    <p>This is a modal example built with Tailwind CSS.</p>
                    <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}
