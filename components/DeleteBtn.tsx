'use client';

import { useSession } from 'next-auth/react';
import error from 'next/error';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

type DeleteBtn = {
  id: string;
};

const DeleteBtn = ({ id }: DeleteBtn) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === 'loading') return <p>loading...</p>;

  if (status === 'unauthenticated' || !session?.user.isAdmin) return;

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();

        toast.error(data.message);
        return;
      }

      router.push('/menu');
      toast.success('The product has been deleted!');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <button
      className="bg-red-500 p-4 rounded-full absolute top-4 right-4 text-white"
      onClick={() => handleDelete(id)}
    >
      <Image
        width={30}
        height={30}
        objectFit="cover"
        src={'/delete.png'}
        alt="delete product"
        className="hover:scale-125 transition duration-100 ease-out"
      />
    </button>
  );
};

export default DeleteBtn;
