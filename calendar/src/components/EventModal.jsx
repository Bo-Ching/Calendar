import React, { useState } from 'react';

const EventModal = ({ onClose, onAddEvent }) => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState(""); // **新增錯誤訊息狀態**

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // **檢查結束日期是否比開始日期早**
        if (new Date(endDate) < new Date(startDate)) {
            setError("End date must be later than start date.");
            return;
        }

        console.log({
            eventName,
            eventDescription,
            startDate,
            endDate,
        });

        if (!eventName || !startDate || !endDate) return;

        onAddEvent({
            eventName,
            eventDescription,
            startDate,
            endDate,
        });

        // 清空表單資料
        setEventName("");
        setEventDescription("");
        setStartDate("");
        setEndDate("");
        setError(""); // **清空錯誤訊息**

        // 關閉視窗
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/30 pointer-events-none z-50">
            <div className="bg-white p-6 w-96 rounded-lg shadow-lg pointer-events-auto">
                <h2 className="text-xl font-semibold mb-4">New Event</h2>

                {/* **顯示錯誤訊息** */}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 事件名稱 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* 事件敘述 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    {/* 開始 & 結束日期 */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* 按鈕區域 */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
