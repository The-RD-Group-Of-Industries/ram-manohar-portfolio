
import CVComp from "@/components/Dasboard/CV/CVComp";
import { getCV } from "@/core/actions/Dashboard/CV/getCV";
/**
 * Asynchronously retrieves the user's CV data and renders a `CVComp` component with the retrieved data.
 *
 * @returns A React element representing the CV component.
 */

async  function CV() {
 const CVData = await getCV();

    return (
        <div>
            <CVComp image={CVData?.pdfUrl || ""} imageKey={CVData?.pdfKey || ""} />
        </div>
    );
}
export default CV;