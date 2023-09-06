import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { contact_AddAtom, contactListAtom, contactBlogListAtom } from '../_state';
import { useSetRecoilState, useRecoilState } from 'recoil';


const useContactActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setContactError = useSetRecoilState(contact_AddAtom);
  const [contactLists, setContactList] = useRecoilState(contactListAtom);
  const [contactBlogLists, setContactBlogList] = useRecoilState(contactBlogListAtom);

  const add = (data) => {
  console.log(data, "data")
    return fetchWrapper.post(Apis.Contact, data)
      .then(res => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Success);
          setContactError(true)
        } else {
          alertActions.error(res.msg);
          
        }
      }).catch((err)=>{ 
          setContactError(true);
          console.warn(err)
        })
  };

  const contactList =  () => {
    return fetchWrapper.get(Apis.Contact_Faq_List)
        .then(res => {
            if (res.statusCode === 200) {
              setContactList([...res.data])

            } else {
                // alertActions.error(res.msg);
            }
        }).catch((err)=>{console.warn(err)})
}
const contactBlogList =  () => {
  return fetchWrapper.get(Apis.Contact_Blog_List)
      .then(res => {
          if (res.statusCode === 200) {
            setContactBlogList([...res.data])

          } else {
              // alertActions.error(res.msg);
          }
      }).catch((err)=>{console.warn(err)})
}
  return {
    add,
    contactList,
    contactBlogList,
  }

}
export { useContactActions };
