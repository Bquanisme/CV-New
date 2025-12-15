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
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 3, md: 6 },
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
            gap: { xs: 4, md: 3 },
          }}
        >

          {/* Logo + text */}
          <Box display="flex" alignItems="center" gap={2}>
            <Image src={Footer} alt="Footer Logo" width={70} height={70}
              style={{ borderRadius: 8 }}
            />
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                SỞ DU LỊCH TỈNH KHÁNH HÒA
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                CỔNG THÔNG TIN DU LỊCH TỈNH KHÁNH HÒA
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 3, md: 10 },
              alignItems: "center"
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: '#045398',
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
              <FacebookIcon fontSize="large" sx={{ color: '#1877f2' }} />
              <GitHubIcon fontSize="large" />
              <YouTubeIcon fontSize="large" color='error' />
              <InstagramIcon fontSize="large" sx={{ color: '#e1306c' }} />
            </Box>
          </Box>

        </Box>

        {/* Divider */}
        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.2)",
            my: 3,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: { xs: 5, lg: "15%" },
          }}
        >

          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Typography mb={2} sx={{ fontSize: "14px", opacity: 0.9 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              vel consectetur ipsum, eu sodales odio.
            </Typography>

            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                mb: 2,
                cursor: "pointer",
                "&:hover": { color: "#90caf9" }
              }}
            >
              Xem thêm
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Image src={Thongbao} alt="Đã thông báo" width={135} height={52} />
              <Image src={Dangky} alt="Đã đăng ký" width={135} height={52} />
            </Box>

            <Typography
              mt={2}
              sx={{
                fontSize: "13px",
                opacity: 0.8
              }}
            >
              © 2000-2021, All Rights Reserved
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 2,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr 1fr",
                md: "repeat(4, 1fr)"
              },
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Column 1 */}
            <Box>
              <Typography fontWeight="bold" mb={2}>Điểm đến</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Điểm du lịch</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Ẩm thực</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Lưu trú</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Mua sắm</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Giải trí</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Tour</Typography>
            </Box>

            {/* Column 2 */}
            <Box>
              <Typography fontWeight="bold" mb={2}>Dịch vụ</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Phương tiện di lại</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Công ty lữ hành</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Ngân hàng</Typography>
            </Box>

            {/* Column 3 */}
            <Box>
              <Typography fontWeight="bold" mb={2}>Trợ giúp</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Hỗ trợ du lịch</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Giao thông</Typography>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Thời tiết</Typography>
            </Box>

            {/* Column 4 */}
            <Box>
              <Typography fontWeight="bold" mb={1}>Khám phá ứng dụng</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Image src={AppStore} alt="App Store" width={90} height={34} />
                <Image src={ChPlay} alt="Google Play" width={90} height={34} />
              </Box>
            </Box>

          </Box>
        </Box>

      </Box>
    </Box>
  );
}
