import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TagList: React.FC = () => {
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tags');
        const allTags: string[] = response.data.data.flatMap((product: any) =>
          product.tags.split(',').map((tag: string) => tag.trim())
        );
        const uniqueTagsArray = Array.from(new Set(allTags)); // Extract unique tags
        setUniqueTags(uniqueTagsArray);
        // filtered products for the selected tag
        if (selectedTag) {
          const filtered = response.data.data.filter((product: any) =>
            product.tags.split(',').map((tag: string) => tag.trim()).includes(selectedTag)
          );
          setFilteredProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="container bg-white mx-auto">
      <div className='content-filters'>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-4">Filter by tag</h2>
      <div className="flex flex-wrap justify-center px-12 mx-12">
        {uniqueTags.map((tag, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${selectedTag === tag ? 'bg-blue-500' : ''}`}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {tag}
            </span>
          </button>
        ))}
      </div>
      </div>

      <div className='content-products-filtered'>
        {selectedTag && (
          <div>
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products with tag:<span className='text-blue-500'> {selectedTag}</span></h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                
                  </h3>
               
                </div>
                <p className="text-sm text-gray-700 font-medium">Qty of Variants: {product.variants.length}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default TagList;
