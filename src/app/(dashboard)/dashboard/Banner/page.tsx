
/**
 * Renders the Banner component, which displays a banner image fetched from the `getBanner` action.
 *
 * @returns {JSX.Element} The rendered Banner component.
 */
import BannerImageComp from "@/components/Dasboard/Banner/BannerImage";
import { getBanner } from "@/core/actions/Dashboard/Banner/getBanner";

async  function Banner() {
 const BannerData = await getBanner();

    return (
        <div>
            <BannerImageComp image={BannerData?.imageUrl || ""} imageKey={BannerData?.imageKey || ""} />
        </div>
    );
}
export default Banner;