import BhuVisionClient from '@/components/bhu-vision-client';
import { getParcels } from '@/lib/data';

export default async function Home() {
  const parcels = await getParcels();
  return <BhuVisionClient parcels={parcels} />;
}
