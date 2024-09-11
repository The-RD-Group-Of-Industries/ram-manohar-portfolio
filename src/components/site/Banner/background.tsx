import React,{useEffect} from 'react';
import AOS from "aos";

function Background() {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Set the animation duration (optional)
        });
      }, []);
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center  bg-gradient-to-b from-[#171321] via-[#23284e] to-[#1E1E20]"
        data-aos="fade"
        data-aos-duration="100"
        data-aos-easing="ease-in-out"
       >
            <div className="flex justify-center items-center border-dashed border-[1px] border-[#544F4F] rounded-full  w-[1121px] h-[1030px]">
                <div className="flex justify-center items-center border-dashed border-[1px] border-[#544F4F] rounded-full   w-[865px] h-[792px]" >
                     <div className="flex justify-center items-center border-dashed border-[1px] border-[#544F4F] rounded-full  w-[619px] h-[570px]">
                        <div className="flex justify-center items-center border-dashed border-[1px] border-[#544F4F] rounded-full  w-[371px] h-[373px] "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Background;
