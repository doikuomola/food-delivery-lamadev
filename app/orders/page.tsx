'use client';

import { OrderLoader } from '@/components';
import { Order } from '@/typings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const QueryClient = useQueryClient();

  if (status === 'unauthenticated') {
    router.push('/');
  }

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
    },

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then((res) => res.json()),
  });

  if (isLoading) return <OrderLoader />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });

    toast.success('The order status has been updated!');
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Order) => (
            <tr
              key={item.id}
              className={`text-sm md:text-base ${
                item.status === 'delivered' ? 'bg-white' : 'bg-red-100'
              }`}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products[0].title}
              </td>

              {session?.user.isAdmin ? (
                <td className="py-6 px-1">
                  <form
                    onSubmit={(e) => handleSubmit(e, item.id)}
                    className="flex items-center justify-center gap-4"
                  >
                    <input
                      type="text"
                      placeholder={item.status}
                      className="p-2 ring-1 ride-red-100 rounded-md"
                    />
                    <button
                      type="submit"
                      className="rounded-full p-2 bg-red-400"
                    >
                      <Image
                        width={20}
                        height={20}
                        src={'/edit.png'}
                        alt="edit status"
                      />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}...</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
