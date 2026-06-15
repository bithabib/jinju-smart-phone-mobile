import { createContext, useContext, useEffect, useState } from "react";

// Supported languages (order shown in the picker). Default is Korean.
export const LANGS = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
];

// Translation dictionary. Each key has { en, ko, th, vi }.
// Missing languages fall back to English automatically.
const STRINGS = {
  // Nav
  nav_home: { en: "Home", ko: "홈", th: "หน้าแรก", vi: "Trang chủ" },
  nav_offers: { en: "Offers", ko: "특가", th: "โปรโมชั่น", vi: "Ưu đãi" },
  nav_links: { en: "Links", ko: "링크", th: "ลิงก์", vi: "Liên kết" },
  nav_sell: { en: "Sell Sheet", ko: "판매장부", th: "บันทึกการขาย", vi: "Sổ bán hàng" },
  nav_admin: { en: "Admin", ko: "관리자", th: "ผู้ดูแล", vi: "Quản trị" },
  nav_card: { en: "Card", ko: "명함", th: "นามบัตร", vi: "Danh thiếp" },
  nav_gallery: { en: "Gallery", ko: "갤러리", th: "แกลเลอรี", vi: "Thư viện ảnh" },

  // Gallery
  gallery_title: { en: "Our Shop", ko: "매장 둘러보기", th: "ร้านของเรา", vi: "Cửa hàng của chúng tôi" },
  gallery_subtitle: { en: "Take a look inside Jinju Smart Phone Mobile.", ko: "진주중고폰 매장을 둘러보세요.", th: "ชมภายในร้าน Jinju Smart Phone Mobile", vi: "Tham quan bên trong Jinju Smart Phone Mobile." },
  gallery_see_all: { en: "See all photos", ko: "사진 모두 보기", th: "ดูรูปทั้งหมด", vi: "Xem tất cả ảnh" },
  gallery_count: { en: "photos", ko: "장의 사진", th: "รูป", vi: "ảnh" },

  // Business card
  card_title: { en: "Business Card", ko: "명함", th: "นามบัตร", vi: "Danh thiếp" },
  card_subtitle: { en: "Print this card. The QR opens all your social links.", ko: "이 명함을 인쇄하세요. QR을 스캔하면 모든 소셜 링크가 열립니다.", th: "พิมพ์นามบัตรนี้ สแกน QR เพื่อเปิดลิงก์โซเชียลทั้งหมด", vi: "In danh thiếp này. Mã QR mở tất cả liên kết mạng xã hội." },
  card_scan: { en: "Scan for all our links", ko: "스캔하면 모든 링크로 연결", th: "สแกนเพื่อดูลิงก์ทั้งหมด", vi: "Quét để xem tất cả liên kết" },
  card_front: { en: "Front", ko: "앞면", th: "ด้านหน้า", vi: "Mặt trước" },
  card_back: { en: "Back", ko: "뒷면", th: "ด้านหลัง", vi: "Mặt sau" },
  card_print: { en: "Print / Save as PDF", ko: "인쇄 / PDF 저장", th: "พิมพ์ / บันทึกเป็น PDF", vi: "In / Lưu PDF" },
  card_download_qr: { en: "Download QR", ko: "QR 다운로드", th: "ดาวน์โหลด QR", vi: "Tải QR" },
  card_hint: { en: "Tip: in the print dialog choose paper size and set margins to 'None' for an exact 90 × 54 mm card. Each side prints on its own page.", ko: "팁: 인쇄 창에서 여백을 '없음'으로 설정하면 정확한 90 × 54 mm 명함이 됩니다. 앞면과 뒷면은 각각 다른 페이지에 인쇄됩니다.", th: "เคล็ดลับ: ในกล่องพิมพ์ ตั้งระยะขอบเป็น 'ไม่มี' เพื่อให้ได้นามบัตรขนาด 90 × 54 มม. พอดี แต่ละด้านจะพิมพ์แยกหน้า", vi: "Mẹo: trong hộp thoại in, đặt lề thành 'Không' để có danh thiếp chính xác 90 × 54 mm. Mỗi mặt in trên một trang riêng." },

  // Hero
  hero_tagline: { en: "Used & New Smartphones · Samsung · Apple · LG U+", ko: "중고 · 신규 스마트폰 · 삼성 · 애플 · LG U+", th: "สมาร์ทโฟนมือสองและใหม่ · Samsung · Apple · LG U+", vi: "Điện thoại cũ & mới · Samsung · Apple · LG U+" },
  hero_cta_offers: { en: "See Today's Offers", ko: "오늘의 특가 보기", th: "ดูโปรโมชั่นวันนี้", vi: "Xem ưu đãi hôm nay" },
  hero_cta_call: { en: "Call Now", ko: "전화하기", th: "โทรเลย", vi: "Gọi ngay" },
  hero_cta_map: { en: "Find Us", ko: "오시는 길", th: "ค้นหาเรา", vi: "Tìm chúng tôi" },

  // Offers section
  offers_title: { en: "Featured Offers", ko: "추천 특가 상품", th: "สินค้าโปรโมชั่น", vi: "Ưu đãi nổi bật" },
  offers_subtitle: { en: "Hand-picked deals — updated by the shop.", ko: "매장에서 직접 고른 특가 상품입니다.", th: "ดีลคัดสรร — อัปเดตโดยร้าน", vi: "Ưu đãi chọn lọc — cập nhật bởi cửa hàng." },
  offers_empty: { en: "No offers right now. Please check back soon!", ko: "현재 등록된 특가가 없습니다. 곧 다시 확인해 주세요!", th: "ขณะนี้ยังไม่มีโปรโมชั่น โปรดกลับมาดูใหม่เร็ว ๆ นี้!", vi: "Hiện chưa có ưu đãi. Vui lòng quay lại sau!" },

  // About / contact
  about_title: { en: "Visit Our Shop", ko: "매장 방문 안내", th: "มาเยี่ยมร้านเรา", vi: "Ghé thăm cửa hàng" },
  contact_phone: { en: "Mobile", ko: "휴대폰", th: "มือถือ", vi: "Di động" },
  contact_tel: { en: "Tel", ko: "전화", th: "โทรศัพท์", vi: "Điện thoại" },
  contact_fax: { en: "Fax", ko: "팩스", th: "แฟกซ์", vi: "Fax" },
  contact_email: { en: "Email", ko: "이메일", th: "อีเมล", vi: "Email" },
  contact_kakao: { en: "KakaoTalk", ko: "카카오톡", th: "KakaoTalk", vi: "KakaoTalk" },
  contact_address: { en: "Address", ko: "주소", th: "ที่อยู่", vi: "Địa chỉ" },
  contact_bank: { en: "Bank Account", ko: "계좌번호", th: "บัญชีธนาคาร", vi: "Tài khoản ngân hàng" },
  open_map: { en: "Open in Naver Map", ko: "네이버 지도에서 열기", th: "เปิดใน Naver Map", vi: "Mở trong Naver Map" },
  view_directions: { en: "Tap to get directions", ko: "탭하여 길찾기", th: "แตะเพื่อดูเส้นทาง", vi: "Chạm để xem chỉ đường" },

  // Social
  social_title: { en: "Follow & Contact Us", ko: "팔로우 및 문의", th: "ติดตามและติดต่อเรา", vi: "Theo dõi & Liên hệ" },
  social_subtitle: { en: "All our channels in one place.", ko: "모든 채널을 한 곳에서.", th: "ทุกช่องทางในที่เดียว", vi: "Tất cả kênh ở một nơi." },

  // Links page
  links_title: { en: "Connect with us", ko: "연결하기", th: "เชื่อมต่อกับเรา", vi: "Kết nối với chúng tôi" },
  links_subtitle: { en: "Tap any button below.", ko: "아래 버튼을 눌러주세요.", th: "แตะปุ่มด้านล่าง", vi: "Chạm vào nút bên dưới." },
  links_kakao_scan: { en: "Scan to add on KakaoTalk", ko: "스캔하여 카카오톡 친구추가", th: "สแกนเพื่อเพิ่มเพื่อนใน KakaoTalk", vi: "Quét để thêm trên KakaoTalk" },
  links_share: { en: "Share this page", ko: "이 페이지 공유", th: "แชร์หน้านี้", vi: "Chia sẻ trang này" },

  // QR page
  qr_title: { en: "Your Shop QR Code", ko: "매장 QR 코드", th: "QR โค้ดร้านของคุณ", vi: "Mã QR cửa hàng" },
  qr_subtitle: { en: "Print this QR. Anyone who scans it gets all your links.", ko: "이 QR을 인쇄하세요. 스캔하면 모든 링크로 연결됩니다.", th: "พิมพ์ QR นี้ ใครก็ตามที่สแกนจะได้ลิงก์ทั้งหมดของคุณ", vi: "In mã QR này. Ai quét cũng nhận được tất cả liên kết của bạn." },
  qr_download: { en: "Download QR (PNG)", ko: "QR 다운로드 (PNG)", th: "ดาวน์โหลด QR (PNG)", vi: "Tải QR (PNG)" },
  qr_points_to: { en: "Points to", ko: "연결 주소", th: "ชี้ไปที่", vi: "Trỏ đến" },
  qr_print: { en: "Print", ko: "인쇄", th: "พิมพ์", vi: "In" },

  // Admin
  admin_title: { en: "Manage Offers", ko: "특가 상품 관리", th: "จัดการโปรโมชั่น", vi: "Quản lý ưu đãi" },
  admin_login: { en: "Owner Login", ko: "관리자 로그인", th: "เข้าสู่ระบบเจ้าของร้าน", vi: "Đăng nhập chủ cửa hàng" },
  admin_password: { en: "Password", ko: "비밀번호", th: "รหัสผ่าน", vi: "Mật khẩu" },
  admin_login_btn: { en: "Log in", ko: "로그인", th: "เข้าสู่ระบบ", vi: "Đăng nhập" },
  admin_logout: { en: "Log out", ko: "로그아웃", th: "ออกจากระบบ", vi: "Đăng xuất" },
  admin_wrong: { en: "Wrong password.", ko: "비밀번호가 올바르지 않습니다.", th: "รหัสผ่านไม่ถูกต้อง", vi: "Sai mật khẩu." },
  admin_add: { en: "Add Offer", ko: "특가 추가", th: "เพิ่มโปรโมชั่น", vi: "Thêm ưu đãi" },
  admin_edit: { en: "Edit", ko: "수정", th: "แก้ไข", vi: "Sửa" },
  admin_delete: { en: "Delete", ko: "삭제", th: "ลบ", vi: "Xóa" },
  admin_save: { en: "Save", ko: "저장", th: "บันทึก", vi: "Lưu" },
  admin_cancel: { en: "Cancel", ko: "취소", th: "ยกเลิก", vi: "Hủy" },
  admin_hint: { en: "Tip: keep it to 3–4 offers for the cleanest look.", ko: "팁: 3~4개의 특가를 유지하면 가장 깔끔합니다.", th: "เคล็ดลับ: ใส่โปรโมชั่น 3–4 รายการเพื่อความเรียบร้อย", vi: "Mẹo: giữ 3–4 ưu đãi để giao diện gọn gàng nhất." },
  f_title_en: { en: "Title (English)", ko: "제목 (영어)", th: "ชื่อ (อังกฤษ)", vi: "Tiêu đề (Tiếng Anh)" },
  f_title_ko: { en: "Title (Korean)", ko: "제목 (한국어)", th: "ชื่อ (เกาหลี)", vi: "Tiêu đề (Tiếng Hàn)" },
  f_price: { en: "Price", ko: "가격", th: "ราคา", vi: "Giá" },
  f_desc_en: { en: "Description (English)", ko: "설명 (영어)", th: "รายละเอียด (อังกฤษ)", vi: "Mô tả (Tiếng Anh)" },
  f_desc_ko: { en: "Description (Korean)", ko: "설명 (한국어)", th: "รายละเอียด (เกาหลี)", vi: "Mô tả (Tiếng Hàn)" },
  f_badge_en: { en: "Badge (English, optional)", ko: "배지 (영어, 선택)", th: "ป้าย (อังกฤษ, ไม่บังคับ)", vi: "Nhãn (Tiếng Anh, tùy chọn)" },
  f_badge_ko: { en: "Badge (Korean, optional)", ko: "배지 (한국어, 선택)", th: "ป้าย (เกาหลี, ไม่บังคับ)", vi: "Nhãn (Tiếng Hàn, tùy chọn)" },
  f_image: { en: "Image URL", ko: "이미지 URL", th: "URL รูปภาพ", vi: "URL hình ảnh" },

  // Sell sheet
  sell_title: { en: "Sell Entry Sheet", ko: "판매 입력 장부", th: "บันทึกการขาย", vi: "Sổ ghi bán hàng" },
  sell_subtitle: { en: "Record each phone sale.", ko: "각 휴대폰 판매를 기록하세요.", th: "บันทึกการขายโทรศัพท์แต่ละเครื่อง", vi: "Ghi lại mỗi lần bán điện thoại." },
  sell_add: { en: "Add Entry", ko: "기록 추가", th: "เพิ่มรายการ", vi: "Thêm mục" },
  sell_export: { en: "Export CSV", ko: "CSV 내보내기", th: "ส่งออก CSV", vi: "Xuất CSV" },
  sell_search: { en: "Search…", ko: "검색…", th: "ค้นหา…", vi: "Tìm kiếm…" },
  sell_empty: { en: "No entries yet. Add your first sale above.", ko: "기록이 없습니다. 위에서 첫 판매를 추가하세요.", th: "ยังไม่มีรายการ เพิ่มการขายแรกด้านบน", vi: "Chưa có mục nào. Thêm lần bán đầu tiên ở trên." },
  col_day: { en: "Day", ko: "날짜", th: "วันที่", vi: "Ngày" },
  col_shop: { en: "Shop", ko: "매장", th: "ร้าน", vi: "Cửa hàng" },
  col_model: { en: "Model", ko: "모델", th: "รุ่น", vi: "Mẫu" },
  col_serial: { en: "Serial No.", ko: "시리얼 번호", th: "หมายเลขซีเรียล", vi: "Số sê-ri" },
  col_price: { en: "Price", ko: "가격", th: "ราคา", vi: "Giá" },
  col_imei: { en: "IMEI No.", ko: "IMEI 번호", th: "หมายเลข IMEI", vi: "Số IMEI" },
  col_name: { en: "Name", ko: "이름", th: "ชื่อ", vi: "Tên" },
  col_sign: { en: "Sign", ko: "서명", th: "ลายเซ็น", vi: "Chữ ký" },
  col_sal: { en: "Sal", ko: "판매", th: "ขาย", vi: "Bán" },
  col_action: { en: "Action", ko: "관리", th: "จัดการ", vi: "Thao tác" },
  sell_total: { en: "Total entries", ko: "총 기록", th: "รายการทั้งหมด", vi: "Tổng số mục" },

  // Common
  loading: { en: "Loading…", ko: "불러오는 중…", th: "กำลังโหลด…", vi: "Đang tải…" },
  back_home: { en: "← Back to home", ko: "← 홈으로", th: "← กลับหน้าแรก", vi: "← Về trang chủ" },
  copied: { en: "Copied!", ko: "복사됨!", th: "คัดลอกแล้ว!", vi: "Đã sao chép!" },
  footer_rights: { en: "All rights reserved.", ko: "모든 권리 보유.", th: "สงวนลิขสิทธิ์", vi: "Đã đăng ký bản quyền." },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    return LANGS.some((l) => l.code === saved) ? saved : "ko";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // t(key) → translated string in current language (falls back to English)
  const t = (key) => {
    const entry = STRINGS[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// Helper to pick the right field of an object by language, e.g. pick(item, "title").
// Offer/business content only has Korean & English versions, so Thai/Vietnamese
// gracefully fall back to English.
export function pick(obj, base, lang) {
  const key = base + (lang === "ko" ? "Ko" : "En");
  return obj[key] ?? obj[base + "En"] ?? obj[base + "Ko"] ?? "";
}
