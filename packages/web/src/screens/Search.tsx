import { Input } from '@components';
import { PencilIcon } from '@heroicons/react/24/solid';
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

  async function loadAds() {
    try {
      const { data } = await api.get<Ad[]>('/advertising');
      setAds(data);
    } catch (error: any) {
      toast.error('Não foi possível carregar os anúncios. Tente acessar novamente em alguns instantes.');
    }
  }

  useEffect(() => void loadAds(), []);

  return (
    <section className='relative flex flex-col items-center justify-start overflow-hidden h-screen bg-[#15192a] '>

      <div className='p-4'>
        <Input
          type="text"
          name="email"
          placeholder='Digite o que você procura'
        />
      </div>
      <section className='flex flex-wrap gap-5 justify-center'>
        {ads.map(ad => (
          <div key={ad.id} className='flex flex-row p-4 rounded-lg bg-[#1f263c] rounded-xl w-[20vw] min-w-[22rem]'>
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className='w-16 h-16 object-cover rounded-xl'
            />
            <div className='flex flex-col px-2'>
              <p className='truncate w-full font-semibold tracking-tight text-white'>{ad.title}</p>
              <p className='text-gray-400 font-medium'>R${Number(ad.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}