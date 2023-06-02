import React from 'react';
import RoomTypeItem from './RoomTypeItem';
import { IRoomType } from '../../../types';

interface Props {
  items: IRoomType[];
}

const RoomTypeItems: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <RoomTypeItem key={item._id} item={item} />
      ))}
    </>
  );
};

export default RoomTypeItems;
