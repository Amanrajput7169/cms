'use client'

import { useState , useEffect } from "react";
import Image from "next/image";
interface ProjectCardProps {
  projectName: string;
  authorName: string;
  description:string;
}
interface Card {
    _id: string;
    title: string;
    tech_stack: [];
    tag: string;
    Description: string;
    Features: string;
    Prerequisites: string;
    price: number;
    duration: string;
    Level_of_project: string;
    Mentors: {
      name: string;
      image_link: string;
      designation: string;
      _id: string;
    }[];
    __v: number;
  }

const ProjectCard1: React.FC<ProjectCardProps> = ({ projectName, authorName ,description}) => {
  

  return (
    
    <div className="flex items-center justify-between w-80" data-aos="flip-up">
      <div className="shadow  bg-[#3e6f8d] rounded-lg">
        <div className="overflow-y-clip rounded-lg h-fit md:h-80 w-80 flex flex-col justify-start shadow-lg shadow-black-200 relative">
          <div className="flex flex-col justify-start gap-2 px-5 py-3">
            <div className="font-bold text-primary_orange-0 md:text-xl">
              <a target="_blank" rel="noreferrer" href="https://github.com/govind-kumarr/simple_rag_dashboard">
                {projectName}
              </a>
            </div>
            <div className="mb-3 text-sm dark:text-white md:text-md md:mb-4">By {authorName} </div>
          </div>
          <h2 className="text-normal ml-3 font-medium line-clamp-3 ">{description}</h2>
          <div className="px-2  flex flex-wrap justify-center">
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">AWS</button>
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">React</button>
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">NodeJS</button>
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">Python</button>
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">MongoDB</button>
            <button className="bg-orange-50 dark:hover:bg-slate-700 dark:bg-stone-800 rounded-2xl w-20 my-1 mx-1 py-2 text-orange-600 drop-shadow-md font-semibold">Fastapi</button>
          </div>
          <br/><br/>
          <div className="w-full absolute bottom-0">
            <button className="bg-orange-50 dark:hover:bg-[#07273b] dark:bg-stone-800 rounded-md  py-1 text-orange-600 drop-shadow-md font-semibold w-full">
              Project Details
            </button>
          </div>
        </div>
      </div>
    </div>

    
   
  );
};

