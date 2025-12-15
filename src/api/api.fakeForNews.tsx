import highlightImg from "../assets/tour-duth2.jpg";
import card1 from "../assets/news4.jpg";
import card2 from "../assets/news1.jpg";
import card3 from "../assets/news2.jpg";
import post1 from "../assets/news3.jpg";
import post2 from "../assets/tour-dao7.jpg";
import post3 from '../assets/tour-dao3.jpg';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface SimpleNewsItem {
  id: number;
  title: string;
  date: string;
}

export interface CardNews {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
}

export interface FakeAPIForNewsType {
  highlight: NewsItem;
  mostViewed: SimpleNewsItem[];
  cards: CardNews[];
  posts: CardNews[];
}

const ApiFakeForNews: FakeAPIForNewsType = {
  highlight: {
    id: 1,
    date: "20/04/2023",
    title: "Tàu du lịch cao cấp SILVER MUSE đến Nha Trang",
    description:
      "Kỳ nghỉ lễ 30-4 và 1-5 năm nay, thời tiết ở Nha Trang khá nóng. Khách du lịch đến Nha Trang đã kéo nhau đi tour biển, đảo để 'giải nhiệt'...",
    image:
      highlightImg.src,
  },
  mostViewed: [
    {
      id: 2,
      title: "Chuẩn bị tổ chức Lễ hội Dù lượn Nha Trang lần thứ 2 năm 2023",
      date: "17/03/2023",
    },
    {
      id: 3,
      title: "Chuẩn bị tổ chức Lễ hội Dù lượn Nha Trang lần thứ 2 năm 2023",
      date: "17/03/2023",
    },
    {
      id: 4,
      title: "Chuẩn bị tổ chức Lễ hội Dù lượn Nha Trang lần thứ 2 năm 2023",
      date: "17/03/2023",
    },
  ],
  cards: [
    {
      id: 5,
      title: "“Thiên đường đôi ta” tại Wild Beach Resort & Spa",
      date: "17/01/2023",
      image:
        card1.src,
      description:
        "Khu nghỉ dưỡng Wild Beach Resort & Spa và đưa ra chương trình 'Thiên đường đôi ta' dành cho những đôi tình nhân nhân dịp Tết Canh Dần và Lễ Tình nhân...",
    },
    {
      id: 6,
      title: "Đến Wonderpark Nha Trang để thư giãn và tắm bờ",
      date: "17/01/2023",
      image:
        card2.src,
      description: "Với giá vé vào cửa 20.000 đồng/người lớn và 10.000 đồng/trẻ em, du khách đã có thể tham quan toàn cảnh khu du lịch, chơi trò chơi, tắm biển, thư giãn.",
    },
    {
      id: 7,
      title: 'Lặn biển khám phá "Hòn Mun" tại Nha Trang',
      date: "17/01/2023",
      image:
        card3.src,
      description: "Nằm trong vịnh Nha Trang, Hòn Mun là khu bảo tồn biển đầu tiên của nước ta. Sau gần 10 năm dày công bảo vệ và phát triển môi trường mang tính bền vững.",
    },
  ],
  posts: [
    {
      id: 8,
      title:
        "Hơn 11.000 lượt du khách tham quan Tháp Bà Ponagar trong 2 ngày đầu nghỉ lễ",
      date: "17/03/2023",
      image:
        post1.src,
      description: "Nằm gần trung tâm TP. Nha Trang, khu di tích Tháp Bà Ponagar luôn là điểm tham quan nằm trong các tour du lịch đến thành phố biển. Theo bà Nguyễn Thị Thúy Hằng - Trưởng ban quản lý khu.",
    },
    {
      id: 9,
      title: "10 chuyến du lịch Nha Trang 3 ngày 3 đêm trọn gói chi phí chỉ từ 1,8 triệu",
      date: "17/03/2023",
      image:
        post2.src,
      description: "Nằm gần trung tâm TP. Nha Trang, khu di tích Tháp Bà Ponagar luôn là điểm tham quan nằm trong các tour du lịch đến thành phố biển. Theo bà Nguyễn Thị Thúy Hằng - Trưởng ban quản lý khu.",
    },
    {
      id: 10,
      title: "Du lịch Cam Ranh – Chia sẻ kinh nghiệm chi tiết",
      date: "17/03/2023",
      image:
        post3.src,
      description: "Cam Ranh đang là điểm đến thu hút nhiều du khách...",
    },
  ],
};
export default ApiFakeForNews