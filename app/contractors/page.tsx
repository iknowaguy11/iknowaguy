import { ContactorTemplate } from "../components/ContactorTemplate";
import { NewContractorTemplate } from "../components/NewContractorTemplate";
import { contractors } from "./[...slug]/page";

const Allcontractors = () => {
    return ( 
        <div className='flex justify-center items-center mt-28 mb-10'>
            <NewContractorTemplate contractors={contractors} params={[]}/>
        </div>
     );
}
 
export default Allcontractors;