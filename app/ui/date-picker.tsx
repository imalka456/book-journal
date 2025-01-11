import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { MdOutlineDateRange } from "react-icons/md";

type DatePickerProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  label,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const togglePicker = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent form submit when clicking the button
    setIsPickerVisible((prev) => !prev);
  };

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date);
    setIsPickerVisible(false); // Close picker after selection
  };

  return (
    <div
      id="date-picker"
      className="relative border border-gray-300 rounded focus-within:border-dark-blue"
    >
      <div className="flex">
        <div>
          <button
            type="button"
            onClick={togglePicker}
            className={`flex items-center justify-center border-none w-full text-left border px-4 py-2 focus:outline-none focus:border-dark-blue active:border-dark-blue ${!selectedDate ? "text-gray-400" : ""}`}
          >
            <div
              className={`text-2xl mr-2 ${selectedDate ? "text-gray-700" : "text-gray-400"}`}
            >
              <MdOutlineDateRange
                className={`text-2xl mr-2 ${selectedDate ? "text-gray-700" : "text-gray-400"}`}
              />
            </div>
            {selectedDate ? selectedDate.toDateString() : label}
          </button>
        </div>
      </div>

      {isPickerVisible && (
        <div className="absolute mt-2 bg-white border shadow-md rounded-lg z-10">
          <DayPicker
            mode="single"
            className="day-picker"
            selected={selectedDate}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
