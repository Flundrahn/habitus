import { useState } from "react";
import { IHabit } from '../utilities/interfaces';
import Form from "./Form";
import Input from "./Input";
import getRandomColor from '../utilities/getRandomColor';

export default function CreateHabit({ postHabit }:{postHabit: (habit: IHabit) => Promise<void>}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({} as IHabit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    setInputValue(e.target.value);

    setFormData(current => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postHabit({
      ...formData,
      color: formData.color || getRandomColor(),
      goal: parseInt((formData.goal as unknown as string), 10),
    });
  };

  return (
    <>
      {!showForm && <button className="h-8 w-8 bg-blue-300 border-solid shadow-gray-800 shadow-sm m-1 rounded-full text-gray-800 flex justify-center items-center" onClick={() => setShowForm(current => !current)}>
        <i className="fa-solid fa-plus"></i>
      </button>}
      {showForm &&
        <Form title="Add a New Habit" handleSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input type="text" placeholder="Title" required={true} name="title" handleChange={handleChange} />
            <Input type="number" placeholder="Goal per week" required={true} name="goal" handleChange={handleChange} />
            <Input type="color" placeholder="Goal per week" required={true} name="color" handleChange={handleChange} />
            <Input type="text" placeholder="Description" required={false} name="description" handleChange={handleChange} />
          </div>
        </Form>
      }
    </>
  );
}