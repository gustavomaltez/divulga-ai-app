import { Input } from '@components';
import { api } from '@services';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Ad = {
  id: string;
  price: number;
  title: string;
  description: string;
  imageUrl: string;
  user: {
    id: string;
    email: string;
    whatsapp: string;
  };
};

export function SearchScreen(): JSX.Element {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);

  async function loadAds() {
    try {
      const { data } = await api.get<Ad[]>('/advertising');
      setAds(data);
    } catch {
      toast.error('Não foi possível carregar os anúncios. Tente acessar novamente em alguns instantes.');
    }
  }

  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length === 0) return setFilteredAds(ads);
    const filtered = ads.filter(ad => ad.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredAds(filtered);
  }

  useEffect(() => void loadAds(), []);

  const list = filteredAds.length > 0 ? filteredAds : ads;
  return (
    <section className='relative flex flex-col items-center justify-start overflow-hidden h-screen'>
      <div className='p-4'>
        <Input
          type="text"
          name="email"
          placeholder='Digite o que você procura'
          onChange={handleSearch}
        />
      </div>
      <section className='flex flex-wrap gap-5 justify-center'>
        {list.map(ad => (
          <div key={ad.id} className='flex flex-row p-4 rounded-lg bg-gray-800 w-[20vw] min-w-[22rem]'>
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className='w-16 h-16 object-cover rounded-xl'
            />
            <div className='grid px-2'>
              <p className='truncate text-white font-bold text-sm'>{ad.title}</p>
              <p className='text-base text-gray-400 font-medium'>R${Number(ad.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}