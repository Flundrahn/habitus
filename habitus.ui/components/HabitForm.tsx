import React from 'react';
import { Formik, useField, FieldHookConfig, Form } from 'formik';
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
function Input(props: FieldHookConfig<IHabitFormValues>) {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col text-left relative">
      {/* TODO Leave this line to add funcitonality show labels */}
      {/* {label && <label htmlFor={props.name}>{label}</label>} */}
      <input
        {...field}
        type={props.type}
        placeholder={props.placeholder}
        className="h-8 px-2 py-1 block bg-white text-sm placeholder-slate-400 outline-none focus:border-sky-500 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 invalid:text-pink-600 invalid:placeholder-pink-600 focus:invalid:border-pink-500"
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-700 pl-2 absolute right-1">
          {meta.error}
        </div>
      ) : null}
    </div>
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
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full text-center flex flex-col items-center text-sm my-1">
          <div className="flex items-center">
            {/* TODO Leave this line to add funcitonality show labels */}
            {/* <Input name="title" type="text" placeholder="Title" label={labels ? 'Title' : undefined}/> */}
            <Input name="title" type="text" placeholder="Title" />
            <Input name="goal" type="number" placeholder="Weekly goal" />
            <Input name="color" type="color" />
            <Input name="description" type="text" placeholder="Description" />
            <button type="submit">{button}</button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
