import React from 'react';
import type { IWeek } from '../../utilities/interfaces';
import { weekData } from '../../utilities/sample-data';
import ListDetail from '../../components/ListDetail';

export const getStaticPaths = () => {
  const paths = weekData.map(week => ({
    params: { id: week.id.toString() },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }: {params: {id: number}}) => {
  try {
    // NOTE the nullable operator could possibly be removed, depending on how nextjs works
    const id = params?.id;
    const week = weekData.find(week => week.id === Number(id));

    return { props: { week } };
  } catch (error) {
    if (error instanceof Error) {
      return { props: { errors: error.message } };
    }
  }
};

function Week({ week, errors }: {week: IWeek; errors?: string}): JSX.Element {
  if (errors) {
    return (
      <p className="text-red-800">
          Error: {errors}
      </p>
    );
  }

  return (
    <>
      {week && <ListDetail item={week} />}
    </>
  );
}

export default Week;

