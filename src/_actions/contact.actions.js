import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { contact_AddAtom, contactListAtom, contactBlogListAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useSetAtom, useAtom } from 'jotai';
import { useRouter } from "next/navigation";


const useContactActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setContactError = useSetAtom(contact_AddAtom);
  const [contactLists, setContactList] = useAtom(contactListAtom);
  const [contactBlogLists, setContactBlogList] = useAtom(contactBlogListAtom);
  const setBlogimg = useSetAtom(blogListAtom);
  const setBlognew = useSetAtom(blogimgAtom);
  const setBlogvideo = useSetAtom(blogVideoAtom);
  const router = useRouter();

  const add = (data) => {
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

            } 
        }).catch((err)=>{console.warn(err)})
}

const contactBlogList =  () => {
  return fetchWrapper.get(Apis.Contact_Blog_List)
      .then(res => {
          if (res.statusCode === 200) {
            setContactBlogList([...res.data])

          } 
      }).catch((err)=>{console.warn(err)})
}

const getSingleContact = (title) => {
  return fetchWrapper.get(`${Apis.Contact_Blog_List}?slug=${title}`)
      .then(res => {
          if (res.statusCode === 200) {
              setBlogimg(res.data)
              setBlognew(true)
              setBlogvideo(false)
          }
      }).catch((err) => { router.push("/page-not-found"); console.warn(err) })
}

  return {
    add,
    contactList,
    contactBlogList,
    getSingleContact
  }

}
export { useContactActions };
