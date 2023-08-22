import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function OrderLoader() {
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <div className="flex items-center justify-between gap-3 rounded-lg overflow-hidden w-full">
        <h1 className='font-bold'>Order ID</h1>
        <h1 className='font-bold'>Date</h1>
        <h1 className='font-bold'>Price</h1>
        <h1 className='font-bold'>Products</h1>
        <h1 className='font-bold'>Status</h1>
      </div>

    
      <div className="flex items-center justify-between gap-3 rounded-lg overflow-hidden w-full">
        <Skeleton count={1} height={100} width={400} className="rounded-lg" />
        <Skeleton count={1} height={100} width={200} className="rounded-lg" />
        <Skeleton count={1} height={100} width={100} className="rounded-lg" />
        <Skeleton count={1} height={100} width={200} className="rounded-lg" />
        <Skeleton count={1} height={100} width={400} className="rounded-lg" />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg overflow-hidden w-full">
        <Skeleton count={1} height={100} width={400} className="rounded-lg" />
        <Skeleton count={1} height={100} width={200} className="rounded-lg" />
        <Skeleton count={1} height={100} width={100} className="rounded-lg" />
        <Skeleton count={1} height={100} width={200} className="rounded-lg" />
        <Skeleton count={1} height={100} width={400} className="rounded-lg" />
      </div>
    </div>
  );
}
