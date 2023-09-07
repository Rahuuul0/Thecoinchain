import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { contact_AddAtom, contactListAtom, contactBlogListAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';


const useContactActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setContactError = useSetRecoilState(contact_AddAtom);
  const [contactLists, setContactList] = useRecoilState(contactListAtom);
  const [contactBlogLists, setContactBlogList] = useRecoilState(contactBlogListAtom);
  const setBlogimg = useSetRecoilState(blogListAtom);
  const setBlognew = useSetRecoilState(blogimgAtom);
  const setBlogvideo = useSetRecoilState(blogVideoAtom);
  const navigate = useNavigate();

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
      }).catch((err) => { navigate("/PageNotFound"); console.warn(err) })
}

  return {
    add,
    contactList,
    contactBlogList,
    getSingleContact
  }

}
export { useContactActions };
