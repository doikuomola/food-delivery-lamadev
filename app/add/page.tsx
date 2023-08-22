'use client';

import { url } from 'inspector';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inputs, setInputs] = useState<Inputs>({
    title: '',
    desc: '',
    price: 0,
    catSlug: '',
  });
  const [option, setOption] = useState<Option>({
    title: '',
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  if (status === 'unauthenticated' || session?.user.isAdmin == false) {
    router.push('/');
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append('file', file!);
    data.append('upload_preset', 'restaurant');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/doikuomola/upload',
      {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create product!');
      }

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h[calc(100vh-9rem)] flex items-center justify-center text-red-500 my-20">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-wrap gap-4 p-8"
      >
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="file" className="">
            <Image
              src={'/upload.png'}
              width={30}
              height={30}
              alt="upload image"
            />
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="ring-1 ring-red-200 outline-red-400 p-2 rounded-sm"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="desc">Desc</label>
          <textarea
            name="desc"
            className="ring-1 ring-red-200 p-2 rounded-sm resize-none h-32 outline-red-400"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            className="ring-1 ring-red-200 outline-red-400 p-2 rounded-sm"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="catSlug">Category</label>
          <input
            type="text"
            name="catSlug"
            className="ring-1 ring-red-200 outline-red-400 p-2 rounded-sm"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="options">Options</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="ring-1 w-full lg:w-1/4 ring-red-200 outline-red-400 p-2 rounded-sm placeholder:text-xs md:text-base"
              onChange={changeOption}
            />
            <input
              type="number"
              name="additionalPrice"
              placeholder="Additional Price"
              className="ring-1 w-full lg:w-1/4 ring-red-200 outline-red-400 p-2 rounded-sm placeholder:text-xs md:text-base"
              onChange={changeOption}
            />
            <span
              className="bg-red-400 text-white p-2 rounded-lg w-full lg:w-max hover:bg-red-600 transition duration-200 ease-out cursor-pointer"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          {options.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 p-2 w-max rounded-lg shadow-lg"
              onClick={() =>
                setOptions((prev) =>
                  prev.filter((item) => item.title !== option.title)
                )
              }
            >
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}
        </div>
        <button className="bg-red-600 rounded-lg w-full py-3 text-white font-bold uppercase text-xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
