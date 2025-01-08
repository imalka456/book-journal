import { useState, ChangeEvent } from 'react';
import DatePicker from "../date-picker";
import Lottie from 'react-lottie';
import animationData from '../../../public/celebration.json';
import { Book } from '../../models/interfaces';

const lottieOptions = {
  loop: true,
  autoplay: true, // Loop the animation
  animationData: animationData, // Provide the animation data
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type AddBookProps = {
  onClose: () => void;
  mode: string,
  initialData: Book | null,
  onSubmit: (data: { id: number | undefined, title: string; isbn: string; startDate: Date | undefined; endDate: Date | undefined; isToggled: boolean }) => void;
};

export default function AddBook({ onSubmit, onClose, mode, initialData }: Readonly<AddBookProps>) {
    const [formData, setFormData] = useState<{    
        id: number | undefined,    
        title: string;
        isbn: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
        isToggled: boolean;
      }>({
        id: initialData?.id ?? undefined,
        title: initialData?.title ?? '',
        isbn: initialData?.isbn ?? '',
        startDate: initialData?.start_date && initialData.start_date !== null ? new Date(initialData.start_date) : undefined,  // Can be a Date or null
        endDate: initialData?.end_date && initialData.end_date !== null ? new Date(initialData.end_date) : undefined,  // Can be a Date or null
        isToggled: initialData?.status == 'Finished', // Boolean value for toggling
      });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Update formData based on the type of input (checkbox or text)
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        isToggled: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date: Date | undefined, field: 'startDate' | 'endDate') => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      id: formData.id,
      title: formData.title,
      isbn: formData.isbn,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isToggled: formData.isToggled,
    });
  };
  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className='flex'>
          <div><h2 className="mb-4 text-xl text-active-color font-medium ">{mode === 'edit' ? 'Update My Book Record' : 'Add a New Book'}</h2></div>
          <div>
            {formData.isToggled && (
              <div className="w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                <Lottie options={lottieOptions} height={100} width={100} />
              </div>
            )}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              className='w-full px-4 py-2 border-gray-300 rounded-md border focus:border-dark-blue focus:outline-none'
              type="text"
              placeholder='Title'
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              className='w-full px-4 py-2 border-gray-300 rounded-md border focus:border-dark-blue focus:outline-none'
              type="text"
              placeholder='ISBN'
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          <div>
            <DatePicker
              label="Start Date"
              selectedDate={formData.startDate}
              onDateChange={(date) => handleDateChange(date, 'startDate')}
            />
          </div>

          <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
            <input
              type='checkbox'
              name='autoSaver'
              className='sr-only'
              checked={formData.isToggled}
              onChange={handleChange}
            />

            <span
              className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                formData.isToggled ? 'bg-dark-blue' : 'bg-[#CCCCCE]'
              }`}>
              <span
                className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                  formData.isToggled ? 'translate-x-6' : ''
                }`}>
              </span>
            </span>
            <span className=''>
              <span className='pl-1'> {formData.isToggled ? 'Finished' : 'In Progress'} </span>
            </span>
          </label>

          <div>
            <DatePicker
              label="End Date"
              selectedDate={formData.endDate}
              onDateChange={(date) => handleDateChange(date, 'endDate')}
            />
          </div>

          <div className="w-full flex space-x-4 pt-6 ml-auto justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-dark-blue text-white rounded-md hover:bg-hover-color">
              {mode === 'edit' ? 'Update' : 'Add'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-dark-blue border border-dark-blue rounded-md hover:text-white hover:bg-active-color">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}