const Page: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true); // Assuming this will be updated based on data loading status
  const [totalCard, setTotalCards] = useState<number>(6);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentPosts, setCurrentPosts] = useState<Card[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  //   for search sort and filter functionality
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const perPage = 6;

  //  fetching data from api
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://sqilco-api.onrender.com/api/projects`
      );
      if (!response.ok) {
        throw new Error("Failed to load data");
      }
      const res = await response.json();
      //   console.log(res);
      setCards(res.data); //to take data from local switch to staticdata.data  else from res.data
      setTotalCards(res.data.length);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(error);
    }
  };

  //renender the page when any change in search, sort or during pagination
  useEffect(() => {
     
    //search and techStak tag based
    let filteredProjects = cards.filter((project) => {
      const matchesSearch = project.title.toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      let matchesTag = false;

      if (selectedTag && project.tech_stack) {
        matchesTag = project.tech_stack.some((tag:string) =>
          tag.toLowerCase().includes(selectedTag.toLowerCase())
        );
      }
      //    console.log("filtered tags",selectedTag);
      return matchesSearch && (selectedTag ? matchesTag : true);
    });
     

    let updatedFilteredProjects = [...filteredProjects];


    //for sorting based on the price or duration
    if (sortCriteria === "price") {
      updatedFilteredProjects.sort((a, b) => a.price - b.price);
    }
     else if (sortCriteria === "duration") {
      
      updatedFilteredProjects.sort((a, b) => {

        const durationA = parseInt(a.duration[0]);
        const durationB = parseInt(b.duration[0]);

        // console.log(durationA, " ", durationB);
        // Compare numerical values
        return durationA - durationB;
      });
    }
     
    // for the pagination on each click or change like search sort filter this will run 
    const lastPostIndex = currPage * perPage;
    const firstPostIndex = lastPostIndex - perPage;
    const updatedCurrentPosts: Card[] = updatedFilteredProjects.slice(
      firstPostIndex,
      lastPostIndex
    );

    setCurrentPosts(updatedCurrentPosts);
  }, [searchQuery, selectedTag, sortCriteria, currPage, cards, perPage]);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagSelect = (tag: string) => {
    // console.log("value set", tag, "true or false");
    setSelectedTag(tag);
    setShowFilterOptions(false);
  };

  const handleSortChange = (criteria: string) => {
    console.log("value set", criteria, "true or false");
    setSortCriteria(criteria);
    setShowSortOptions(false);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };
  const handleApplyFilter = () => {
    // Apply filter logic here
    // For example, you can update state or trigger a filter function
    console.log('Filter applied:', selectedTag);
    // Reset the selected tag and hide the filter options
    setSelectedTag('');
    setShowFilterOptions(false);
  };



  return (
    <div className=" w-full  relative z-[10]">
    <div className="w-full max-container">
     {/* search compo */}
     <div className="sm:h-auto h-[150px] w-full flex items-start  sm:justify-center  pt-3 sm:my-3  ">
            <div className="h-[78px]  w-full flex flex-col sm:flex-row sm:items-center  sm:justify-between  mx-2 ml-2 sm:ml-8 ">
              <h1 className="lg:text-4xl font-semibold items-start md:w-[40%] sm:w-[45%] block" style={{ fontSize: '28px', lineHeight: '2' }}>
                Projects{" "}
                <span className="text_color_variation mr-2">For You </span>
              </h1>
              <div className="sm:w-[55%] md:w-[57%] ">
                <div className="flex flex-row items-center  mt-2 sm:mt-0 w-full justify-end  ">
                  {/* <SearchBar/> */}
                  <div className="w-[250px]  md:h-[38px]  sm:h-[24px] sm:m-4  border-[2px] rounded-lg md:w-[424px] border-gray-500 items-center flex flex-row justify-between lg:p-6 p-2 ">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleInputChange}
                      className="border-none bg-slate-300 focus:outline-none w-[180px]  md:w-[250px]  md:block"
                    />
                    <button>
                      <Image
                        src="/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]  "
                      />
                    </button>
                  </div>
                  {/* filter functionality  */}
                  <div className="m-1 p-1  relative">
                    <div
                      onClick={toggleFilterOptions}
                      className="flex flex-row font-bold m-0 p-0 cursor-pointer"
                    >
                      <span className="hidden  text-lg  md:block">Filter </span>
                      <Image
                        src="/filter.svg"
                        alt="filter"
                        width={25}
                        height={25}
                        className="sm:ml-2  md:ml-0 lg:ml-2"
                      />
                    </div>
                    {showFilterOptions && (
                     
                     <div className="absolute bottom-[-160px] lg:bottom-[-170px] xs:right-[0px] right-[40px]  lg:right-[10px] xl:right-[-80px] bg-white text-xs border p-1 border-pink-10 md:right-[50px] z-[20] w-[200px] h-[150px]  flex flex-wrap overflow-y-auto hide-scrollbar rounded-lg " >
                          <div className="m-0 p-0 relative  flex flex-wrap overflow-y-auto hide-scrollbar">
                          { cards
                          .reduce(
                            (tags, project) => [...tags, ...project.tech_stack],
                            []
                          )
                          .filter(
                            (tag, index, self) => self.indexOf(tag) === index
                          )
                          .map((tag) => (
                            <div key={tag} onClick={()=>handleTagSelect(tag)} className={`p-2 flex flex-row gap-2 justify-center  rounded-lg ${selectedTag===tag ? 'bg-gray-400' : 'hover:bg-gray-10'}`}>
                              {tag}
                            </div>
                          ))
                        }

                         <div onClick={()=>handleTagSelect('')} className={`p-1 rounded-lg hover:bg-gray-500 absolute right-0 bottom-[0] text-sqilcoOrange font-semibold`}>Clear</div>
                      
                          </div>
                         
                  </div>
                    )}
                  </div>

                  {/* Sort Functionality */}
                  <div className="m-1 p-1  relative">
                    <div
                      onClick={toggleSortOptions}
                      className="flex flex-row font-bold m-0 p-0 cursor-pointer"
                    >
                      <span className="hidden md:block  text-lg ml-2">Sort</span>
                      <Image
                        src="/sort.svg"
                        alt="filter"
                        width={25}
                        height={25}
                        className="sm:ml-2  md:ml-0 lg:ml-2"
                      />
                    </div>

                    {showSortOptions && (
                        <><div className="absolute bottom-[-120px] lg:bottom-[-130px] right-[0px] xs:w-[80px] w-[75px] p-1 h-[110px]  text-xs bg-white border border-pink-10 flex flex-col flex-wrap overflow-y-auto hide-scrollbar rounded-lg  z-20">
                        <div className="relative m-0 p-0">
                        <div onClick={()=>handleSortChange('price')} className={`p-2   rounded-lg ${sortCriteria==='price' ? 'bg-gray-400' : 'hover:bg-gray-10'}`}>Price</div>
                         <div onClick={()=>handleSortChange('duration')} className={`p-2  rounded-lg ${sortCriteria==='duration' ? 'bg-gray-400' : 'hover:bg-gray-10'}`}>Duration</div>
                         <div onClick={()=>handleSortChange('')} className={`p-1 rounded-lg hover:bg-gray-500 absolute right-0 bottom-[-40px] text-sqilcoOrange font-semibold`}>Clear</div>
                      
                        </div>
                        
                       </div>
                       
                       </>
                    )}
                       
                  </div>



                </div>
              </div>
            </div>
            {/* pagination area  */}
          </div>



     {/* card compo */}
    <div className="flex flex-row justify-center flex-wrap items-center gap-x-10 gap-y-10 my-9 ">
      <ProjectCard1 projectName="DocTalk" authorName="Govind Kumar" description=' DocTalk is an innovative platform developed by Govind Kumar, aimed at revolutionizing the way medical professionals collaborate and communicate. With a sleek interface and robust features, DocTalk streamlines the exchange of medical knowledge and expertise, facilitating seamless communication among healthcare professionals worldwide.' />
      <ProjectCard1 projectName="Project 2" authorName="Author 2" description=" Project 2 is a versatile solution developed by Author 2, designed to address the needs of diverse industries and domains. From e-commerce platforms to enterprise resource planning systems, Project 2 offers customizable features and scalable architecture to meet the unique requirements of every client." />
      <ProjectCard1 projectName="Project 3" authorName="Author 3" description=" Project 3, created by Author 3, is a groundbreaking application that aims to revolutionize the education sector. By leveraging cutting-edge technologies and innovative design principles, Project 3 offers a comprehensive learning experience, empowering students and educators alike to succeed in today's digital age." />
      <ProjectCard1 projectName="DocTalk" authorName="Govind Kumar" description=' DocTalk is an innovative platform developed by Govind Kumar, aimed at revolutionizing the way medical professionals collaborate and communicate. With a sleek interface and robust features, DocTalk streamlines the exchange of medical knowledge and expertise, facilitating seamless communication among healthcare professionals worldwide.' />
      <ProjectCard1 projectName="Project 2" authorName="Author 2" description=" Project 2 is a versatile solution developed by Author 2, designed to address the needs of diverse industries and domains. From e-commerce platforms to enterprise resource planning systems, Project 2 offers customizable features and scalable architecture to meet the unique requirements of every client." />
      <ProjectCard1 projectName="Project 3" authorName="Author 3" description=" Project 3, created by Author 3, is a groundbreaking application that aims to revolutionize the education sector. By leveraging cutting-edge technologies and innovative design principles, Project 3 offers a comprehensive learning experience, empowering students and educators alike to succeed in today's digital age." />
    
    </div>
    </div>
    </div>
  );
};

export default Page;
