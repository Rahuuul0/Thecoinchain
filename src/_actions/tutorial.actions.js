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
import { useAtomValue, useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const router = useRouter();
  const [blogImg, setBlogimg] = useAtom(blogListAtom);
  const [blogNew, setBlognew] = useAtom(blogimgAtom);
  const setTutorialData = useSetAtom(tutorialAtom);
  const setBlogData = useSetAtom(blogAtom);
  const loader = useSetAtom(loaderAtom);
  const tutorialCategory = useSetAtom(tutorialCategoryAtom);
  const marketBlogLists = useSetAtom(marketBlogListAtom);
  const setBlogListSingle = useSetAtom(blogListSingleAtom);
  const [blogVideo, setBlogvideo] = useAtom(blogVideoAtom);

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
      }).catch((err) => {router.push("/page-not-found"); console.warn(err) })
  }
  const getSingle = (title) => {
    return fetchWrapper.get(`${Apis.Blog_List}?slug=${title}`)
      .then(res => {
        if (res.statusCode === 200) {
          setBlogimg(res.data)
          setBlognew(true)
          setBlogvideo(false)
        }
      }).catch((err) => { router.push("/page-not-found"); console.warn(err) })
  }
  const getSingleVideo = (title) => {
    return fetchWrapper.get(`${Apis.Tutorial_Video}?slug=${title}`)
      .then(res => {
        if (res.statusCode === 200) {
          setBlogimg(res.data)
          setBlognew(true)
          setBlogvideo(true)
        }
      }).catch((err) => { router.push("/page-not-found"); console.warn(err) })
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
