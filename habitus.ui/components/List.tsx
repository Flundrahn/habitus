import * as React from 'react';
import ListItem from './ListItem';
import { IWeek } from '../utilities/interfaces';

const List = ({ items }: { items: IWeek[] }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
