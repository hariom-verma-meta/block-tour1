"use client";
import {getCurrentUser} from "@/app/redux/feature/contributor/api";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import UserHearder from "@/components/UserHearder";
import instance from "@/utils/axios";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {BsThreeDots} from "react-icons/bs";
import {IoSearchOutline} from "react-icons/io5";
import {ClipLoader} from "react-spinners";

type PostData = {
  postType: any;
  _id: string;
  previewImageUrl: string;
  title: string;
  category: string[];
  publishedDate: string;
  description: string;
  status: string;
};

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<PostData[]>( [] );
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>( [] );
  const [searchQuery, setSearchQuery] = useState<string>( "" );
  const [currentPage, setCurrentPage] = useState<number>( 1 );
  const [postsPerPage, setPostsPerPage] = useState<number>( 10 );
  const [isLoading, setIsLoading] = useState<boolean>( true ); // Loading state

  const user = useAppSelector( ( state: any ) => state.contributor.currentUser ) || {};

  useEffect( () => {
    fetchAllPosts();
  }, [user] );

  useEffect( () => {
    if ( !Cookies.get( "UserToken" ) || !user ) {
      router.push( "/auth/user/login" );
    }
    getCurrentUser( dispatch );
  }, [] );
  console.log("User:-",user)

  useEffect( () => {
    handleSearch();
  }, [searchQuery, posts] );

  const fetchAllPosts = async () => {
    try {
      setIsLoading( true );
      const response = await instance.post( "/post/contributor/postForCreator", {
        ids: user?.posts,
      } );
      setPosts( response.data.posts );
      setFilteredPosts( response.data.posts );
    } catch ( error: any ) {
      console.error(
        "Error fetching all posts:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading( false );
    }
  };

  // Search Functionality
  const handleSearch = () => {
    const filtered = posts.filter( ( post ) =>
      post.title.toLowerCase().includes( searchQuery.toLowerCase() )
    );
    setFilteredPosts( filtered );
  };

  // Get current posts for pagination
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = filteredPosts.slice( indexOfFirstItem, indexOfLastItem );

  // Change page
  const paginate = ( pageNumber: number ) => {
    setCurrentPage( pageNumber );
  };

  return (
    <div className="lg:ml-64 sm:m-4 sm:my-4 my-2  bg-[#0A090F] sm:rounded-2xl shadow-md w-full border border-[#28272D]">
      {/* <UserHearder /> */}
      {!user.contributor ? (
        <div className="flex h-[38rem] justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/asset/Group 13267.svg"
              alt="Not a contributor"
              className="h-30 w-30"
            />
            <h1 className="font-semibold sm:text-2xl text-xl mt-6">
              You are not a contributor.
            </h1>
            <p className="text-center sm:text-sm text-xs text-[#999999] mt-0.5 ">
              Once admin approves you then you can make a post,
              <br />
              it takes up to 48 hrs.
            </p>
          </div>
        </div>
      ) : isLoading ? ( // Show loading state
        <div className="flex h-[38rem] justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <tr>
              <td colSpan={10} className="text-center py-4">
                <ClipLoader color="#DF841C" size={50} />
              </td>
            </tr>
          </div>
        </div>
      ) : (
        <div>
          {filteredPosts.length ? (
            <div>
              {/* Header and Add New Post */}
              <div className="flex justify-between items-center mb-4 sm:px-8 px-4 py-4 border-b border-[#28272D]">
                <div className="flex gap-2 items-center">
                  <img
                    src="/asset/Group 12856.svg"
                    alt="My Blog"
                    className="h-8 w-8 sm:block hidden"
                  />
                  <h1 className="text-white text-2xl sm:text-xl font-semibold">My Blog</h1>
                </div>
                <button className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded">
                  + Add New Post
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex justify-between pt-2 items-center mb-4 sm:px-8 px-4 flex-wrap sm:space-y-0 space-y-1">
                <div className="relative border border-neutral-600 rounded flex justify-between">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={( e ) => setSearchQuery( e.target.value )}
                    className="bg-[#0A090F] text-[#7B7A7F] sm:w-80 w-40 px-4 py-2 rounded border-none focus:outline-none"
                  />
                  <button className="bg-[#DF841C] text-white px-3 py-1.5 rounded">
                    <IoSearchOutline className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex gap-2 items-center">
                  <p>View</p>
                  <select
                    className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-2 rounded"
                    value={postsPerPage}
                    onChange={( e ) => setPostsPerPage( Number( e.target.value ) )}
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
              </div>

              {/* Post Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4 sm:px-8 px-4 py-4">
                {currentPosts.map( ( post ) => (
                  <div
                    key={post._id}
                    className="cursor-pointer rounded-xl border border-neutral-700 overflow-hidden bg-[#000000]"
                    onClick={() => router.push( `/dashboard/${post._id}` )}
                  >
                    {post?.postType?.toLowerCase() === "video post" ?
                      <video
                        src={post.previewImageUrl}
                        controls
                        className="w-full h-44 object-cover rounded"
                      /> :
                      <img
                        loading="lazy"
                        src={post.previewImageUrl}
                        alt={post.title}
                        className="w-full h-44 object-cover rounded"
                      />
                    }
                    <div className="flex gap-2 items-center p-4">
                      <button className="bg-[#DF841C] line-clamp-1 py-0.5 px-3 text-sm text-[#230E00] font-semibold">
                        {post.category.join( ", " )}
                      </button>
                      <p className="text-sm text-neutral-400">
                        {new Date( post.publishedDate ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="px-4">
                      <h1 className="text-lg font-semibold text-white line-clamp-2">
                        {post.title}
                      </h1>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2 items-center mb-4">
                          <p className="text-[#767676]">Status:</p>
                          <span
                            className={`${post.status.toLowerCase() === "published"
                              ? "text-green-500"
                              : post.status.toLowerCase() === "draft"
                                ? "text-yellow-500"
                                : "text-red-500"
                              }`}
                          >
                            {post.status.toLowerCase() === "published"
                              ? "Published"
                              : post.status.toLowerCase() === "draft"
                                ? "Draft"
                                : "Archived"}
                          </span>
                        </div>
                        <BsThreeDots className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                ) )}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4 sm:px-8 px-4 mb-4">
                <div className="text-[#7B7A7F]">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min( indexOfLastItem, filteredPosts.length )} of{" "}
                  {filteredPosts.length} entries
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate( currentPage - 1 )}
                    disabled={currentPage === 1}
                  >
                    <img
                      src="/asset/Group 12367.svg"
                      alt="Previous"

                    />
                  </button>
                  {[
                    ...Array(
                      Math.ceil( filteredPosts.length / postsPerPage )
                    ).keys(),
                  ].map( ( num ) => (
                    <button
                      key={num + 1}
                      onClick={() => paginate( num + 1 )}
                      className={`px-3 py-1 rounded-md text-white ${currentPage === num + 1
                        ? "bg-[#DF841C]"
                        : "bg-[#0A090F]"
                        }`}
                    >
                      {num + 1}
                    </button>
                  ) )}
                  <button onClick={() => paginate( currentPage + 1 )} disabled={currentPage === Math.ceil( filteredPosts.length / postsPerPage )} >
                    <img src="/asset/Group 12367.svg" alt="Next" className="transform rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[38rem] justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <img src="/asset/blog.svg" alt="" />
                <h1 className=" font-semibold text-2xl mt-6">
                  You are now a contributor
                </h1>
                <p className="text-center mt-0.5 text-sm text-[#999999]">
                  Admin approved you can now create a blog.
                </p>
                <button
                  onClick={() => router.push( "/add-post" )}
                  className="bg-[#DF841C] py-1 px-4 rounded-lg text-white mt-4"
                >
                  Create a post
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
