import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ListOfData = () => {
  const [Tdata, setTData] = useState();
  const [content,setContent] = useState('topic')

    const handleContentChange = (e)=>{
        setContent(e.target.value)
    }

  const fetchData = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/table`,{type:content});
      setTData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [content]);

  return (
    <div>
       <p className="text-gray-700 font-base font-serif text-[15px] text-center font-mediun text-lg capitalize">
        List Of {content}
      </p>
      <select
        className="flex mb-8 border border-gray-600 p-1 rounded-b-md  w-full px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={content}
          onChange={handleContentChange}
      >
        <option value="topic">Topic</option>
        <option value="sector">Sector</option>
        <option value="region">Region</option>
      </select>

      <div className="md:h-[600px] h-[470px] overflow-x-hidden w-[330px] sm:w-[600px] border-[15px] rounded-md">
        <table className="border-2 w-full">
          <thead>
            <tr>
              <th>SN.</th>
              <th className="capitalize">{content}</th>
              <th>Total Documents</th>
            </tr>
          </thead>
          <tbody>
            {Tdata &&
              Tdata.map((item, key) => (
                <tr
                  key={key}
                  className={`${
                    item._id === "" ? "hidden" : "border-2 odd:bg-gray-100"
                  }`}
                >
                  <td className="text-center p-2">{key + 1}</td>
                  <td className="text-center">{item._id}</td>
                  <td className="text-center">{item.count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfData;
