"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import './globals.css';
import styled from 'styled-components';

const CustomCursorDiv = styled.div`
  cursor: url('/fish.png'), auto;
`;
interface Project {
  id: number;
  name: string;
  imageUrl: string;
}




const Home: React.FC = () => {
  const [typedText, setTypedText] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const words: string[] = ["technology", "services", "app building"];
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const bubbleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setTypedText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      } else {
        setTypedText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [typedText, isDeleting, typingSpeed, currentWordIndex, words]);

  const handleMouseMove = (event: MouseEvent) => {
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }

    bubbleTimeoutRef.current = window.setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = `${Math.random() * 10 + 10}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${event.clientX}px`;
      bubble.style.top = `${event.clientY}px`;

      bubbleContainerRef.current?.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 10000);  
    }, 30); 
  };

  useEffect(() => {
    const container = bubbleContainerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
    };
  }, []);

  const projects: Project[] = [
    { id: 1, name: 'Project 1', imageUrl: '/project1.png' },
    { id: 2, name: 'Project 2', imageUrl: '/project2.png' },
    { id: 3, name: 'Project 3', imageUrl: '/project3.png' },
    // Add more projects as needed
  ];

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleNavLinkClick = () => {
    setIsNavVisible(false);
  };

  return (
    <CustomCursorDiv>
    <div className="min-h-screen bg-black relative" ref={bubbleContainerRef}>
    <nav className="top-0 left-0 fixed right-0 bg-opacity-50 backdrop-blur-md py-4 flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex items-center justify-between md:w-auto w-full">
          <div className="ml-6">
            <Link href="/">
              <p className="text-white text-lg font-bold font-marisa">Appniche</p>
            </Link>
          </div>
          <button className="text-white md:hidden" onClick={toggleNav} aria-label="Toggle navigation">
            <svg
              className="w-6 h-6 m-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
        </div>

        <div className={`md:flex  md:gap-4 mr-5 ${isNavVisible ? 'flex flex-col' : 'hidden'}`}>
          <Link href="/">
            <p className="text-white mr-4 font-marisa hover:text-blue-500" onClick={handleNavLinkClick}>Home</p>
          </Link>
          <Link href="/about">
            <p className="text-white mr-4 font-marisa hover:text-blue-500" onClick={handleNavLinkClick}>About</p>
          </Link>
          <Link href="/projects">
            <p className="text-white mr-4 font-marisa hover:text-blue-500" onClick={handleNavLinkClick}>Projects</p>
          </Link>
          <a href="https://github.com/itzblacckk" className="text-white mr-4 font-marisa hover:text-blue-500" onClick={handleNavLinkClick}>GitHub</a>
          
        </div>
        <div className={`md:flex bg-blue-500 p-2 rounded-md text-center mr-5 ${isNavVisible ? 'flex flex-col' : 'hidden'}`}>
        <Link className=' text-center' href="/contact">
            <p className="text-white text-center mr-4 font-marisa " onClick={handleNavLinkClick}>Contact Us</p>
          </Link>
        </div>
      </nav>
        <div style={{ backgroundImage: "url('/img-bg.png')" }} className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
        <h1 className="text-4xl font-bold text-white font-marisa">Appniche <span className="border-r-2 border-white">{typedText}</span></h1>
      </div>
      <p className="justify-center flex text-4xl font-bold text-white mt-8 font-marisa">PROJECTS</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 p-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="px-4">
        <h2 className="text-4xl font-bold text-white mt-12 mb-8 text-center font-marisa">Awesome Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-6">
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Web Development</button> 
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>AOT Projects</button>  
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Graphic Design</button>  
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Web Design</button> 
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Digital Marketing</button>  
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Branding</button> 
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Android Development</button>  
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>iOS Development</button>  
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>Product Design</button> 
          <button className='bg-blue-500 rounded-md p-2 text-white text-lg font-bold'>System Design</button>   
        </div>
        </div>
        <div className="container m-5 mt-20 mx-auto px-4">
        <h1 className="text-4xl font-bold text-left mb-8">
          Successfully delivered digital products and platforms for a diverse range of use cases across key industries.
        </h1>
        <p className="text-lg text-left mb-12">
          Our highly experienced designs and programmers comprehend your vision and business objectives in order to create the designs.
          <br />
          Our agency specializes in assisting clients, particularly startups, in creating strong design and website that unify their brand both internally and externally.
          <br />
          We thoroughly enjoy collaborating with product-led companies, empowering their teams and customers with enhanced UI/UX and well-coordinated design kits.
        </p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <CustomCursorDiv className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <h2 className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">CMS and E-commerce website, complex business websites &amp; Design solutions along with static web pages</h2>
          </CustomCursorDiv>
          <div className="relative w-auto h-auto inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <h2 className="relative px-5 py-2.5 w-auto h-auto transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">We are counted among most professional Wordpress developer company in India</h2>
          </div>
          <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <h2 className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Increase conversions, leads, sales, revenue, That's digital marketing services from us</h2>
          </div>
        </div>
      </div>  
      <div className="flex flex-col md:flex-row items-center p-8  max-w-4xl mx-auto">
      <div className="mb-4 md:mb-0 justify-center md:mr-8">
        <img src="/meeting.svg" alt="Logo" width={3000} height={3000}/>
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-4">
          WHEN BRAND MEETS YOUR BUSINESS GOALS
        </h1>
        <p className="mb-4">BEST WEB BASED ONLINE SOLUTIONS DEVELOPMENT</p>
        <p className="mb-4">
          We will connect you within 24 working hours with a complete analysis of your
          requirements. Piotech INDIA supports your belief and serves your marketing needs.
          Get a quick quote on your service request and let us be your online venture.
          Schedule a Demo with our Friendly Experts.
        </p>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Get Started
</span>
</button>






      </div>
    </div>



    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        
        <div
          id="dropdown"
          className={`z-10 ${dropdownVisible ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/imglogo.jpg" alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Yash Mhatre</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Website Developer And Android Developer</span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="https://www.instagram.com/yashmhatre_625/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Follow on Instagram
          </a>
          <a
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Message
          </a>
        </div>
      </div>
    </div>     
          <footer className="bg-black text-blue-500 text-center py-4">
        <p>© 2024 Appniche. All rights reserved.</p>
      </footer>
    </div>
    </CustomCursorDiv>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.7 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <img
        src={project.imageUrl}
        alt={project.name}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center opacity-0 transition-opacity duration-300 hover:opacity-100">
        <span className="text-lg font-bold font-marisa">{project.name}</span>
      </div>
    </div>
  );
};

export default Home;
