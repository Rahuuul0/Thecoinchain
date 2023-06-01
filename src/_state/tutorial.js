import { atom } from "recoil";

const tutorialAtom = atom({
  key: "tutorial",
  default: [
    {
      id: 1,
      title: "Triple-buffered fault-tolerant framework",
      description: "0x6e5de53e2cd2fb88c0a83883af4b08229afd2a5c",
      video_link: "https://www.youtube.com/watch?v=tA9dzPJ3PJQ&pp=ygUGY3J5b3Rw",
      image_link: "http://dummyimage.com/192x100.png/ff4444/ffffff",
    },
    {
      id: 2,
      title: "Self-enabling dynamic analyzer",
      description: "0xea47a33ba502eee4be34bb58f7f93c0d703aa75a",
      video_link: "https://www.youtube.com/watch?v=ckDZekAVo1g&pp=ygUGY3J5b3Rw",
      image_link: "http://dummyimage.com/118x100.png/5fa2dd/ffffff",
    },
    {
      id: 3,
      title: "Virtual leading edge projection",
      description: "0x77a8c05fd50f9f4573acb17976e891b8b3fc2586",
      video_link: "https://www.youtube.com/watch?v=L2i0zfF4wP4&pp=ygUGY3J5b3Rw",
      image_link: "http://dummyimage.com/100x100.png/ff4444/ffffff",
    },
    {
      id: 4,
      title: "Right-sized client-driven complexity",
      description: "0x3710c35e84321018afb07fae4bc95bc3bdcd2526",
      video_link: "https://www.youtube.com/watch?v=fCoVvdzL5SQ&pp=ygUGY3J5b3Rw",
      image_link: "http://dummyimage.com/111x100.png/dddddd/000000",
    },
    {
      id: 5,
      title: "Horizontal tangible instruction set",
      description: "0x3748dce61697634c2f8bd4eaf872c7de26bf64e5",
      video_link: "https://www.youtube.com/watch?v=Ys9FPvbSGAY&pp=ygUGY3J5b3Rw",
      image_link: "http://dummyimage.com/249x100.png/cc0000/ffffff",
    },
  ],
});

const blogAtom = atom({
  key: "blogs",
  default: [],
});

export { tutorialAtom, blogAtom };
