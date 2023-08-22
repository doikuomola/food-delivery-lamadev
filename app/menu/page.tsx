import { Menu } from '@/typings';
import Link from 'next/link';

async function getCategories() {
  const response = await fetch('http:localhost:3000/api/categories', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('get categories failed');

  return response.json();
}

export default async function Page() {
  const menu = (await getCategories()) as Menu[];
  return (
    <main className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          style={{ backgroundImage: `url(${category.img})` }}
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 md:h-1/2 bg-cover p-8"
        >
          <div
            className={`text-${category.color} flex flex-col justify-between items-start h-full`}
          >
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>
            <button
              className={`hidden md:block bg-${category.color} text-${
                category.color === 'black' ? 'white' : 'red-500'
              } rounded-md py-2 px-4`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </main>
  );
}
