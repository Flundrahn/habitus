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
  const { data } = useHabitusApi(user.idToken, startDate, endDate);
  const chartData = data?.map(habit => ({
    name: habit.title,
    Score: habit.score,
    Goal: habit.goal,
  }));

  if (!data) {
    // return <ReactLoading type="spin" />;
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="90%" height={300} className="m-4">
      <BarChart
        data={chartData}
        layout="vertical"
        // margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          allowDecimals={false}
          tickCount={8}
          interval="preserveStart"
          // scale="point"
        />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend iconType="circle" />
        <Bar dataKey="Score" stackId={1} fill="#86EFAC" />
        <Bar dataKey="Goal" stackId={1} fill="#FF6347" />
      </BarChart>
    </ResponsiveContainer>
  );
}
