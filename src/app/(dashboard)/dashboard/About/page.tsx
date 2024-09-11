
import AboutImageComp from "@/components/Dasboard/About/AboutImage";
import { getAbout } from "@/core/actions/Dashboard/About/getAbout";

/**
 * Asynchronously fetches the "About" data and renders an `AboutImageComp` component with the fetched image URL and key.
 * @returns A React component that displays the "About" image.
 */
async  function Banner() {
 const BannerData = await getAbout();

    return (
        <div>
            <AboutImageComp image={BannerData?.imageUrl || ""} imageKey={BannerData?.imageKey || ""} />
        </div>
    );
}
export default Banner;