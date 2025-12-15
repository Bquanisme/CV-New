import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import { IContact } from "@/typescript/home";
import { useQuery } from "@tanstack/react-query";
import { fetchContact } from "@/api/home/api.home";
import Button from "@mui/material/Button";
import RoomModalCheck from "./room.modalCheck";
import Comment from "./comment";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

type IProps = {
  data?: IContact;
  id: string;
};

const BoxContactRoom = (props: IProps) => {
  const { id } = props
  const { user } = useAppSelector((state) => state.auth);
  const [check, setCheck] = React.useState<boolean>(false);
  const handleOpenCheck = () => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để có thể đặt hàng!", { theme: "colored" });
      setCheck(false)
    }
    else {
      setCheck(true);
    }
  }
  const handleCloseCheck = () => setCheck(false);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để có thể đánh giá!", { theme: "colored" });
      setOpen(false)
    }
    else {
      setOpen(true);
    }
  }
  const handleClose = () => setOpen(false);

  const { data } = useQuery<IContact>({
    queryKey: ["contactTravel"],
    queryFn: fetchContact,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const contact = data || props.data;

  const contactItems = [
    {
      icon: <PhoneIcon sx={{ color: "#1C5C80" }} />,
      label: "Số điện thoại",
      value: contact?.phone_number || "Đang cập nhật...",
    },
    {
      icon: <EmailIcon sx={{ color: "#1C5C80" }} />,
      label: "Email",
      value: contact?.email || "Đang cập nhật...",
    },
    {
      icon: <FacebookIcon sx={{ color: "#1C5C80" }} />,
      label: "Facebook",
      value: contact?.facebook || "Chưa có liên kết",
    },
    {
      icon: <LanguageIcon sx={{ color: "#1C5C80" }} />,
      label: "Zalo",
      value: contact?.zalo || "Chưa có thông tin",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",

        // 👇 QUYẾT ĐỊNH ĐỘ TO THEO MÀN HÌNH
        maxWidth: {
          xs: "100%",   // mobile
          sm: "100%",
          md: 520,      // ⬅️ tablet TO HƠN
          lg: 420,      // desktop gọn lại
        },

        mx: "auto",
        mb: { xs: 6, md: 8, lg: 0 },
      }}
    >


      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          mt: { xs: 0, md: 0, lg: -23.8 },
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenCheck}
          sx={{
            width: "100%",
            height: 51,
            fontWeight: 700,
            fontSize: { xs: 16, md: 17, lg: 18 },
            fontFamily: "SVN-Gilroy",
          }}
        >
          Liên hệ đặt vé
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleOpen}
          sx={{
            width: "100%",
            height: 51,
            fontWeight: 700,
            fontSize: { xs: 16, md: 17, lg: 18 },
            fontFamily: "SVN-Gilroy",
          }}
        >
          Viết bình luận
        </Button>
      </Box>

      {/* Contact box */}
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          p: { xs: 2.5, md: 3, lg: 4 },
          bgcolor: "#FFFFFF",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 18, md: 19, lg: 20 },
            color: "#1C5C80",
            fontFamily: "SVN-Gilroy",
            textAlign: "center",
            mb: 1,
          }}
        >
          Thông tin liên hệ
        </Typography>

        {contactItems.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              borderBottom: "1px solid #e0e0e0",
              pb: 1.5,
            }}
          >
            {item.icon}
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 14, md: 15 },
                  color: "#1C5C80",
                  fontFamily: "Inter",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: 14, md: 15 },
                  color: "#3C3C3C",
                  fontFamily: "Inter",
                  wordBreak: "break-word",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <RoomModalCheck
        check={check}
        handleCloseCheck={handleCloseCheck}
        id={id}
      />
      <Comment open={open} handleClose={handleClose} id={id} />
    </Box>
  );
};

export default BoxContactRoom;
