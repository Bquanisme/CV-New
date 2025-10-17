import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Footer from "../assets/footer.jpg";
import Thongbao from "../assets/Tbao.jpg";
import Dangky from "../assets/Dky.jpg";
import Divider from '@mui/material/Divider';
import AppStore from "../assets/AppStore.jpg";
import ChPlay from "../assets/ChPlay.jpg";

export default function AppFooter() {

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#001A40",
        color: "white",
        pt: 6,
        pb: 3,
      }}
    >

      <Box
        sx={{
          maxWidth: "1800px",     
          mx: "auto",             
          px: { xs: 3, md: 6 },  
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Logo + text */}
          <Box display="flex" alignItems="center" gap={1}>
            <Image src={Footer} alt="Footer Logo" width={78} height={78} />
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
                SỞ DU LỊCH TỈNH KHÁNH HÒA
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                CỔNG THÔNG TIN DU LỊCH TỈNH KHÁNH HÒA
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={20} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: '#045398',
                  border: "2px solid #045398",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>Tel</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                  310-437-2766
                </Typography>
              </Box>
            </Box>

            {/* Mail */}
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: '#045398',
                  border: "2px solid #045398",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailOutlineIcon />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>Mail</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                  info@dulichkhoa.vn
                </Typography>
              </Box>
            </Box>

            {/* Social */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <FacebookIcon fontSize="large" sx={{color: '#1877f2', borderRadius: '50%'}} />
              <GitHubIcon fontSize="large" />
              <YouTubeIcon fontSize="large" color='error'/>
              <InstagramIcon fontSize="large" sx={{color: '#e1306c'}}/>
            </Box>
          </Box>
        </Box>

        <Divider 
          sx={{ 
            borderColor: "rgba(255,255,255,0.2)", 
            my: 3,                                
          }} 
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",   
            alignItems: "flex-start",   
            gap: '20%'
          }}
        >
          {/* Cột trái */}
          <Box sx={{ flex: 1, minWidth: 300, maxWidth: 400 }}>
            <Typography mb={2} sx={{ fontSize: "14px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              vel consectetur ipsum, eu sodales odio. Etiam porttitor mauris sed
              odio interdum hendrerit. Nunc tempus, ipsum eget placerat mollis,
              ante arcu euismod mi, at laoreet leo magna id lacus.
            </Typography>

            <Typography
              sx={{
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "16px",
                mb: 2,
                cursor: "pointer",
              }}
            >
              Xem thêm
            </Typography>

            <Box display="flex" gap={2}>
              <Image src={Thongbao} alt="Đã thông báo" width={141} height={53} />
              <Image src={Dangky} alt="Đã đăng ký" width={141} height={53} />
            </Box>

            <Typography
              mt={2}
              sx={{ fontWeight: 400, fontSize: "14px", textAlign: "left" }}
            >
              © 2000-2021, All Rights Reserved
            </Typography>
          </Box>

          {/* Menu 4 cột */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "space-between",   // căn menu giữa
              alignItems: "flex-start",   // giữ thẳng hàng trên cùng
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <Box>
              <Typography fontWeight="bold" mb={2}>
                Điểm đến
              </Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Điểm du lịch</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Ẩm thực</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Lưu trú</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Mua sắm</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Giải trí</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Tour</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold" mb={2}>
                Dịch vụ
              </Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Phương tiện di lại</Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Công ty lữ hành</Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Ngân hàng</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold" mb={2}>
                Trợ giúp
              </Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Hỗ trợ du lịch</Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Giao thông</Typography>
              <Typography  sx={{ fontWeight: 400, fontSize: "14px", mb: 1 }}>Thời tiết</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold" mb={1}>
                Khám phá ứng dụng
              </Typography>
              <Box display="flex" gap={1}>
                <Image src={AppStore} alt="App Store" width={93} height={35} />
                <Image src={ChPlay} alt="Google Play" width={93} height={35} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
