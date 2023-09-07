import { useFetchWrapper } from "../_helpers";
import { 
  tutorialAtom, 
  blogAtom, loaderAtom, 
  tutorialCategoryAtom, 
  marketBlogListAtom, 
  blogListSingleAtom, 
  blogListAtom, 
  blogimgAtom, blogVideoAtom } from "../_state";
import { Apis } from "../_common/app.constants";
import { useRecoilValue, useRecoilState } from "recoil";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate()
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom);
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom);
  const setTutorialData = useSetRecoilState(tutorialAtom);
  const setBlogData = useSetRecoilState(blogAtom);
  const loader = useSetRecoilState(loaderAtom);
  const tutorialCategory = useSetRecoilState(tutorialCategoryAtom);
  const marketBlogLists = useSetRecoilState(marketBlogListAtom);
  const setBlogListSingle = useSetRecoilState(blogListSingleAtom);
  const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom);

  const tutorialData = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Tutorial_Video)
      .then((res) => {
        if (res.statusCode === 200) {
          setTutorialData(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const blogData = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Blog_List)
      .then((res) => {
        if (res.statusCode === 200) {
          setBlogData(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const categoryList = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Category_List)
      .then((res) => {
        if (res.statusCode === 200) {
          tutorialCategory(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const marketBlogList = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Market_Blog_List)
      .then((res) => {
        if (res.statusCode === 200) {
          marketBlogLists(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };
  
  const getSingleMarket = (title) => {
    return fetchWrapper.get(`${Apis.Market_Blog_List}?slug=${title}`)
      .then(res => {
        if (res.statusCode === 200) {
          setBlogimg(res.data)
          setBlognew(true)
          setBlogvideo(true)
        }
      }).catch((err) => {navigate("/page-not-found"); console.warn(err) })
  }
  const getSingle = (title) => {
    console.log(title,'title')
    return fetchWrapper.get(`${Apis.Blog_List}?slug=${title}`)
      .then(res => {
        if (res.statusCode === 200) {
          setBlogimg(res.data)
          setBlognew(true)
          setBlogvideo(false)
        }
      }).catch((err) => { navigate("/page-not-found"); console.warn(err) })
  }
  const getSingleVideo = (title) => {
    return fetchWrapper.get(`${Apis.Tutorial_Video}?slug=${title}`)
      .then(res => {
        if (res.statusCode === 200) {
          setBlogimg(res.data)
          setBlognew(true)
          setBlogvideo(true)
        }
      }).catch((err) => { navigate("/page-not-found"); console.warn(err) })
  }

  return {
    tutorialData,
    blogData,
    categoryList,
    marketBlogList,
    getSingle,
    getSingleVideo,
    getSingleMarket
  };
};
export { useTutorialActions };
