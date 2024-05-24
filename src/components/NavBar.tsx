'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '../app/(pages)/LoginSignup/firebase'; // Adjust the import according to your project structure
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import profileIcon from 'profileIcon.svg'; // Add your profile icon path
import { useRouter } from 'next/navigation';

function NavBar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to the homepage after logout
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='w-full p-2 bg-[#11232e] mt-0 flex justify-between sticky z-[20] items-center'>
      <div className='flex items-center'>
        <Link href='/' className='font-extrabold text_color_variation text-2xl leading-[1.75rem] m-2'>CoLabCrafters</Link>
        <Link href='/Projects' className='hidden font-medium text-[#ed4116] text-lg hover:text-[1rem] md:block ml-4'>Projects</Link>
        <Link href='/students' className='text-lg font-medium text-[#ed4116] hover:text-[1rem] hidden md:block ml-8'>Student Section</Link>
      </div>
      <div className='flex items-center'>
        <Link href='/Blog' className='mr-4 font-semibold text-white hidden items-center lg:block text-center mb-0 pt-[8px]'>Blog</Link>
        <Link href='/About' className='font-semibold mr-4 text-white hidden items-center lg:block text-center mb-0 pt-[8px]'>About Us</Link>
        {user ? (
          <>
            <Link href='/profile' className='ml-4'>
              <Image src='/profileimg.jpeg' alt='Profile' width={40} height={40} className='rounded-full' />
            </Link>
            <button 
              onClick={handleLogout} 
              className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl ml-4'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href='/LoginSignup' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl m-4'>Sign up</Link>
            <Link href='/LoginSignup' className='bg-pink-500 hover:bg-pink-300 text-white font-semibold px-4 py-2 rounded-xl ml-4'>Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
