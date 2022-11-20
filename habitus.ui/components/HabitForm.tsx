import React from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import getRandomColor from '../utilities/getRandomColor';
import { IEntry, IHabit, IUser } from '../utilities/interfaces';

interface IHabitFormValues {
  title: string;
  goal?: number;
  color: string;
  description?: string;
}

{
  /* TODO Leave this line to add funcitonality show labels */
}
// function Input({ label, ...props }: {label?: string, props: FieldHookConfig<IHabitFormValues>}) {
function Input({
  name,
  type,
  placeholder,
  className = '',
}: {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
}) {
  const [field, meta] = useField(name);
  return (
    <>
      {/* TODO Leave this line to add funcitonality show labels */}
      {/* {label && <label htmlFor={name}>{label}</label>} */}
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`px-2 h-8 bg-white text-sm placeholder-slate-400 outline-none focus:border focus:border-sky-500 focus:shadow-sky-500 shadow-[1px_0_0_0_#BFDBFE,0_1px_0_0_#BFDBFE,1px_1px_0_0_#BFDBFE,1px_0_0_0_#BFDBFE_inset,0_1px_0_0_#BFDBFE_inset] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 invalid:text-pink-600 invalid:placeholder-pink-600 focus:invalid:border-pink-500 border-collapse first-of-type:rounded-[0.375rem_0_0_0.375rem] last-of-type:rounded-[0_0.375rem_0.375rem_0] truncate ${className}`}
      />
      <div className="relative">
        {meta.touched && meta.error ? (
          <div className="text-[10px] text-red-700 pl-2 absolute top-[-19px] right-[2px]">
            {meta.error}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default function HabitForm({
  habit,
  title,
  apiAction,
  button,
  setShowForm,
  user,
  entriesLength,
}: {
  habit?: IHabit;
  title?: string;
  apiAction: (habit: IHabit) => Promise<void>;
  button: JSX.Element;
  setShowForm?: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  entriesLength?: number;
}) {
  const initialValues: IHabitFormValues = {
    title: habit?.title || '',
    goal: habit?.goal,
    color: habit?.color || getRandomColor(),
    description: habit?.description || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(32, 'Must be 32 characters or less')
      .required('Required'),
    goal: Yup.number().min(1, 'Must be 1 or higher').required('Required'),
    color: Yup.string().required('Required'),
    description: Yup.string().max(64, 'Must be 64 characters or less'),
  });

  async function handleSubmit(values: IHabitFormValues) {
    await apiAction({
      ...values,
      goal: values.goal || 0,
      id: habit?.id || 0,
      entries:
        habit?.entries || (new Array(entriesLength).fill({}) as IEntry[]),
      userId: user.id,
    });
    if (setShowForm) setShowForm(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col justify-center w-[82%]">
        <h1 className="text-center">{title}</h1>
        <div className="flex items-center text-sm relative">
          {/* TODO Leave this line to add funcitonality show labels */}
          {/* <Input name="title" type="text" placeholder="Title" label={labels ? 'Title' : undefined}/> */}
          <Input
            name="title"
            type="text"
            placeholder="Title"
            className="w-3/12"
          />
          <Input
            name="goal"
            type="number"
            placeholder="Goal"
            className="w-2/12 text-center"
          />
          <Input name="color" type="color" className="px-[2px] w-2/12" />
          <Input
            name="description"
            type="text"
            placeholder="Description"
            className="w-5/12"
          />
          <button className="absolute right-[-28px]" type="submit">
            {button}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
