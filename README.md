# 20/10 Studio 💌

Studio tạo thiệp Ngày Phụ nữ Việt Nam dựa trên mẫu HTML được cung cấp. Web tĩnh, không cần máy chủ hay khóa API.

## Sử dụng

1. Mở trang studio, nhập tên người nhận, tên người gửi và lời chúc.
2. Xem trước trực tiếp, chọn gợi ý hoặc viết lời riêng; nghe thử bản nhạc đính kèm.
3. Bấm **Tạo link gửi yêu thương**, sau đó sao chép/chia sẻ link.
4. Người nhận mở link, bấm **Giải mã 💌** để xem hiệu ứng và nghe nhạc. Có nút bật/tắt nhạc.

Link chứa đầy đủ nội dung thiệp trong phần `#g=…`; không cần người nhận dùng cùng thiết bị. Gửi nguyên link, bao gồm phần sau dấu `#`. Đây là mã hóa định dạng Base64url, không phải mã hóa bảo mật; người có link đọc được nội dung. Bản nháp lưu trên trình duyệt của người tạo; thay đổi bản nháp không sửa các link đã gửi.

## Chạy thử

```sh
python3 -m http.server 8080
```

Mở http://localhost:8080. Không có bước build hay dependency cho website.

## GitHub Pages

Vào **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, nhánh **main**, thư mục **/(root)**, rồi Save.

- Studio: https://duckxyz06.github.io/20_10/
- Thiệp: `card.html#g=…` (tạo bằng studio)

Nếu Pages đã bật ở nhánh main và thư mục gốc, chỉ cần đợi GitHub triển khai commit mới.

## Tệp

- `index.html`, `studio.css`, `studio.js`: studio responsive, bản nháp, chia sẻ và xem trước.
- `card.html`: thiệp giữ hiệu ứng giải mã và trái tim từ mẫu gốc.
- `greeting.js`: kiểm tra, giới hạn nội dung và mã hóa/giải mã Unicode. Nội dung nhập được hiển thị bằng textContent.
- `assets/music.mp3`: bản nhạc do người dùng cung cấp.

Âm thanh chỉ bắt đầu sau thao tác người dùng, phù hợp giới hạn tự phát của trình duyệt. Tên tối đa 80 ký tự, lời chúc 2.000 ký tự, lời nhắn cuối 300 ký tự. Font từ Google Fonts có font dự phòng khi không có mạng.
