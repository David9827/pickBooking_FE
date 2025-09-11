import React, { useMemo, useRef } from "react";
import {
    Box,
    Card,
    Typography,
    IconButton,
    Avatar,
    alpha,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";

export type StoryItem = {
    id: string | number;
    title?: string;          // tên sân / người chơi
    imageUrl?: string;       // ảnh bìa dọc (9:16)
    ownerName?: string;      // tên hiển thị
    avatarUrl?: string;      // avatar owner
    online?: boolean;        // chấm online (tuỳ chọn)
};

type StoriesBarProps = {
    items: StoryItem[];
    onClickItem?: (item: StoryItem) => void;
    onCreate?: () => void;              // click card “Tạo sân” (tuỳ chọn)
    showCreateCard?: boolean;           // default: true
    itemWidth?: number;                 // default: 110
    itemHeight?: number;                // default: 180
    showArrows?: boolean;               // default: true
    title?: string;                     // tuỳ chọn tiêu đề hàng
};

const GRADIENT_WIDTH = 56;

const StoriesBar: React.FC<StoriesBarProps> = ({
                                                   items,
                                                   onClickItem,
                                                   onCreate,
                                                   showCreateCard = true,
                                                   itemWidth = 110,
                                                   itemHeight = 180,
                                                   showArrows = true,
                                                   title,
                                               }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const step = useMemo(() => Math.round(itemWidth * 3), [itemWidth]);

    const scrollBy = (dx: number) => {
        scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
    };

    return (
        <Box sx={{ position: "relative", width: "100%", py: 1 }}>
            {title ? (
                <Typography variant="subtitle1" sx={{ px: 1.5, mb: 1, fontWeight: 600 }}>
                    {title}
                </Typography>
            ) : null}

            {/* vùng scroll */}
            <Box
                ref={scrollerRef}
                sx={{
                    display: "flex",
                    gap: 1.25,
                    px: 1.5,
                    overflowX: "auto",
                    scrollSnapType: "x proximity",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                    // Ẩn scrollbar cross-browser
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
                // chuyển wheel dọc thành cuộn ngang (tiện trackpad/chuột)
                onWheel={(e) => {
                    if (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                        e.preventDefault();
                        scrollerRef.current?.scrollBy({
                            left: e.deltaY,
                            behavior: "smooth",
                        });
                    }
                }}
            >
                {/* Card tạo sân */}
                {showCreateCard && (
                    <Card
                        onClick={onCreate}
                        sx={{
                            minWidth: itemWidth,
                            width: itemWidth,
                            height: itemHeight,
                            scrollSnapAlign: "start",
                            borderRadius: 2,
                            border: "2px dashed",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: onCreate ? "pointer" : "default",
                            position: "relative",
                        }}
                        elevation={0}
                    >
                        <Box
                            sx={{
                                textAlign: "center",
                                px: 1,
                                userSelect: "none",
                            }}
                        >
                            <AddIcon fontSize="large" />
                            <Typography fontWeight={700} sx={{ mt: 0.5 }}>
                                Tạo sân
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Đăng suất chơi
                            </Typography>
                        </Box>
                    </Card>
                )}

                {/* Các thẻ story (sân/đang chơi) */}
                {items.map((it) => (
                    <Card
                        key={it.id}
                        onClick={() => onClickItem?.(it)}
                        sx={{
                            minWidth: itemWidth,
                            width: itemWidth,
                            height: itemHeight,
                            borderRadius: 2,
                            overflow: "hidden",
                            cursor: onClickItem ? "pointer" : "default",
                            position: "relative",
                            scrollSnapAlign: "start",
                            bgcolor: "background.default",
                        }}
                    >
                        {/* ảnh nền 9:16 */}
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: it.imageUrl ? `url(${it.imageUrl})` : undefined,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: it.imageUrl ? "none" : "none",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "stretch",
                            }}
                        >
                            {/* gradient dưới + title */}
                            <Box
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    pt: 6,
                                    background: (theme) =>
                                        `linear-gradient(to top, ${alpha(
                                            theme.palette.common.black,
                                            0.55
                                        )}, transparent 60%)`,
                                    color: "#fff",
                                    position: "relative",
                                }}
                            >
                                {/* avatar + online dot */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        left: 8,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <Box sx={{ position: "relative" }}>
                                        <Avatar
                                            src={it.avatarUrl || ""}
                                            sx={{ width: 28, height: 28, border: "2px solid #fff" }}
                                        >
                                            {!it.avatarUrl && (it.ownerName || it.title || "?")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </Avatar>
                                        {it.online && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    right: 0,
                                                    bottom: 0,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "success.main",
                                                    borderRadius: "50%",
                                                    border: "2px solid #fff",
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {it.title || it.ownerName || "—"}
                                </Typography>
                                {it.ownerName && (
                                    <Typography
                                        variant="caption"
                                        sx={{ opacity: 0.9, display: "block" }}
                                    >
                                        {it.ownerName}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>

            {/* Nút mũi tên + viền mờ 2 bên (desktop) */}
            {showArrows && (
                <>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: GRADIENT_WIDTH,
                            background: (theme) =>
                                `linear-gradient(90deg, ${theme.palette.background.default} 50%, transparent)`,
                            pointerEvents: "none",
                            display: { xs: "none", md: "block" },
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width: GRADIENT_WIDTH,
                            background: (theme) =>
                                `linear-gradient(270deg, ${theme.palette.background.default} 50%, transparent)`,
                            pointerEvents: "none",
                            display: { xs: "none", md: "block" },
                        }}
                    />

                    <IconButton
                        aria-label="scroll left"
                        onClick={() => scrollBy(-step)}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 6,
                            transform: "translateY(-50%)",
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            display: { xs: "none", md: "flex" },
                            "&:hover": { bgcolor: "background.paper" },
                        }}
                        size="small"
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <IconButton
                        aria-label="scroll right"
                        onClick={() => scrollBy(step)}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 6,
                            transform: "translateY(-50%)",
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            display: { xs: "none", md: "flex" },
                            "&:hover": { bgcolor: "background.paper" },
                        }}
                        size="small"
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default StoriesBar;
