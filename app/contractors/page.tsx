import { ContactorTemplate } from "../components/ContactorTemplate";
import { contractors } from "./[...slug]/page";

const Allcontractors = () => {
    return ( 
        <div className='flex justify-center items-center mt-28 mb-10'>
            <ContactorTemplate contractors={contractors} params={[]}/>
        </div>
     );
}
 
export default Allcontractors;