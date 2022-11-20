import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useHabitusApi from '../utilities/useHabitusApi';
import { IUser } from '../utilities/interfaces';

export default function WeekChart({
  user,
  startDate,
  endDate = startDate,
}: {
  user: IUser;
  startDate: Date;
  endDate?: Date;
}) {
  const { data: habits } = useHabitusApi(user.idToken, startDate, endDate);
  const chartData = habits?.map(habit => ({
    name: habit.title,
    Score: habit.score,
    Goal: habit.goal,
  }));

  if (!habits) {
    // return <ReactLoading type="spin" />;
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="mt-4 md:text-sm lg:text-base font-bold">
        Weekly Progress
      </h2>
      <ResponsiveContainer
        width="90%"
        height={60 * habits.length}
        className="m-4"
      >
        <BarChart
          data={chartData}
          layout="vertical"
          barGap={-20}
          margin={{ top: 0, right: 0, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            allowDecimals={false}
            tickCount={8}
            interval="preserveEnd"
          />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend iconType="circle" />
          <Bar dataKey="Goal" stackId={1} fill="#FCA5A5" barSize={20} />
          <Bar dataKey="Score" stackId={2} fill="#86EFAC" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
