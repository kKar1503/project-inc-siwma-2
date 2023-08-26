import { useRouter } from 'next/router';
import AdvertisementFormPage from '@/components/advertisementsDashboard/form/AdvertisementFormPage';


const AdvertisementEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  return <AdvertisementFormPage edit={id as string} />;
};

export default AdvertisementEdit;
