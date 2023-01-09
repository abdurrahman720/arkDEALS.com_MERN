import React from "react";
import AdvertiseCard from "./AdvertiseCard";

const Advertisement = () => {
    const infos = ['a','b','c','d']
  return (
    <div>
      <div className="carousel w-full">
              {
                  infos.map((info, i) =><AdvertiseCard i={i}></AdvertiseCard>)
        }
          </div>
          

      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
};

export default Advertisement;
