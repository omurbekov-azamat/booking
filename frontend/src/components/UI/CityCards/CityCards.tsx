import React from 'react';
import { useTranslation } from 'react-i18next';
import CityCard from './CityCard';
import { Grid } from '@mui/material';

const CityCards = () => {
  const { t } = useTranslation();

  const cities = [
    {
      name: t('bishkek'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('issykKul'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('osh'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('kara-balta'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('tokmok'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('kant'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('talas'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('nookat'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('uzgen'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('suzak'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('kara-kulja'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('naryn'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('atbashi'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('kochkor'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('isfana'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('kyzyl-kiya'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
    {
      name: t('leylek'),
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
    },
  ];
  return (
    <Grid container spacing={2}>
      {cities.map((item) => (
        <CityCard key={item.link} item={item} />
      ))}
    </Grid>
  );
};

export default CityCards;
