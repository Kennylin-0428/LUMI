import { Navigate, useParams } from 'react-router-dom';
import { series } from '../data.js';
import NotFound from './NotFound.jsx';

export default function ProductList() {
  const { seriesKey } = useParams();
  if (!series[seriesKey]) return <NotFound />;
  return <Navigate to={`/${seriesKey}#products`} replace />;
}
