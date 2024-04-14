import PageTemplate from "@assets/PageTemplate";
import { useSessionContext } from "hooks/useSessionContext";

const DoctorView = () => {

     const context = useSessionContext()
     const user: any = context.user

     console.log(user.UserType);
     

     return (
          <PageTemplate>
               <div></div>
          </PageTemplate>
     )
}

export default DoctorView