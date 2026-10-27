import { useAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  faqAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const faqActions = () => {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [faq, setFaq] = useAtom(faqAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.FAQ )
            .then(res => {
                if (res.statusCode === 200) {
                    setFaq([...res.data])
                    // alertActions.success("Logged In Successfully");
                    // router.push("/")
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }
       
    return{
        get
    }
}

export{ faqActions }